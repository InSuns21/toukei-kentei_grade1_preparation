// Independent WebGL2 rendering of synthetic *unit* ENU sight lines.
// This is a shaded local direction hemisphere, not an orbit/ephemeris model.
const DEG = Math.PI / 180;
const W = 720, H = 470, CX = 360, CY = 270, R = 195;
const VS = `#version 300 es
precision highp float;
in vec3 position;
in vec3 normal;
in vec4 color;
uniform mat4 viewProjection;
out vec3 vNormal;
out vec4 vColor;
void main() {
  gl_Position = viewProjection * vec4(position, 1.0);
  vNormal = normal;
  vColor = color;
}`;
const FS = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec4 vColor;
uniform float lit;
out vec4 outColor;
void main() {
  vec3 n = normalize(vNormal);
  vec3 lightDirection = normalize(vec3(-0.48, 0.36, 0.80));
  float diffuse = max(dot(n, lightDirection), 0.0);
  float shade = mix(1.0, 0.40 + 0.58 * diffuse, lit);
  float highlight = lit * pow(max(dot(n, normalize(vec3(-0.24, 0.18, 0.96))), 0.0), 22.0);
  outColor = vec4(min(vec3(1.0), vColor.rgb * shade + highlight * 0.19), vColor.a);
}`;

const add = (out, p, n, c) => out.push(...p, ...n, ...c);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const plus = (a, b) => a.map((v, i) => v + b[i]);
const times = (a, scale) => a.map(v => v * scale);
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const unit = v => times(v, 1 / Math.hypot(...v));
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const direction = sat => {
  const a = sat.azimuth * DEG, e = sat.elevation * DEG;
  return [Math.sin(a) * Math.cos(e), Math.cos(a) * Math.cos(e), Math.sin(e)];
};
function disk(out, x, y, z, radius, centerColor, edgeColor, segments = 64) {
  const center = [x, y, z], normal = [0, 0, 1];
  for (let i = 0; i < segments; i++) {
    const a = 2 * Math.PI * i / segments, b = 2 * Math.PI * (i + 1) / segments;
    const p = [x + radius * Math.cos(a), y + radius * Math.sin(a), z];
    const q = [x + radius * Math.cos(b), y + radius * Math.sin(b), z];
    add(out, center, normal, centerColor);
    add(out, p, normal, edgeColor);
    add(out, q, normal, edgeColor);
  }
}
function sphere(out, center, radius, color) {
  const rings = 12, segments = 24;
  const vertex = (polar, az) => {
    const n = [Math.sin(polar) * Math.cos(az),
      Math.sin(polar) * Math.sin(az), Math.cos(polar)];
    return { pos: plus(center, times(n, radius)), n };
  };
  for (let i = 0; i < rings; i++) {
    const t0 = Math.PI * i / rings, t1 = Math.PI * (i + 1) / rings;
    for (let j = 0; j < segments; j++) {
      const a0 = 2 * Math.PI * j / segments, a1 = 2 * Math.PI * (j + 1) / segments;
      const p = vertex(t0, a0), q = vertex(t1, a0);
      const r = vertex(t1, a1), s = vertex(t0, a1);
      for (const v of [p, q, r, p, r, s]) add(out, v.pos, v.n, color);
    }
  }
}
function rod(out, start, end, radius, color) {
  const axis = sub(end, start), len = Math.hypot(...axis);
  if (len < 1e-6) return;
  const dir = times(axis, 1 / len);
  const base = unit(cross(dir, Math.abs(dir[2]) > 0.92 ? [0, 1, 0] : [0, 0, 1]));
  const other = cross(dir, base), segments = 9;
  for (let i = 0; i < segments; i++) {
    const a = 2 * Math.PI * i / segments, b = 2 * Math.PI * (i + 1) / segments;
    const n1 = plus(times(base, Math.cos(a)), times(other, Math.sin(a)));
    const n2 = plus(times(base, Math.cos(b)), times(other, Math.sin(b)));
    const v1 = plus(start, times(n1, radius)), v2 = plus(start, times(n2, radius));
    const v3 = plus(end, times(n2, radius)), v4 = plus(end, times(n1, radius));
    for (const [p, n] of [[v1, n1], [v2, n2], [v3, n2],
      [v1, n1], [v3, n2], [v4, n1]]) add(out, p, n, color);
  }
}
function line(out, a, b, color) {
  add(out, a, [0, 0, 1], color); add(out, b, [0, 0, 1], color);
}
function ring(out, elevation, color) {
  const e = elevation * DEG;
  for (let i = 0; i < 120; i++) {
    const a = 2 * Math.PI * i / 120, b = 2 * Math.PI * (i + 1) / 120;
    const p = t => [Math.cos(e) * Math.sin(t), Math.cos(e) * Math.cos(t),
      Math.sin(e) + (elevation === 0 ? 0.018 : 0)];
    line(out, p(a), p(b), color);
  }
}
function camera(yawDegrees, tiltDegrees) {
  const yaw = yawDegrees * DEG, tilt = tiltDegrees * DEG;
  const right = [Math.cos(yaw), -Math.sin(yaw), 0];
  const up = [Math.sin(tilt) * Math.sin(yaw), Math.sin(tilt) * Math.cos(yaw),
    Math.cos(tilt)];
  const towardViewer = cross(right, up);
  const sx = 2 * R / W, sy = 2 * R / H;
  // Column-major orthographic clip-space transform. Z is negative nearer camera.
  const matrix = new Float32Array([
    sx * right[0], sy * up[0], -towardViewer[0] / 2, 0,
    sx * right[1], sy * up[1], -towardViewer[1] / 2, 0,
    sx * right[2], sy * up[2], -towardViewer[2] / 2, 0,
    2 * CX / W - 1, 1 - 2 * CY / H, 0, 1,
  ]);
  const project = p => ({
    x: CX + R * dot(right, p),
    y: CY - R * dot(up, p),
    depth: dot(towardViewer, p),
  });
  return { matrix, project };
}
function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error('GNSS shader: ' + gl.getShaderInfoLog(shader));
  }
  return shader;
}

export function createGnssSpaceRenderer(canvas, labelsCanvas) {
  const gl = canvas.getContext?.('webgl2', { antialias: true, alpha: false,
    depth: true, preserveDrawingBuffer: true });
  if (!gl) return null;
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VS));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error('GNSS shader link: ' + gl.getProgramInfoLog(program));
  }
  const buffer = gl.createBuffer();
  const attributes = ['position', 'normal', 'color'].map(name =>
    gl.getAttribLocation(program, name));
  const matrixLocation = gl.getUniformLocation(program, 'viewProjection');
  const lightLocation = gl.getUniformLocation(program, 'lit');
  const overlay = labelsCanvas.getContext?.('2d');
  const drawBatch = (vertices, mode, lit) => {
    if (!vertices.length) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    for (const [i, size, offset] of [[0, 3, 0], [1, 3, 12], [2, 4, 24]]) {
      if (attributes[i] < 0) continue;
      gl.enableVertexAttribArray(attributes[i]);
      gl.vertexAttribPointer(attributes[i], size, gl.FLOAT, false, 40, offset);
    }
    gl.uniform1f(lightLocation, lit);
    gl.drawArrays(mode, 0, vertices.length / 10);
  };
  const resize = () => {
    const dpr = Math.min(2, typeof window === 'undefined' ? 1 : (window.devicePixelRatio || 1));
    const w = Math.max(1, canvas.clientWidth || W);
    const h = Math.max(1, canvas.clientHeight || H);
    const width = Math.round(w * dpr), height = Math.round(h * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width; canvas.height = height;
    }
    if (labelsCanvas.width !== width || labelsCanvas.height !== height) {
      labelsCanvas.width = width; labelsCanvas.height = height;
    }
    gl.viewport(0, 0, width, height);
  };
  const drawLabels = (sats, project) => {
    if (!overlay?.clearRect) return;
    overlay.setTransform(labelsCanvas.width / W, 0, 0, labelsCanvas.height / H, 0, 0);
    overlay.clearRect(0, 0, W, H);
    overlay.font = '700 16px system-ui, sans-serif';
    overlay.textBaseline = 'middle';
    const seen = [];
    const tag = (name, pos, ink) => {
      const p = project(pos);
      let x = Math.min(W - 35, Math.max(12, p.x + 10));
      let y = Math.min(H - 18, Math.max(20, p.y - 10));
      for (let j = 0; j < 9 && seen.some(q =>
        Math.abs(q.x - x) < 32 && Math.abs(q.y - y) < 19); j++) y += 21;
      seen.push({ x, y });
      overlay.lineWidth = 5;
      overlay.strokeStyle = 'rgba(255,255,255,.98)';
      overlay.strokeText(name, x, y);
      overlay.fillStyle = ink;
      overlay.fillText(name, x, y);
    };
    for (const [label, point] of [['E', [1.19, 0, 0]],
      ['N', [0, 1.19, 0]], ['U', [0, 0, 1.23]]]) tag(label, point, '#19496e');
    for (const sat of sats) tag(sat.id, direction(sat), '#932f20');
    tag('O', [0, 0, 0], '#1b3449');
    overlay.font = '600 15px system-ui, sans-serif';
    overlay.fillStyle = '#365d78';
    overlay.fillText('衛星' + sats.length + '機 · ENU単位視線', 25, 30);
  };
  return {
    draw(sats, yaw, tilt) {
      if (gl.isContextLost?.()) return false;
      resize();
      const { matrix, project } = camera(yaw, tilt);
      gl.useProgram(program);
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LESS);
      gl.clearColor(0.965, 0.979, 0.994, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const ground = [];
      disk(ground, 0, 0, 0, 1.09,
        [0.88, 0.94, 0.985, 1], [0.69, 0.82, 0.92, 1]);
      drawBatch(ground, gl.TRIANGLES, 1);
      // Soft ground footprints and vertical dropping guides show altitude.
      const shadows = [], stems = [], rays = [], points = [], rings = [];
      for (const sat of sats) {
        const p = direction(sat);
        for (let i = 5; i >= 1; i--) {
          const spread = i / 5;
          disk(shadows, p[0], p[1], 0.003 + 0.0002 * i,
            0.040 + spread * 0.083,
            [0.15, 0.32, 0.46, 0.07], [0.15, 0.32, 0.46, 0.005]);
        }
        rod(stems, [p[0], p[1], 0.015], p, 0.003,
          [0.34, 0.58, 0.77, 0.56]);
        rod(rays, [0, 0, 0.018], times(p, 0.95), 0.007,
          [0.73, 0.38, 0.25, 1]);
        sphere(points, p, 0.058, [0.94, 0.35, 0.22, 1]);
      }
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.depthMask(false);
      drawBatch(shadows, gl.TRIANGLES, 0);
      gl.depthMask(true);
      gl.disable(gl.BLEND);
      for (const elevation of [0, 30, 60]) {
        ring(rings, elevation, elevation === 0 ?
          [0.31, 0.50, 0.66, 1] : [0.53, 0.67, 0.80, 1]);
      }
      drawBatch(rings, gl.LINES, 0);
      drawBatch(stems, gl.TRIANGLES, 1);
      drawBatch(rays, gl.TRIANGLES, 1);
      const axes = [];
      for (const [endpoint, color] of [
        [[1.16, 0, 0], [0.19, 0.43, 0.64, 1]],
        [[0, 1.16, 0], [0.19, 0.43, 0.64, 1]],
        [[0, 0, 1.17], [0.15, 0.36, 0.61, 1]],
      ]) rod(axes, [0, 0, 0.015], endpoint, 0.006, color);
      drawBatch(axes, gl.TRIANGLES, 1);
      drawBatch(points, gl.TRIANGLES, 1);
      const receiver = [];
      sphere(receiver, [0, 0, 0.018], 0.041, [0.14, 0.31, 0.47, 1]);
      drawBatch(receiver, gl.TRIANGLES, 1);
      drawLabels(sats, project);
      return true;
    },
    project: (sat, yaw, tilt) => camera(yaw, tilt).project(direction(sat)),
  };
}
