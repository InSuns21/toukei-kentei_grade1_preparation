import {
  GRS80, DEG, rad, deg, ellipsoid, radii, ecef, enuBasis, norm, dot,
  geocentricLatitude, inverseECEF, inverseGeodesic, traceGeodesic,
  transverseMercator, projectionDistortion,
} from './geod-core.mjs';
import { CITIES, TILE_ZOOM, JAPAN_DETAIL_TILE_LIMIT, mercatorY,
  latitudeAtTileY, visibleXYZTiles, japanDetailTiles } from './geod-map.mjs';
import { AUTHALIC_RADIUS, GLOBAL_PROJECTIONS, globalProjection,
  globalDistortion } from './geod-compare.mjs';
import { JAPAN_ZONES, JAPAN_K0, japanPlanarCoordinates } from './geod-japan.mjs';

const $ = id => document.getElementById(id);
const ns = 'http://www.w3.org/2000/svg';
const fmt = (n, digits = 6) => Number.isFinite(n) ? n.toLocaleString('ja-JP', {
  maximumFractionDigits: digits, minimumFractionDigits: digits,
}) : '計算不能';
const state = { lab: 'A', yaw: -rad(140), tilt: rad(24), zoom: 1,
  model: ellipsoid(), fVisual: .07 };
const ZOOM_MIN = .6, GLOBAL_ZOOM_MAX = 2.4, JAPAN_ZOOM_MAX = 12;
const view = $('globe');
const gl = view.getContext('webgl2', { antialias: true, alpha: false });
let program = null, positionBuffer, location, colorLoc;
let surfaceProgram = null, surfaceBuffer, surfacePosition, surfaceUV, surfaceLight;
let surfaceUseMap, surfaceSampler, atlasCanvas, atlasContext, atlasTexture;
const tileImages = new Map();
const detailTiles = new Map();
const MAX_CACHED_DETAIL_TILES = 24;
let failedTiles = 0;

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
      '#version 300 es\nlayout(location=0) in vec3 position; void main(){gl_Position=vec4(position,1.0);gl_PointSize=10.0;}'));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER,
      '#version 300 es\nprecision mediump float;uniform vec3 tint;out vec4 pixel;void main(){pixel=vec4(tint,1.0);}'));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    location = gl.getAttribLocation(program, 'position');
    colorLoc = gl.getUniformLocation(program, 'tint');
    positionBuffer = gl.createBuffer();
    surfaceProgram = gl.createProgram();
    gl.attachShader(surfaceProgram, shader(gl.VERTEX_SHADER,
      '#version 300 es\nlayout(location=0) in vec3 position;layout(location=1) in vec2 uv;layout(location=2) in float brightness;out vec2 texUV;out float lightValue;void main(){gl_Position=vec4(position,1.0);texUV=uv;lightValue=brightness;}'));
    gl.attachShader(surfaceProgram, shader(gl.FRAGMENT_SHADER,
      '#version 300 es\nprecision mediump float;in vec2 texUV;in float lightValue;uniform bool showMap;uniform sampler2D mapTexture;out vec4 pixel;void main(){vec4 image=showMap?texture(mapTexture,texUV):vec4(0.67,0.77,0.85,1.0);pixel=vec4(image.rgb*lightValue,image.a);}'));
    gl.linkProgram(surfaceProgram);
    if (!gl.getProgramParameter(surfaceProgram, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(surfaceProgram));
    }
    surfacePosition = gl.getAttribLocation(surfaceProgram, 'position');
    surfaceUV = gl.getAttribLocation(surfaceProgram, 'uv');
    surfaceLight = gl.getAttribLocation(surfaceProgram, 'brightness');
    surfaceUseMap = gl.getUniformLocation(surfaceProgram, 'showMap');
    surfaceSampler = gl.getUniformLocation(surfaceProgram, 'mapTexture');
    surfaceBuffer = gl.createBuffer();
    gl.clearColor(.976, .988, 1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    initializeTileAtlas();
  } catch (error) {
    program = null;
    surfaceProgram = null;
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
  return [ratio * .77 * state.zoom * yr, .77 * state.zoom * (ct * z - st * xr),
    -.75 * (ct * xr + st * z)];
}

function cameraNormal([x, y, z]) {
  const cy = Math.cos(state.yaw), sy = Math.sin(state.yaw);
  const xr = cy * x - sy * y, yr = sy * x + cy * y;
  const ct = Math.cos(state.tilt), st = Math.sin(state.tilt);
  return [yr, ct * z - st * xr, -(ct * xr + st * z)];
}

const point = (phi, lambda, e, lift = 1) => ecef(phi, lambda, 0, e)
  .map(x => lift * x / e.a);
const vecAdd = (a, b, amount = 1) => a.map((v, i) => v + amount * b[i]);

