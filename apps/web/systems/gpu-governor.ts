export class GPUGovernor {
  getDeviceTier() {
    if (typeof window === "undefined") {
      return "low"
    }

    const memory =
      navigator.deviceMemory || 4

    if (memory <= 4) {
      return "low"
    }

    if (memory <= 8) {
      return "medium"
    }

    return "ultra"
  }

  getDPR() {
    const tier = this.getDeviceTier()

    if (tier === "low") {
      return [1, 1]
    }

    if (tier === "medium") {
      return [1, 1.5]
    }

    return [1, 2]
  }
}

export const gpuGovernor =
  new GPUGovernor()
