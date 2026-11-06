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
  'c-mode': 'survey', 'c-gnss-layout': 'spread', 'c-gnss-count': '6',
  'c-gnss-azimuth': '0', 'c-gnss-elevation': '75', 'c-gnss-clock': '75', 'c-gnss-sigma': '1',
  'c-gnss-stage': 'none', 'c-gnss-sat-clock': '12', 'c-gnss-iono': '4',
  'c-gnss-tropo': '2.3', 'c-gnss-correction': 'raw', 'c-gnss-view': 'sky',
  'c-gnss-view-azimuth': '35', 'c-gnss-view-tilt': '30',
  'c-sigma-a': '0.05', 'c-sigma-b': '0.05', 'c-sigma-c': '0.10', 'c-bias': '0.30',
  'c-height-na': '35.2', 'c-height-dn': '-8', 'c-height-ha': '123.4',
  'c-height-hb': '150', 'c-height-ga': '9.8', 'c-height-dg': '0.02',
  'c-height-gradient': '3',
  'd-lat': '36', 'd-lon': '142', 'd-lon0': '139.8333333333',
  'd-lat0': '36', 'd-k0': '0.9999', 'd-model': 'ellipsoid',
  'd-inverse-e': '', 'd-inverse-n': '',
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
for (const id of ['geod-workspace', 'globe', 'gl-fallback', 'map-panel', 'map', 'geod-results',
  'geod-questions', 'geod-status', 'globe-caption', 'osm-credit', 'gsi-credit', 'tile-status',
  'a-lat-v', 'a-lon-v', 'a-f-v', 'b-antipodal-example',
  'd-copy-to-inverse',
  'lab-A', 'lab-B', 'lab-C', 'lab-D', 'lab-E', 'lab-F',
  'e-map-panel', 'e-left-map', 'e-right-map', 'e-left-title', 'e-right-title']) {
  elements.set(id, new Element(id));
}
for (const id of ['c-map-panel', 'c-map', 'c-survey-controls', 'c-gnss-controls',
  'c-height-controls', 'c-height-panel', 'c-height-map',
  'c-gnss-panel', 'c-gnss-map', 'c-gnss-visual-controls', 'c-gnss-camera-controls',
  'c-gnss-space-panel', 'c-gnss-space-map', 'c-gnss-gl-wrap',
  'c-gnss-space-canvas', 'c-gnss-space-labels', 'geod-globe-panel']) elements.set(id, new Element(id));
for (const id of ['f-map-panel', 'f-map', 'f-map-title']) elements.set(id, new Element(id));
for (const id of ['a-section', 'a-section-map', 'globe-zoom-v',
  'zoom-in', 'zoom-out', 'zoom-reset', 'globe-point-role-wrap',
  'globe-point-zone-wrap']) elements.set(id, new Element(id));
const buttons = ['A', 'B', 'C', 'D', 'E', 'F'].map(mode => {
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
  assert.equal($('geod-workspace').dataset.currentLab, 'A');
  assert.equal($('globe').hidden, true);
  assert.equal($('gl-fallback').hidden, false);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.equal($('geod-results').children[0].children[0].children.length, 7);
  assert.match($('geod-results').children[0].children[0].children[0].children[0].textContent, /測地緯度/);
});

test('geodesic mode independently computes the two distances', () => {
  buttons[1].handlers.click();
  assert.equal($('geod-workspace').dataset.currentLab, 'B');
  assert.match($('geod-status').textContent, /計算済み/);
  assert.equal($('map-panel').hidden, true);
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 10);
  assert.match(cells[0].children[1].textContent, /km/);
  assert.match(cells[5].children[1].textContent, /m/);
});