function emit(mode, vertices, color, disableDepth = false) {
  if (!program || !vertices.length) return;
  gl.useProgram(program);
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

function surfaceVertex(phi, lambda, e, u, v, lift = 1) {
  const xyz = clip(point(phi, lambda, e, lift));
  const normal = cameraNormal(enuBasis(phi, lambda).up);
  // A light above-left of the viewer and ambient light reveal ellipsoid shape.
  const diffuse = Math.max(0, .30 * normal[0] + .58 * normal[1] - .76 * normal[2]);
  return [...xyz, u, v, .42 + .58 * diffuse];
}

function surface(e) {
  const tri = [];
  const vertex = (phi, lambda) => surfaceVertex(phi, lambda, e,
    (lambda / Math.PI + 1) / 2, 1 - mercatorY(phi));
  for (let i = -90; i < 90; i += 5) for (let j = -180; j < 180; j += 6) {
    const a = vertex(rad(i), rad(j)), b = vertex(rad(i + 5), rad(j));
    const c = vertex(rad(i), rad(j + 6)), d = vertex(rad(i + 5), rad(j + 6));
    tri.push(...a, ...b, ...c, ...b, ...d, ...c);
  }
  return new Float32Array(tri);
}

function detailedSurface(tile, e) {
  const n = 2 ** tile.z, segments = 12, triangles = [];
  const vertex = (u, v) => {
    const phi = latitudeAtTileY((tile.y + v) / n);
    const lambda = (2 * (tile.x + u) / n - 1) * Math.PI;
    // The small outward offset avoids z-fighting against the global surface.
    return surfaceVertex(phi, lambda, e, u, 1 - v, 1.002);
  };
  for (let y = 0; y < segments; y++) for (let x = 0; x < segments; x++) {
    const u = x / segments, v = y / segments;
    const a = vertex(u, v), b = vertex(u, v + 1 / segments);
    const c = vertex(u + 1 / segments, v), d = vertex(u + 1 / segments, v + 1 / segments);
    triangles.push(...a, ...b, ...c, ...b, ...d, ...c);
  }
  return new Float32Array(triangles);
}

function initializeTileAtlas() {
  if (!gl) return;
  const n = 2 ** TILE_ZOOM;
  if (!atlasCanvas) {
    atlasCanvas = document.createElement('canvas');
    atlasCanvas.width = atlasCanvas.height = 256 * n;
    atlasContext = atlasCanvas.getContext('2d');
    if (!atlasContext) throw new Error('2Dテクスチャを作成できません');
    atlasContext.fillStyle = '#9fb9c9';
    atlasContext.fillRect(0, 0, atlasCanvas.width, atlasCanvas.height);
  }
  atlasTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, atlasTexture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
}

function updateAtlas(tile, image) {
  if (!atlasContext || !atlasTexture) return;
  atlasContext.drawImage(image, tile.x * 256, tile.y * 256, 256, 256);
  gl.bindTexture(gl.TEXTURE_2D, atlasTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
}

function requestVisibleTiles() {
  if (!program || !$('show-world').checked) return;
  for (const tile of visibleXYZTiles(state.yaw, state.tilt)) {
    const key = tile.z + '/' + tile.x + '/' + tile.y;
    if (tileImages.has(key)) continue;
    // Request only the visible hemisphere, preserving HTTP cache and Referer.
    // This never downloads tiles for a future view or for offline seeding.
    const image = new Image();
    image.crossOrigin = 'anonymous';
    tileImages.set(key, { status: 'loading' });
    image.onload = () => {
      tileImages.set(key, { status: 'loaded' });
      updateAtlas(tile, image);
      updateTileStatus();
      renderGlobe();
    };
    image.onerror = () => {
      failedTiles++;
      tileImages.set(key, { status: 'failed' });
      updateTileStatus();
    };
    image.src = 'https://tile.openstreetmap.org/' + key + '.png';
  }
}

function currentDetailTiles() {
  return state.lab === 'F' && state.japan && $('show-world').checked
    ? japanDetailTiles(state.tilt, -state.yaw, state.zoom) : [];
}

function updateTileStatus() {
  if (!$('show-world').checked) {
    $('gsi-credit').hidden = true;
    return;
  }
  const selected = currentDetailTiles();
  $('gsi-credit').hidden = !selected.length;
  if (selected.length) {
    const loaded = selected.filter(t => detailTiles.get(t.z + '/' + t.x + '/' + t.y)?.status === 'loaded').length;
    const failed = selected.filter(t => detailTiles.get(t.z + '/' + t.x + '/' + t.y)?.status === 'failed').length;
    $('tile-status').textContent = '日本周辺の地理院標準地図（オンライン・XYZズーム' + selected[0].z +
      '）：' + loaded + '/' + selected.length + '枚表示' +
      (failed ? '、' + failed + '枚取得不可（背景地図で補完）' : '') + '。';
  } else {
    $('tile-status').textContent = failedTiles
      ? '世界地図タイルの一部を取得できません（' + failedTiles + '枚）。陰影と計算は利用できます。'
      : '世界地図タイル表示中（オンライン・XYZズーム' + TILE_ZOOM + '）。';
  }
}

function requestJapanTiles() {
  if (!surfaceProgram) return;
  const selected = currentDetailTiles();
  const active = new Set(selected.map(tile => tile.z + '/' + tile.x + '/' + tile.y));
  for (const tile of selected) {
    const key = tile.z + '/' + tile.x + '/' + tile.y;
    if (detailTiles.has(key)) continue;
    // Retain a small visit cache, evicting non-visible GPU textures first.
    for (const [oldKey, oldEntry] of detailTiles) {
      if (detailTiles.size < MAX_CACHED_DETAIL_TILES) break;
      if (active.has(oldKey)) continue;
      if (oldEntry.texture) gl.deleteTexture(oldEntry.texture);
      detailTiles.delete(oldKey);
    }
    const image = new Image();
    image.crossOrigin = 'anonymous';
    const entry = { tile, image, status: 'loading', texture: null };
    detailTiles.set(key, entry);
    image.onload = () => {
      // Late requests must not revive evicted tiles or a lost GL context.
      if (!surfaceProgram || detailTiles.get(key) !== entry) return;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        entry.texture = texture;
        entry.status = 'loaded';
      } catch {
        gl.deleteTexture(texture);
        entry.status = 'failed';
      }
      updateTileStatus();
      renderGlobe();
    };
    image.onerror = () => { if (detailTiles.get(key) === entry) {
      entry.status = 'failed'; updateTileStatus();
    } };
    image.src = 'https://cyberjapandata.gsi.go.jp/xyz/std/' + key + '.png';
  }
  // A slot count, not a global z=8 atlas: a bounded number of 256² textures.
  if (selected.length > JAPAN_DETAIL_TILE_LIMIT) throw new Error('詳細タイルの上限超過');
  updateTileStatus();
}

function drawTexturedGeometry(vertices, texture, showMap, overlay = false) {
  if (!surfaceProgram) return;
  gl.enable(gl.DEPTH_TEST);
  if (overlay) {
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);
  }
  gl.useProgram(surfaceProgram);
  gl.bindBuffer(gl.ARRAY_BUFFER, surfaceBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(surfacePosition);
  gl.vertexAttribPointer(surfacePosition, 3, gl.FLOAT, false, 24, 0);
  gl.enableVertexAttribArray(surfaceUV);
  gl.vertexAttribPointer(surfaceUV, 2, gl.FLOAT, false, 24, 12);
  gl.enableVertexAttribArray(surfaceLight);
  gl.vertexAttribPointer(surfaceLight, 1, gl.FLOAT, false, 24, 20);
  gl.uniform1i(surfaceUseMap, showMap ? 1 : 0);
  if (showMap) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(surfaceSampler, 0);
  }
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6);
  if (overlay) {
    gl.depthMask(true);
    gl.disable(gl.BLEND);
  }
  gl.disableVertexAttribArray(surfaceUV);
  gl.disableVertexAttribArray(surfaceLight);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
}

