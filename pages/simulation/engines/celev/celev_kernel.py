"""CELEV8 Newton/variational numerical kernels (CPython and Pyodide).

Only standard Python. Units: G, masses, distance and time are explicit.
No softening; small separations raise instead of changing the force law.
A numerical candidate is not a proof of a periodic solution.
"""
import math

DISTANCE_FLOOR = 1e-4

def _finite(x):
    return isinstance(x, (float, int)) and math.isfinite(x)

def _check_points(points, masses):
    n = len(masses)
    if not 2 <= n <= 4 or len(points) != n:
        raise ValueError("2..4 particles required")
    if any(not _finite(m) or m <= 0 for m in masses):
        raise ValueError("masses must be positive and finite")
    if any(len(p) != 2 or any(not _finite(v) for v in p) for p in points):
        raise ValueError("positions must be finite planar coordinates")

def acceleration(positions, masses, gravitational_constant=1.0):
    """Return Newton acceleration. Uses symmetric pair forces."""
    _check_points(positions, masses)
    if not _finite(gravitational_constant) or gravitational_constant <= 0:
        raise ValueError("G must be positive")
    n = len(masses)
    a = [[0.0, 0.0] for _ in range(n)]
    for i in range(n):
        for j in range(i + 1, n):
            dx = positions[j][0] - positions[i][0]
            dy = positions[j][1] - positions[i][1]
            r2 = dx * dx + dy * dy
            if not math.isfinite(r2) or r2 <= DISTANCE_FLOOR ** 2:
                raise ValueError("collision guard: separation too small")
            scale = gravitational_constant / (r2 * math.sqrt(r2))
            for d, delta in enumerate((dx, dy)):
                a[i][d] += masses[j] * scale * delta
                a[j][d] -= masses[i] * scale * delta
    if any(not _finite(z) for v in a for z in v):
        raise ValueError("nonfinite acceleration")
    return a

def minimum_distance(positions):
    return min(math.dist(positions[i], positions[j])
               for i in range(len(positions)) for j in range(i + 1, len(positions)))

def diagnostics(state):
    p, v, m, G = state["positions"], state["velocities"], state["masses"], state["G"]
    _check_points(p, m)
    _check_points(v, m)
    energy = sum(0.5 * mi * (vi[0]**2 + vi[1]**2) for mi, vi in zip(m, v))
    for i in range(len(m)):
        for j in range(i + 1, len(m)):
            r = math.dist(p[i], p[j])
            if r <= DISTANCE_FLOOR:
                raise ValueError("collision guard")
            energy -= G * m[i] * m[j] / r
    total = sum(m)
    com = [sum(m[i] * p[i][d] for i in range(len(m))) / total for d in (0, 1)]
    momentum = [sum(m[i] * v[i][d] for i in range(len(m))) for d in (0, 1)]
    angular = sum(m[i] * (p[i][0]*v[i][1] - p[i][1]*v[i][0]) for i in range(len(m)))
    result = dict(energy=energy, centerOfMass=com, momentum=momentum,
                  angularMomentum=angular, minimumDistance=minimum_distance(p))
    if any(not _finite(z) for z in [energy, angular, *com, *momentum]):
        raise ValueError("nonfinite diagnostics")
    return result

def initialize(kind="figure-eight", dt=0.002, mass_scale=1.0, velocity_scale=1.0,
               gravitational_constant=1.0):
    if not all(_finite(x) and x > 0 for x in (dt, mass_scale, velocity_scale, gravitational_constant)):
        raise ValueError("positive finite parameters required")
    if dt > 0.05:
        raise ValueError("dt exceeds safe configured bound 0.05")
    G, m = gravitational_constant, mass_scale
    if kind == "two-body":
        p = [[-0.5, 0.0], [0.5, 0.0]]
        speed = math.sqrt(G * m / 2)
        v = [[0.0, -speed * velocity_scale], [0.0, speed * velocity_scale]]
        period = 2 * math.pi / math.sqrt(2 * G * m)
    elif kind == "triangle":
        R = 1.0
        omega = math.sqrt(G * m / (math.sqrt(3) * R**3))
        p = [[R*math.cos(k*2*math.pi/3), R*math.sin(k*2*math.pi/3)] for k in range(3)]
        v = [[-omega*y*velocity_scale, omega*x*velocity_scale] for x, y in p]
        period = 2*math.pi/omega
    elif kind == "figure-eight":
        if gravitational_constant != 1.0:
            # Correct scaling for G*m: positions fixed, velocities sqrt(G*m).
            pass
        x, y = -0.97000436, 0.24308753
        u, w = 0.93240737, 0.86473146
        speed = math.sqrt(G*m) * velocity_scale
        p = [[x, y], [-x, -y], [0.0, 0.0]]
        v = [[-u*speed/2, -w*speed/2], [-u*speed/2, -w*speed/2], [u*speed, w*speed]]
        period = 6.3259/math.sqrt(G*m)
    else:
        raise ValueError("unknown initial orbit")
    state = dict(positions=p, velocities=v, masses=[m]*len(p), G=G,
                 dt=dt, stepIndex=0, physicalTime=0.0, referencePeriod=period,
                 initialPositions=[row[:] for row in p], initialVelocities=[row[:] for row in v])
    state["initialEnergy"] = diagnostics(state)["energy"]
    return state

