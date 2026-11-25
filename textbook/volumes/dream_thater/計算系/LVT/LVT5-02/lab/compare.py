"""Exercise the actual CLI, not a duplicate of its transport."""
import json
import queue
import subprocess
import tempfile
import threading
from pathlib import Path

EXE = Path(__file__).resolve().parent / ".lake/build/bin/lvtOracle"
ERROR = {"id": None, "status": "error", "code": "invalid_request"}

def request(i, s, k):
    return json.dumps({"id": i, "stock": s, "qty": k})

def expected(i, s, k):
    # Search the defining equation instead of copying Lean subtraction.
    for rest in range(s + 1):
        if k > 0 and rest + k == s:
            return {"id": i, "status": "ok", "rest": rest}
    return {"id": i, "status": "rejected"}

cases = [(request("a", 5, 2), expected("a", 5, 2)),
         ("{", ERROR), ("", ERROR),
         (request("b", 2, 2), expected("b", 2, 2)),
         (request("c", 1, 2), expected("c", 1, 2)),
         (request("d", 4, 0), expected("d", 4, 0)),
         (request("e", -1, 1), ERROR),
         ('{"id":"e","stock":1}', ERROR),
         (request('引用"\n', 3, 1), expected('引用"\n', 3, 1))]
cases += [(request(f"{s}:{k}", s, k), expected(f"{s}:{k}", s, k))
          for s in range(4) for k in range(4)]

def run_batch(rows):
    proc = subprocess.run([EXE, "--batch"], input="".join(s + "\n" for s, _ in rows),
                          text=True, encoding="utf-8", capture_output=True,
                          timeout=15, check=True)
    assert proc.stderr == "", proc.stderr
    return [json.loads(line) for line in proc.stdout.splitlines()]

def run_stream(rows):
    messages = queue.Queue()
    with tempfile.TemporaryFile(mode="w+t", encoding="utf-8") as errors:
        with subprocess.Popen([EXE, "--stream"], stdin=subprocess.PIPE,
                              stdout=subprocess.PIPE, stderr=errors,
                              text=True, encoding="utf-8") as proc:
            def read():
                try:
                    for line in proc.stdout:
                        messages.put(line)
                finally:
                    messages.put(None)
            worker = threading.Thread(target=read, daemon=True)
            worker.start()
            outputs = []
            try:
                for raw, want in rows:
                    proc.stdin.write(raw + "\n")
                    proc.stdin.flush()
                    line = messages.get(timeout=10)
                    assert line is not None, "unexpected EOF"
                    got = json.loads(line)
                    assert got == want, (raw, got, want)
                    outputs.append(got)
                proc.stdin.close()
                assert messages.get(timeout=10) is None, "extra stdout line"
                assert proc.wait(timeout=10) == 0
                errors.seek(0)
                assert errors.read() == ""
                return outputs
            finally:
                if proc.poll() is None:
                    proc.kill()
                proc.wait(timeout=10)
                worker.join(timeout=10)

if __name__ == "__main__":
    want = [v for _, v in cases]
    assert run_batch(cases) == want
    assert run_stream(cases) == want
    assert run_batch([]) == run_stream([]) == []
    bad = subprocess.run([EXE, "--unknown"], capture_output=True, timeout=10)
    assert bad.returncode == 2 and not bad.stdout and bad.stderr
    # EOF after a nonempty final line without LF is accepted by this adapter.
    last = subprocess.run([EXE, "--batch"], input=cases[0][0], text=True,
                          encoding="utf-8", capture_output=True, check=True, timeout=10)
    assert json.loads(last.stdout) == cases[0][1]
    print(f"LVT5-02: {len(cases)} ordered responses in each mode; EOF and CLI checks OK")
