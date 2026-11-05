// Headless smoke of all lab modes and the numeric fallback. Browser rendering,
// pointer events and actual WebGL are separately reviewed, not claimed here.
import test from 'node:test';
import assert from 'node:assert/strict';

class Element {
  constructor(id = '', value = '') {
    this.id = id; this.value = value; this.hidden = false;
    this.dataset = {}; this.children = []; this.handlers = {};
    this.textContent = ''; this.attributes = {};
    this.height = 470; this.width = 720;
  }
  setAttribute(key, value) { this.attributes[key] = value; }
  addEventListener(name, callback) { this.handlers[name] = callback; }
  getContext() { return null; } // No GPU: the table must still be functional.
  append(...elements) { this.children.push(...elements); }
  replaceChildren(...elements) { this.children = elements; }
}

const inputs = {
  'a-lat': '40', 'a-lon': '140', 'a-f': '1',
  'b-lat1': '35.681236', 'b-lon1': '139.767125',
  'b-lat2': '43.06417', 'b-lon2': '141.34694',
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
const elements = new Map(Object.entries(inputs).map(([id, value]) => [id, new Element(id, value)]));
elements.set('show-world', new Element('show-world'));
elements.get('show-world').checked = true;
for (const id of ['globe', 'gl-fallback', 'map-panel', 'map', 'geod-results',
  'geod-questions', 'geod-status', 'globe-caption', 'osm-credit', 'tile-status',
  'a-lat-v', 'a-lon-v', 'a-f-v', 'lab-A', 'lab-B', 'lab-D', 'lab-E', 'lab-F',
  'e-map-panel', 'e-left-map', 'e-right-map', 'e-left-title', 'e-right-title']) {
  elements.set(id, new Element(id));
}
for (const id of ['f-map-panel', 'f-map', 'f-map-title']) elements.set(id, new Element(id));
for (const id of ['a-section', 'a-section-map', 'globe-zoom-v',
  'zoom-in', 'zoom-out', 'zoom-reset', 'globe-point-role-wrap',
  'globe-point-zone-wrap']) elements.set(id, new Element(id));
const buttons = ['A', 'B', 'D', 'E', 'F'].map(mode => {
  const b = new Element();
  b.dataset.lab = mode;
  return b;
});
globalThis.document = {
  getElementById(id) { assert.ok(elements.has(id), 'unmocked id ' + id); return elements.get(id); },
  querySelectorAll(selector) {
    assert.equal(selector, '[data-lab]');
    return buttons;
  },
  createElement: tag => new Element(tag),
  createElementNS: (ns, tag) => new Element(tag),
};
const $ = id => elements.get(id);
await import('./geod-app.mjs');

test('geodetic mode calculates numbers without WebGL2', () => {
  assert.equal($('globe').hidden, true);
  assert.equal($('gl-fallback').hidden, false);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.equal($('geod-results').children[0].children[0].children.length, 7);
  assert.match($('geod-results').children[0].children[0].children[0].children[0].textContent, /測地緯度/);
});

test('geodesic mode independently computes the two distances', () => {
  buttons[1].handlers.click();
  assert.match($('geod-status').textContent, /計算済み/);
  assert.equal($('map-panel').hidden, true);
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 8);
  assert.match(cells[0].children[1].textContent, /km/);
  assert.match(cells[5].children[1].textContent, /m/);
});

test('near-antipodal inverse failure is visible, not replaced by sphere output', () => {
  $('b-lat2').value = '-35.681236';
  $('b-lon2').value = '-40.232875';
  $('b-lon2').handlers.input();
  assert.equal($('geod-status').dataset.error, 'true');
  assert.match($('geod-status').textContent, /収束/);
  $('b-lat2').value = '43.06417'; $('b-lon2').value = '141.34694';
  $('b-lon2').handlers.input();
  assert.match($('geod-status').textContent, /計算済み/);
});

test('projection mode shows SVG grid, Tissot outline and numeric scale', () => {
  buttons[2].handlers.click();
  assert.equal($('map-panel').hidden, false);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.ok($('map').children.length > 10, 'SVG paths generated');
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 8);
  assert.ok(Number(cells[3].children[1].textContent.split('／')[0].trim()) > 1,
    'scale grows away from the central meridian');
  $('d-model').value = 'sphere';
  $('d-model').handlers.input();
  assert.match(cells[0].children[1].textContent, /楕円体/); // prior table not mutated
  assert.match($('geod-results').children[0].children[0].children[0].children[1].textContent, /球面/);
});

