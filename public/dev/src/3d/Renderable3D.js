class Renderable3D extends Renderable {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader)
    this.modelMatrix = new Matrix4x4()
    this.modelToWorldMatrix = new Matrix4x4()
    this.worldPos = new Vector3()
  }

  translateXIncremental(distance) {
    this.worldPos.cells[0] += distance
    this.modelToWorldMatrix.cells[12] = this.worldPos.cells[0]
  }

  translateYIncremental(distance) {
    this.worldPos.cells[1] += distance
    this.modelToWorldMatrix.cells[13] = this.worldPos.cells[1]
  }

  translateZIncremental(distance) {
    this.worldPos.cells[2] += distance
    this.modelToWorldMatrix.cells[14] = this.worldPos.cells[2]
  }

  update() {
   
  }

  draw() {

  }
}
