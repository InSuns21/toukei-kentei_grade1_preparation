import {
  GRS80, DEG, rad, deg, ellipsoid, radii, ecef, enuBasis, norm, dot,
  geocentricLatitude, inverseECEF, inverseGeodesic, traceGeodesic,
  transverseMercator, projectionDistortion,
} from './geod-core.mjs';

const $ = id => document.getElementById(id);
const ns = 'http://www.w3.org/2000/svg';
const fmt = (n, digits = 6) => Number.isFinite(n) ? n.toLocaleString('ja-JP', {
  maximumFractionDigits: digits, minimumFractionDigits: digits,
}) : '計算不能';
const state = { lab: 'A', yaw: -rad(140), tilt: rad(24), model: ellipsoid(), fVisual: .07 };
const view = $('globe');
const gl = view.getContext('webgl2', { antialias: true, alpha: false });
let program = null, positionBuffer, location, colorLoc, meshes = {};

const shader = (type, source) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
};

function startGL() {
  if (!gl) {
    view.hidden = true;
    $('gl-fallback').hidden = false;
    return;
  }
  try {
    program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER,
      '#version 300 es\nin vec3 position; void main(){gl_Position=vec4(position,1.0);}'));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER,
      '#version 300 es\nprecision mediump float;uniform vec3 tint;out vec4 pixel;void main(){pixel=vec4(tint,1.0);}'));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    location = gl.getAttribLocation(program, 'position');
    colorLoc = gl.getUniformLocation(program, 'tint');
    positionBuffer = gl.createBuffer();
    gl.clearColor(.976, .988, 1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
  } catch (error) {
    program = null;
    view.hidden = true;
    $('gl-fallback').hidden = false;
    $('gl-fallback').textContent = 'WebGL2表示を初期化できません：' + error.message +
      '。数値計算と本文は引き続き利用できます。';
  }
}

// World is ECEF normalized by a. Rotation is for rendering only.
function clip([x, y, z]) {
  const cy = Math.cos(state.yaw), sy = Math.sin(state.yaw);
  const xr = cy * x - sy * y, yr = sy * x + cy * y;
  const ct = Math.cos(state.tilt), st = Math.sin(state.tilt);
  const ratio = view.height / view.width;
  return [ratio * .77 * yr, .77 * (ct * z - st * xr), -.75 * (ct * xr + st * z)];
}

const point = (phi, lambda, e, lift = 1) => ecef(phi, lambda, 0, e)
  .map(x => lift * x / e.a);
const vecAdd = (a, b, amount = 1) => a.map((v, i) => v + amount * b[i]);

function emit(mode, vertices, color, disableDepth = false) {
  if (!program || !vertices.length) return;
  const transformed = new Float32Array(vertices.length * 3);
  vertices.forEach((v, i) => transformed.set(clip(v), i * 3));
  if (disableDepth) gl.disable(gl.DEPTH_TEST);
  else gl.enable(gl.DEPTH_TEST);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, transformed, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
  gl.uniform3fv(colorLoc, color);
  gl.drawArrays(mode, 0, vertices.length);
}

function segment(a, b, pieces = 1) {
  const verts = [];
  for (let i = 0; i < pieces; i++) {
    const t = i / pieces, u = (i + 1) / pieces;
    verts.push(vecAdd(a, b.map((x, k) => x - a[k]), t));
    verts.push(vecAdd(a, b.map((x, k) => x - a[k]), u));
  }
  return verts;
}

function arrow(a, b) {
  const direction = b.map((x, i) => x - a[i]), len = norm(direction);
  if (len < 1e-12) return segment(a, b);
  const t = direction.map(x => x / len);
  const side = [-t[1], t[0], 0];
  const s = norm(side) > .01 ? side.map(x => x / norm(side)) : [1, 0, 0];
  const back = vecAdd(b, t, -.075);
  return [...segment(a, b), ...segment(b, vecAdd(back, s, .035)),
    ...segment(b, vecAdd(back, s, -.035))];
}

