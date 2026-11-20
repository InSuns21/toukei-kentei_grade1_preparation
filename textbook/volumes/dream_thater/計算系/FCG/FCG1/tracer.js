/*
 * FCG1: independent editable CPU/Canvas2D tracer experiment.
 * Implement createLab(canvas, settings, emit) and return {step, reset, snapshot}.
 * The code runs only in a sandboxed child iframe, not in the host page.
 */
function createLab(canvas, settings, emit) {
  'use strict';
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas2Dを利用できません');
  const mode = settings.mode;            // rotation | steady | unsteady
  const h = settings.dt;                // physical seconds, NOT rendering frame duration
  const omega = 1;                     // s^-1
  const U = 1;                         // m/s
  const shear = 1;                     // s^-1
  const shearRate = 1;                 // s^-2
  let time = 0;
  let steps = 0;
  let particles = [];

  function velocity(point, physicalTime) {
    const x = point[0], y = point[1];
    if (mode === 'rotation') return [-omega * y, omega * x];
    if (mode === 'steady') return [U, shear * x];
    if (mode === 'unsteady') return [U, shearRate * physicalTime * x];
    throw new Error('不明な速度場');
  }
  function initialState() {
    return mode === 'rotation'
      ? [{id: 1, start: [1, 0]}, {id: 2, start: [0, 1]}]
      : [{id: 1, start: [0, 0]}, {id: 2, start: [0, 0.5]}];
  }
  function exact(start, t) {
    const x = start[0], y = start[1];
    if (mode === 'rotation') {
      return [
        x * Math.cos(omega * t) - y * Math.sin(omega * t),
        x * Math.sin(omega * t) + y * Math.cos(omega * t)
      ];
    }
    if (mode === 'steady')
      return [x + U * t, y + shear * (x * t + U * t * t / 2)];
    return [x + U * t,
      y + shearRate * (x * t * t / 2 + U * t * t * t / 3)];
  }
  function euler(position, physicalTime) {
    const v = velocity(position, physicalTime);
    return [position[0] + h * v[0], position[1] + h * v[1]];
  }
  function snapshot() {
    return {
      time, steps, mode, dt: h,
      // Report the actual editable drawing viewport and buffer, not a host-side copy.
      view: {...view}, canvasWidth: canvas.width, canvasHeight: canvas.height,
      particles: particles.map(p => {
        const reference = exact(p.start, time);
        const difference = Math.hypot(p.position[0] - reference[0],
          p.position[1] - reference[1]);
        return {id: p.id, position: p.position.slice(), exact: reference,
          error: difference, radius: Math.hypot(...p.position)};
      })
    };
  }
  const view = mode === 'rotation'
    ? {left: -2.4, right: 2.4, bottom: -2.1, top: 2.1}
    : {left: -0.6, right: 3.1, bottom: -1.2, top: 4.5};
  const W = canvas.width, H = canvas.height;
  const xPixel = x => 48 + (x - view.left) / (view.right - view.left) * (W - 70);
  const yPixel = y => H - 35 - (y - view.bottom) / (view.top - view.bottom) * (H - 64);

  function path(points, color, dash, width) {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(xPixel(points[0][0]), yPixel(points[0][1]));
    for (let j = 1; j < points.length; j++)
      ctx.lineTo(xPixel(points[j][0]), yPixel(points[j][1]));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  function frozenSamples(position, observationTime) {
    // The auxiliary increments change sigma; NEVER increment observationTime.
    const delta = 0.025;
    const halfCount = 100;
    const left = [], right = [];
    let p = position.slice();
    for (let j = 0; j < halfCount; j++) {
      left.push(p.slice());
      const v = velocity(p, observationTime);
      p = [p[0] - delta * v[0], p[1] - delta * v[1]];
    }
    p = position.slice();
    for (let j = 0; j < halfCount; j++) {
      right.push(p.slice());
      const v = velocity(p, observationTime);
      p = [p[0] + delta * v[0], p[1] + delta * v[1]];
    }
    return left.reverse().concat(right);
  }
  function arrow(x, y, vx, vy) {
    const length = Math.hypot(vx, vy);
    if (length < 1e-12) return;
    const scale = 0.24 / length;
    const tipX = x + vx * scale, tipY = y + vy * scale;
    const px = -vy / length, py = vx / length;
    ctx.beginPath();
    ctx.moveTo(xPixel(x), yPixel(y));
    ctx.lineTo(xPixel(tipX), yPixel(tipY));
    ctx.moveTo(xPixel(tipX - 0.07 * vx / length + 0.04 * px),
      yPixel(tipY - 0.07 * vy / length + 0.04 * py));
    ctx.lineTo(xPixel(tipX), yPixel(tipY));
    ctx.lineTo(xPixel(tipX - 0.07 * vx / length - 0.04 * px),
      yPixel(tipY - 0.07 * vy / length - 0.04 * py));
    ctx.strokeStyle = '#526273';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    ctx.font = '12px sans-serif';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#dee5ec';
    ctx.fillStyle = '#44546a';
    for (let x = Math.ceil(view.left); x <= Math.floor(view.right); x++) {
      path([[x, view.bottom], [x, view.top]], '#e2e8f0', [], 1);
      ctx.fillText(String(x), xPixel(x) - 4, H - 12);
    }
    for (let y = Math.ceil(view.bottom); y <= Math.floor(view.top); y++) {
      path([[view.left, y], [view.right, y]], '#e2e8f0', [], 1);
      ctx.fillText(String(y), 8, yPixel(y) + 4);
    }
    ctx.fillStyle = '#34495e';
    ctx.fillText('x [m]', W - 45, H - 12);
    ctx.fillText('y [m]', 7, 14);
    for (const x of (mode === 'rotation' ? [-1.5, -0.5, 0.5, 1.5] : [0, 1, 2])) {
      for (const y of (mode === 'rotation' ? [-1.5, -0.5, 0.5, 1.5] : [-0.5, 0.7, 2])) {
        const v = velocity([x, y], time);
        arrow(x, y, v[0], v[1]);
      }
    }
    // Use a strict, separate oracle for the exact path. This is not a PDE solution.
    for (const p of particles) {
      const exactCurve = [];
      for (let j = 0; j <= 100; j++)
        exactCurve.push(exact(p.start, time * j / 100));
      path(exactCurve, '#666666', [7, 5], 2);
    }
    // Frozen streamline through the EXACT current position of ID1.
    // This isolates the two-curve concept from Euler's position error.
    path(frozenSamples(exact(particles[0].start, time), time), '#2563a4', [2, 4], 2.5);
    const colors = ['#a83232', '#1c8055'];
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      path(p.history, colors[i], [], 2.6);
      ctx.beginPath();
      ctx.arc(xPixel(p.position[0]), yPixel(p.position[1]), 4.5, 0, 2 * Math.PI);
      ctx.fillStyle = colors[i]; ctx.fill();
      ctx.fillText('ID' + p.id, xPixel(p.position[0]) + 6,
        yPixel(p.position[1]) - 5);
    }
    ctx.fillStyle = '#28374e';
    ctx.fillText('実線=数値流跡 / 点線=凍結流線 / 破線=解析流跡', 56, 20);
    ctx.fillText('物理時刻 ' + time.toFixed(3) + ' s, ' + steps + ' steps', 56, 36);
  }
  function reset() {
    time = 0; steps = 0;
    particles = initialState().map(record => ({
      id: record.id, start: record.start.slice(),
      position: record.start.slice(), history: [record.start.slice()]
    }));
    draw();
    emit(snapshot());
  }
  function step() {
    if (time + h > 2.5 + 1e-10) return false;
    const oldTime = time;
    for (const p of particles) {
      const next = euler(p.position, oldTime);
      if (next.some(value => !Number.isFinite(value) || Math.abs(value) > 100000))
        throw new Error('非有限・過大な粒子位置を検出したため停止します');
      p.position = next;
      p.history.push(next.slice());
    }
    steps += 1;
    time = steps * h;
    draw();
    emit(snapshot());
    return true;
  }
  reset();
  return {step, reset, snapshot};
}
