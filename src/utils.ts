export function formatNumber(price: string | number): string {
  const format = (val: string | number) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    return isNaN(num)
      ? val.toString()
      : `${new Intl.NumberFormat("ru-RU").format(num)} с`;
  };

  if (typeof price === "number") {
    return format(price);
  }

  // Handle ranges like "390/490 c" or "390 c/490 c"
  const rangeMatch = price.match(
    /([\d.]+)\s*(?:с|c)?\s*\/\s*([\d.]+)\s*(?:с|c)?/i
  );

  if (rangeMatch) {
    const [_, part1, part2] = rangeMatch;
    return `${part1.replace("c", "")}/${format(part2)}`;
  }

  // Normal single price
  return format(price);
}

export function forceHttps(url: string) {
  if (!url) return;

  return url.startsWith("http://") ? url.replace("http://", "https://") : url;
}
