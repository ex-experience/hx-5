export class PerformanceGovernor {
  private fps = 60;

  setFPS(fps: number) {
    this.fps = fps;
  }

  getQuality() {
    if (this.fps < 30) return "low";
    if (this.fps < 50) return "medium";
    return "ultra";
  }
}

export const performanceGovernor = new PerformanceGovernor();