def verlet_step(state, dt=None):
    """Kick-drift-kick; returns a fresh state. dt remains fixed inside a run."""
    h = state["dt"] if dt is None else dt
    if not _finite(h) or h <= 0 or h > 0.05:
        raise ValueError("invalid integration step")
    old = state["positions"]
    a0 = acceleration(old, state["masses"], state["G"])
    p1 = [[old[i][d] + h*state["velocities"][i][d] + 0.5*h*h*a0[i][d]
           for d in range(2)] for i in range(len(old))]
    a1 = acceleration(p1, state["masses"], state["G"])
    v1 = [[state["velocities"][i][d] + 0.5*h*(a0[i][d]+a1[i][d])
           for d in range(2)] for i in range(len(old))]
    nxt = dict(state, positions=p1, velocities=v1, stepIndex=state["stepIndex"]+1)
    nxt["physicalTime"] = nxt["stepIndex"] * h
    diagnostics(nxt)
    return nxt

def integrate_batch(state, steps, sample_stride=None):
    if not isinstance(steps, int) or not 1 <= steps <= 1000:
        raise ValueError("batch steps out of range")
    stride = sample_stride or max(1, math.ceil(steps/25))
    if not isinstance(stride, int) or stride < 1:
        raise ValueError("invalid sample stride")
    current = state
    trace = []
    for k in range(1, steps+1):
        current = verlet_step(current)
        if k % stride == 0 or k == steps:
            trace.append(dict(positions=current["positions"], physicalTime=current["physicalTime"]))
    report = diagnostics(current)
    report["energyDrift"] = report["energy"] - current["initialEnergy"]
    report["closurePosition"] = max(math.dist(p, q) for p,q in
                                    zip(current["positions"], current["initialPositions"]))
    report["closureVelocity"] = max(math.dist(v, w) for v,w in
                                    zip(current["velocities"], current["initialVelocities"]))
    return dict(state=current, diagnostics=report, observations=trace)