test('near-antipodal preset calculates a stable ellipsoidal route without WebGL', () => {
  $('b-antipodal-example').handlers.click();
  assert.equal($('b-lat1').value, '-30');
  assert.equal($('b-lon2').value, '179.8');
  assert.equal($('geod-status').dataset.error, 'false');
  const table = $('geod-results').children[0].children[0].children;
  assert.match(table[0].children[1].textContent, /19,989\.832827/);
  assert.match(table.at(-1).children[1].textContent, /非収束/);
  $('b-lat1').value = '0'; $('b-lon1').value = '0';
  $('b-lat2').value = '0'; $('b-lon2').value = '180';
  $('b-lon2').handlers.input();
  assert.equal($('geod-status').dataset.error, 'false', 'exact antipodes must be solvable');
  $('b-lat2').value = '43.06417'; $('b-lon2').value = '141.34694';
  $('b-lat1').value = '35.681236'; $('b-lon1').value = '139.767125';
  $('b-lon2').handlers.input();
  assert.match($('geod-status').textContent, /計算済み/);
});


test('synthetic survey mode draws distances, reports covariance and responds to weights', () => {
  buttons[2].handlers.click();
  assert.equal($('geod-workspace').dataset.currentLab, 'C');
  assert.equal($('c-map-panel').hidden, false);
  assert.equal($('geod-globe-panel').hidden, true, '3D globe is unrelated to local surveying');
  assert.equal($('map-panel').hidden, true);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.ok($('c-map').children.length > 15, 'survey diagram generated');
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 11);
  assert.match(cells[8].children[0].textContent, /共分散/);
  const start = cells[1].children[1].textContent;
  $('c-bias').value = '2';
  $('c-bias').handlers.input();
  assert.notEqual($('geod-results').children[0].children[0].children[1].children[1].textContent,
    start, 'bias changes estimated coordinates');
  $('c-sigma-c').value = '1';
  $('c-sigma-c').handlers.input();
  assert.match($('geod-status').textContent, /計算済み/);
  $('c-sigma-a').value = '0';
  $('c-sigma-a').handlers.input();
  assert.equal($('geod-status').dataset.error, 'true');
  assert.equal($('c-map').children.length, 0, 'invalid sigma clears stale diagram');
  $('c-sigma-a').value = '0.05';
  $('c-sigma-a').handlers.input();
  assert.match($('geod-status').textContent, /計算済み/);
});