function drawSurface(e) {
  drawTexturedGeometry(surface(e), atlasTexture, $('show-world').checked && !!atlasTexture);
}

function drawJapanDetail(e) {
  if (!$('show-world').checked) return;
  for (const tile of currentDetailTiles()) {
    const entry = detailTiles.get(tile.z + '/' + tile.x + '/' + tile.y);
    if (entry?.texture) drawTexturedGeometry(detailedSurface(tile, e), entry.texture, true, true);
  }
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
  drawSurface(drawnEllipsoid);
  drawJapanDetail(drawnEllipsoid);
  emit(gl.LINES, graticule(drawnEllipsoid), [.53, .63, .75]);
  if (state.lab === 'A') {
    const { phi, lambda } = state;
    const P = point(phi, lambda, drawnEllipsoid, 1.008);
    const basis = enuBasis(phi, lambda);
    const radial = P.map(x => x / norm(P));
    // The geocentric radius OP lies *inside* the opaque ellipsoid. Drawing it
    // through the sphere makes O look like an external point. Show only the
    // outward continuation here and the actual OP in the meridian section.
    emit(gl.LINES, arrow(P, vecAdd(P, radial, .32)), [.10, .43, .65]);
    emit(gl.LINES, arrow(P, vecAdd(P, basis.up, .42)), [.88, .38, .12]);
    emit(gl.LINES, arrow(P, vecAdd(P, basis.east, .28)), [.10, .45, .27]);
    emit(gl.LINES, arrow(P, vecAdd(P, basis.north, .28)), [.47, .25, .65]);
    emit(gl.POINTS, [P], [.91, .20, .12]);
  } else if (state.lab === 'B' && state.geodesic) {
    emit(gl.LINES, pathLines(state.geodesic.ellipsoid.points, drawnEllipsoid), [.1, .35, .67]);
    emit(gl.LINES, pathLines(state.geodesic.sphere.points, drawnEllipsoid, true), [.78, .28, .13]);
    const p1 = point(state.geodesic.phi1, state.geodesic.lon1, drawnEllipsoid, 1.018);
    const p2 = point(state.geodesic.phi2, state.geodesic.lon2, drawnEllipsoid, 1.018);
    const basis = enuBasis(state.geodesic.phi1, state.geodesic.lon1);
    emit(gl.LINES, arrow(p1, vecAdd(p1, basis.up, .09)), [.02, .25, .4], true);
    emit(gl.LINES, arrow(p2, vecAdd(p2, basis.up, .09)), [.6, .18, .11], true);
    emit(gl.POINTS, [p1, p2], [.96, .25, .11], true);
  } else if (state.lab === 'D') {
    const verts = [];
    for (let p = -80; p < 80; p += 2) verts.push(
      point(rad(p), state.lon0, drawnEllipsoid, 1.006),
      point(rad(p + 2), state.lon0, drawnEllipsoid, 1.006));
    emit(gl.LINES, verts, [.03, .36, .65]);
    const P = point(state.phi, state.lambda, drawnEllipsoid, 1.01);
    emit(gl.LINES, arrow(P, vecAdd(P, enuBasis(state.phi, state.lambda).up, .2)), [.82, .29, .11], true);
    emit(gl.POINTS, [P], [.94, .22, .11], true);
  } else if (state.lab === 'E') {
    const P = point(state.phi, state.lambda, drawnEllipsoid, 1.014);
    emit(gl.LINES, arrow(P, vecAdd(P, enuBasis(state.phi, state.lambda).up, .23)),
      [.85, .32, .11], true);
    emit(gl.POINTS, [P], [.95, .2, .12], true);
  } else if (state.lab === 'F' && state.japan) {
    const { zone } = state.japan, lon0 = rad(zone.lon0);
    const central = [];
    for (let lat = -78; lat < 78; lat += 2) central.push(
      point(rad(lat), lon0, drawnEllipsoid, 1.008),
      point(rad(lat + 2), lon0, drawnEllipsoid, 1.008));
    emit(gl.LINES, central, [.07, .39, .74]);
    const O = point(rad(zone.lat0), lon0, drawnEllipsoid, 1.018);
    const P = point(state.phi, state.lambda, drawnEllipsoid, 1.018);
    emit(gl.LINES, arrow(P, vecAdd(P, enuBasis(state.phi, state.lambda).up, .2)),
      [.86, .3, .11], true);
    emit(gl.POINTS, [O], [.12, .28, .5], true);
    emit(gl.POINTS, [P], [.97, .18, .08], true);
  }
  requestVisibleTiles();
  requestJapanTiles();
}

