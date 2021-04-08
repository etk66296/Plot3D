class Background extends Plot3dBase {
  constructor(glCntxt, color = [0.0, 0.0, 0.0, 1.0]) {
    super()
    this.glCntxt = glCntxt
    this.color = color
  }

  update() {
    
  }

  draw() {
    this.glCntxt.viewport(0, 0, this.glCntxt.canvas.width, this.glCntxt.canvas.height)
    this.glCntxt.clearColor(this.color[0], this.color[1], this.color[2], this.color[3])
    this.glCntxt.clear(this.glCntxt.COLOR_BUFFER_BIT)
  }
}