export class OracleRuntime {
  analyze(input: {
    interactionDepth: number
    hesitation: number
  }) {
    if (input.interactionDepth > 7) {
      return "immersive"
    }

    if (input.hesitation > 4) {
      return "curious"
    }

    return "minimal"
  }
}

export const oracleRuntime =
  new OracleRuntime()
