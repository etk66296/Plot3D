class Background extends Renderable2D {
  constructor(glCntxt, shader = null) {
    super(glCntxt, shader)
    this.clearColor = new Vector4([ 0.2, 0.5, 0.1, 1.0 ])
  }

  update() {

  }

  draw() {
    this.glCntxt.viewport(0, 0, this.glCntxt.canvas.width, this.glCntxt.canvas.height)
    this.glCntxt.clearColor(
      this.clearColor.cells[0],
      this.clearColor.cells[1],
      this.clearColor.cells[2],
      this.clearColor.cells[3]
      )
    this.glCntxt.clear(this.glCntxt.COLOR_BUFFER_BIT | this.glCntxt.DEPTH_BUFFER_BIT)
  }
}