function svg(tag, attrs = {}, content) {
  const e = document.createElementNS(ns, tag);
  for (const [key, value] of Object.entries(attrs)) e.setAttribute(key, String(value));
  if (content !== undefined) e.textContent = String(content);
  return e;
}

function drawMeridianSection() {
  const map = $('a-section-map');
  map.replaceChildren();
  const e = ellipsoid(1, state.fVisual);
  const P = point(state.phi, state.lambda, e);
  const radius = Math.hypot(P[0], P[1]);
  const cx = 190, cy = 169, scale = 124;
  const px = cx + radius * scale, py = cy - P[2] * scale;
  const radialLength = Math.hypot(radius, P[2]);
  const radial = [radius / radialLength, P[2] / radialLength];
  const normal = [Math.cos(state.phi), Math.sin(state.phi)];
  const line = (x1, y1, x2, y2, stroke, dashed = false, width = 3) =>
    svg('line', { x1, y1, x2, y2, stroke, 'stroke-width': width,
      'stroke-dasharray': dashed ? '7 5' : 'none', 'stroke-linecap': 'round' });
  map.append(svg('rect', { x: 1, y: 1, width: 558, height: 338, rx: 10,
    fill: '#f8fbff', stroke: '#d1dce9' }));
  map.append(svg('ellipse', { cx, cy, rx: scale, ry: scale * (1 - e.f),
    fill: '#dceaf4', stroke: '#35628c', 'stroke-width': 2.5 }));
  map.append(line(40, cy, 347, cy, '#9aabc0', true, 1.5));
  map.append(line(cx, 26, cx, 317, '#9aabc0', true, 1.5));
  // O--P is shown *only* inside this cross-section, not over the 3D surface.
  map.append(line(cx, cy, px, py, '#19639b', true));
  map.append(line(px, py, px + radial[0] * 32, py - radial[1] * 32, '#19639b', true));
  map.append(line(px, py, px + normal[0] * 49, py - normal[1] * 49, '#c45b22', false, 4));
  map.append(svg('circle', { cx, cy, r: 5, fill: '#152c4e' }));
  map.append(svg('circle', { cx: px, cy: py, r: 5, fill: '#b43320' }));
  map.append(svg('text', { x: cx - 21, y: cy + 21, fill: '#152c4e',
    'font-size': 18 }, 'O'));
  map.append(svg('text', { x: px + 8, y: py + 19, fill: '#a32c1d',
    'font-size': 18 }, 'P'));
  map.append(svg('text', { x: 351, y: 77, fill: '#c45b22',
    'font-size': 17 }, '橙：楕円体法線（φ）'));
  map.append(svg('text', { x: 351, y: 107, fill: '#19639b',
    'font-size': 17 }, '青破線：地心方向（ψ）'));
  map.append(svg('text', { x: 351, y: 224, fill: '#334155',
    'font-size': 15 }, '中心 O は楕円体の内部'));
  map.append(svg('text', { x: 351, y: 249, fill: '#334155',
    'font-size': 15 }, 'P は楕円体の表面'));
  map.append(svg('text', { x: 18, y: 324, fill: '#475569',
    'font-size': 14 }, '子午線断面：3Dと同じ強調扁平率（数値計算用 f とは別）'));
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

function drawGlobalProjectionMap(elementId, projectionId, phi, lambda, distortion) {
  const map = $(elementId);
  map.replaceChildren();
  // The two panels share the same physical scale (pixels per authalic radius),
  // not two independently fitted bounding boxes that would hide distortion.
  const scale = 67 / AUTHALIC_RADIUS, cx = 320, cy = 190;
  const xy = (lat, lon) => {
    const { x, y } = globalProjection(projectionId, lat, lon);
    return [cx + x * scale, cy - y * scale];
  };
  const pathOf = points => points.map(([x, y], i) =>
    (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2)).join(' ');
  map.append(svg('rect', { x: 1, y: 1, width: 638, height: 378, rx: 8,
    fill: '#f8fbff', stroke: '#cfd9e5' }));
  for (let lat = -75; lat <= 75; lat += 15) {
    const positions = [];
    for (let lon = -180; lon <= 180; lon += 3) positions.push(xy(rad(lat), rad(lon)));
    map.append(svg('path', { d: pathOf(positions), fill: 'none',
      stroke: lat === 0 ? '#5f748b' : '#aab6c5',
      'stroke-width': lat === 0 ? 1.7 : 1.0 }));
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const positions = [];
    for (let lat = -80; lat <= 80; lat += 2) positions.push(xy(rad(lat), rad(lon)));
    map.append(svg('path', { d: pathOf(positions), fill: 'none',
      stroke: lon === 0 ? '#285f91' : '#91a0b3',
      'stroke-width': lon === 0 ? 2.4 : 1.2,
      'stroke-dasharray': lon === 0 ? 'none' : '5 4' }));
  }
  const centre = xy(phi, lambda);
  const radius = AUTHALIC_RADIUS * .27;
  const ellipse = [];
  for (let i = 0; i <= 100; i++) {
    const t = 2 * Math.PI * i / 100;
    ellipse.push([
      centre[0] + radius * scale * (distortion.east[0] * Math.cos(t) +
        distortion.north[0] * Math.sin(t)),
      centre[1] - radius * scale * (distortion.east[1] * Math.cos(t) +
        distortion.north[1] * Math.sin(t)),
    ]);
  }
  map.append(svg('path', { d: pathOf(ellipse) + ' Z', fill: '#eaa04455',
    stroke: '#a74b14', 'stroke-width': 2.7 }));
  map.append(svg('circle', { cx: centre[0], cy: centre[1], r: 4.5,
    fill: '#b72d21', stroke: '#ffffff', 'stroke-width': 1 }));
  const textX = Math.max(22, Math.min(607, centre[0] + 8));
  const textY = Math.max(22, Math.min(355, centre[1] - 10));
  map.append(svg('text', { x: textX, y: textY, 'font-size': 16,
    'font-weight': 'bold', fill: '#862517' }, 'P'));
  map.append(svg('text', { x: 18, y: 26, 'font-size': 15,
    fill: '#24394c' }, GLOBAL_PROJECTIONS[projectionId]));
  map.append(svg('text', { x: 18, y: 360, 'font-size': 13,
    fill: '#24394c' }, '共通尺度：67 px / 球半径 R　｜　緯度 ±80°まで'));
}

function drawJapanGrid(result) {
  const map = $('f-map');
  map.replaceChildren();
  const { X, Y, zone, options } = result;
  // Both the official origin and trial point remain visible at an equal
  // physical scale on both axes; any empty margins are intentional.
  const extent = Math.max(180000, Math.abs(X) * .72, Math.abs(Y) * .72);
  const centreX = X / 2, centreY = Y / 2;
  const scale = Math.min(302 / (extent + Math.abs(Y) / 2),
    178 / (extent + Math.abs(X) / 2));
  const xy = (north, east) => [360 + (east - centreY) * scale,
    235 - (north - centreX) * scale];
  const pathOf = pts => pts.map(([x, y], i) =>
    (i ? 'L' : 'M') + x.toFixed(2) + ',' + y.toFixed(2)).join(' ');
  const line = (x1, y1, x2, y2, stroke, dash = '', width = 1.5) =>
    svg('line', { x1, y1, x2, y2, stroke, 'stroke-width': width,
      'stroke-dasharray': dash });
  map.append(svg('rect', { x: 1, y: 1, width: 718, height: 468, rx: 8,
    fill: '#f8fbff', stroke: '#bdcbdc' }));
  const defs = svg('defs');
  const clipPath = svg('clipPath', { id: 'f-map-clip' });
  clipPath.append(svg('rect', { x: 13, y: 35, width: 694, height: 398 }));
  defs.append(clipPath); map.append(defs);
  const plot = svg('g', { 'clip-path': 'url(#f-map-clip)' });
  map.append(plot);
  const m = Math.max(25000, 10 ** Math.floor(Math.log10(extent / 1.6)));
  for (let e = Math.floor((centreY - 370 / scale) / m) * m;
    e <= centreY + 370 / scale; e += m) {
    const [x] = xy(0, e);
    plot.append(line(x, 25, x, 450, '#d2dbe7', '4 6', 1));
  }
  for (let n = Math.floor((centreX - 240 / scale) / m) * m;
    n <= centreX + 240 / scale; n += m) {
    const [, y] = xy(n, 0);
    plot.append(line(5, y, 715, y, '#d2dbe7', '4 6', 1));
  }
  const project = (latitude, longitude) => {
    const p = transverseMercator(rad(latitude), rad(longitude), options);
    return xy(p.Np, p.E);
  };
  for (let k = -3; k <= 3; k++) {
    const meridian = [], parallel = [];
    for (let j = -3; j <= 3 + 1e-9; j += .1) {
      meridian.push(project(zone.lat0 + j, zone.lon0 + k));
      parallel.push(project(zone.lat0 + k, zone.lon0 + j));
    }
    plot.append(svg('path', { d: pathOf(meridian), fill: 'none',
      stroke: '#a0aebc', 'stroke-width': 1.15 }));
    plot.append(svg('path', { d: pathOf(parallel), fill: 'none',
      stroke: '#a0aebc', 'stroke-width': 1.15, 'stroke-dasharray': '4 4' }));
  }
  const [ox, oy] = xy(0, 0), [px, py] = xy(X, Y);
  plot.append(line(ox, 30, ox, 440, '#236198', '', 2.8)); // X-axis: Y=0
  plot.append(line(10, oy, 710, oy, '#236198', '', 2.8)); // Y-axis: X=0
  plot.append(line(ox, py, px, py, '#b44123', '7 4', 2));
  plot.append(line(px, oy, px, py, '#b44123', '7 4', 2));
  plot.append(svg('circle', { cx: ox, cy: oy, r: 5, fill: '#173c68',
    stroke: '#fff', 'stroke-width': 1.5 }));
  plot.append(svg('circle', { cx: px, cy: py, r: 6, fill: '#bb3422',
    stroke: '#fff', 'stroke-width': 2 }));
  const label = (x, y, content, color, anchor = 'start') =>
    svg('text', { x: Math.max(22, Math.min(697, x)),
      y: Math.max(52, Math.min(425, y)), fill: color, 'font-size': 17,
      'font-weight': 700, 'text-anchor': anchor }, content);
  plot.append(label(ox + 9, oy + 21, 'O', '#173c68'));
  plot.append(label(px + 9, py - 13, 'P', '#a12e20'));
  map.append(svg('text', { x: 18, y: 26, fill: '#254663', 'font-size': 16 },
    zone.roman + '系：原点（東経' + zone.lon0.toFixed(5) + '°、北緯' + zone.lat0 + '°）'));
  map.append(svg('text', { x: 698, y: 27, 'text-anchor': 'end', fill: '#254663',
    'font-size': 15 }, '↑ X＋（北）   Y＋（東）→'));
  map.append(svg('text', { x: 18, y: 457, fill: '#334155', 'font-size': 14 },
    '薄い点線＝平面 ' + (m / 1000) + ' km格子、灰色＝経緯線（共通縮尺）'));
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
  $('a-lat-v').textContent = fmt(deg(phi), 4) + '°';
  $('a-lon-v').textContent = fmt(deg(lambda), 4) + '°';
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
  ], '3Dの青は地心方向OPの表面から外側への延長（中心Oそのものは描画しません）。橙：楕円体法線／緑：東／紫：北。右の断面図で内部のOとPを確認できます。扁平率の3D表示は20倍強調です。');
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

