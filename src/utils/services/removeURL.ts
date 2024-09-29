export function removeURLs(text: string) {
  return text
    .replace(/(https?:\/\/[^\s]+)/gi, "")
    .replace(/(www\.[^\s]+)/gi, "")
    .replace(/\n+/g, " ")
    .trim();
}