function surface(e) {
  const tri = [];
  for (let i = -90; i < 90; i += 5) for (let j = -180; j < 180; j += 6) {
    const a = point(rad(i), rad(j), e), b = point(rad(i + 5), rad(j), e);
    const c = point(rad(i), rad(j + 6), e), d = point(rad(i + 5), rad(j + 6), e);
    tri.push(a, b, c, b, d, c);
  }
  return tri;
}

function graticule(e) {
  const result = [];
  for (let p = -75; p <= 75; p += 15) {
    for (let l = -180; l < 180; l += 3) {
      result.push(point(rad(p), rad(l), e, 1.003), point(rad(p), rad(l + 3), e, 1.003));
    }
  }
  for (let l = -180; l < 180; l += 15) {
    for (let p = -90; p < 90; p += 3) {
      result.push(point(rad(p), rad(l), e, 1.003), point(rad(p + 3), rad(l), e, 1.003));
    }
  }
  return result;
}

function pathLines(points, e, dashed = false) {
  const out = [];
  for (let i = 1; i < points.length; i++) {
    if (dashed && i % 8 > 4) continue;
    if (Math.abs(points[i][1] - points[i - 1][1]) > Math.PI) {
      // The longitude can be unwrapped in the RK4 solver; continuity of the
      // physical 3D points is still valid, so no 2D seam join is attempted.
    }
    out.push(point(...points[i - 1], e, 1.009), point(...points[i], e, 1.009));
  }
  return out;
}

