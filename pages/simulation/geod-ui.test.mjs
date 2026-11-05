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
};
const elements = new Map(Object.entries(inputs).map(([id, value]) => [id, new Element(id, value)]));
for (const id of ['globe', 'gl-fallback', 'map-panel', 'map', 'geod-results',
  'geod-questions', 'geod-status', 'globe-caption',
  'a-lat-v', 'a-lon-v', 'a-f-v', 'lab-A', 'lab-B', 'lab-D']) {
  elements.set(id, new Element(id));
}
const buttons = ['A', 'B', 'D'].map(mode => {
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