test('GNSS modes show 2D/3D sky geometry and staged systematic errors', () => {
  buttons[2].handlers.click();
  $('c-mode').value = 'gnss'; $('c-mode').handlers.input();
  assert.equal($('c-survey-controls').hidden, true);
  assert.equal($('c-gnss-controls').hidden, false);
  assert.equal($('c-gnss-visual-controls').hidden, false);
  assert.equal($('c-map-panel').hidden, true);
  assert.equal($('c-gnss-panel').hidden, false);
  assert.equal($('c-gnss-space-panel').hidden, true);
  assert.equal($('geod-globe-panel').hidden, true);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.ok($('c-gnss-map').children.length >= 25);
  const rows = () => $('geod-results').children[0].children[0].children;
  assert.equal(rows().length, 17);
  assert.match(rows()[6].children[0].textContent, /GDOP/);
  assert.match(rows()[7].children[0].textContent, /HDOP/);
  const dopSpread = rows()[6].children[1].textContent;
  $('c-gnss-layout').value = 'cluster'; $('c-gnss-layout').handlers.input();
  assert.equal($('c-gnss-azimuth').value, '15');
  assert.equal($('c-gnss-elevation').value, '35');
  const dopCluster = rows()[6].children[1].textContent;
  assert.notEqual(dopCluster, dopSpread);
  const clockBefore = rows()[3].children[1].textContent;
  $('c-gnss-clock').value = '-75'; $('c-gnss-clock').handlers.input();
  assert.notEqual(rows()[3].children[1].textContent, clockBefore);
  assert.equal(rows()[6].children[1].textContent, dopCluster);

  const baselinePosition = rows()[1].children[1].textContent;
  $('c-gnss-stage').value = 'all'; $('c-gnss-stage').handlers.input();
  assert.notEqual(rows()[1].children[1].textContent, baselinePosition);
  assert.match(rows()[12].children[1].textContent, /対流圏/);
  assert.match(rows()[13].children[1].textContent, /電離圏/);
  assert.ok(Number(rows()[15].children[1].textContent.split(' ')[0].replaceAll(',', '')) > 0);
  const bias = rows()[14].children[1].textContent;
  $('c-gnss-correction').value = 'ideal'; $('c-gnss-correction').handlers.input();
  assert.notEqual($('geod-status').dataset.error, 'true', $('geod-status').textContent);
  assert.notEqual(rows()[14].children[1].textContent, bias);
  assert.match(rows()[12].children[1].textContent, /理想的/);
  assert.equal(rows()[6].children[1].textContent, dopCluster, 'DOP depends on directions');

  const savedResults = rows()[6].children[1].textContent;
  $('c-gnss-view').value = 'space'; $('c-gnss-view').handlers.input();
  assert.equal($('c-gnss-panel').hidden, true);
  assert.equal($('c-gnss-space-panel').hidden, false);
  assert.equal($('c-gnss-camera-controls').hidden, false);
  assert.equal($('c-gnss-gl-wrap').hidden, true, 'SVG stays available without WebGL2');
  assert.equal($('c-gnss-space-map').hidden, false);
  assert.ok($('c-gnss-space-map').children.length > 20, '3D projected hemisphere rendered');
  const firstX = $('c-gnss-space-map').children.find(item =>
    item.id === 'circle' && item.attributes.fill === '#cf5037').attributes.cx;
  $('c-gnss-view-azimuth').value = '155'; $('c-gnss-view-azimuth').handlers.input();
  const newX = $('c-gnss-space-map').children.find(item =>
    item.id === 'circle' && item.attributes.fill === '#cf5037').attributes.cx;
  assert.notEqual(firstX, newX, 'camera rotation changes perspective');
  assert.equal(rows()[6].children[1].textContent, savedResults, 'viewpoint leaves numerics unchanged');
  $('c-gnss-space-map').handlers.pointerdown({ clientX: 10, clientY: 10, pointerId: 1 });
  $('c-gnss-space-map').handlers.pointermove({ clientX: 70, clientY: 45 });
  $('c-gnss-space-map').handlers.pointerup();
  assert.notEqual($('c-gnss-view-azimuth').value, '155', 'pointer drag rotates hemisphere');

  $('c-gnss-sigma').value = '0'; $('c-gnss-sigma').handlers.input();
  assert.equal($('geod-status').dataset.error, 'true');
  assert.equal($('c-gnss-map').children.length, 0);
  assert.equal($('c-gnss-space-map').children.length, 0);
  $('c-gnss-sigma').value = '1'; $('c-gnss-sigma').handlers.input();
  assert.match($('geod-status').textContent, /計算済み/);
  $('c-gnss-view').value = 'sky'; $('c-gnss-view').handlers.input();
  $('c-mode').value = 'survey'; $('c-mode').handlers.input();
  assert.equal($('c-survey-controls').hidden, false);
  assert.equal($('c-gnss-visual-controls').hidden, true);
  assert.equal($('c-gnss-panel').hidden, true);
  assert.ok($('c-map').children.length > 15);
});

test('height mode stays available without WebGL, changes h/N/H and rejects invalid values', () => {
  buttons[2].handlers.click();
  $('c-mode').value = 'height'; $('c-mode').handlers.input();
  assert.equal($('c-survey-controls').hidden, true);
  assert.equal($('c-gnss-controls').hidden, true);
  assert.equal($('c-height-controls').hidden, false);
  assert.equal($('c-height-panel').hidden, false);
  assert.equal($('c-map-panel').hidden, true);
  assert.equal($('c-gnss-panel').hidden, true);
  assert.equal($('geod-globe-panel').hidden, true);
  assert.ok($('c-height-map').children.length > 35);
  const rows = () => $('geod-results').children[0].children[0].children;
  assert.equal(rows().length, 13);
  assert.match(rows()[3].children[1].textContent, /88\.200/);
  const heightBefore = rows()[3].children[1].textContent;
  $('c-height-na').value = '-12'; $('c-height-na').handlers.input();
  assert.notEqual(rows()[3].children[1].textContent, heightBefore);
  assert.equal($('geod-status').dataset.error, 'false');
  $('c-height-ga').value = '0'; $('c-height-ga').handlers.input();
  assert.equal($('geod-status').dataset.error, 'true');
  assert.equal($('c-height-map').children.length, 0, 'invalid model clears stale figure');
  $('c-height-ga').value = '9.8'; $('c-height-ga').handlers.input();
  assert.equal($('geod-status').dataset.error, 'false');
  $('c-mode').value = 'survey'; $('c-mode').handlers.input();
  assert.equal($('c-height-controls').hidden, true);
  assert.equal($('c-height-panel').hidden, true);
  assert.ok($('c-map').children.length > 10);
});