function computeE() {
  const lat = Number($('e-lat').value), lon = Number($('e-lon').value);
  const left = $('e-left').value, right = $('e-right').value;
  if (!Number.isFinite(lat) || Math.abs(lat) > 80 ||
      !Number.isFinite(lon) || Math.abs(lon) > 180) {
    throw new RangeError('試験点は緯度±80°、経度±180°の範囲で指定してください');
  }
  if (!GLOBAL_PROJECTIONS[left] || !GLOBAL_PROJECTIONS[right]) {
    throw new RangeError('投影法を選択してください');
  }
  const phi = rad(lat), lambda = rad(lon);
  const dl = globalDistortion(left, phi, lambda);
  const dr = globalDistortion(right, phi, lambda);
  const pl = globalProjection(left, phi, lambda);
  const pr = globalProjection(right, phi, lambda);
  state.phi = phi; state.lambda = lambda;
  state.fVisual = GRS80.f * 20;
  state.geodesic = null;
  $('e-left-title').textContent = GLOBAL_PROJECTIONS[left];
  $('e-right-title').textContent = GLOBAL_PROJECTIONS[right];
  drawGlobalProjectionMap('e-left-map', left, phi, lambda, dl);
  drawGlobalProjectionMap('e-right-map', right, phi, lambda, dr);
  const describe = (d, p) => [fmt(d.area, 6),
    fmt(d.major, 5) + ' / ' + fmt(d.minor, 5),
    fmt(deg(d.maxAngularDistortion), 4) + '°',
    fmt(p.x / 1000, 2) + ' / ' + fmt(p.y / 1000, 2) + ' km'];
  const lv = describe(dl, pl), rv = describe(dr, pr);
  showResults([
    ['比較模型', 'GRS80の等面積球半径 R=' + fmt(AUTHALIC_RADIUS, 3) +
      ' m。緯度は球面緯度として入力。'],
    ['投影法', '左：' + GLOBAL_PROJECTIONS[left] + ' ／ 右：' + GLOBAL_PROJECTIONS[right]],
    ['試験点 P', '緯度 ' + fmt(lat, 4) + '°、経度 ' + fmt(lon, 4) + '°'],
    ['面積比 |det J|（左 ／ 右）', lv[0] + ' ／ ' + rv[0]],
    ['主縮尺（長/短）（左 ／ 右）', lv[1] + ' ／ ' + rv[1]],
    ['最大角ひずみ（左 ／ 右）', lv[2] + ' ／ ' + rv[2]],
    ['平面 x/y（左 ／ 右）', lv[3] + ' ／ ' + rv[3]],
  ], [
    '緯度0°・60°でMercatorの面積比を比べる。球面Mercatorの理論値はsec²φ。',
    'Equal EarthとMollweideの面積比が約1となる一方、主縮尺が一致しない点を探す。',
    '二図の共通尺度と、拡大した微小円の像を区別し、等角と等積を両立できない理由を説明する。',
  ], '3Dの赤い点Pと二つの全球投影の赤い点は同じ入力経緯度。3Dは誇張楕円体、投影数値は共通の等面積球模型。投影図の指示楕円は線形像の拡大表示です。');
}

