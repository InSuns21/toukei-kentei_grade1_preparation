"""Audit a deliberately restricted cross-language response profile."""
import json

MAX_INT = 2**53 - 1


class Invalid(ValueError):
    pass


def unique(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise Invalid("duplicate key")
        result[key] = value
    return result


def invalid_number(_):
    raise Invalid("not an integer token")


def text_id(value):
    if type(value) is not str:
        raise Invalid("id type")
    try:
        value.encode("utf-8", errors="strict")
    except UnicodeError as exc:
        raise Invalid("invalid Unicode") from exc
    return value


def normalize(raw):
    try:
        obj = json.loads(raw.decode("utf-8", errors="strict"),
                         object_pairs_hook=unique, parse_float=invalid_number,
                         parse_constant=invalid_number)
    except (UnicodeError, ValueError) as exc:
        raise Invalid("invalid JSON") from exc
    if type(obj) is not dict:
        raise Invalid("object required")
    status = obj.get("status")
    if status == "ok" and set(obj) == {"status", "id", "rest"}:
        rest = obj["rest"]
        if type(rest) is not int or not 0 <= rest <= MAX_INT:
            raise Invalid("rest")
        return ("ok", text_id(obj["id"]), rest)
    if status == "rejected" and set(obj) == {"status", "id"}:
        return ("rejected", text_id(obj["id"]))
    if (status == "error" and set(obj) == {"status", "id", "code"}
            and obj["id"] is None and obj["code"] == "invalid_request"):
        return ("error", None, "invalid_request")
    raise Invalid("response schema")


def compare(left, right):
    try:
        return "equal" if normalize(left) == normalize(right) else "different"
    except Invalid:
        return "invalid"


def compare_rows(left, right):
    # Validate every response, even if lengths differ.
    try:
        a = [normalize(row) for row in left]
        b = [normalize(row) for row in right]
    except Invalid:
        return "invalid"
    return "equal" if a == b else "different"


def ok(rest, id="a"):
    return json.dumps({"status": "ok", "id": id, "rest": rest},
                      ensure_ascii=False).encode("utf-8")


def run():
    zero = ok(0)
    rejected = b'{"status":"rejected","id":"a"}'
    missing = b'{"status":"ok","id":"a"}'
    duplicate = b'{"status":"ok","id":"a","rest":1,"rest":0}'
    a, b = ok(3), ok(3, "b")
    assert compare(zero, b'{"rest":0,"id":"a","status":"ok"}') == "equal"
    assert compare(zero, b'{"rest":-0,"id":"\\u0061","status":"ok"}') == "equal"
    assert compare(ok(3, "日本\n"), ok(3, "日本\n")) == "equal"
    assert compare(ok(MAX_INT), ok(MAX_INT)) == "equal"
    assert compare(ok(MAX_INT + 1), ok(MAX_INT + 2)) == "invalid"
    assert compare(zero, rejected) == "different"
    assert compare(a, b) == "different"
    assert compare(zero, ok(1)) == "different"
    for bad in (missing, duplicate, ok(False), ok(None), ok(-1), ok(1.0),
                ok("0"), b'{"status":"ok","id":"a","rest":1e0}',
                b'{"status":"ok","id":"a","rest":NaN}',
                b'{"status":"ok","id":"a","rest":Infinity}',
                b'{"status":"ok","id":"\\ud800","rest":0}',
                b'{"status":"ok","id":"\xff","rest":0}',
                b'{"status":"ok","id":"a","rest":0,"extra":null}',
                b'{"status":"error","id":"a","code":"invalid_request"}',
                b'{', b'[]'):
        assert compare(zero, bad) == "invalid", bad
    error = b'{"status":"error","id":null,"code":"invalid_request"}'
    assert compare(error, error) == "equal"
    assert compare(error, rejected) == "different"
    assert compare_rows([a, b], [a]) == "different"
    assert compare_rows([a, b], [b, a]) == "different"
    assert compare_rows([a], [a, missing]) == "invalid"

    # Six deliberately faulty observations, each killed by an explicit witness.
    def float_only(raw):
        return float(json.loads(raw)["rest"])

    def default_zero(raw):
        return json.loads(raw).get("rest", 0)

    def ignore_status(raw):
        return json.loads(raw).get("rest", 0)

    def ignore_id(raw):
        return normalize(raw)[0], normalize(raw)[2]

    def zip_only(left, right):
        return all(compare(x, y) == "equal" for x, y in zip(left, right))

    def last_key_wins(raw):
        return json.loads(raw)

    assert float_only(ok(MAX_INT + 1)) == float_only(ok(MAX_INT + 2))
    assert default_zero(zero) == default_zero(missing)
    assert ignore_status(zero) == ignore_status(rejected)
    assert ignore_id(a) == ignore_id(b)
    assert zip_only([a, b], [a])
    assert last_key_wins(zero) == last_key_wins(duplicate)
    # Python bool/int equality is an additional type-confusion witness.
    assert json.loads(zero)["rest"] == json.loads(ok(False))["rest"]
    print("LVT5-03: strict comparison and 6 mutants OK")


if __name__ == "__main__":
    run()
