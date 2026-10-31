import path from 'node:path';

/**
 * Resolve the canonical location of a DREAM THEATER chapter by ID, using the
 * in-memory catalog derived from the public contents page. Do not derive
 * category from chapter-ID prefixes or alphabetical order.
 */
export function chapterPathsFromIndex(index) {
  if (!Array.isArray(index?.sections)) throw Error('Invalid DREAM THEATER index');
  const paths = new Map();
  for (const section of index.sections) {
    const cat=section.name;
    if (typeof cat !== 'string' || !cat || !Array.isArray(section.paths)) {
      throw Error('Invalid DREAM THEATER category metadata');
    }
    for (const href of section.paths) {
      const dir=path.posix.dirname(href);
      const id=path.posix.basename(dir);
      const course=id.startsWith('F0-')?'F0':(/^[A-Z]+/.exec(id)?.[0]??'');
      const expected='textbook/volumes/dream_thater/'+cat+'/'+course+'/'+id+'/index.md';
      if (href !== expected || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(id)) {
        throw Error('Invalid canonical chapter path: '+href);
      }
      if (paths.has(id)) throw Error('Duplicate DREAM THEATER chapter ID: '+id);
      paths.set(id,href);
    }
  }
  return paths;
}

export function resolveChapter(index,id) {
  const paths=chapterPathsFromIndex(index);
  if (!paths.has(id)) throw Error('Unknown DREAM THEATER chapter ID: '+id);
  return paths.get(id);
}
