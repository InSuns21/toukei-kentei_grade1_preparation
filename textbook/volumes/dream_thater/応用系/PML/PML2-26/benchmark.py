import numpy as np
from time import perf_counter
from platform import python_version, machine

K = np.arange(1, 4)
LAM = (np.pi * K)**2
TRAIN = [(1, 1, 0), (-1, 2, 0), (2, -1, 0)]
VALID = [(0.5, 1.5, 0)]
TEST = [(1, -1, 0), (1, -1, 1)]


def basis(n):
    return np.sin(np.pi * np.arange(1, n)[:, None] * K / n)


def odd(v):
    return np.r_[0., v, 0., -v[::-1]]


def train_fno(n):
    s = basis(n)
    # Real multipliers; coefficients for negative modes are conjugates.
    f = np.array([np.fft.rfft(odd(s @ a))[1:3] for a in TRAIN])
    u = np.array([np.fft.rfft(odd(s @ (np.array(a)/LAM)))[1:3]
                  for a in TRAIN])
    return np.real(np.sum(np.conj(f)*u, axis=0))/np.sum(abs(f)**2, axis=0)


def fno(f, w):
    z = np.fft.rfft(odd(f))
    z[1:3] *= w
    z[0] = 0
    z[3:] = 0
    return np.fft.irfft(z, n=2*(len(f)+1))[1:len(f)+1]


def pinn(f, s, steps):
    d = s * LAM
    w = np.zeros(3)
    n = len(f)+1
    for _ in range(steps):
        w -= (2/n)*(d.T @ (d @ w - f))/LAM[-1]**2
    return s @ w


def fd(f):
    n = len(f)+1
    b = f.copy()/n**2
    diag = np.full(n-1, 2.)
    for i in range(1, n-1):
        diag[i] -= 1/diag[i-1]
        b[i] += b[i-1]/diag[i-1]
    b[-1] /= diag[-1]
    for i in range(n-3, -1, -1):
        b[i] = (b[i]+b[i+1])/diag[i]
    return b


def rms(v, n):
    return np.linalg.norm(v)/np.sqrt(n)


def timed(fn, reps=21):
    fn()  # warm-up
    times = []
    for _ in range(reps):
        t = perf_counter()
        out = fn()
        times.append(perf_counter()-t)
    return out, np.median(times)*1e6


def main():
    print(python_version(), np.__version__, machine())
    w, train_us = timed(lambda: train_fno(16))
    print('weights', w, 'train_us', train_us)
    assert np.allclose(w, 1/LAM[:2], atol=1e-14, rtol=0)
    for a in VALID:
        s = basis(16)
        assert rms(fno(s @ a, w)-s @ (np.array(a)/LAM), 16) < 1e-12
    for n in (16, 32):
        s = basis(n)
        mu = 4*n*n*np.sin(np.pi*K/(2*n))**2
        for a in TEST:
            a = np.array(a)
            f = s @ a
            u = s @ (a/LAM)
            for name, fn, coeff in (
                ('PINN50', lambda: pinn(f, s, 50), a/LAM*(1-(1-LAM**2/LAM[-1]**2)**50)),
                ('PINN500', lambda: pinn(f, s, 500), a/LAM*(1-(1-LAM**2/LAM[-1]**2)**500)),
                ('FNO2', lambda: fno(f, w), np.r_[w*a[:2], 0.]),
                ('FD', lambda: fd(f), a/mu),
            ):
                v, us = timed(fn)
                assert np.max(abs(v-s @ coeff)) < 1e-12
                e = rms(v-u, n)
                assert abs(e-np.linalg.norm(coeff-a/LAM)/np.sqrt(2)) < 1e-12
                r = np.linalg.norm(LAM*coeff-a)/np.sqrt(2) if name != 'FD' else float('nan')
                discrete_r = rms(n*n*(2*v-np.r_[0., v[:-1]]-np.r_[v[1:], 0.])-f, n)
                if name == 'FD':
                    assert discrete_r < 1e-10
                print(n, tuple(a), name, f'E={e:.6e}', f'R={r:.6e}', f'Rd={discrete_r:.6e}', f'us={us:.1f}')


if __name__ == '__main__':
    main()
