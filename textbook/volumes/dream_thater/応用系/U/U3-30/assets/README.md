# U3-30 numerical reproducibility

The script uses Python's standard library only; it does not download prices or depend on a broker.

From the repository root:

~~~bash
python textbook/volumes/dream_thater/応用系/U/U3-30/assets/ito_taylor_stability.py --paths 20000
python -m unittest discover -s textbook/volumes/dream_thater/応用系/U/U3-30/assets/tests
~~~

The first table simulates **coupled** endpoint errors for driftless GBM
$dS_t=\sigma S_t\,dW_t$ with S0=100, sigma=0.2, T=1 year. The same Brownian
increment is used for the exact, Euler--Maruyama, Milstein, and cubic Hermite
updates on each path; different paths use independent samples. Each row also
gives the analytically exact finite-step mean squared error. The estimated 標準誤差（Standard Error; SE）
reflects finite-path Monte Carlo noise. Four mesh sizes are evaluated.

The second table gives exact second-moment amplification factors for
$dX_t=-X_t\,dt+X_t\,dW_t$; it is *not* an extrapolation from noisy simulation.
All step sizes are in years. The boundary G=1 is not asymptotically stable.

Use the optional --csv FILE argument to export the convergence table for an
external scatter/log-log plot. No decorative SVG is needed: the two tables
show the numerical stability boundary directly. For additional plots, labels
must identify both method and mesh size (not use color alone).

Note: a finite sample does not prove the asymptotic strong order. The proof
uses the exact Gaussian moments in the chapter. Non-smooth option payoffs,
nonzero drift, and multidimensional/noncommutative noise are not covered by
this special-case higher-order claim.
