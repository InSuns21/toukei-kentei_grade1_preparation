import json

from hypothesis import example, given
import pytest

from differential import (MAX_INT, SEARCH, call_oracle, discover, encode,
                          normalize, observations, orders, replay, request)


@pytest.mark.parametrize("stock,qty,status,rest", [
    (0, 0, "rejected", None), (5, 2, "ok", 3),
    (2, 2, "ok", 0), (2, 3, "rejected", None),
    (MAX_INT, MAX_INT, "ok", 0), (MAX_INT, 1, "ok", MAX_INT - 1),
])
def test_examples(stock, qty, status, rest):
    order = request("日\n😀", stock, qty)
    expected = (status, order["id"], rest) if status == "ok" else (status, order["id"])
    lean, python = observations(order)
    assert normalize(lean) == expected
    assert normalize(python) == expected


@SEARCH
@given(order=orders())
@example(order=request("", 1, 1))
@example(order=request('a\n"', MAX_INT, MAX_INT))
@example(order=request("日", 0, 1))
@example(order=request("a", MAX_INT, 0))
def test_generated(order):
    lean, python = observations(order)
    assert normalize(lean) == normalize(python)


@pytest.mark.parametrize("raw", [b"{", b'{"id":"a","stock":-1,"qty":1}'])
def test_invalid_input(raw):
    assert normalize(call_oracle(raw)) == ("error", None, "invalid_request")


def test_discover_and_replay(tmp_path):
    path = tmp_path / "counterexample.json"
    record = discover(path)
    order = record["input"]
    assert 0 < order["qty"] == order["stock"]
    assert record["lean"] == {"id": order["id"], "status": "ok", "rest": 0}
    assert record["mutant"] == {"id": order["id"], "status": "rejected"}
    assert replay(path) == record
    # A correct implementation must pass this exact input again.
    lean, python = observations(order)
    assert normalize(lean) == normalize(python)
    # A record with a fabricated saved result must not reproduce.
    record["lean"]["rest"] = 1
    path.write_text(json.dumps(record), encoding="utf-8")
    with pytest.raises(AssertionError):
        replay(path)
