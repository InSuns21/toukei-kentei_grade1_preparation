# U3-20 Greeks and discrete hedge — reproducible experiment

This exercise uses Python 3.10+ standard library only; no pip install,
external market data, API keys, random seed, or internet access is needed
for the local run. The public lecture exposes the same source through
the Pyodide python-file-lab (initial browser runtime download requires a network).

From the repository root:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 textbook/volumes/dream_thater/応用系/U/U3-20/assets/greeks_hedge.py
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s textbook/volumes/dream_thater/応用系/U/U3-20/assets/tests -v
```

Inputs: S=K=100 JPY, tau=1 year, continuously compounded r=.05,
continuous dividend yield q=.02, sigma=.20 year^(-1/2).
One business day is assumed equal to 1/252 year. Scenarios z=0,1,2
are **fixed standardized Q-Brownian increments** (no statistical estimation).

Finite-difference steps: spot 0.5 JPY, volatility 0.005, rate 0.0001,
time 1/252 year. Spot 1.0/0.5 and volatility .01/.005 are tested for
second-order convergence.

Expected output (rounded):
- call = 9.227005508 JPY, put = 6.330080628 JPY
- call Delta = .586851146, Gamma = .018950579, Vega = 37.901157510,
  Theta = -5.089318914 JPY/year, Rho = 49.458109105
- one-step short-call P&L for z=0: +.015057225 JPY
- one-step short-call P&L for z=1: +.000025697 JPY
- one-step short-call P&L for z=2: -.045367463 JPY

Checks: put-call parity, PDE residual, central differences vs analytic
derivatives, parameter boundaries, short-call hedge P&L, asymptotic
Gamma–Theta sign and shrinking-step residual.

The single-step cash account earns exp(r*dt); q*Delta*S*dt is a **left
endpoint dividend approximation**, not exact integrated dividends. One-step
valuation uses closed-form prices with remaining maturity tau-dt.
The printed leading term drops higher-order stochastic and dividend
quadrature errors. No Monte Carlo variance or numerical stopping tolerance
is involved. Computation uses O(1) time and memory per scenario; unit-test
thresholds (abs) are 1e-4 Delta/Rho, 1e-5 Gamma, .01 Vega/Theta and
3e-4 for one-day asymptotic remainder in the listed fixed scenarios.

No plot/image artifact is required: the lecture presents the underlying
price/slope/curvature comparison directly in an accessible numerical table.
