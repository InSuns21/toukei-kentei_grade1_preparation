const textbookMaintenanceDirectories = new Set([
  'archive',
  'drafts',
  'migrations',
  'plan_done',
  'plans',
  'plans_progress',
  'prompts',
]);

const textbookMaintenanceRootFiles = new Set([
  'DREAM_THEATER_AUTHORING_STANDARD.md',
  'DREAM_THEATER_EXERCISE_POLICY.md',
  'NUMERICAL_LAB_AUTHORING_STANDARD.md',
  'README.md',
  'REVIEW_PLAN.md',
  'RIKOU_SYLLABUS_COVERAGE.md',
  'SYLLABUS_TERM_COVERAGE.md',
  'dependency-graph.md',
  'dream-theater-archive.json',
  'formal-statement-presentation-guide.md',
  'proof-presentation-guide.md',
  'style-guide.md',
]);

export function isOfflineCacheCandidate(relativePath) {
  const relative = String(relativePath || '')
    .replaceAll('\\\\', '/')
    .replace(/^\.\/+/, '');

  if (!relative) return false;
  if (relative === '.nojekyll') return false;
  if (relative === 'pages-manifest.txt' || relative === 'pages-manifest.json') return false;

  // YAML files are build/authoring metadata (chapter.yaml, knowledge.yaml,
  // glossary.yaml, curriculum.yaml, coverage indexes, etc.). The reader UI
  // never fetches them at runtime, so checking and persisting hundreds of them
  // only makes a manual offline save slower.
  if (/\.ya?ml$/i.test(relative)) return false;

  const segments = relative.split('/');
  if (segments[0] !== 'textbook') return true;

  if (textbookMaintenanceDirectories.has(segments[1])) return false;
  if (segments.includes('review')) return false;

  if (segments.length === 2 && textbookMaintenanceRootFiles.has(segments[1])) {
    return false;
  }

  return true;
}

export function explainOfflineExclusion(relativePath) {
  const relative = String(relativePath || '').replaceAll('\\\\', '/');
  if (/\.ya?ml$/i.test(relative)) return 'authoring-metadata';

  const segments = relative.split('/');
  if (segments[0] === 'textbook') {
    if (textbookMaintenanceDirectories.has(segments[1])) return 'maintenance-directory';
    if (segments.includes('review')) return 'review-artifact';
    if (segments.length === 2 && textbookMaintenanceRootFiles.has(segments[1])) {
      return 'maintenance-file';
    }
  }

  return null;
}
