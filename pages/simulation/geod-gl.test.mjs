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

const calls = { draws: [], textureUploads: 0, modes: [] };
let shaderId = 0, programId = 0;
const gpu = new Proxy({
  TRIANGLES: 4, LINES: 1, POINTS: 0, VERTEX_SHADER: 35633, FRAGMENT_SHADER: 35632,
  COMPILE_STATUS: 35713, LINK_STATUS: 35714, ARRAY_BUFFER: 34962,
  DYNAMIC_DRAW: 35048, FLOAT: 5126, DEPTH_TEST: 2929, LESS: 513,
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
  drawArrays: (mode, first, count) => calls.draws.push({ mode, count }),
  uniform1i: (uniform, value) => {
    if (uniform === 'showMap') calls.modes.push(value);
  },
}, { get: (obj, key) => key in obj ? obj[key] : () => {} });

const values = {
  'a-lat': '40', 'a-lon': '140', 'a-f': '1',
  'b-lat1': '35.681236', 'b-lon1': '139.767125',
  'b-lat2': '43.06417', 'b-lon2': '141.34694',
  'd-lat': '36', 'd-lon': '142', 'd-lon0': '139.8333333333',
  'd-lat0': '36', 'd-k0': '0.9999', 'd-model': 'ellipsoid',
  'e-lat': '45', 'e-lon': '70', 'e-left': 'mercator', 'e-right': 'equalEarth',
  'a-city': '', 'b-city1': '', 'b-city2': '', 'd-city': '', 'e-city': '',
  'globe-zoom': '1',
};
const elements = new Map(Object.entries(values).map(([id, value]) => [id, new NodeElement(id, value)]));
for (const id of ['show-world', 'globe', 'gl-fallback', 'map-panel', 'map',
  'geod-results', 'geod-questions', 'geod-status', 'globe-caption',
  'osm-credit', 'tile-status', 'a-lat-v', 'a-lon-v', 'a-f-v',
  'lab-A', 'lab-B', 'lab-D', 'lab-E', 'e-map-panel', 'e-left-map', 'e-right-map',
  'e-left-title', 'e-right-title', 'a-section', 'a-section-map',
  'globe-zoom-v', 'zoom-in', 'zoom-out', 'zoom-reset']) elements.set(id, new NodeElement(id));
const buttons = ['A', 'B', 'D', 'E'].map(lab => {
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

test('global comparison shows both projected diagrams with the shared 3D marker', () => {
  const drawBefore = calls.draws.length;
  buttons[3].handlers.click();
  assert.equal(elements.get('e-map-panel').hidden, false);
  assert.ok(elements.get('e-left-map').children.length > 20);
  assert.ok(elements.get('e-right-map').children.length > 20);
  assert.ok(calls.draws.length > drawBefore);
  assert.match(elements.get('geod-status').textContent, /計算済み/);
});
