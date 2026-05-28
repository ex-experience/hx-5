type SignalPayload = unknown

class SignalEngine {
  emit(event: string, payload?: SignalPayload) {
    console.log("[SIGNAL]", event, payload)
  }
}

export const signals = new SignalEngine()
