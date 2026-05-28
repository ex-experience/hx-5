export class MotionPhysics {
  lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
  }

  smooth(value: number) {
    return this.lerp(0, value, 0.08);
  }
}

export const motionPhysics = new MotionPhysics();