test('equal-area comparison shares the same point and distinguishes local distortion', () => {
  buttons[3].handlers.click();
  assert.equal($('e-map-panel').hidden, false);
  assert.equal($('map-panel').hidden, true);
  assert.match($('geod-status').textContent, /計算済み/);
  const left = $('e-left-map'), right = $('e-right-map');
  assert.ok(left.children.filter(x => x.id === 'path').length >= 20);
  assert.ok(right.children.filter(x => x.id === 'path').length >= 20);
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 7);
  assert.match(cells[3].children[0].textContent, /面積比/);
  const [mercator, equalEarth] = cells[3].children[1].textContent.split('／').map(x => Number(x.trim().replaceAll(',', '')));
  assert.ok(mercator > 1.9 && mercator < 2.1);
  assert.ok(Math.abs(equalEarth - 1) < 1e-5);
  $('e-right').value = 'mollweide'; $('e-right').handlers.input();
  assert.match($('e-right-title').textContent, /Mollweide/);
  $('e-city').value = 'moscow'; $('e-city').handlers.change();
  assert.match($('geod-status').textContent, /計算済み/);
  assert.equal($('e-lat').value, '55.7558');
  $('e-lat').value = '90'; $('e-lat').handlers.input();
  assert.equal($('geod-status').dataset.error, 'true');
  assert.equal(left.children.length, 0, 'invalid location clears stale map');
  $('e-lat').value = '45'; $('e-lat').handlers.input();
  assert.match($('geod-status').textContent, /計算済み/);
});

test('Japanese 19-zone lab exposes fixed origins, axes, scale and datum assumptions', () => {
  buttons[4].handlers.click();
  assert.equal($('f-zone').children.length, 19);
  assert.equal($('globe-point-zone-wrap').hidden, false);
  assert.equal($('globe-point-zone').value, '9');
  assert.equal($('f-map-panel').hidden, false);
  assert.equal($('e-map-panel').hidden, true);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.ok($('f-map').children.filter(element => element.id === 'g').length > 0);
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 10);
  assert.match(cells[1].children[1].textContent, /EPSG:6677/);
  assert.match(cells[4].children[0].textContent, /X（北正）/);
  assert.match(cells[5].children[0].textContent, /Y（東正）/);
  assert.match(cells[3].children[1].textContent, /0.9999/);
  $('f-zone').value = '8'; $('f-zone').handlers.input();
  assert.equal($('globe-point-zone').value, '8');
  assert.match($('f-map-title').textContent, /VIII/);
  assert.match($('geod-results').children[0].children[0].children[1].children[1].textContent,
    /EPSG:6676/);
  $('globe-point-zone').value = '9'; $('globe-point-zone').handlers.change();
  assert.equal($('f-zone').value, '9');
  assert.match($('f-map-title').textContent, /IX/);
  $('f-datum').value = 'grs80-only'; $('f-datum').handlers.input();
  assert.match($('geod-results').children[0].children[0].children[1].children[1].textContent,
    /未指定/);
  $('f-lat').value = ''; $('f-lat').handlers.input();
  assert.equal($('geod-status').dataset.error, 'true');
  assert.equal($('f-map').children.length, 0, 'invalid input clears stale grid');
  $('f-lat').value = '35.681236'; $('f-lat').handlers.input();
  assert.match($('geod-status').textContent, /計算済み/);
});

test('all eight city presets are present and South American coordinates remain signed', () => {
  assert.equal($('a-city').children.length, 8);
  buttons[0].handlers.click();
  $('a-city').value = 'sao-paulo';
  $('a-city').handlers.change();
  assert.equal($('a-lat').value, '-23.5505');
  assert.equal($('a-lon').value, '-46.6333');
  assert.match($('geod-status').textContent, /計算済み/);
  $('a-lat').value = '42';
  $('a-lat').handlers.input();
  assert.equal($('a-city').value, '', 'manual edits clear the preset choice');
});

test('projection city preset also recentres its local central meridian', () => {
  buttons[2].handlers.click();
  $('d-city').value = 'new-york';
  $('d-city').handlers.change();
  assert.equal($('d-lat').value, '40.7128');
  assert.equal($('d-lon0').value, '-74.006');
  assert.match($('geod-status').textContent, /計算済み/);
});

