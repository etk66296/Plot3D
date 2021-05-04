class TriangleMesh extends Renderable {
  constructor(glCntxt, shader) {
    super(glCntxt, shader)
  }

  update() {

  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)
  }
}
