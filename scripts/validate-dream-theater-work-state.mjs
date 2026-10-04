import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const workPath = path.join(root, 'textbook', 'dream-theater-work.yaml');
const errors = [];

function fail(message) {
  errors.push(message);
}

function readYaml(file) {
  try {
    return YAML.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(path.relative(root, file) + ': YAML parse failed: ' + error.message);
    return null;
  }
}

if (!fs.existsSync(workPath)) {
  console.error('DREAM THEATER work-state validation failed: textbook/dream-theater-work.yaml is missing.');
  process.exit(1);
}

const work = readYaml(workPath);
if (work) {
  for (const key of ['active_series', 'active_plan', 'series_manifest', 'completed_through']) {
    if (typeof work[key] !== 'string' || !work[key].trim()) {
      fail('dream-theater-work.yaml: ' + key + ' must be a non-empty string');
    }
  }
  if (work.next_work != null && (typeof work.next_work !== 'string' || !work.next_work.trim())) {
    fail('dream-theater-work.yaml: next_work must be null or a non-empty string');
  }

  const planPath = path.join(root, work.active_plan || '');
  const seriesPath = path.join(root, work.series_manifest || '');

  if (!fs.existsSync(planPath)) fail('dream-theater-work.yaml: active_plan does not exist: ' + work.active_plan);
  if (!fs.existsSync(seriesPath)) fail('dream-theater-work.yaml: series_manifest does not exist: ' + work.series_manifest);

  const series = fs.existsSync(seriesPath) ? readYaml(seriesPath) : null;
  if (series) {
    if (series.id !== work.active_series) {
      fail('series manifest id ' + (series.id || '<missing>') + ' does not match active_series ' + work.active_series);
    }
    if (series.plan !== work.active_plan) {
      fail('series manifest plan ' + (series.plan || '<missing>') + ' does not match active_plan ' + work.active_plan);
    }

    if (!Array.isArray(series.chapters) || series.chapters.length === 0) {
      fail('series manifest chapters must be a non-empty array');
    } else {
      const ids = new Map();
      for (const chapter of series.chapters) {
        if (!chapter || !chapter.id || ids.has(chapter.id)) {
          fail('series manifest has missing or duplicate chapter id: ' + ((chapter && chapter.id) || '<missing>'));
          continue;
        }
        ids.set(chapter.id, chapter);
        if (!['planned', 'completed'].includes(chapter.status)) {
          fail(chapter.id + ': unsupported status ' + (chapter.status || '<missing>'));
        }
        if (chapter.status === 'completed') {
          const chapterPath = path.join(root, chapter.path || '');
          if (!chapter.path || !fs.existsSync(chapterPath)) {
            fail(chapter.id + ': completed chapter path does not exist: ' + (chapter.path || '<missing>'));
          }
        }
      }

      const completed = ids.get(work.completed_through);
      if (!completed) fail('completed_through is not present in series manifest: ' + work.completed_through);
      else if (completed.status !== 'completed') fail(work.completed_through + ': completed_through must have status completed');

      if (work.next_work) {
        const next = ids.get(work.next_work);
        if (!next) fail('next_work is not present in series manifest: ' + work.next_work);
        else if (next.status !== 'planned') fail(work.next_work + ': next_work must have status planned');

        if (work.after_next) {
          const after = ids.get(work.after_next);
          if (!after) fail('after_next is not present in series manifest: ' + work.after_next);
          else if (after.status !== 'planned') fail(work.after_next + ': after_next must have status planned');
        }
      } else {
        const planned = series.chapters.filter((chapter) => chapter && chapter.status === 'planned');
        if (planned.length > 0) {
          fail('next_work may be null only when the series has no planned chapters');
        }
        const last = series.chapters.at(-1);
        if (last && last.id !== work.completed_through) {
          fail('terminal series state must set completed_through to the final chapter: ' + last.id);
        }
        if (work.after_next) {
          fail('after_next must be null when next_work is null');
        }
      }

      if (fs.existsSync(planPath) && work.next_work) {
        const plan = fs.readFileSync(planPath, 'utf8');
        const heading = new RegExp('^###\\s+' + work.next_work + '\\b', 'mu');
        if (!heading.test(plan)) fail('active plan does not contain a chapter heading for next_work ' + work.next_work);
      }
    }
  }
}

if (errors.length) {
  console.error('DREAM THEATER work-state validation failed with ' + errors.length + ' issue(s):');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

const nextLabel = work.next_work || '<series complete>';
console.log('DREAM THEATER work-state router is consistent: ' + work.active_series + ' / completed through ' + work.completed_through + ' / next ' + nextLabel + '.');
