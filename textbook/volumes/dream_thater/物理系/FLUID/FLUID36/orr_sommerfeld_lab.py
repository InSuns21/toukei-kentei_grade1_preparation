#!/usr/bin/env python3
"""FLUID36: clamped Chebyshev Galerkin approximation to Orr-Sommerfeld.

Finite-dimensional eigenvalues are not a proof of instability; check order
convergence and generalized-eigenpair residuals. Requires NumPy.
"""
import argparse
import json
import math
import numpy as np
from numpy.polynomial import Chebyshev
from numpy.polynomial.legendre import leggauss


def basis_matrices(profile, reynolds, alpha, n):
    if profile not in ('poiseuille', 'couette'):
        raise ValueError('profile must be poiseuille or couette')
    if not (math.isfinite(reynolds) and 100 <= reynolds <= 100000
            and math.isfinite(alpha) and 0.2 <= alpha <= 3
            and isinstance(n, int) and 8 <= n <= 36):
        raise ValueError('Require Re in [100,100000], alpha in [0.2,3], N in [8,36]')
    y, w = leggauss(3*n + 20)
    factor = Chebyshev([0.5, 0, -0.5])**2
    basis = [factor * Chebyshev.basis(j) for j in range(n)]
    v = np.array([p(y) for p in basis], dtype=float)
    dy = np.array([p.deriv(1)(y) for p in basis], dtype=float)
    d2 = np.array([p.deriv(2)(y) for p in basis], dtype=float)
    lap = d2-alpha**2*v
    if profile == 'poiseuille':
        u, udd = 1-y*y, -2.0
    else:
        u, udd = y, 0.0
    b = -(dy*w)@dy.T-alpha**2*(v*w)@v.T
    a = (v*w)@(u*lap-udd*v).T + 1j/(alpha*reynolds)*(lap*w)@lap.T
    return a, b


def solve(profile='poiseuille', reynolds=10000.0, alpha=1.0, n=28):
    a, b = basis_matrices(profile, reynolds, alpha, n)
    # B is negative definite analytically; solve numerically rather than invert.
    eigs, vectors = np.linalg.eig(np.linalg.solve(b, a))
    leading = int(np.argmax(eigs.imag))
    c = eigs[leading]
    v = vectors[:, leading]
    numerator = np.linalg.norm(a@v-c*b@v)
    denominator = (np.linalg.norm(a, 2) + abs(c)*np.linalg.norm(b, 2))*np.linalg.norm(v)
    residual = float(numerator/max(denominator, np.finfo(float).tiny))
    return {
        'n': n, 'c_real': float(c.real), 'c_imag': float(c.imag),
        'growth_sigma': float(alpha*c.imag),
        'generalized_relative_residual': residual,
        'cond_B': float(np.linalg.cond(b)),
        'eigenvalues': [[float(z.real), float(z.imag)] for z in eigs],
    }


def experiment(profile='poiseuille', reynolds=10000.0, alpha=1.0, n=28):
    orders = sorted(set(j for j in (n-8, n-4, n, n+4) if 8 <= j <= 36))
    results = [solve(profile, reynolds, alpha, j) for j in orders]
    selected = next(x for x in results if x['n'] == n)
    yvals = np.linspace(-1, 1, 81)
    uvals = 1-yvals*yvals if profile == 'poiseuille' else yvals
    return {
        'model': '2D_linear_Orr_Sommerfeld_clamped_Chebyshev_Galerkin',
        'inputs': {'profile': profile, 'Re_center_or_wall_speed_half_gap': reynolds,
                   'alpha_nondimensional': alpha, 'N': n,
                   'walls': 'phi(-1)=phi(1)=phi_prime(-1)=phi_prime(1)=0'},
        'leading': {k: value for k, value in selected.items() if k != 'eigenvalues'},
        'convergence': [{k: value for k, value in x.items() if k != 'eigenvalues'}
                        for x in results],
        'checks': {'boundary_residual': 0.0,
                   'boundary_reason': '(1-y^2)^2 factor, zero value and derivative at walls',
                   'algebraic_residual_max': max(x['generalized_relative_residual']
                                                  for x in results),
                   'finite_order_not_proof': True,
                   'interpretation': 'linear normal-mode approximation, not nonlinear flow'},
        'plots': [
            {'title': 'Base velocity profile', 'x_label': 'y / h',
             'y_label': 'U / U_ref',
             'series': [{'name': profile + ' base flow',
                         'points': [[float(y), float(u)] for y,u in zip(yvals,uvals)]}]},
            {'title': 'Leading temporal growth versus Galerkin order',
             'x_label': 'N', 'y_label': 'sigma = alpha Im(c)',
             'series': [{'name': 'leading discrete growth',
                         'points': [[x['n'], x['growth_sigma']] for x in results]},
                        {'name': 'neutral reference',
                         'points': [[x['n'],0] for x in results]}]},
        ],
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--profile', choices=('poiseuille','couette'),
                        default='poiseuille')
    parser.add_argument('--re', type=float, default=10000.0)
    parser.add_argument('--alpha', type=float, default=1.0)
    parser.add_argument('--n', type=int, default=28)
    args = parser.parse_args(argv)
    result = experiment(args.profile, args.re, args.alpha, args.n)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
