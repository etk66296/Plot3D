class Renderable3D extends Renderable {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader)
    this.modelMatrix = new Matrix4x4()
    this.modelToWorldMatrix = new Matrix4x4()
    this.worldPos = new Vector3()

    this.math = math

    this.exceptions.ShaderUniformNotFound = function(message) {
      this.message = message
      this.name = 'ShaderUniformNotFound'
    }

    if(this.shader.glVertexUniformLocation['u_modelMatrix'] === undefined) {
      throw new this.exceptions.ShaderUniformNotFound('shader does not provide the uniform u_modelMatrix')
    }

    if(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'] === undefined) {
      throw new this.exceptions.ShaderUniformNotFound('shader does not provide the uniform u_modelToWorldMatrix')
    }

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

  rotateXIncremental(angleInRad) {
    this.math.matrix4x4.appendXRotationToM4X4(this.modelMatrix, angleInRad)
  }

  rotateYIncremental(angleInRad) {
    this.math.matrix4x4.appendYRotationToM4X4(this.modelMatrix, angleInRad)
  }

  rotateZIncremental(angleInRad) {
    this.math.matrix4x4.appendZRotationToM4X4(this.modelMatrix, angleInRad)
  }

  update() {
   
  }

  draw() {

  }
}
