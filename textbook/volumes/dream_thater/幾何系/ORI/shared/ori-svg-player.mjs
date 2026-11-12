/** ORI 動くSVGの共通時間制御。数理状態の計算と描画は各講義側に置く。 */
export function mountPlayer({ root = document, render, steps, durationMs = 8000, reducedPosterTime = 1 }) {
  if (typeof render !== 'function' || !Array.isArray(steps) || steps[0] !== 0 || steps.at(-1) !== 1) {
    throw new Error('render と 0〜1 の工程リストが必要です');
  }
  const get = name => {
    const element = root.querySelector(`[data-player="${name}"]`);
    if (!element) throw new Error(`再生器の要素がありません: ${name}`);
    return element;
  };
  const play = get('play');
  const reset = get('reset');
  const previous = get('previous');
  const next = get('next');
  const slider = get('time');
  const speed = get('speed');
  const status = get('status');
  const stepStatus = get('step');
  const announcement = get('announcement');
  const reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let t = reducedMotion ? reducedPosterTime : 0;
  let running = false;
  let animationId = null;
  let lastTimestamp = null;
  let announcedStep = '';

  const clamp = value => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  function sync(forceAnnounce = false) {
    slider.value = String(t);
    slider.setAttribute('aria-valuetext', `全工程の${Math.round(t * 100)}パーセント`);
    const { readout, step } = render(t);
    status.textContent = readout;
    stepStatus.textContent = step;
    if (forceAnnounce || (!running && step !== announcedStep)) {
      announcement.textContent = `${step}。${readout}`;
      announcedStep = step;
    }
    play.textContent = running ? '一時停止' : '再生';
    play.setAttribute('aria-pressed', String(running));
  }
  function stop() {
    running = false;
    lastTimestamp = null;
    if (animationId !== null) cancelAnimationFrame(animationId);
    animationId = null;
  }
  function seek(value) {
    stop();
    t = clamp(value);
    sync(true);
  }
  function tick(timestamp) {
    if (!running) return;
    if (lastTimestamp !== null) t = clamp(t + (timestamp - lastTimestamp) * Number(speed.value) / durationMs);
    lastTimestamp = timestamp;
    if (t >= 1) stop();
    sync(!running);
    if (running) animationId = requestAnimationFrame(tick);
  }
  play.addEventListener('click', () => {
    if (running) { stop(); sync(true); return; }
    if (t >= 1) t = 0;
    running = true;
    lastTimestamp = null;
    sync(true);
    animationId = requestAnimationFrame(tick);
  });
  reset.addEventListener('click', () => seek(0));
  slider.addEventListener('input', () => seek(Number(slider.value)));
  const jump = direction => {
    const epsilon = 1e-7;
    const target = direction > 0
      ? steps.find(s => s > t + epsilon) ?? 1
      : steps.findLast(s => s < t - epsilon) ?? 0;
    seek(target);
  };
  previous.addEventListener('click', () => jump(-1));
  next.addEventListener('click', () => jump(1));
  speed.addEventListener('change', () => sync(true));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && running) { stop(); sync(true); }
  });
  sync(true);
  // A directly opened video also registers the common Pages offline worker.
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    const sw = new URL('../../../../../../service-worker.js', import.meta.url);
    navigator.serviceWorker.register(sw.href, {scope: new URL('./', sw).href})
      .catch(() => { /* Offline unavailable; formulas and static poster still work. */ });
  }
  return { seek, stop, get time() { return t; }, get playing() { return running; } };
}