function computeF() {
  const lat = Number($('f-lat').value), lon = Number($('f-lon').value);
  if (!$('f-lat').value.trim() || !$('f-lon').value.trim() ||
      !Number.isFinite(lat) || Math.abs(lat) > 80 ||
      !Number.isFinite(lon) || Math.abs(lon) > 180) {
    throw new RangeError('緯度は±80°、経度は±180°の有限な値を指定してください');
  }
  const result = japanPlanarCoordinates(rad(lat), rad(lon), Number($('f-zone').value),
    $('f-datum').value);
  const { zone, X, Y, mapDistance, distortion: d, farFromMeridian, datum } = result;
  state.phi = rad(lat); state.lambda = rad(lon); state.japan = result;
  state.fVisual = GRS80.f * 20; state.geodesic = null;
  $('f-map-title').textContent = 'F：' + zone.roman + '系の平面座標（X 北・Y 東、m）';
  drawJapanGrid(result);
  showResults([
    ['系番号・地域の目安', zone.roman + '系（' + zone.number + '）／' + zone.area],
    ['入力基準系の仮定', datum === 'jgd2011'
      ? 'JGD2011の経緯度と仮定（EPSG:' + zone.epsg2011 + '）'
      : 'GRS80楕円体の数学計算のみ（datum・EPSG未指定）'],
    ['原点（φ₀，λ₀）', fmt(zone.lat0, 6) + '°N、' + fmt(zone.lon0, 6) + '°E'],
    ['投影法・中央縮尺・原点', 'GRS80横メルカトル n⁶／k₀=' + JAPAN_K0 + '／X₀=Y₀=0 m'],
    ['X（北正）', fmt(X, 3) + ' m'],
    ['Y（東正）', fmt(Y, 3) + ' m'],
    ['原点OからPまでの平面直線距離', fmt(mapDistance / 1000, 6) + ' km（測地線距離ではない）'],
    ['点Pの局所縮尺 k（南北／東西）', fmt(d.meridianScale, 9) + ' ／ ' + fmt(d.parallelScale, 9)],
    ['真北が格子北から東へ傾く角', fmt(deg(d.northBearingFromGrid), 6) + '°（東を正）'],
    ['適用区域について', farFromMeridian
      ? '中央子午線から3°超：大きな外挿です。法定適用区域・精度は別途確認。'
      : '法定適用区域の判定はしていません（国土地理院告示で確認）。'],
  ], [
    'まずIX系の原点（北緯36°、東経139°50′）を入力し、X=0・Y=0を確かめる。',
    '原点から北・南・東・西へ少し動かして、XとYの符号を予測・検証する。GISのEasting/Northing順との取り違えに注意。',
    '同じ東京の座標をIX系とVIII系に投影する。数値が変わる理由を原点と中央子午線の違いから説明する。',
    'JGD2011と「GRS80のみ」を切り替え、数値が同じ理由とdatum変換が必要な状況を区別する。',
  ], '青実線＝選んだ系の中央子午線、青点O＝公定原点、赤点P＝試験点（2D図と連動）。赤の短線はPの外向き法線。3Dは誇張表示、X/Y・縮尺・方位の数値はGRS80模型で計算。');
}

