// GPU-API-path smoke without a browser or external tile traffic. Shader driver
// compilation and actual pixels are covered separately by browser/visual QA.
import test from 'node:test';
import assert from 'node:assert/strict';

class NodeElement {
  constructor(id = '', value = '') {
    this.id = id; this.value = value; this.hidden = false;
    this.checked = true; this.dataset = {}; this.children = []; this.handlers = {};
    this.textContent = ''; this.height = 470; this.width = 720;
  }
  addEventListener(type, handler) { this.handlers[type] = handler; }
  setAttribute() {}
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children = items; }
  getContext(kind) {
    if (kind === 'webgl2') return gpu;
    if (kind === '2d') return { fillRect() {}, drawImage() {}, fillStyle: '' };
    return null;
  }
}

const calls = { draws: [], textureUploads: 0, modes: [], blends: [], depthWrites: [] };
let shaderId = 0, programId = 0;
const gpu = new Proxy({
  TRIANGLES: 4, LINES: 1, POINTS: 0, VERTEX_SHADER: 35633, FRAGMENT_SHADER: 35632,
  COMPILE_STATUS: 35713, LINK_STATUS: 35714, ARRAY_BUFFER: 34962,
  DYNAMIC_DRAW: 35048, FLOAT: 5126, DEPTH_TEST: 2929, LESS: 513,
  BLEND: 3042, SRC_ALPHA: 770, ONE_MINUS_SRC_ALPHA: 771,
  COLOR_BUFFER_BIT: 16384, DEPTH_BUFFER_BIT: 256,
  TEXTURE_2D: 3553, TEXTURE0: 33984, RGBA: 6408, UNSIGNED_BYTE: 5121,
  UNPACK_FLIP_Y_WEBGL: 37440, TEXTURE_WRAP_S: 10242, TEXTURE_WRAP_T: 10243,
  CLAMP_TO_EDGE: 33071, TEXTURE_MIN_FILTER: 10241, TEXTURE_MAG_FILTER: 10240,
  LINEAR: 9729,
  createShader: () => ({ id: ++shaderId }),
  createProgram: () => ({ id: ++programId }),
  createBuffer: () => ({}), createTexture: () => ({}),
  getShaderParameter: () => true, getProgramParameter: () => true,
  getAttribLocation: (program, attribute) =>
    attribute === 'position' ? 0 : attribute === 'uv' ? 1 : 2,
  getUniformLocation: (program, uniform) => uniform,
  texImage2D: () => calls.textureUploads++,
  blendFunc: (...args) => calls.blends.push(args),
  depthMask: value => calls.depthWrites.push(value),
  drawArrays: (mode, first, count) => calls.draws.push({ mode, count }),
  uniform1i: (uniform, value) => {
    if (uniform === 'showMap') calls.modes.push(value);
  },
}, { get: (obj, key) => key in obj ? obj[key] : () => {} });

const values = {
  'a-lat': '40', 'a-lon': '140', 'a-f': '1',
  'b-lat1': '35.681236', 'b-lon1': '139.767125',
  'b-lat2': '43.06417', 'b-lon2': '141.34694',
  'c-mode': 'survey', 'c-gnss-layout': 'spread', 'c-gnss-count': '6',
  'c-gnss-azimuth': '0', 'c-gnss-elevation': '75', 'c-gnss-clock': '75', 'c-gnss-sigma': '1',
  'c-gnss-stage': 'none', 'c-gnss-sat-clock': '12', 'c-gnss-iono': '4',
  'c-gnss-tropo': '2.3', 'c-gnss-correction': 'raw', 'c-gnss-view': 'sky',
  'c-gnss-view-azimuth': '35', 'c-gnss-view-tilt': '30',
  'c-sigma-a': '0.05', 'c-sigma-b': '0.05', 'c-sigma-c': '0.10', 'c-bias': '0.30',
  'd-lat': '36', 'd-lon': '142', 'd-lon0': '139.8333333333',
  'd-lat0': '36', 'd-k0': '0.9999', 'd-model': 'ellipsoid',
  'e-lat': '45', 'e-lon': '70', 'e-left': 'mercator', 'e-right': 'equalEarth',
  'f-lat': '35.681236', 'f-lon': '139.767125',
  'f-zone': '9', 'f-datum': 'jgd2011',
  'a-city': '', 'b-city1': '', 'b-city2': '', 'd-city': '', 'e-city': '', 'f-city': '',
  'globe-point-role': 'start', 'globe-point-zone': '9', 'globe-point-city': '',
  'globe-point-lat': '', 'globe-point-lon': '',
  'globe-zoom': '1',
};
const elements = new Map(Object.entries(values).map(([id, value]) => [id, new NodeElement(id, value)]));
for (const id of ['geod-workspace', 'show-world', 'globe', 'gl-fallback', 'map-panel', 'map',
  'geod-results', 'geod-questions', 'geod-status', 'globe-caption',
  'osm-credit', 'gsi-credit', 'tile-status', 'a-lat-v', 'a-lon-v', 'a-f-v',
  'lab-A', 'lab-B', 'lab-C', 'lab-D', 'lab-E', 'lab-F', 'e-map-panel', 'e-left-map', 'e-right-map',
  'e-left-title', 'e-right-title', 'a-section', 'a-section-map',
  'globe-zoom-v', 'zoom-in', 'zoom-out', 'zoom-reset',
  'f-map-panel', 'f-map', 'f-map-title', 'c-map-panel', 'c-map',
  'c-survey-controls', 'c-gnss-controls', 'c-gnss-panel', 'c-gnss-map',
  'c-gnss-visual-controls', 'c-gnss-camera-controls', 'c-gnss-space-panel',
  'c-gnss-space-map', 'c-gnss-gl-wrap', 'c-gnss-space-canvas',
  'c-gnss-space-labels',
  'geod-globe-panel']) elements.set(id, new NodeElement(id));
