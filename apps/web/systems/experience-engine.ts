export class ExperienceEngine {
  private emotionalState = "neutral"

  private intensity = 0

  updateBehavior(data: {
    scrollSpeed: number
    interactionDepth: number
    hesitation: number
  }) {
    if (data.interactionDepth > 7) {
      this.emotionalState = "immersed"
    }

    if (data.hesitation > 4) {
      this.emotionalState = "curious"
    }

    this.intensity =
      Math.min(1, data.scrollSpeed / 1000)
  }

  getExperienceMode() {
    return {
      state: this.emotionalState,
      intensity: this.intensity,
    }
  }
}

export const experienceEngine =
  new ExperienceEngine()
