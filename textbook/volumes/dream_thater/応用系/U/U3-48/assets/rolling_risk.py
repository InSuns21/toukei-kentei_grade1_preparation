import argparse
import math
import random

parser = argparse.ArgumentParser()
parser.add_argument("--window", type=int, default=40)
parser.add_argument("--alpha", type=float, default=0.90)
parser.add_argument("--plot", action="store_true")
args = parser.parse_args()
if not (10 <= args.window <= 180) or not (0.5 <= args.alpha < 1.0):
    raise ValueError("10 <= window <= 180 and 0.5 <= alpha < 1 required")

def risk(values, alpha):
    x = sorted(values)
    n = len(x)
    k = math.ceil(n * alpha) - 1
    r = n * (1 - alpha)
    m = math.floor(r)
    theta = r - m
    tail = sum(x[n-m:]) if m else 0.0
    return x[k], (tail + theta*x[n-m-1]) / r

rng = random.Random(483)
returns = [rng.gauss(0, 1 if s < 120 else 2.5) for s in range(240)]
# Before the evaluation begins, fix the EWMA coefficient and initial
# forecast variance from the first 20 observations (training period).
rho = 0.94
v = sum(z*z for z in returns[:20]) / 20
# Past day 19 is the final training observation. The first genuinely
# forward-looking variance prediction is for day 20 (zero-based).
variances = [None] * 20 + [v]
for s in range(20, len(returns)):
    # variances[s] uses only observations strictly before day s.
    v = rho*v + (1-rho)*returns[s]**2
    variances.append(v)

# Every selected historical day must be outside the training prefix;
# otherwise its "ex ante" volatility would be fitted with future data.
start = 20 + args.window
dates, realized, hs_var, fhs_var, hs_es, fhs_es = [], [], [], [], [], []
for t in range(start, len(returns)-1):
    # returns[:t+1] is known after observing day t;
    # returns[t+1] must never enter the forecast.
    historical = returns[t-args.window+1:t+1]
    losses = [-z for z in historical]
    hs_q, hs_e = risk(losses, args.alpha)
    future_vol = math.sqrt(variances[t+1])
    filtered = [-z*future_vol/math.sqrt(variances[s])
                for s, z in zip(range(t-args.window+1, t+1), historical)]
    fhs_q, fhs_e = risk(filtered, args.alpha)
    dates.append(t+1)
    realized.append(-returns[t+1])
    hs_var.append(hs_q)
    fhs_var.append(fhs_q)
    hs_es.append(hs_e)
    fhs_es.append(fhs_e)

def summarize(label, q, es):
    count = sum(y > z for y, z in zip(realized, q))
    print(f"{label}: samples={len(q)}, VaR violations={count}, "
          f"rate={count/len(q):.3f}, mean VaR={sum(q)/len(q):.3f}, "
          f"mean ES={sum(es)/len(es):.3f}")
summarize("HS ", hs_var, hs_es)
summarize("FHS", fhs_var, fhs_es)
print(f"target violation rate={1-args.alpha:.3f} "
      "(sample rates fluctuate; no automatic superiority claim)")

if args.plot:
    try:
        import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(9, 3.8))
        ax.plot(dates, realized, color="gray", lw=0.9, alpha=0.65,
                label="next-day realized loss")
        ax.plot(dates, hs_var, color="tab:blue", lw=1.4,
                label="HS VaR")
        ax.plot(dates, fhs_var, color="tab:orange", lw=1.4, ls="--",
                label="FHS VaR")
        ax.axvline(120, color="black", ls=":", alpha=0.5,
                   label="simulation volatility switch")
        ax.set(xlabel="day index", ylabel="loss / VaR (arbitrary units)",
               title="Rolling one-step-ahead risk forecasts")
        ax.legend(loc="upper left", fontsize=8)
        fig.tight_layout()
        plt.show()
    except ImportError:
        print("matplotlib unavailable: numeric results shown above")