function renderGlobe() {
  if (!program) return;
  gl.viewport(0, 0, view.width, view.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const drawnEllipsoid = ellipsoid(1, state.fVisual);
  emit(gl.TRIANGLES, surface(drawnEllipsoid), [.90, .94, .97]);
  emit(gl.LINES, graticule(drawnEllipsoid), [.53, .63, .75]);
  if (state.lab === 'A') {
    const { phi, lambda } = state;
    const P = point(phi, lambda, drawnEllipsoid, 1.008);
    const basis = enuBasis(phi, lambda);
    const radial = P.map(x => x / norm(P));
    emit(gl.LINES, arrow([0, 0, 0], vecAdd(P, radial, .26)), [.10, .43, .65], true);
    emit(gl.LINES, arrow(P, vecAdd(P, basis.up, .42)), [.88, .38, .12], true);
    emit(gl.LINES, arrow(P, vecAdd(P, basis.east, .28)), [.10, .45, .27], true);
    emit(gl.LINES, arrow(P, vecAdd(P, basis.north, .28)), [.47, .25, .65], true);
  } else if (state.lab === 'B' && state.geodesic) {
    emit(gl.LINES, pathLines(state.geodesic.ellipsoid.points, drawnEllipsoid), [.1, .35, .67]);
    emit(gl.LINES, pathLines(state.geodesic.sphere.points, drawnEllipsoid, true), [.78, .28, .13]);
    const p1 = point(state.geodesic.phi1, state.geodesic.lon1, drawnEllipsoid, 1.018);
    const p2 = point(state.geodesic.phi2, state.geodesic.lon2, drawnEllipsoid, 1.018);
    const basis = enuBasis(state.geodesic.phi1, state.geodesic.lon1);
    emit(gl.LINES, arrow(p1, vecAdd(p1, basis.up, .09)), [.02, .25, .4], true);
    emit(gl.LINES, arrow(p2, vecAdd(p2, basis.up, .09)), [.6, .18, .11], true);
  } else if (state.lab === 'D') {
    const verts = [];
    for (let p = -80; p < 80; p += 2) verts.push(
      point(rad(p), state.lon0, drawnEllipsoid, 1.006),
      point(rad(p + 2), state.lon0, drawnEllipsoid, 1.006));
    emit(gl.LINES, verts, [.03, .36, .65]);
    const P = point(state.phi, state.lambda, drawnEllipsoid, 1.01);
    emit(gl.LINES, arrow(P, vecAdd(P, enuBasis(state.phi, state.lambda).up, .2)), [.82, .29, .11], true);
  }
}

function svg(tag, attrs = {}, content) {
  const e = document.createElementNS(ns, tag);
  for (const [key, value] of Object.entries(attrs)) e.setAttribute(key, String(value));
  if (content !== undefined) e.textContent = String(content);
  return e;
}

function drawProjectionMap(opts, location, distortion) {
  const map = $('map');
  map.replaceChildren();
  const base = transverseMercator(location.phi, location.lon, opts);
  const latRange = [-8, 8], lonRange = [-12, 12];
  const segments = [];
  const tryProject = (phi, lon) => {
    try { return transverseMercator(phi, lon, opts); } catch { return null; }
  };
  for (let j = -12; j <= 12; j += 4) {
    const pts = [];
    for (let k = -8; k <= 8; k += .25) pts.push(tryProject(location.phi + rad(k), opts.lon0 + rad(j)));
    segments.push({ pts, central: j === 0, type: 'meridian' });
  }
  for (let j = -8; j <= 8; j += 4) {
    const pts = [];
    for (let k = -12; k <= 12; k += .25) pts.push(tryProject(location.phi + rad(j), opts.lon0 + rad(k)));
    segments.push({ pts, central: false, type: 'parallel' });
  }
  const valid = segments.flatMap(line => line.pts.filter(Boolean));
  valid.push(base);
  const extentE = Math.max(250000, ...valid.map(p => Math.abs(p.E - base.E)));
  const extentN = Math.max(250000, ...valid.map(p => Math.abs(p.Np - base.Np)));
  const scale = Math.min(310 / extentE, 170 / extentN);
  const xy = p => [360 + (p.E - base.E) * scale, 235 - (p.Np - base.Np) * scale];
  const pathOf = pts => {
    let d = '', previous = false;
    pts.forEach(p => {
      if (!p) { previous = false; return; }
      const [x, y] = xy(p);
      d += (previous ? ' L' : ' M') + x.toFixed(3) + ',' + y.toFixed(3);
      previous = true;
    });
    return d;
  };
  map.append(svg('rect', { x: 1, y: 1, width: 718, height: 468, rx: 9,
    fill: '#f8fbff', stroke: '#d4dfeb' }));
  segments.forEach(({ pts, central }) => map.append(svg('path', {
    d: pathOf(pts), fill: 'none', stroke: central ? '#15578e' : '#8297ac',
    'stroke-width': central ? 3 : 1.1,
    'stroke-dasharray': central ? 'none' : '6 4',
  })));
  const radius = 200000, points = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100 * 2 * Math.PI;
    points.push({
      E: base.E + radius * (distortion.northVector[0] * Math.cos(t) +
        distortion.eastVector[0] * Math.sin(t)),
      Np: base.Np + radius * (distortion.northVector[1] * Math.cos(t) +
        distortion.eastVector[1] * Math.sin(t)),
    });
  }
  map.append(svg('path', { d: pathOf(points) + ' Z', fill: '#f7c77377',
    stroke: '#ae4e15', 'stroke-width': 3 }));
  map.append(svg('circle', { cx: 360, cy: 235, r: 4, fill: '#172235' }));
  map.append(svg('text', { x: 360, y: 34, 'text-anchor': 'middle', 'font-size': 19,
    fill: '#263748' }, 'Np +（北）'));
  map.append(svg('text', { x: 702, y: 450, 'text-anchor': 'end', 'font-size': 19,
    fill: '#263748' }, 'E +（東）'));
  map.append(svg('text', { x: 375, y: 248, 'font-size': 17, fill: '#263748' }, 'P'));
  map.append(svg('text', { x: 22, y: 450, 'font-size': 14, fill: '#334155' },
    '指示楕円：地表の微小円の線形像（表示半径200 km）'));
  map.append(svg('text', { x: 22, y: 32, 'font-size': 14, fill: '#334155' },
    '中心PのE=' + (base.E / 1000).toFixed(1) + ' km、Np=' + (base.Np / 1000).toFixed(1) + ' km'));
}