elements.set('globe-point-role-wrap', new NodeElement('globe-point-role-wrap'));
elements.set('globe-point-zone-wrap', new NodeElement('globe-point-zone-wrap'));
const buttons = ['A', 'B', 'C', 'D', 'E', 'F'].map(lab => {
  const b = new NodeElement(); b.dataset.lab = lab; return b;
});
globalThis.document = {
  getElementById(id) { assert.ok(elements.has(id), 'unknown ID ' + id); return elements.get(id); },
  createElement: tag => new NodeElement(tag),
  createElementNS: (namespace, tag) => new NodeElement(tag),
  querySelectorAll: query => query === '[data-lab]' ? buttons : [],
};
const requested = [];
globalThis.Image = class {
  set src(url) { requested.push({ url, image: this }); }
};
await import('./geod-app.mjs');

test('shaded surface and graticule use independent GL drawing paths', () => {
  assert.ok(calls.draws.some(draw => draw.mode === gpu.TRIANGLES && draw.count > 1000));
  assert.ok(calls.draws.some(draw => draw.mode === gpu.LINES));
  assert.equal(calls.modes.at(-1), 1);
  assert.ok(calls.textureUploads >= 1);
});

test('real XYZ URL requests are limited to facing low-zoom tiles', () => {
  assert.ok(requested.length > 0 && requested.length < 16);
  for (const item of requested) {
    assert.match(item.url, /^https:\/\/tile\.openstreetmap\.org\/2\/[0-3]\/[0-3]\.png$/);
  }
  const before = calls.textureUploads;
  requested[0].image.onload();
  assert.equal(calls.textureUploads, before + 1, 'loaded raster tile refreshes GPU atlas');
});

test('map toggle turns texture off while shading stays active', () => {
  elements.get('show-world').checked = false;
  elements.get('show-world').handlers.change();
  assert.equal(calls.modes.at(-1), 0);
  assert.ok(calls.draws.at(-1));
  assert.equal(elements.get('osm-credit').hidden, true);
  elements.get('show-world').checked = true;
  elements.get('show-world').handlers.change();
  assert.equal(calls.modes.at(-1), 1);
});

test('city navigation moves the globe and can request newly visible tiles', () => {
  const count = requested.length;
  elements.get('a-city').value = 'new-york';
  elements.get('a-city').handlers.change();
  assert.ok(requested.length > count);
  assert.match(elements.get('geod-status').textContent, /計算済み/);
});

test('zoom controls redraw shaded geometry without fetching more XYZ tiles', () => {
  const draws = calls.draws.length, tiles = requested.length;
  elements.get('zoom-in').handlers.click();
  assert.equal(elements.get('globe-zoom-v').textContent, '120%');
  assert.ok(calls.draws.length > draws, 'zoom redraws the WebGL globe');
  assert.equal(requested.length, tiles, 'display-only zoom never requests higher tile levels');
  elements.get('zoom-reset').handlers.click();
  assert.equal(elements.get('globe-zoom').value, '1');
});


test('survey adjustment omits globe redraw but produces a standalone SVG', () => {
  const draws = calls.draws.length;
  buttons[2].handlers.click();
  assert.equal(elements.get('geod-globe-panel').hidden, true);
  assert.equal(elements.get('c-map-panel').hidden, false);
  assert.ok(elements.get('c-map').children.length > 15);
  assert.equal(calls.draws.length, draws, 'C works without a 3D rendering pass');
  assert.match(elements.get('geod-status').textContent, /計算済み/);
  buttons[0].handlers.click();
  assert.equal(elements.get('geod-globe-panel').hidden, false);
});

