class Renderable3D extends Renderable {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader)
    this.modelMatrix = new Matrix4x4()
    this.modelToWorldMatrix = new Matrix4x4()
    this.worldPos = new Vector3()

    this.modelUpDir = new Vector3([ 0, 1, 0 ])
    this.modelFwdDir = new Vector3([ 0, 0, 1 ])
    this.modelSideDir = new Vector3([ 1, 0, 0 ])

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

  // moveForward(distance) {
  //   let distanceX = distance * this.modelFwdDir.cells[0]
  //   let distanceY = distance * this.modelFwdDir.cells[1]
  //   let distanceZ = distance * this.modelFwdDir.cells[2]
  //   this.worldPos.cells[0] += distanceX
  //   this.modelToWorldMatrix.cells[12] = this.worldPos.cells[0]
  //   this.worldPos.cells[1] += distanceY
  //   this.modelToWorldMatrix.cells[13] = this.worldPos.cells[1]
  //   this.worldPos.cells[2] += distanceZ
  //   this.modelToWorldMatrix.cells[14] = this.worldPos.cells[2]
  // }

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
    this.modelSideDir.setCells(
      this.modelMatrix.cells[0],
      this.modelMatrix.cells[1],
      this.modelMatrix.cells[2]
    )
    this.modelUpDir.setCells(
      this.modelMatrix.cells[4],
      this.modelMatrix.cells[5],
      this.modelMatrix.cells[6]
    )
    this.modelFwdDir.setCells(
      this.modelMatrix.cells[8],
      this.modelMatrix.cells[9],
      this.modelMatrix.cells[10]
    )
  }

  rotateYIncremental(angleInRad) {
    this.math.matrix4x4.appendYRotationToM4X4(this.modelMatrix, angleInRad)
    this.modelSideDir.setCells(
      this.modelMatrix[0],
      this.modelMatrix[1],
      this.modelMatrix[2]
    )
    this.modelUpDir.setCells(
      this.modelMatrix[4],
      this.modelMatrix[5],
      this.modelMatrix[6]
    )
    this.modelFwdDir.setCells(
      this.modelMatrix[8],
      this.modelMatrix[9],
      this.modelMatrix[10]
    )
  }

  rotateZIncremental(angleInRad) {
    this.math.matrix4x4.appendZRotationToM4X4(this.modelMatrix, angleInRad)
    this.modelSideDir.setCells(
      this.modelMatrix[0],
      this.modelMatrix[1],
      this.modelMatrix[2]
    )
    this.modelUpDir.setCells(
      this.modelMatrix[4],
      this.modelMatrix[5],
      this.modelMatrix[6]
    )
    this.modelFwdDir.setCells(
      this.modelMatrix[8],
      this.modelMatrix[9],
      this.modelMatrix[10]
    )
  }

  update() {
   
  }

  draw() {

  }
}