function activePointFields() {
  if (state.lab === 'B') return $('globe-point-role').value === 'end'
    ? { city: 'b-city2', lat: 'b-lat2', lon: 'b-lon2', maxLat: 89 }
    : { city: 'b-city1', lat: 'b-lat1', lon: 'b-lon1', maxLat: 89 };
  if (state.lab === 'D') return { city: 'd-city', lat: 'd-lat', lon: 'd-lon', maxLat: 70 };
  if (state.lab === 'E') return { city: 'e-city', lat: 'e-lat', lon: 'e-lon', maxLat: 80 };
  if (state.lab === 'F') return { city: 'f-city', lat: 'f-lat', lon: 'f-lon', maxLat: 80 };
  return { city: 'a-city', lat: 'a-lat', lon: 'a-lon', maxLat: 75 };
}

function syncLocationToolbar() {
  const config = activePointFields();
  $('globe-point-role-wrap').hidden = state.lab !== 'B';
  $('globe-point-zone-wrap').hidden = state.lab !== 'F';
  if (state.lab === 'F') $('globe-point-zone').value = $('f-zone').value;
  $('globe-point-city').value = $(config.city).value;
  $('globe-point-lat').value = $(config.lat).value;
  $('globe-point-lat').min = String(-config.maxLat);
  $('globe-point-lat').max = String(config.maxLat);
  $('globe-point-lon').value = $(config.lon).value;
}

function recalculate() {
  $('map-panel').hidden = state.lab !== 'D';
  $('a-section').hidden = state.lab !== 'A';
  $('e-map-panel').hidden = state.lab !== 'E';
  $('f-map-panel').hidden = state.lab !== 'F';
  syncLocationToolbar();
  try {
    if (state.lab === 'A') { computeA(); drawMeridianSection(); }
    else if (state.lab === 'B') computeB();
    else if (state.lab === 'D') computeD();
    else if (state.lab === 'E') computeE();
    else computeF();
    renderGlobe();
  } catch (error) {
    $('geod-status').textContent = error.message;
    $('geod-status').dataset.error = 'true';
    $('geod-results').replaceChildren();
    state.geodesic = null;
    $('map').replaceChildren();
    $('e-left-map').replaceChildren();
    $('e-right-map').replaceChildren();
    $('f-map').replaceChildren();
    state.japan = null;
    renderGlobe();
  }
}

const cityControls = [
  ['a-city', 'a-lat', 'a-lon'],
  ['b-city1', 'b-lat1', 'b-lon1'],
  ['b-city2', 'b-lat2', 'b-lon2'],
  ['d-city', 'd-lat', 'd-lon'],
  ['e-city', 'e-lat', 'e-lon'],
  ['f-city', 'f-lat', 'f-lon'],
];
for (const zone of JAPAN_ZONES) {
  const option = document.createElement('option');
  option.value = String(zone.number);
  option.textContent = zone.roman + '系（' + zone.area + '；原点 ' + zone.lat0 + '°N, ' +
    zone.lon0.toFixed(4) + '°E）';
  $('f-zone').append(option);
  const nearby = document.createElement('option');
  nearby.value = option.value;
  nearby.textContent = zone.roman + '系 — ' + zone.area;
  $('globe-point-zone').append(nearby);
}
$('f-zone').value = '9';
$('globe-point-zone').value = '9';
for (const [id, latId, lonId] of cityControls) {
  const selector = $(id);
  for (const city of CITIES) {
    const option = document.createElement('option');
    option.value = city.id;
    option.textContent = city.label + '（' + city.lat + '°, ' + city.lon + '°）';
    selector.append(option);
  }
  selector.addEventListener('change', () => {
    const city = CITIES.find(candidate => candidate.id === selector.value);
    if (!city) return;
    $(latId).value = String(city.lat);
    $(lonId).value = String(city.lon);
    if (id === 'd-city') $('d-lon0').value = String(city.lon);
    state.yaw = -rad(city.lon);
    state.tilt = rad(city.lat);
    recalculate();
  });
}
for (const city of CITIES) {
  const option = document.createElement('option');
  option.value = city.id;
  option.textContent = city.label + '（' + city.lat + '°, ' + city.lon + '°）';
  $('globe-point-city').append(option);
}
$('globe-point-role').addEventListener('change', syncLocationToolbar);
$('globe-point-zone').addEventListener('change', () => {
  $('f-zone').value = $('globe-point-zone').value;
  const zone = JAPAN_ZONES[Number($('f-zone').value) - 1];
  if (zone) { state.yaw = -rad(zone.lon0); state.tilt = rad(zone.lat0); }
  recalculate();
});
$('globe-point-city').addEventListener('change', () => {
  const city = CITIES.find(item => item.id === $('globe-point-city').value);
  if (!city) return;
  const config = activePointFields();
  $(config.city).value = city.id;
  $(config.lat).value = String(city.lat);
  $(config.lon).value = String(city.lon);
  if (state.lab === 'D') $('d-lon0').value = String(city.lon);
  state.yaw = -rad(city.lon);
  state.tilt = rad(city.lat);
  recalculate();
});
for (const axis of ['lat', 'lon']) {
  $('globe-point-' + axis).addEventListener('change', () => {
    const config = activePointFields();
    const value = Number($('globe-point-' + axis).value);
    const max = axis === 'lat' ? config.maxLat : 180;
    if (!Number.isFinite(value) || Math.abs(value) > max) {
      $('geod-status').dataset.error = 'true';
      $('geod-status').textContent = axis === 'lat'
        ? '緯度は±' + max + '°以内で指定してください'
        : '経度は±180°以内で指定してください';
      return;
    }
    $(config[axis]).value = String(value);
    $(config.city).value = '';
    state.yaw = -rad(Number($(config.lon).value));
    state.tilt = rad(Number($(config.lat).value));
    recalculate();
  });
}
const customCityInputs = new Map(cityControls.flatMap(([select, lat, lon]) =>
  [[lat, select], [lon, select]]));

