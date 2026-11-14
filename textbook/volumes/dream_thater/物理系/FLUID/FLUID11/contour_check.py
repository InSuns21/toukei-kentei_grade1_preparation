"""FLUID11: pure-stdlib contour samples and finite-difference checks."""
import argparse
import math


def field(a, x, y):
    return a * x, -a * y


def phi(a, x, y):
    return 0.5 * a * (x*x - y*y)


def psi(a, x, y):
    return a * x * y


def contour_segments(function, level, a, step):
    """Marching squares: count each cell's contour-edge intersections.

    Ambiguous 4-edge cases contribute two segments. This is a sample of the
    contour geometry, not a certification of contour topology.
    """
    n = round(4 / step)
    xs = [-2 + 4*i/n for i in range(n + 1)]
    count = 0
    samples = []
    for i in range(n):
        for j in range(n):
            corners = [
                (xs[i], xs[j]), (xs[i+1], xs[j]),
                (xs[i+1], xs[j+1]), (xs[i], xs[j+1]),
            ]
            values = [function(a, x, y) - level for x, y in corners]
            # Half-open sign convention avoids double counting at grid vertices.
            intersections = []
            for k in range(4):
                h = (k+1) % 4
                if (values[k] < 0) != (values[h] < 0):
                    w = -values[k] / (values[h] - values[k])
                    x1, y1 = corners[k]
                    x2, y2 = corners[h]
                    intersections.append((x1+w*(x2-x1), y1+w*(y2-y1)))
            count += len(intersections) // 2
            if len(intersections) >= 2 and len(samples) < 3:
                samples.append(tuple(round(v, 5) for xy in intersections[:2] for v in xy))
    return count, samples


def derivatives(a, x, y, h):
    uxp, _ = field(a, x+h, y)
    uxm, _ = field(a, x-h, y)
    _, uyp = field(a, x, y+h)
    _, uym = field(a, x, y-h)
    uxyp, _ = field(a, x, y+h)
    uxym, _ = field(a, x, y-h)
    _, uyxp = field(a, x+h, y)
    _, uyxm = field(a, x-h, y)
    div = (uxp-uxm+uyp-uym)/(2*h)
    curl = (uyxp-uyxm-uxyp+uxym)/(2*h)
    phi_x = (phi(a, x+h, y)-phi(a, x-h, y))/(2*h)
    phi_y = (phi(a, x, y+h)-phi(a, x, y-h))/(2*h)
    psi_x = (psi(a, x+h, y)-psi(a, x-h, y))/(2*h)
    psi_y = (psi(a, x, y+h)-psi(a, x, y-h))/(2*h)
    cr = max(abs(phi_x-psi_y), abs(phi_y+psi_x))
    return abs(div), abs(curl), cr



def draw_contours(a, step):
    """Plot numerical potential/stream contours; browser captures open figures.

    This plot is a visualization of the same phi/psi functions used by the
    standard-library quadrature and finite-difference checks, not a solver.
    """
    import numpy as np
    import matplotlib.pyplot as plt
    from matplotlib.lines import Line2D

    n = round(4.0 / step)
    coordinates = np.linspace(-2.0, 2.0, n + 1)
    xx, yy = np.meshgrid(coordinates, coordinates)
    levels = a * np.array((-1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5))

    figure, axes = plt.subplots(figsize=(7.2, 6.0))
    axes.contour(xx, yy, phi(a, xx, yy), levels=levels,
                 colors="#2563eb", linestyles="dashed", linewidths=1.3)
    axes.contour(xx, yy, psi(a, xx, yy), levels=levels,
                 colors="#b45309", linestyles="solid", linewidths=1.3)

    # Use a sparse vector field to show that velocity follows psi contours.
    arrows = np.linspace(-1.6, 1.6, 7)
    axx, ayy = np.meshgrid(arrows, arrows)
    ux, uy = field(a, axx, ayy)
    axes.quiver(axx, ayy, ux, uy, color="#374151", alpha=0.65,
                angles="xy", scale_units="xy", scale=6.5 * a, width=0.004)
    axes.scatter([0], [0], color="black", s=25, zorder=5)

    axes.legend(handles=[
        Line2D([0], [0], color="#2563eb", linestyle="--",
               label="potential phi = constant"),
        Line2D([0], [0], color="#b45309", linestyle="-",
               label="stream function psi = constant"),
        Line2D([0], [0], color="#374151", marker=">",
               linestyle="None", label="velocity direction"),
    ], loc="upper right", fontsize=8)
    axes.set(xlabel="x", ylabel="y", title="Stagnation-point flow: a = " + str(a))
    axes.set_aspect("equal", adjustable="box")
    axes.set_xlim(-2, 2)
    axes.set_ylim(-2, 2)
    axes.grid(alpha=0.15)
    figure.tight_layout()
    # Do not call pyplot.show(): the Pyodide worker captures open figures.


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--a", type=float, default=1.0)
    parser.add_argument("--step", type=float, default=0.2)
    parser.add_argument("--plot", action="store_true",
                        help="also draw stream/potential contours (needs numpy and matplotlib)")
    args = parser.parse_args()
    if not math.isfinite(args.a) or args.a <= 0 or not 0.02 <= args.step <= 0.5:
        parser.error("a must be finite and positive; step must be in [0.02, 0.5]")
    h = args.step
    errors = [derivatives(args.a, x, y, h)
              for x, y in ((0.3, 0.7), (-1.2, 0.4), (0.0, 0.0))]
    print("a=", args.a, "step=", h)
    print("max_div=", max(v[0] for v in errors))
    print("max_curl=", max(v[1] for v in errors))
    print("max_cr=", max(v[2] for v in errors))
    for label, fn in (("potential", phi), ("stream", psi)):
        for level in (-0.5, 0.0, 0.5):
            count, samples = contour_segments(fn, level, args.a, h)
            print(label + "_segments", "level=", level, "count=", count)
            print("sample_intersections", samples[:2])
    if args.plot:
        draw_contours(args.a, args.step)


if __name__ == "__main__":
    main()
