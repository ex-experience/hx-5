export class SceneOrchestrator {
  private activeScene = "hero"

  transition(scene: string) {
    this.activeScene = scene

    console.log(
      "[EX ORCHESTRATOR] Transition:",
      scene
    )
  }

  current() {
    return this.activeScene
  }
}

export const orchestrator =
  new SceneOrchestrator()