def initial_path(N=60, amplitude_x=1.0, amplitude_y=0.35, phase=0.0):
    """Symmetric choreographic trial loop; not a Newton orbit."""
    if not isinstance(N,int) or N < 12 or N > 120 or N % 6:
        raise ValueError("N must be divisible by 6, in [12,120]")
    if not all(_finite(x) for x in (amplitude_x, amplitude_y, phase)):
        raise ValueError("nonfinite trial parameters")
    if not (0.1 <= abs(amplitude_x) <= 3 and 0.1 <= abs(amplitude_y) <= 3):
        raise ValueError("trial amplitudes out of range")
    gamma = [[amplitude_x*math.sin(2*math.pi*k/N + phase),
              amplitude_y*math.sin(4*math.pi*k/N + 2*phase)] for k in range(N)]
    p = [[gamma[(k+i*N//3)%N][:] for i in range(3)] for k in range(N)]
    return project_path(p)

def project_path(path):
    """Orthogonal projection onto 3-body choreography, COM=0, 8-like reflections.

    gamma(-t)=-gamma(t); gamma(t+T/2)=(-gamma_x(t),gamma_y(t)).
    These are imposed on the generator, *not* on a Newton solution.
    """
    N = len(path)
    if N < 12 or N % 6 or any(len(frame) != 3 for frame in path):
        raise ValueError("3-body path needs N multiple of 6")
    for frame in path:
        _check_points(frame, [1.0]*3)
    shift = N//3
    gamma = [[sum(path[(k-i*shift)%N][i][d] for i in range(3))/3
              for d in range(2)] for k in range(N)]
    odd = [[(gamma[k][d]-gamma[(-k)%N][d])/2 for d in range(2)] for k in range(N)]
    half = N//2
    shaped = [[(odd[k][0]-odd[(k+half)%N][0])/2,
               (odd[k][1]+odd[(k+half)%N][1])/2] for k in range(N)]
    cent = [[shaped[k][d] -
             sum(shaped[(k+i*shift)%N][d] for i in range(3))/3
             for d in range(2)] for k in range(N)]
    return [[cent[(k+i*shift)%N][:] for i in range(3)] for k in range(N)]

def _path_distance(frame):
    return minimum_distance(frame)

def action(path, T=6.3259, masses=(1.0, 1.0, 1.0), gravitational_constant=1.0):
    if not _finite(T) or T <= 0:
        raise ValueError("positive period needed")
    N, h = len(path), T/len(path)
    if N < 12 or N > 120:
        raise ValueError("grid size out of range")
    total = 0.0
    for k in range(N):
        p = path[k]
        _check_points(p, masses)
        for i, mi in enumerate(masses):
            total += mi*sum((path[(k+1)%N][i][d]-p[i][d])**2 for d in range(2))/(2*h)
        for i in range(len(masses)):
            for j in range(i+1, len(masses)):
                r = math.dist(p[i], p[j])
                if r <= DISTANCE_FLOOR:
                    raise ValueError("collision guard in discrete action")
                total += h * gravitational_constant*masses[i]*masses[j]/r
    if not _finite(total): raise ValueError("nonfinite discrete action")
    return total

def gradient(path, T=6.3259, masses=(1.0,1.0,1.0), gravitational_constant=1.0):
    N, h = len(path), T/len(path)
    out = []
    for k in range(N):
        a = acceleration(path[k], masses, gravitational_constant)
        out.append([[masses[i]*(2*path[k][i][d]-path[(k-1)%N][i][d]-
                        path[(k+1)%N][i][d])/h + h*masses[i]*a[i][d]
                     for d in range(2)] for i in range(len(masses))])
    return out

def max_constraint_violation(path):
    projected = project_path(path)
    return max(abs(path[k][i][d]-projected[k][i][d])
               for k in range(len(path)) for i in range(3) for d in range(2))

def discrete_newton_residual(path, T=6.3259):
    N, h = len(path), T/len(path)
    biggest = 0.0
    for k, p in enumerate(path):
        a = acceleration(p, [1.0]*3)
        for i in range(3):
            diff = [(path[(k+1)%N][i][d]-2*p[i][d]+path[(k-1)%N][i][d])/(h*h)-a[i][d]
                    for d in range(2)]
            biggest = max(biggest, math.hypot(*diff))
    return biggest

def optimize_batch(path, T=6.3259, iterations=10):
    if not isinstance(iterations,int) or not 1 <= iterations <= 30:
        raise ValueError("iterations must be in 1..30")
    if max_constraint_violation(path) > 1e-7:
        raise ValueError("initial path violates symmetric constraints")
    N, h = len(path), T/len(path)
    current = [[p[:] for p in frame] for frame in path]
    history = []
    for it in range(iterations):
        g = project_path(gradient(current, T))
        g2 = sum(v*v for frame in g for point in frame for v in point)
        before = action(current, T)
        alpha = h/6.0
        accepted = False
        for trial in range(24):
            next_path = project_path([[[current[k][i][d]-alpha*g[k][i][d] for d in range(2)]
                                       for i in range(3)] for k in range(N)])
            try:
                after = action(next_path, T)
                if after <= before - 1e-4*alpha*g2:
                    accepted = True
                    break
            except ValueError:
                pass
            alpha *= 0.5
        if not accepted:
            history.append(dict(iteration=it, action=before, projectedGradientNorm=math.sqrt(g2),
                                minimumDistance=min(_path_distance(f) for f in current),
                                accepted=False))
            break
        current = next_path
        history.append(dict(iteration=it+1, action=after, projectedGradientNorm=math.sqrt(g2),
                            minimumDistance=min(_path_distance(f) for f in current),
                            accepted=True))
        if g2 < 1e-12:
            break
    return dict(path=current, history=history, action=action(current,T),
                projectedGradientNorm=math.sqrt(sum(v*v for f in project_path(gradient(current,T))
                                                   for p in f for v in p)),
                constraintViolation=max_constraint_violation(current),
                minimumDistance=min(_path_distance(f) for f in current),
                newtonResidual=discrete_newton_residual(current,T))

def candidate_initial_state(path, T=6.3259):
    """Estimate IVP data; separate Newton integration must verify closure."""
    h = T/len(path)
    velocity = [[(path[1][i][d]-path[-1][i][d])/(2*h) for d in range(2)]
                for i in range(3)]
    st = dict(positions=[p[:] for p in path[0]], velocities=velocity,
              masses=[1.0]*3, G=1.0, dt=min(h/16,0.01),
              stepIndex=0, physicalTime=0.0, referencePeriod=T,
              initialPositions=[p[:] for p in path[0]], initialVelocities=[p[:] for p in velocity])
    st["initialEnergy"] = diagnostics(st)["energy"]
    return st