test('GNSS 2D stays DOM-only; 3D uses shaded WebGL without changing DOP', () => {
  const draws = calls.draws.length;
  buttons[2].handlers.click();
  elements.get('c-mode').value = 'gnss';
  elements.get('c-mode').handlers.input();
  assert.equal(elements.get('c-map-panel').hidden, true);
  assert.equal(elements.get('c-gnss-panel').hidden, false);
  assert.ok(elements.get('c-gnss-map').children.length > 20);
  assert.equal(calls.draws.length, draws, '2D GNSS does not redraw the globe');
  const dop = elements.get('geod-results').children[0].children[0].children[6]
    .children[1].textContent;
  elements.get('c-gnss-view').value = 'space';
  elements.get('c-gnss-view').handlers.input();
  assert.equal(elements.get('c-gnss-space-panel').hidden, false);
  assert.equal(elements.get('c-gnss-gl-wrap').hidden, false);
  assert.equal(elements.get('c-gnss-space-map').hidden, true);
  assert.ok(calls.draws.length > draws, '3D adds WebGL triangles and 3D ring lines');
  assert.ok(calls.draws.slice(draws).some(item => item.mode === gpu.TRIANGLES && item.count > 500));
  const beforeRotate = calls.draws.length;
  elements.get('c-gnss-view-azimuth').value = '150';
  elements.get('c-gnss-view-azimuth').handlers.input();
  assert.ok(calls.draws.length > beforeRotate, 'camera change redraws WebGL');
  assert.equal(elements.get('geod-results').children[0].children[0].children[6]
    .children[1].textContent, dop, 'camera does not alter DOP');
  elements.get('c-gnss-stage').value = 'all';
  elements.get('c-gnss-stage').handlers.input();
  assert.equal(calls.modes.at(-1), 1, 'the unrelated globe renderer is not redrawn');
  elements.get('c-gnss-layout').value = 'low';
  elements.get('c-gnss-layout').handlers.input();
  assert.ok(calls.draws.length > beforeRotate);
  assert.match(elements.get('geod-results').children[0].children[0].children[7]
    .children[0].textContent, /VDOP/);
  elements.get('c-gnss-view').value = 'sky';
  elements.get('c-gnss-view').handlers.input();
  const afterSky = calls.draws.length;
  elements.get('c-gnss-clock').value = '100';
  elements.get('c-gnss-clock').handlers.input();
  assert.equal(calls.draws.length, afterSky, '2D numerical changes remain independent of WebGL');
  buttons[0].handlers.click();
});

test('global comparison shows both projected diagrams with the shared 3D marker', () => {
  const drawBefore = calls.draws.length;
  buttons[4].handlers.click();
  assert.equal(elements.get('e-map-panel').hidden, false);
  assert.ok(elements.get('e-left-map').children.length > 20);
  assert.ok(elements.get('e-right-map').children.length > 20);
  assert.ok(calls.draws.length > drawBefore);
  assert.match(elements.get('geod-status').textContent, /計算済み/);
});

test('near-globe location controls update both the A input and the WebGL view', () => {
  buttons[0].handlers.click();
  const initial = requested.length, draws = calls.draws.length;
  elements.get('globe-point-city').value = 'paris';
  elements.get('globe-point-city').handlers.change();
  assert.equal(elements.get('a-lat').value, '48.8566');
  assert.equal(elements.get('a-lon').value, '2.3522');
  assert.ok(calls.draws.length > draws);
  assert.ok(requested.length >= initial);
});

test('F zooms to Japan and overlays a bounded, viewport-sized GSI tile footprint', () => {
  const before = requested.length;
  buttons[5].handlers.click();
  assert.equal(elements.get('globe-zoom').max, '12');
  assert.equal(elements.get('globe-zoom').value, '4');
  assert.equal(elements.get('globe-point-zone-wrap').hidden, false);
  const japanTiles = requested.slice(before).filter(item =>
    item.url.startsWith('https://cyberjapandata.gsi.go.jp/xyz/std/'));
  assert.equal(japanTiles.length, 25, 'only a 5×5 Japanese viewport is fetched');
  assert.ok(japanTiles.every(item => /\/4\/\d+\/\d+\.png$/.test(item.url)));
  assert.equal(elements.get('gsi-credit').hidden, false);
  const uploads = calls.textureUploads, draws = calls.draws.length;
  japanTiles[0].image.onload();
  assert.equal(calls.textureUploads, uploads + 1);
  assert.ok(calls.draws.length > draws, 'loaded detailed tile is rendered on ellipsoid');
  assert.deepEqual(calls.blends.at(-1), [gpu.SRC_ALPHA, gpu.ONE_MINUS_SRC_ALPHA]);
  assert.deepEqual(calls.depthWrites.slice(-2), [false, true], 'transparent parts preserve base globe');
  assert.match(elements.get('tile-status').textContent, /地理院標準地図.*1\/25枚表示/);

  elements.get('globe-zoom').value = '12';
  elements.get('globe-zoom').handlers.input();
  assert.equal(elements.get('globe-zoom-v').textContent, '1200%');
  const fine = requested.filter(item => /\/std\/6\/\d+\/\d+\.png$/.test(item.url));
  assert.equal(fine.length, 25, 'z6 covers approximately 28 degrees at 1200%');
  assert.equal(new Set(fine.map(item => item.url)).size, 25, 'no duplicate fine requests');
  elements.get('show-world').checked = false;
  elements.get('show-world').handlers.change();
  assert.equal(elements.get('gsi-credit').hidden, true);
  buttons[0].handlers.click();
  assert.equal(elements.get('globe-zoom').max, '2.4');
  assert.equal(elements.get('globe-zoom').value, '1');
});