function showResults(rows, questions, caption) {
  const table = document.createElement('table');
  const body = document.createElement('tbody');
  rows.forEach(([name, value]) => {
    const tr = document.createElement('tr'), th = document.createElement('th'), td = document.createElement('td');
    th.scope = 'row'; th.textContent = name; td.textContent = String(value);
    tr.append(th, td); body.append(tr);
  });
  table.append(body);
  $('geod-results').replaceChildren(table);
  $('geod-questions').replaceChildren(...questions.map(q => {
    const li = document.createElement('li'); li.textContent = q; return li;
  }));
  $('globe-caption').textContent = caption;
  const status = $('geod-status'); status.dataset.error = 'false';
  status.textContent = '計算済み：画面外の数値表でも確認できます。';
}

function computeA() {
  const phi = rad(Number($('a-lat').value)), lambda = rad(Number($('a-lon').value));
  const ratio = Number($('a-f').value), e = ellipsoid(GRS80.a, GRS80.f * ratio);
  const P = ecef(phi, lambda, 0, e), basis = enuBasis(phi, lambda);
  const recovered = inverseECEF(...P, e), { M, N, r } = radii(phi, e);
  const phiC = geocentricLatitude(phi, e);
  state.phi = phi; state.lambda = lambda; state.model = e;
  state.fVisual = Math.min(.48, e.f * 20); state.geodesic = null;
  $('a-lat-v').textContent = fmt(deg(phi), 0) + '°';
  $('a-lon-v').textContent = fmt(deg(lambda), 0) + '°';
  $('a-f-v').textContent = ratio + ' 倍（f=' + fmt(e.f, 8) + '）';
  const diff = (phi - phiC) * 180 / Math.PI * 60;
  showResults([
    ['測地緯度 φ ／ 地心緯度 ψ', fmt(deg(phi)) + '° ／ ' + fmt(deg(phiC)) + '°'],
    ['差 φ−ψ（角分）', fmt(diff, 5) + '′（南半球では符号が反転）'],
    ['曲率半径 M ／ N', fmt(M, 3) + ' m ／ ' + fmt(N, 3) + ' m'],
    ['緯線半径 r = N cosφ', fmt(r, 3) + ' m'],
    ['ECEF (x, y, z)', P.map(v => fmt(v, 3)).join(' / ') + ' m'],
    ['ENU基底の直交誤差', fmt(Math.max(Math.abs(dot(basis.east, basis.north)),
      Math.abs(dot(basis.east, basis.up)), Math.abs(dot(basis.north, basis.up))), 12)],
    ['ECEF→測地座標の復元誤差', fmt(Math.abs(deg(recovered.phi - phi)), 10) +
      '° ／ ' + fmt(Math.abs(recovered.h), 6) + ' m'],
  ], [
    'f=0にしてφ−ψが0になることを確認する。',
    '同じ緯度40°でfを増やし、法線と中心方向の角度差を読む。',
    'ECEFの原点は楕円体の中心。ENUの上は楕円体法線で、地心方向とは一般に異なることを数値表から説明する。',
  ], '青・破線相当：中心からの方向／橙：楕円体法線／緑：東／紫：北。楕円体の見た目の扁平率は計算値の20倍です。');
}

