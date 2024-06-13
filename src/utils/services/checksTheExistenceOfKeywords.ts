import Fuse from "fuse.js";

const options = {
  includeScore: true,
  threshold: 0.2,
  keys: ["keyword"],
};

function isSimilar(
  word: string,
  fuse: Fuse<any>,
  threshold: number = 0.2
): boolean {
  const result = fuse.search(word);

  return (
    result.length > 0 &&
    result[0].score !== undefined &&
    result[0].score <= threshold
  );
}

export function containsScamWords(text: string, keywords: string[]): boolean {
  const fuse = new Fuse(
    keywords.map((keyword) => ({ keyword })),
    options
  );

  const tokens = text
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2);

  for (const token of tokens) {
    if (keywords.includes(token) || isSimilar(token, fuse)) {
      return true;
    }
  }

  return false;
}
