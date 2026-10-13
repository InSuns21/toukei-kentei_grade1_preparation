// Rendering-only adapters. All data comes from the engine; no interpolation
// here is ever returned as a numerical solution.
export function validatePlot(plot) {
  if (!["line", "scatter", "heatmap", "histogram", "table"].includes(plot?.type)) {
    throw new TypeError("Unsupported plot type");
  }
  if (plot.type !== "table") {
    for (const axis of [plot.xAxis, plot.yAxis]) {
      if (typeof axis?.label !== "string" || typeof axis?.unit !== "string") {
        throw new TypeError("Plot axes must declare labels and units");
      }
    }
  }
  return plot;
}

export function drawPlot(canvas, plot, zoom = 1) {
  validatePlot(plot);
  if (plot.type === "table") throw new Error("Use renderTable");
  if (!Number.isFinite(zoom) || zoom < 0.25 || zoom > 8) {
    throw new RangeError("Zoom must be between 0.25 and 8");
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  const w = canvas.width, h = canvas.height, pad = 55;
  ctx.clearRect(0, 0, w, h);
  ctx.font = "13px system-ui";
  ctx.fillStyle = "#1d2a3b";
  ctx.fillText(plot.xAxis.label + " (" + plot.xAxis.unit + ")", w / 2 - 80, h - 10);
  ctx.save();
  ctx.translate(15, h / 2 + 65); ctx.rotate(-Math.PI / 2);
  ctx.fillText(plot.yAxis.label + " (" + plot.yAxis.unit + ")", 0, 0);
  ctx.restore();
  if (plot.type === "heatmap") {
    const grid = plot.grid ?? [];
    const width = grid[0]?.length ?? 0;
    if (!width || grid.length > 200 || width > 200 ||
        !grid.every((row) => row.length === width &&
          row.every((value) => Number.isFinite(value) && value >= 0))) {
      throw new Error("Heatmap requires rectangular finite nonnegative grid");
    }
    const max = Math.max(1e-12, ...grid.flat());
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = (0.08 + 0.92 * grid[y][x] / max).toFixed(4);
        ctx.fillStyle = "rgba(28,99,178," + alpha + ")";
        ctx.fillRect(pad + x * (w - 2 * pad) / width,
          pad + y * (h - 2 * pad) / grid.length,
          (w - 2 * pad) / width, (h - 2 * pad) / grid.length);
      }
    }
    return;
  }
  const series = plot.series ?? [];
  const points = series.flatMap((entry) => entry.points ?? []);
  if (!points.length) return;
  if (points.length > 10000 ||
      !points.every((p) => Array.isArray(p) && p.length === 2 &&
        p.every((v) => Number.isFinite(v)))) {
    throw new Error("Invalid or oversized plot coordinates");
  }
  const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
  const xm = (Math.min(...xs) + Math.max(...xs)) / 2;
  const ym = plot.type === "histogram" ? Math.max(...ys) / 2 :
    (Math.min(...ys) + Math.max(...ys)) / 2;
  const dx = Math.max(1e-9, Math.max(...xs) - Math.min(...xs)) / zoom;
  const dy = Math.max(1e-9, plot.type === "histogram" ? Math.max(...ys) :
    Math.max(...ys) - Math.min(...ys)) / zoom;
  const toX = (x) => pad + (x - xm + dx / 2) * (w - 2 * pad) / dx;
  const toY = (y) => h - pad - (y - ym + dy / 2) * (h - 2 * pad) / dy;
  ctx.strokeStyle = "#68758a";
  ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad);
  ctx.lineTo(w - pad, h - pad); ctx.stroke();
  const colors = ["#1457a2", "#c04d3c", "#14724d", "#7654a4"];
  series.forEach((entry, index) => {
    const line = entry.points ?? [];
    const sampled = line.filter((_, i) => i % Math.max(1, Math.ceil(line.length / 800)) === 0);
    ctx.strokeStyle = colors[index % colors.length];
    ctx.fillStyle = colors[index % colors.length];
    ctx.setLineDash(index % 2 === 0 ? [] : [6, 4]);
    ctx.beginPath();
    sampled.forEach((p, i) => {
      const x = toX(p[0]), y = toY(p[1]);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      if (plot.type === "scatter") ctx.fillRect(x - 2, y - 2, 4, 4);
      if (plot.type === "histogram") {
        const baseline = Math.min(h - pad, toY(0));
        ctx.fillRect(x - 5, Math.min(y, baseline), 10, Math.abs(baseline - y));
      }
    });
    if (plot.type === "line") ctx.stroke();
  });
  ctx.setLineDash([]);
}

export function renderTable(container, columns, rows) {
  if (!Array.isArray(columns) || !Array.isArray(rows)) {
    throw new TypeError("Table needs columns and rows");
  }
  const doc = container.ownerDocument;
  const table = doc.createElement("table");
  const tr = table.createTHead().insertRow();
  columns.forEach((name) => {
    const cell = doc.createElement("th");
    cell.scope = "col"; cell.textContent = String(name); tr.append(cell);
  });
  const body = table.createTBody();
  rows.forEach((values) => {
    const row = body.insertRow();
    values.forEach((value) => { row.insertCell().textContent = String(value); });
  });
  container.replaceChildren(table);
}
