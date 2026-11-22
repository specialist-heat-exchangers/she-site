/**
 * Soft hyphens for long German compounds, inserted when the catalogue is
 * loaded. They stay invisible unless a heading has to break, and then the
 * break falls on a compound boundary rather than in the middle of a syllable.
 * Cut indexes are character offsets in the lower-case word.
 */
const BREAKS: Record<string, number[]> = {
  vergrößerungsflächen: [13],
  dichtungssystemkühlern: [9, 15],
  präzisionsfertigung: [10],
  wärmeübertragung: [5],
  wärmeübertragern: [5],
  datenschutzerklärung: [11],
  gleitringdichtungssperrflüssigkeit: [18],
  wärmeübergangskoeffizienten: [14],
  nachhaltigkeitsrichtlinie: [15],
  explosionsgefährdete: [10],
};

function hyphenateWord(word: string) {
  const cuts = BREAKS[word.toLocaleLowerCase("de")];
  if (!cuts) return word;
  let out = "";
  let last = 0;
  for (const cut of cuts) {
    out += word.slice(last, cut) + "\u00ad";
    last = cut;
  }
  return out + word.slice(last);
}

export function hyphenateGerman(value: string) {
  return value.replace(/[A-Za-zÄÖÜäöüß]+/g, hyphenateWord);
}

export function hyphenateTree<T>(value: T): T {
  if (typeof value === "string") return hyphenateGerman(value) as T;
  if (Array.isArray(value)) return value.map((item) => hyphenateTree(item)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) out[key] = hyphenateTree(item);
    return out as T;
  }
  return value;
}
