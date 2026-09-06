from pathlib import Path

replacements = {
    Path('textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md'): [
        (
            '- $[0,1]$：閉かつ有界なのでコンパクト。',
            '- $[0,1]$：[Heine–Borel](#thm-f0-00c1-02)より、閉かつ有界なのでコンパクト。',
        ),
        (
            '- $[0,1]^p$：閉かつ有界なのでコンパクト。',
            '- $[0,1]^p$：[Heine–Borel](#thm-f0-00c1-02)より、閉かつ有界なのでコンパクト。',
        ),
        (
            '1. $[0,1]$ は閉かつ有界なのでコンパクト。',
            '1. $[0,1]$ は[Heine–Borel](#thm-f0-00c1-02)より、閉かつ有界なのでコンパクト。',
        ),
        (
            'は閉かつ有界なのでコンパクト。連続写像\n',
            'は[Heine–Borel](#thm-f0-00c1-02)より、閉かつ有界なのでコンパクト。連続写像\n',
        ),
    ],
    Path('textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md'): [
        (
            '$K$ は閉かつ有界なのでコンパクト、$f$ は連続。よってWeierstrassにより最大最小を達成する。',
            '$K$ は[Heine–Borel](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)より、閉かつ有界なのでコンパクト、$f$ は連続。よってWeierstrassにより最大最小を達成する。',
        ),
        (
            '$A,B$ は閉かつ有界なのでコンパクト。中心距離4、半径和2より互いに素。',
            '$A,B$ は[Heine–Borel](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)より、閉かつ有界なのでコンパクト。中心距離4、半径和2より互いに素。',
        ),
        (
            '距離関数の連続性から\n',
            '[距離空間の定義](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)から従う距離関数の連続性から\n',
        ),
    ],
    Path('textbook/volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md'): [
        (
            '$C$ は閉なので $p\\in C$ です。',
            '[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)より、$C$ は閉なので $p\\in C$ です。',
        ),
    ],
    Path('textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md'): [
        (
            '$C$ は閉なので $p\\in C$、距離関数は連続なので\n\n$$\n\\|z-p\\|=\\delta.\n$$',
            '[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)より、$C$ は閉なので $p\\in C$ です。\n\nさらに[距離空間の定義](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)から\n\n$$\n\\left|\\|z-x\\|-\\|z-y\\|\\right|\\le\\|x-y\\|\n$$\n\nなので $x\\mapsto\\|z-x\\|$ は1-Lipschitz、特に連続です。したがって\n\n$$\n\\|z-p\\|=\\delta.\n$$',
        ),
    ],
}

for path, pairs in replacements.items():
    text = path.read_text(encoding='utf-8')
    for old, new in pairs:
        count = text.count(old)
        if count != 1:
            raise SystemExit(f'{path}: expected exactly one match, got {count}: {old[:100]!r}')
        text = text.replace(old, new, 1)
    path.write_text(text, encoding='utf-8')
    print(f'updated {path}')
