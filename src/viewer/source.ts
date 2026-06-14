// Slices the `figma.connect(...)` block for a given Figma node token out of a
// `.figma.tsx` file's raw source, so the viewer can display the exact snippet
// template authored for that component.

/** Find the index of the `)` that closes the `(` at `openIdx`, string-aware. */
function matchParen(s: string, openIdx: number): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = openIdx; i < s.length; i++) {
    const ch = s[i];
    if (quote) {
      if (ch === "\\") i++; // skip escaped char
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    else if (ch === "(") depth++;
    else if (ch === ")" && --depth === 0) return i;
  }
  return -1;
}

/**
 * Return the full `figma.connect(...)` statement whose node argument matches
 * `node`, or null if it can't be located.
 */
export function extractConnectBlock(source: string, node: string): string | null {
  const marker = "figma.connect(";
  let from = 0;
  for (;;) {
    const start = source.indexOf(marker, from);
    if (start === -1) return null;
    const open = start + marker.length - 1; // index of '('
    const close = matchParen(source, open);
    if (close === -1) return null;

    const block = source.slice(start, close + 1);
    if (block.includes(`"${node}"`) || block.includes(`'${node}'`)) {
      const semi = source[close + 1] === ";" ? ";" : "";
      return block + semi;
    }
    from = close + 1;
  }
}
