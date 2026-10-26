// An odd number of consecutive backslashes starts a LaTeX delimiter.
// Two backslashes before '(' or '[' may be a legal matrix row break.
export const forbiddenMathPatterns = [
  [/(?<!\\)(?:\\\\)*\\\(/g, String.raw`\(`],
  [/(?<!\\)(?:\\\\)*\\\)/g, String.raw`\)`],
  [/(?<!\\)(?:\\\\)*\\\[/g, String.raw`\[`],
  [/(?<!\\)(?:\\\\)*\\\]/g, String.raw`\]`],
  [/\\begin\{(?:equation|align\*?)\}/g, 'equation/align environment'],
  [/\\(?:label|ref|eqref|tag|newcommand|renewcommand|def)\b/g, 'unsupported command'],
];