test('near-globe coordinates and city selector stay bidirectionally synchronized', () => {
  buttons[0].handlers.click();
  assert.equal($('globe-point-lat').value, $('a-lat').value);
  $('globe-point-city').value = 'london';
  $('globe-point-city').handlers.change();
  assert.equal($('a-lat').value, '51.5074');
  assert.equal($('a-lon').value, '-0.1278');
  assert.equal($('a-city').value, 'london');
  $('a-lat').value = '38.5'; $('a-lat').handlers.input();
  assert.equal($('globe-point-lat').value, '38.5');
  assert.equal($('globe-point-city').value, '');
  $('globe-point-lon').value = '151.2'; $('globe-point-lon').handlers.change();
  assert.equal($('a-lon').value, '151.2');
  assert.equal($('globe-point-lon').value, '151.2');
  $('globe-point-lat').value = '91'; $('globe-point-lat').handlers.change();
  assert.equal($('a-lat').value, '38.5', 'out-of-range near-globe value is not committed');
  assert.equal($('geod-status').dataset.error, 'true');
  $('globe-point-lat').value = '40'; $('globe-point-lat').handlers.change();
  assert.match($('geod-status').textContent, /計算済み/);
});

test('geodesic near-globe control can choose start or end without modifying the other', () => {
  buttons[1].handlers.click();
  assert.equal($('globe-point-role-wrap').hidden, false);
  assert.equal($('globe-point-lat').value, $('b-lat1').value);
  $('globe-point-role').value = 'end'; $('globe-point-role').handlers.change();
  assert.equal($('globe-point-lat').value, $('b-lat2').value);
  $('globe-point-city').value = 'paris'; $('globe-point-city').handlers.change();
  assert.equal($('b-lat2').value, '48.8566');
  assert.equal($('b-lon2').value, '2.3522');
  assert.equal($('b-lat1').value, '35.681236');
  buttons[3].handlers.click();
  assert.equal($('globe-point-role-wrap').hidden, true);
  assert.equal($('globe-point-lat').value, $('e-lat').value);
  $('globe-point-city').value = 'tokyo'; $('globe-point-city').handlers.change();
  assert.equal($('e-lat').value, '35.6812');
  assert.match($('geod-status').textContent, /計算済み/);
});

test('world map switch leaves shading/numerics available without WebGL2', () => {
  $('show-world').checked = false;
  $('show-world').handlers.change();
  assert.equal($('osm-credit').hidden, true);
  assert.match($('geod-status').textContent, /計算済み/);
  $('show-world').checked = true;
  $('show-world').handlers.change();
  assert.equal($('osm-credit').hidden, false);
});

test('A draws the meridian centre only in the cross-section, and hides it in B/D', () => {
  buttons[0].handlers.click();
  assert.equal($('a-section').hidden, false);
  const diagram = $('a-section-map');
  assert.ok(diagram.children.some(item => item.textContent === 'O'));
  assert.ok(diagram.children.some(item => item.textContent === 'P'));
  const before = diagram.children;
  $('a-lat').value = '72'; $('a-lat').handlers.input();
  assert.notEqual(diagram.children, before, 'section redraws with changed location');
  buttons[1].handlers.click();
  assert.equal($('a-section').hidden, true);
  buttons[2].handlers.click();
  assert.equal($('a-section').hidden, true);
});

test('zoom buttons, slider and keyboard reset stay in range without WebGL2', () => {
  $('zoom-in').handlers.click();
  assert.equal($('globe-zoom').value, '1.2');
  assert.equal($('globe-zoom-v').textContent, '120%');
  $('globe-zoom').value = '2.4'; $('globe-zoom').handlers.input();
  $('zoom-in').handlers.click();
  assert.equal($('globe-zoom').value, '2.4', 'maximum clamped');
  $('globe-zoom').value = '.6'; $('globe-zoom').handlers.input();
  $('zoom-out').handlers.click();
  assert.equal($('globe-zoom').value, '0.6', 'minimum clamped');
  $('zoom-reset').handlers.click();
  assert.equal($('globe-zoom').value, '1');
  assert.match($('geod-status').textContent, /計算済み/);
});
