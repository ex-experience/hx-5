export class RuntimeKernel {
  private activeScene = "hero"

  initialize() {
    console.log("[EX] Runtime kernel initialized")
  }

  transition(scene: string) {
    this.activeScene = scene

    if (typeof document !== "undefined") {
      document.documentElement.animate(
        [{ opacity: 0.96 }, { opacity: 1 }],
        {
          duration: 1000,
          easing: "cubic-bezier(0.22,1,0.36,1)",
        }
      )
    }
  }

  getScene() {
    return this.activeScene
  }
}

export const runtimeKernel = new RuntimeKernel()
