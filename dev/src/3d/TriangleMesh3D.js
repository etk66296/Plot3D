class TriangleMesh3D extends Renderable3D {
  constructor(glCntxt, shader, matrixFactory) {
    super(glCntxt, shader, matrixFactory)
  }

  update() {

  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)
  }
}