function computeB() {
  const values = ['b-lat1', 'b-lon1', 'b-lat2', 'b-lon2'].map(id => Number($(id).value));
  if (values.some(x => !Number.isFinite(x)) || Math.abs(values[0]) >= 90 ||
      Math.abs(values[2]) >= 90) throw new RangeError('両端の緯度・経度は有限な値、緯度は極を除きます');
  const [phi1, lon1, phi2, lon2] = values.map(rad), e = ellipsoid();
  const inv = inverseGeodesic(phi1, lon1, phi2, lon2, e);
  if (inv.error) throw new RangeError('楕円体逆問題が収束しません（対蹠点近傍の可能性）。条件を変更してください');
  if (inv.distance === 0) throw new RangeError('二点が一致すると初期方位角は定義できません');
  const sphere = ellipsoid(GRS80.a, 0);
  const sphereInv = inverseGeodesic(phi1, lon1, phi2, lon2, sphere);
  const ellipseTrace = traceGeodesic(phi1, lon1, inv.azimuth, inv.distance, e);
  const sphereTrace = traceGeodesic(phi1, lon1, sphereInv.azimuth, sphereInv.distance, sphere);
  const endpointError = norm(ecef(ellipseTrace.phi, ellipseTrace.lambda, 0, e)
    .map((x, i) => x - ecef(phi2, lon2, 0, e)[i]));
  state.fVisual = GRS80.f * 20;
  state.geodesic = { ellipsoid: ellipseTrace, sphere: sphereTrace, phi1, lon1, phi2, lon2 };
  showResults([
    ['GRS80楕円体の距離', fmt(inv.distance / 1000, 6) + ' km'],
    ['半径aの球面大円距離', fmt(sphereInv.distance / 1000, 6) + ' km'],
    ['距離差（楕円体 − 球面）', fmt((inv.distance - sphereInv.distance) / 1000, 6) + ' km'],
    ['始点の測地方位角（北0°・東90°）', fmt((deg(inv.azimuth) + 360) % 360, 6) + '°'],
    ['終点の進行方位角', fmt((deg(inv.finalAzimuth) + 360) % 360, 6) + '°'],
    ['別算法RK4終点のECEF残差', fmt(endpointError, 5) + ' m'],
    ['Clairaut保存量の最大相対ドリフト', ellipseTrace.maxDrift.toExponential(3)],
    ['逆解法の反復回数', inv.iterations],
  ], [
    '距離差の符号を予想し、短距離・長距離の2例で変化を見る（いつも同じ符号と決めつけない）。',
    '経路の途中で方位角が変わっても r(φ)sinα が保存することをGEOD12の式で追う。',
    'ほぼ対蹠点の入力で専用アルゴリズムが必要になる理由を考える。非収束と「測地線が存在しない」は別である。',
  ], '実線・青＝楕円体測地線／破線・橙＝球面大円の比較路。表示は同一の強調楕円体上、数値は各模型の正確なfで別々に計算。');
}

function computeD() {
  const get = id => Number($(id).value);
  const phi = rad(get('d-lat')), lambda = rad(get('d-lon'));
  const lon0 = rad(get('d-lon0')), lat0 = rad(get('d-lat0')), k0 = get('d-k0');
  const e = $('d-model').value === 'sphere' ? ellipsoid(GRS80.a, 0) : ellipsoid();
  const opts = { e, lon0, lat0, k0 };
  const xy = transverseMercator(phi, lambda, opts), d = projectionDistortion(phi, lambda, opts);
  state.phi = phi; state.lambda = lambda; state.lon0 = lon0;
  state.fVisual = e.f * 20; state.geodesic = null;
  drawProjectionMap(opts, { phi, lon: lambda }, d);
  showResults([
    ['投影モデル／中央縮尺', (e.f === 0 ? '球面TM' : '楕円体Krüger n⁶') + ' ／ ' + k0],
    ['E（東）／ Np（北）', fmt(xy.E, 3) + ' m ／ ' + fmt(xy.Np, 3) + ' m'],
    ['日本式表示 X=Np, Y=E', 'X=' + fmt(xy.Np, 3) + ' m, Y=' + fmt(xy.E, 3) +
      ' m（これは投影パラメータのみの比較値）'],
    ['局所縮尺 k：南北／東西', fmt(d.meridianScale, 9) + ' ／ ' + fmt(d.parallelScale, 9)],
    ['主縮尺（指示楕円の長・短半径比）', fmt(d.major, 9) + ' ／ ' + fmt(d.minor, 9)],
    ['面積比（Jacobianと楕円体面積要素）', fmt(d.areaScale, 9)],
    ['真北の投影像が格子北から東へ向く角', fmt(deg(d.northBearingFromGrid), 6) +
      '°（東側へ傾く場合を正と定義）'],
    ['正規化接ベクトルの内積（等角性診断）', d.orthogonality.toExponential(3)],
  ], [
    '試験点の経度をλ₀と一致させ、kと子午線の傾きがどうなるか確認する。',
    '経度を数度動かし、主縮尺がほぼ一致しても面積比が1とは限らない理由を説明する。',
    '球面と楕円体に切り替えて違いを調べる。k₀変更とdatum変更は別である。',
  ], '青い実線は中央子午線（λ₀）。橙の突起は試験点Pの楕円体法線。3Dは説明用の20倍扁平率、右図の計算値は実模型。');
}

