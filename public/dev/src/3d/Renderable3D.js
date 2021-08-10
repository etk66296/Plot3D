class Renderable3D extends Renderable {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader)
    this.modelMatrix = new Matrix4x4()
    this.modelToWorldMatrix = new Matrix4x4()
  }



  update() {
   
  }

  draw() {

  }
}
