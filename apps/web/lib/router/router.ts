export class CinematicRouter {
  navigate(scene: string) {
    console.log(
      "[CINEMATIC ROUTER]",
      scene
    )
  }
}

export const cinematicRouter =
  new CinematicRouter()