test('projection mode shows SVG grid, Tissot outline and numeric scale', () => {
  buttons[3].handlers.click();
  assert.equal($('map-panel').hidden, false);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.ok($('map').children.length > 10, 'SVG paths generated');
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 11);
  assert.match(cells[2].children[0].textContent, /独立逆級数/);
  assert.ok(Number(cells[6].children[1].textContent.split('／')[0].trim()) > 1,
    'scale grows away from the central meridian');
  $('d-copy-to-inverse').handlers.click();
  assert.ok(Number.isFinite(Number($('d-inverse-e').value)));
  assert.match($('geod-results').children[0].children[0].children[4].children[1].textContent,
    /往復残差/);
  $('d-inverse-e').value = '999999999';
  $('d-inverse-e').handlers.input();
  assert.equal($('geod-status').dataset.error, 'true');
  $('d-inverse-e').value = '';
  $('d-inverse-n').value = '';
  $('d-inverse-e').handlers.input();
  assert.equal($('geod-status').dataset.error, 'false');
  $('d-model').value = 'sphere';
  $('d-model').handlers.input();
  assert.match(cells[0].children[1].textContent, /楕円体/); // prior table not mutated
  assert.match($('geod-results').children[0].children[0].children[0].children[1].textContent, /球面/);
});

test('equal-area comparison shares the same point and distinguishes local distortion', () => {
  buttons[4].handlers.click();
  assert.equal($('e-map-panel').hidden, false);
  assert.equal($('map-panel').hidden, true);
  assert.match($('geod-status').textContent, /計算済み/);
  const left = $('e-left-map'), right = $('e-right-map');
  assert.ok(left.children.filter(x => x.id === 'path').length >= 20);
  assert.ok(right.children.filter(x => x.id === 'path').length >= 20);
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 10);
  assert.match(cells[4].children[0].textContent, /面積比/);
  const [mercator, equalEarth] = cells[4].children[1].textContent.split('／').map(x => Number(x.trim().replaceAll(',', '')));
  assert.ok(mercator > 1.9 && mercator < 2.1);
  assert.ok(Math.abs(equalEarth - 1) < 1e-5);
  assert.match(cells[9].children[0].textContent, /地上1 km²/);
  assert.match(cells[0].children[1].textContent, /GRS80楕円体/);
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
  buttons[5].handlers.click();
  assert.equal($('f-zone').children.length, 19);
  assert.equal($('globe-point-zone-wrap').hidden, false);
  assert.equal($('globe-point-zone').value, '9');
  assert.equal($('f-map-panel').hidden, false);
  assert.equal($('e-map-panel').hidden, true);
  assert.match($('geod-status').textContent, /計算済み/);
  assert.ok($('f-map').children.filter(element => element.id === 'g').length > 0);
  const cells = $('geod-results').children[0].children[0].children;
  assert.equal(cells.length, 12);
  assert.match(cells[1].children[1].textContent, /EPSG:6677/);
  assert.match(cells[3].children[0].textContent, /告示に基づく適用区域/);
  assert.match(cells[5].children[0].textContent, /X（北正）/);
  assert.match(cells[6].children[0].textContent, /Y（東正）/);
  assert.match(cells[4].children[1].textContent, /0.9999/);
  assert.match(cells[10].children[1].textContent, /ポリゴン照合/);
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
  buttons[3].handlers.click();
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
  buttons[4].handlers.click();
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
  assert.equal($('gsi-credit').hidden, true);
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
  buttons[3].handlers.click();
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
