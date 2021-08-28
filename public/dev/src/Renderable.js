class Renderable extends Plot3DObject {
  constructor(glCntxt, shader) {
    super()
    this.glCntxt = glCntxt
    this.shader = shader
    this.math = null

    this.isActive = true
  }

  update() {

  }

  draw() {
    
  }
}
