"""U2-27: aligned trajectory error, NEES/coverage, and reproducible resource probes.

Uses only Python's standard library. The simulation assumes independent scalar
standard-normal estimation errors, fixed reported variances, and a known truth.
It is not a SLAM solver or a claim about field sensor performance.
"""
from __future__ import annotations
import argparse
import math
import random
import time
import tracemalloc

SEED = 20261121
N = 6000


def rotate(p, angle):
    c, s = math.cos(angle), math.sin(angle)
    return (c * p[0] - s * p[1], s * p[0] + c * p[1])


def fit_rigid(estimated, truth):
    """Least-squares SE(2) alignment of points (unweighted), if C,D not both 0."""
    if len(estimated) != len(truth) or not estimated:
        raise ValueError("matching nonempty point lists are required")
    n = len(truth)
    hm = tuple(sum(p[j] for p in estimated)/n for j in range(2))
    pm = tuple(sum(p[j] for p in truth)/n for j in range(2))
    c = d = 0.0
    for h, p in zip(estimated, truth):
        hx, hy = h[0]-hm[0], h[1]-hm[1]
        px, py = p[0]-pm[0], p[1]-pm[1]
        c += hx*px + hy*py
        d += hx*py - hy*px
    if math.hypot(c, d) <= 1e-12:
        raise ValueError("rotation is unidentifiable for these point pairs")
    angle = math.atan2(d, c)
    rh = rotate(hm, angle)
    shift = (pm[0]-rh[0], pm[1]-rh[1])
    return angle, shift


def transform(p, angle, shift):
    r = rotate(p, angle)
    return (r[0]+shift[0], r[1]+shift[1])


def position_rmse(estimated, truth):
    if len(estimated) != len(truth) or not estimated:
        raise ValueError("matching nonempty point lists are required")
    return math.sqrt(sum((h[0]-p[0])**2+(h[1]-p[1])**2
                         for h, p in zip(estimated, truth))/len(truth))


def check_alignment():
    truth = [(0.,0.), (1.,0.)]
    estimated = [(1.,2.), (1.,3.)]
    raw = position_rmse(estimated, truth)
    angle, shift = fit_rigid(estimated, truth)
    aligned = [transform(p, angle, shift) for p in estimated]
    fitted = position_rmse(aligned, truth)
    assert math.isclose(angle, -math.pi/2, abs_tol=1e-12)
    assert all(math.dist(a,b) < 1e-12 for a,b in zip(aligned, truth))
    assert fitted < 1e-12
    assert math.isclose(raw, math.sqrt(7.0), abs_tol=1e-12)
    return raw, fitted, angle, shift


def calibration(n=N):
    rng = random.Random(SEED)
    errors = [rng.gauss(0.,1.) for _ in range(n)]
    mse = sum(e*e for e in errors)/n
    small = .25
    cutoff = 1.959963984540054  # 0.975 quantile of N(0,1)
    coverage_1 = sum(abs(e) <= cutoff for e in errors)/n
    coverage_quarter = sum(abs(e) <= cutoff*math.sqrt(small) for e in errors)/n
    assert 0.93 < coverage_1 < 0.97
    assert 0.64 < coverage_quarter < 0.71
    assert .95 < mse < 1.05
    return math.sqrt(mse), mse, mse/small, coverage_1, coverage_quarter


def diagnostic_example():
    # observation Z is pure noise: H=0, S=1, so both filters have identical NIS
    z, error = 1., 2.
    nis = z*z
    nees_a, nees_b = error*error/4., error*error/1.
    assert (nis, nees_a, nees_b) == (1., 1., 4.)
    return nis, nees_a, nees_b


def resource_probe(n):
    tracemalloc.start()
    t0 = time.perf_counter()
    data = [((i%127)/127.0)**2 for i in range(n)]
    score = sum(data)/n
    elapsed = time.perf_counter() - t0
    _, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return score, elapsed, peak


def self_test():
    check_alignment()
    calibration()
    diagnostic_example()
    a, _, _ = resource_probe(1000)
    b, _, _ = resource_probe(4000)
    assert 0 < a < 1 and 0 < b < 1


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--scenario', choices=['alignment','calibration','diagnostics','resources','all'], default='all')
    parser.add_argument('--self-test', action='store_true')
    a = parser.parse_args()
    if a.self_test:
        self_test()
        print('U2-27 self-test: PASS')
        return
    if a.scenario in ('alignment','all'):
        raw, aligned, theta, shift = check_alignment()
        print(f'alignment: raw RMSE={raw:.6f} m, aligned RMSE={aligned:.6f} m, angle={theta:.6f} rad, shift={shift}')
    if a.scenario in ('calibration','all'):
        rmse, nees_a, nees_b, ca, cb = calibration()
        print(f'calibration: seed={SEED}, n={N}, RMSE={rmse:.4f}, NEES means={nees_a:.4f}/{nees_b:.4f}, coverage={ca:.3f}/{cb:.3f}')
    if a.scenario in ('diagnostics','all'):
        print('diagnostics: NIS / NEES(P=4) / NEES(P=1) =', diagnostic_example())
    if a.scenario in ('resources','all'):
        for count in (1000,4000):
            s, seconds, peak = resource_probe(count)
            print(f'resource probe: count={count}, checksum={s:.6f}, elapsed={seconds:.6f} s, tracemalloc peak={peak} B')

if __name__ == '__main__':
    main()