function recalculate() {
  $('map-panel').hidden = state.lab !== 'D';
  try {
    if (state.lab === 'A') computeA();
    else if (state.lab === 'B') computeB();
    else computeD();
    renderGlobe();
  } catch (error) {
    $('geod-status').textContent = error.message;
    $('geod-status').dataset.error = 'true';
    $('geod-results').replaceChildren();
    state.geodesic = null;
    $('map').replaceChildren();
    renderGlobe();
  }
}

for (const button of document.querySelectorAll('[data-lab]')) button.addEventListener('click', () => {
  state.lab = button.dataset.lab;
  for (const b of document.querySelectorAll('[data-lab]')) {
    b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
    $('lab-' + b.dataset.lab).hidden = b !== button;
  }
  // Recenter on the study point. The learner can then freely rotate.
  state.yaw = state.lab === 'D' ? -rad(Number($('d-lon0').value))
    : state.lab === 'B' ? -rad(Number($('b-lon1').value)) : -rad(Number($('a-lon').value));
  recalculate();
});
for (const id of ['a-lat', 'a-lon', 'a-f', 'b-lat1', 'b-lon1', 'b-lat2', 'b-lon2',
  'd-lat', 'd-lon', 'd-lon0', 'd-lat0', 'd-k0', 'd-model']) {
  $(id).addEventListener('input', recalculate);
}
let drag = null;
view.addEventListener('pointerdown', event => {
  drag = [event.clientX, event.clientY]; view.setPointerCapture(event.pointerId);
});
view.addEventListener('pointermove', event => {
  if (!drag) return;
  state.yaw += (event.clientX - drag[0]) / 170;
  state.tilt = Math.max(-1.45, Math.min(1.45, state.tilt + (event.clientY - drag[1]) / 170));
  drag = [event.clientX, event.clientY];
  renderGlobe();
});
view.addEventListener('pointerup', () => { drag = null; });
view.addEventListener('pointercancel', () => { drag = null; });
view.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'ArrowLeft') state.yaw += .1;
  if (event.key === 'ArrowRight') state.yaw -= .1;
  if (event.key === 'ArrowUp') state.tilt = Math.min(1.45, state.tilt + .1);
  if (event.key === 'ArrowDown') state.tilt = Math.max(-1.45, state.tilt - .1);
  renderGlobe();
});
view.addEventListener('webglcontextlost', event => {
  event.preventDefault();
  program = null;
  $('gl-fallback').hidden = false;
  $('gl-fallback').textContent = 'WebGLコンテキストを失いました。数値表は利用できます。復旧を待機します。';
});
view.addEventListener('webglcontextrestored', () => {
  startGL(); $('gl-fallback').hidden = true; renderGlobe();
});
startGL();
recalculate();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js', {
      scope: '../', updateViaCache: 'none',
    }).catch(() => {/* The numeric lab remains usable without offline caching. */});
  });
}
