// WGL / FCG code coloring. Keep the textarea as the actual editor and execute
// its unmodified value; only escaped HTML is inserted in the decorative layer.
const JS_KEYWORDS = new Set(
  'async await break case catch class const continue debugger default delete do else export extends false finally for from function if import in instanceof let new null of return static super switch this throw true try typeof undefined var void while yield'.split(' ')
);
const GLSL_KEYWORDS = new Set(
  'attribute break case centroids const continue default discard do else false flat for highp if in inout invariant layout lowp mediump out precision return smooth struct switch true uniform varying while'.split(' ')
);
const GLSL_TYPES = new Set(
  'bool int uint float double void vec2 vec3 vec4 ivec2 ivec3 ivec4 uvec2 uvec3 uvec4 bvec2 bvec3 bvec4 mat2 mat3 mat4 mat2x3 mat2x4 mat3x2 mat3x4 mat4x2 mat4x3 sampler2D samplerCube sampler2DArray'.split(' ')
);
const GLSL_BUILTINS = new Set(
  'gl_Position gl_PointSize gl_FragCoord gl_FrontFacing gl_PointCoord gl_FragDepth gl_VertexID gl_InstanceID'.split(' ')
);

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function token(kind, value) {
  return '<span class="wgl-token-' + kind + '">' + escapeHtml(value) + '</span>';
}

// Lightweight lexer: never evaluate source, and do not interpret comments or
// quoted content as keywords. Syntax classes are shared with the Python lab.
export function highlightSource(source, language) {
  const text = String(source ?? '');
  const glsl = language === 'glsl';
  let html = '';
  let index = 0;

  while (index < text.length) {
    const tail = text.slice(index);
    const char = text[index];
    const next = text[index + 1];

    if (glsl && char === '#' &&
        /^[ \t]*$/.test(text.slice(text.lastIndexOf('\n', index - 1) + 1, index))) {
      const end = text.indexOf('\n', index);
      const until = end < 0 ? text.length : end;
      html += token('directive', text.slice(index, until));
      index = until;
      continue;
    }

    if (char === '/' && (next === '/' || next === '*')) {
      const block = next === '*';
      const terminator = block ? '*/' : '\n';
      const found = text.indexOf(terminator, index + 2);
      const end = found < 0 ? text.length : found + (block ? 2 : 0);
      html += token('comment', text.slice(index, end));
      index = end;
      continue;
    }

    if (char === "'" || char === '"' || (!glsl && char === '`')) {
      let end = index + 1;
      while (end < text.length) {
        if (text[end] === '\\') {
          end += Math.min(2, text.length - end);
          continue;
        }
        if (text[end] === char) {
          end += 1;
          break;
        }
        if (char !== '`' && text[end] === '\n') break;
        end += 1;
      }
      html += token('string', text.slice(index, end));
      index = end;
      continue;
    }

    const number = /^(?:0[xX][\da-fA-F]+(?:n)?|0[bB][01]+(?:n)?|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?(?:[uUnNfF])?)/.exec(tail);
    if (number) {
      html += token('number', number[0]);
      index += number[0].length;
      continue;
    }

    const identifier = /^[A-Za-z_$][A-Za-z\d_$]*/.exec(tail);
    if (identifier) {
      const name = identifier[0];
      const after = text.slice(index + name.length);
      let kind = '';
      if (glsl) {
        if (GLSL_KEYWORDS.has(name)) kind = 'keyword';
        else if (GLSL_TYPES.has(name)) kind = 'type';
        else if (GLSL_BUILTINS.has(name)) kind = 'builtin';
        else if (/^\s*\(/.test(after)) kind = 'function';
      } else {
        if (JS_KEYWORDS.has(name)) kind = 'keyword';
        else if (/^\s*\(/.test(after)) kind = 'function';
      }
      html += kind ? token(kind, name) : escapeHtml(name);
      index += name.length;
      continue;
    }

    html += escapeHtml(char);
    index += 1;
  }
  return html;
}
