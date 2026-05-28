export function getAdaptiveQuality(fps: number) {
  if (fps < 30) return "low"

  if (fps < 50) return "medium"

  return "ultra"
}
