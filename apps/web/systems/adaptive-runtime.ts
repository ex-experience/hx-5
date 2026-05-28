export function getAdaptiveMode(data: {
  hour: number
  engagement: number
}) {
  if (data.hour > 20) {
    return "night-cinematic"
  }

  if (data.engagement > 80) {
    return "immersive"
  }

  return "minimal"
}
