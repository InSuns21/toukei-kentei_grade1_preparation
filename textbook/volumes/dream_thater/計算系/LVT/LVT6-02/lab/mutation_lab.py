"""Run with the pinned upstream project's locked Python environment."""
import argparse
import json
from pathlib import Path
import runpy
import subprocess
import sys

from hypothesis import find, settings, strategies as st

PIN = "c332ba3e2d2bf78edb993ae6acadcd83f927073e"
ANTI = (2, 4, 6)
WITNESS = [2, 0, 4, 1, 6]


def report(label, moves, expected, actual):
    print(json.dumps({"label": label, "moves": moves,
                      "lean": expected, "python": actual}, ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("upstream", type=Path)
    root = parser.parse_args().upstream.resolve()
    sha = subprocess.check_output(["git", "-C", str(root), "rev-parse", "HEAD"],
                                  text=True).strip()
    if sha != PIN:
        raise RuntimeError(f"Expected pinned revision {PIN}, got {sha}")
    subprocess.run(["git", "-C", str(root), "diff", "--exit-code", "HEAD", "--",
                    "tictactoe", "tests", "lean_spec/TicTacToe/Spec.lean",
                    "lean_spec/Main.lean", "uv.lock"], check=True)
    sys.path.insert(0, str(root))
    from tictactoe import game

    original = game.WINNING_LINES
    assert len(original) == 8 and original.count(ANTI) == 1
    unit = runpy.run_path(str(root / "tests/test_unit.py"))
    names = sorted(name for name in unit if name.startswith("test_"))
    assert len(names) == 5
    for name in names:
        unit[name]()
    print("original unit examples: 5/5")
    helpers = runpy.run_path(str(root / "tests/conftest.py"))
    binary = helpers["ORACLE_BIN"]
    if not binary.is_file():
        raise RuntimeError("Build the pinned Lean oracle before running")
    oracle = helpers["LeanOracle"](binary)
    try:
        baseline = oracle.play(WITNESS)
        assert baseline == game.play_moves(WITNESS)
        assert baseline == {"ok": True, "board": ["O", "O", "X", None, "X",
                                                  None, "X", None, None],
                            "turn": "X", "status": "won", "winner": "X"}
        game.WINNING_LINES = tuple(line for line in original if line != ANTI)
        assert len(game.WINNING_LINES) == 7
        for name in names:
            unit[name]()
        print("mutated unit examples: 5/5")

        actual = game.play_moves(WITNESS)
        assert actual == {**baseline, "turn": "O", "status": "ongoing", "winner": None}
        report("fixed five-move witness", WITNESS, baseline, actual)

        long = WITNESS + [3]
        expected, actual = oracle.play(long), game.play_moves(long)
        assert expected == {"ok": False, "error": "game_over"}
        assert actual == {"ok": True, "board": ["O", "O", "X", "O", "X",
                                               None, "X", None, None],
                          "turn": "X", "status": "ongoing", "winner": None}
        report("six-move witness", long, expected, actual)

        def mismatch(moves):
            return oracle.play(moves) != game.play_moves(moves)

        prefixes = [long[:n] for n in range(len(long) + 1)]
        differences = [n for n, seq in enumerate(prefixes) if mismatch(seq)]
        assert differences == [5, 6], differences
        reduced = prefixes[differences[0]]
        assert reduced == WITNESS
        for i in range(len(reduced)):
            assert not mismatch(reduced[:i] + reduced[i + 1:])
        print("first differing prefix:", reduced)

        # Permutation generation searches without hard-coding the winning line.
        permutation = find(st.permutations(list(range(9))),
                           lambda order: mismatch(list(order[:5])),
                           settings=settings(max_examples=5000, derandomize=True,
                                             database=None, deadline=None))
        generated = list(permutation[:5])
        assert mismatch(generated)
        assert all(not mismatch(generated[:n]) for n in range(5))
        report("generated five-move witness", generated,
               oracle.play(generated), game.play_moves(generated))
    finally:
        game.WINNING_LINES = original
        oracle.close()

    # A control: restoring the removed line restores agreement on the witness.
    assert game.play_moves(WITNESS) == baseline
    print("restored original: witness agrees")


if __name__ == "__main__":
    main()
