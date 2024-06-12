import { get } from "fast-levenshtein";

function similarity(originalText: string, modifiedText: string): number {
  const distance = get(originalText, modifiedText);
  const maximumLenght = Math.max(originalText.length, modifiedText.length);

  return 1 - distance / maximumLenght;
}

export function areSimilar(
  originalText: string,
  modifiedText: string,
  threshold: number = 0.7
): boolean {
  const textualSimilarity = similarity(originalText, modifiedText);
  return textualSimilarity >= threshold;
}
