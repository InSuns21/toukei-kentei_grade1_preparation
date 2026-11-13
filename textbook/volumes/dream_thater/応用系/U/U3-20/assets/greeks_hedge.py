"""U3-20: Black-Scholes Greeks and one-day discrete hedge, Python >=3.10.

All rates are continuously compounded per year. No external packages/data.
The scenario z fixes one Brownian increment; q*delta*S*dt approximates
the continuous dividend received by a *fixed* hedge over the step.
"""
from __future__ import annotations
import math

def check(s: float, k: float, r: float, q: float, sigma: float, tau: float) -> None:
    if not all(math.isfinite(v) for v in (s, k, r, q, sigma, tau)):
        raise ValueError("parameters must be finite")
    if s <= 0 or k <= 0 or sigma <= 0 or tau <= 0 or q < 0:
        raise ValueError("need s,k,sigma,tau>0 and q>=0")

def phi(x: float) -> float:
    return math.exp(-x*x/2) / math.sqrt(2*math.pi)

def Phi(x: float) -> float:
    return math.erfc(-x/math.sqrt(2))/2

def indices(s: float, k: float, r: float, q: float, sigma: float, tau: float):
    check(s,k,r,q,sigma,tau)
    a = sigma*math.sqrt(tau)
    d1 = (math.log(s/k)+(r-q+sigma*sigma/2)*tau)/a
    return d1,d1-a

def prices(s: float, k: float, r: float, q: float, sigma: float, tau: float):
    d1,d2 = indices(s,k,r,q,sigma,tau)
    a,b = math.exp(-q*tau),math.exp(-r*tau)
    return (s*a*Phi(d1)-k*b*Phi(d2),
            k*b*Phi(-d2)-s*a*Phi(-d1))

def greeks(s: float, k: float, r: float, q: float, sigma: float, tau: float):
    """Return (call, put) dictionaries: delta, gamma, vega, theta, rho."""
    d1,d2 = indices(s,k,r,q,sigma,tau)
    a,b = math.exp(-q*tau),math.exp(-r*tau)
    common = s*a*phi(d1)
    gamma = common/(s*s*sigma*math.sqrt(tau))
    vega = common*math.sqrt(tau)
    theta_common = -common*sigma/(2*math.sqrt(tau))
    call = dict(delta=a*Phi(d1),gamma=gamma,vega=vega,
                theta=theta_common+q*s*a*Phi(d1)-r*k*b*Phi(d2),
                rho=k*tau*b*Phi(d2),
                dividend_sensitivity=-tau*s*a*Phi(d1))
    put = dict(delta=-a*Phi(-d1),gamma=gamma,vega=vega,
               theta=theta_common-q*s*a*Phi(-d1)+r*k*b*Phi(-d2),
               rho=-k*tau*b*Phi(-d2),
               dividend_sensitivity=tau*s*a*Phi(-d1))
    return call,put

def centered(f, x: float, h: float):
    if h<=0 or x-h<=0:
        raise ValueError("central difference requires positive h and x-h")
    return (f(x+h)-f(x-h))/(2*h)

def centered_second(f, x: float, h: float):
    if h<=0 or x-h<=0:
        raise ValueError("central difference requires positive h and x-h")
    return (f(x+h)-2*f(x)+f(x-h))/(h*h)

def finite_difference(s: float=100, k: float=100, r: float=.05,
                      q: float=.02, sigma: float=.2, tau: float=1,
                      hs: float=.5, hv: float=.005, hr: float=.0001):
    """Central differences without importing the analytic Greek expressions."""
    check(s,k,r,q,sigma,tau)
    f=lambda x:prices(x,k,r,q,sigma,tau)[0]
    g=lambda x:prices(s,k,r,q,x,tau)[0]
    v=lambda x:prices(s,k,x,q,sigma,tau)[0]
    # Theta is dC/dt at fixed maturity: -dC/dtau.
    t=lambda x:prices(s,k,r,q,sigma,x)[0]
    return dict(delta=centered(f,s,hs),gamma=centered_second(f,s,hs),
                vega=centered(g,sigma,hv),rho=(v(r+hr)-v(r-hr))/(2*hr),
                theta=-centered(t,tau,1/252))

def one_step(s: float=100, k: float=100, r: float=.05, q: float=.02,
             sigma: float=.2, tau: float=1, dt: float=1/252, z: float=0):
    """Short call; buy delta shares and invest residual cash (no transaction fee).

    Realized Q-model endpoint is used only to generate an illustrative scenario.
    Dividend on a fixed share holding is q*delta*s*dt (left-point rule),
    not exact continuous-path integration. No prediction under physical P.
    """
    check(s,k,r,q,sigma,tau)
    if not (math.isfinite(z) and math.isfinite(dt) and 0<dt<tau):
        raise ValueError("need finite z and 0<dt<tau")
    c0=prices(s,k,r,q,sigma,tau)[0]
    greek=greeks(s,k,r,q,sigma,tau)[0]
    delta=greek["delta"]
    cash=c0-delta*s
    s1=s*math.exp((r-q-sigma*sigma/2)*dt+sigma*math.sqrt(dt)*z)
    c1=prices(s1,k,r,q,sigma,tau-dt)[0]
    interest=cash*math.expm1(r*dt)
    dividends=delta*q*s*dt
    # Short option + long hedge + cash: initial net wealth is zero.
    pnl=delta*(s1-s)+interest+dividends-(c1-c0)
    approx=.5*greek["gamma"]*sigma*sigma*s*s*dt*(1-z*z)
    return dict(z=z, s1=s1, c1=c1, delta=delta, cash0=cash,
                interest=interest, dividends=dividends,
                pnl=pnl, leading=approx, difference=pnl-approx)

def main() -> None:
    args=(100.,100.,.05,.02,.2,1.)
    c,p=prices(*args)
    g,_=greeks(*args)
    fd=finite_difference()
    print("U3-20: s=K=100 yen, r=.05, q=.02, sigma=.20, tau=1 year")
    print(f"call={c:.9f} put={p:.9f} parity residual={c-p-100*math.exp(-.02)+100*math.exp(-.05):+.3e}")
    for key in ("delta","gamma","vega","theta","rho"):
        print(f"{key:6s}: analytic={g[key]:+.9f} central={fd[key]:+.9f} error={fd[key]-g[key]:+.3e}")
    print("one-day fixed-delta short-call P&L; left-point dividend rule")
    for z in (0.,1.,2.):
        result=one_step(z=z)
        print(f" z={z:.0f} S_next={result['s1']:.8f} "
              f"pnl={result['pnl']:+.9f} gamma-theta={result['leading']:+.9f}")
    assert abs(c-p-100*math.exp(-.02)+100*math.exp(-.05)) < 1e-10
    assert abs(g["delta"]-fd["delta"]) < 1e-4
    assert abs(g["gamma"]-fd["gamma"]) < 1e-5
    assert abs(g["vega"]-fd["vega"]) < 1e-2
    assert abs(g["theta"]-fd["theta"]) < 1e-2
    assert abs(g["rho"]-fd["rho"]) < 1e-4
if __name__=="__main__":
    main()
