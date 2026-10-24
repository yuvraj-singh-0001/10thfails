export const FRAME_COUNT = 240;

export function frameUrl(index: number) {
  const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
  const n = String(clamped).padStart(3, '0');
  return encodeURI(`/Animation 1/Coffee Animation 1 done${n}.png`);
}

export function nearestLoadedFrame(index: number, loaded: boolean[]) {
  if (loaded[index]) return index;

  for (let distance = 1; distance < loaded.length; distance += 1) {
    const ahead = index + distance;
    const behind = index - distance;
    if (behind >= 0 && loaded[behind]) return behind;
    if (ahead < loaded.length && loaded[ahead]) return ahead;
  }

  return 0;
}

export function buildLoadOrder(total: number) {
  const seen = new Set<number>();
  const order: number[] = [];

  const push = (value: number) => {
    if (value < 0 || value >= total || seen.has(value)) return;
    seen.add(value);
    order.push(value);
  };

  for (let i = 0; i < 8; i += 1) push(i);
  for (let i = 0; i < total; i += 8) push(i);
  for (let i = 0; i < total; i += 1) push(i);

  return order;
}
