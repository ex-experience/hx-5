export class CinematicRuntime {
  private activeScene = "hero";

  transition(scene: string) {
    this.activeScene = scene;

    if (typeof document !== "undefined") {
      document.documentElement.animate(
        [
          { opacity: 0.96 },
          { opacity: 1 },
        ],
        {
          duration: 1400,
          easing: "cubic-bezier(0.22,1,0.36,1)",
        }
      );
    }
  }

  ambientPulse() {
    if (typeof window === "undefined") return;
    requestAnimationFrame(this.ambientPulse.bind(this));
  }

  getScene() {
    return this.activeScene;
  }
}
