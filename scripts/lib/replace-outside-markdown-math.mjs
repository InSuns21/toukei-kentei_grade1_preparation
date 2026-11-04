// Pages path normalization operates on Markdown source, before Docsify's
// math-renderer protects TeX. A coefficient such as $[x^0](AB)$ looks like
// a Markdown link to a regex, so skip matches starting inside math or code.
function blankExceptNewlines(segment) {
  return segment.replace(/[^\n]/g, ' ');
}

function protectedMask(markdown) {
  const withoutCode = markdown.replace(
    /(?:`{3,}[\s\S]*?`{3,}|~{3,}[\s\S]*?~{3,}|`[^`\n]*`)/g,
    blankExceptNewlines,
  );
  return withoutCode.replace(
    /(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$|(?<!\\)\$(?!\$)(?:\\[^\n]|[^\\$\n])+(?<!\\)\$/g,
    blankExceptNewlines,
  );
}

// Keep offsets in the original Markdown. A real link may contain inline math
// in its label, so masking the input before matching would miss that link.
export function replaceOutsideMarkdownMath(markdown, pattern, replacer) {
  const mask = protectedMask(markdown);
  return markdown.replace(pattern, (match, ...args) => {
    const offset = args[args.length - 2];
    if (mask[offset] === ' ') return match;
    return replacer(match, ...args);
  });
}
