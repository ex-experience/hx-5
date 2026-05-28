import { ExperienceEngine } from "@/systems/experience-engine";
import { CinematicRuntime } from "@ex/cinematic-engine";
import { getAdaptiveMode } from "@/systems/adaptive-runtime";

class RuntimeKernel {
  private experience = new ExperienceEngine();
  private cinematic = new CinematicRuntime();

  initialize() {
    console.log("EX Runtime Kernel Initialized");
  }

  update(input: {
    scrollSpeed: number;
    interactionDepth: number;
    hesitation: number;
    country: string;
    hour: number;
    engagement: number;
  }) {
    this.experience.updateBehavior(input);

    const mode = getAdaptiveMode({
      country: input.country,
      hour: input.hour,
      engagement: input.engagement,
    });

    return {
      experience: this.experience.getExperienceMode(),
      adaptive: mode,
    };
  }

  transition(scene: string) {
    this.cinematic.transition(scene);
  }
}

export const runtimeKernel = new RuntimeKernel();
