// Independent CPU reference for FCG1, NOT imported by the editable tracer script.
// Units: x,y meters; t and dt seconds; U=1 m/s, angular frequency=1 s^-1.
export function referencePoint(mode, initial, time) {
  const [x, y] = initial;
  if (mode === 'rotation') {
    return [x * Math.cos(time) - y * Math.sin(time),
      x * Math.sin(time) + y * Math.cos(time)];
  }
  if (mode === 'steady')
    return [x + time, y + x * time + time * time / 2];
  if (mode === 'unsteady')
    return [x + time, y + x * time * time / 2 + time * time * time / 3];
  throw new RangeError('unknown mode');
}
export function eulerReference(mode, initial, dt, steps) {
  if (!Number.isInteger(steps) || steps < 0 || steps > 200 ||
    !(dt > 0 && dt <= 0.25)) throw new RangeError('invalid grid');
  const [x0, y0] = initial;
  const n = steps, h = dt;
  if (mode === 'rotation') {
    // Exact power of 1+i*h is the discrete Euler update, not the physical flow.
    const scale = Math.pow(1 + h * h, n / 2);
    const phase = n * Math.atan(h);
    return [scale * (x0 * Math.cos(phase) - y0 * Math.sin(phase)),
      scale * (x0 * Math.sin(phase) + y0 * Math.cos(phase))];
  }
  if (mode === 'steady') {
    return [x0 + n * h,
      y0 + n * h * x0 + h * h * n * (n - 1) / 2];
  }
  if (mode === 'unsteady') {
    return [x0 + n * h,
      y0 + x0 * h * h * n * (n - 1) / 2 +
      h * h * h * n * (n - 1) * (2 * n - 1) / 6];
  }
  throw new RangeError('unknown mode');
}
export function compareTracerSnapshot(mode, dt, payload) {
  const initial = mode === 'rotation' ? [[1, 0], [0, 1]] :
    [[0, 0], [0, 0.5]];
  if (!payload || !Number.isInteger(payload.steps) || payload.steps < 0 ||
    payload.steps > 200 || Math.abs(payload.time - payload.steps * dt) > 1e-8 ||
    !Array.isArray(payload.particles) || payload.particles.length !== 2)
    throw new Error('不正な数値診断');
  return payload.particles.map((p, i) => {
    if (!p || p.id !== i + 1 || !Array.isArray(p.position) ||
      p.position.length !== 2 || !p.position.every(Number.isFinite))
      throw new Error('粒子IDまたは座標が不正です');
    const expected = eulerReference(mode, initial[i], dt, payload.steps);
    const strictError = Math.hypot(p.position[0] - expected[0],
      p.position[1] - expected[1]);
    const exact = referencePoint(mode, initial[i], payload.time);
    const physicalError = Math.hypot(p.position[0] - exact[0],
      p.position[1] - exact[1]);
    return {id: p.id, point: p.position, expected, exact,
      strictError, physicalError, pass: strictError < 1e-8};
  });
}