for (const button of document.querySelectorAll('[data-lab]')) button.addEventListener('click', () => {
  const previousLab = state.lab;
  state.lab = button.dataset.lab;
  for (const b of document.querySelectorAll('[data-lab]')) {
    b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
    $('lab-' + b.dataset.lab).hidden = b !== button;
  }
  // Recenter on the study point. The learner can then freely rotate.
  state.yaw = state.lab === 'D' ? -rad(Number($('d-lon0').value))
    : state.lab === 'B' ? -rad(Number($('b-lon1').value))
      : state.lab === 'E' ? -rad(Number($('e-lon').value))
        : state.lab === 'F' ? -rad(Number($('f-lon').value)) : -rad(Number($('a-lon').value));
  if (state.lab === 'F') state.tilt = rad(Number($('f-lat').value));
  $('globe-zoom').max = String(state.lab === 'F' ? JAPAN_ZOOM_MAX : GLOBAL_ZOOM_MAX);
  setZoom(state.lab === 'F' ? 4 : previousLab === 'F' ? 1 : Math.min(state.zoom, GLOBAL_ZOOM_MAX));
  recalculate();
});
for (const id of ['a-lat', 'a-lon', 'a-f', 'b-lat1', 'b-lon1', 'b-lat2', 'b-lon2',
  'd-lat', 'd-lon', 'd-lon0', 'd-lat0', 'd-k0', 'd-model',
  'e-lat', 'e-lon', 'e-left', 'e-right', 'f-lat', 'f-lon', 'f-zone', 'f-datum']) {
  $(id).addEventListener('input', () => {
    if (customCityInputs.has(id)) $(customCityInputs.get(id)).value = '';
    if (id === 'f-zone') {
      const zone = JAPAN_ZONES[Number($('f-zone').value) - 1];
      if (zone) { state.yaw = -rad(zone.lon0); state.tilt = rad(zone.lat0); }
    }
    if (state.lab === 'F' && (id === 'f-lat' || id === 'f-lon')) {
      state.yaw = -rad(Number($('f-lon').value));
      state.tilt = rad(Number($('f-lat').value));
    }
    recalculate();
  });
}
$('show-world').addEventListener('change', () => {
  $('osm-credit').hidden = !$('show-world').checked;
  $('gsi-credit').hidden = !$('show-world').checked;
  $('tile-status').textContent = $('show-world').checked
    ? '表示方向の地図タイルを読み込みます。'
    : '世界地図を非表示にしました（陰影は有効）。';
  renderGlobe();
});
function setZoom(value) {
  if (!Number.isFinite(value)) return;
  const limit = state.lab === 'F' ? JAPAN_ZOOM_MAX : GLOBAL_ZOOM_MAX;
  state.zoom = Math.max(ZOOM_MIN, Math.min(limit, Math.round(value * 10) / 10));
  $('globe-zoom').value = String(state.zoom);
  $('globe-zoom-v').textContent = Math.round(state.zoom * 100) + '%';
  renderGlobe();
}
$('globe-zoom').addEventListener('input', () => setZoom(Number($('globe-zoom').value)));
$('zoom-in').addEventListener('click', () => setZoom(state.zoom + .2));
$('zoom-out').addEventListener('click', () => setZoom(state.zoom - .2));
$('zoom-reset').addEventListener('click', () => setZoom(state.lab === 'F' ? 4 : 1));
view.addEventListener('wheel', event => {
  event.preventDefault();
  setZoom(state.zoom + (event.deltaY < 0 ? 1 : -1) * (state.lab === 'F' ? .3 : .1));
}, { passive: false });
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
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '0'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === '+' || event.key === '=') return setZoom(state.zoom + (state.lab === 'F' ? .4 : .2));
  if (event.key === '-') return setZoom(state.zoom - (state.lab === 'F' ? .4 : .2));
  if (event.key === '0') return setZoom(state.lab === 'F' ? 4 : 1);
  if (event.key === 'ArrowLeft') state.yaw += .1;
  if (event.key === 'ArrowRight') state.yaw -= .1;
  if (event.key === 'ArrowUp') state.tilt = Math.min(1.45, state.tilt + .1);
  if (event.key === 'ArrowDown') state.tilt = Math.max(-1.45, state.tilt - .1);
  renderGlobe();
});
view.addEventListener('webglcontextlost', event => {
  event.preventDefault();
  program = null;
  surfaceProgram = null;
  atlasTexture = null;
  detailTiles.clear();
  $('gl-fallback').hidden = false;
  $('gl-fallback').textContent = 'WebGLコンテキストを失いました。数値表は利用できます。復旧を待機します。';
});
view.addEventListener('webglcontextrestored', () => {
  startGL();
  $('gl-fallback').hidden = !!program;
  view.hidden = !program;
  renderGlobe();
});
startGL();
if (!gl) $('tile-status').textContent = 'WebGL2非対応のため世界地図を表示できません。';
setZoom(1);
recalculate();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js', {
      scope: '../', updateViaCache: 'none',
    }).catch(() => {/* The numeric lab remains usable without offline caching. */});
  });
}
