class Camera3D extends Renderable3D {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader, math)

    this.orthoSpace = {
      width: glCntxt.canvas.clientWidth,
      height: glCntxt.canvas.clientHeight,
      far: 1000,
      near: 1
    }

    this.orthoProjectionMatrix = new Matrix4x4(
      [
        1 / this.orthoSpace.width, 0, 0, 0,
        0, 1 / this.orthoSpace.height, 0, 0,
        0, 0, (-2) / (this.orthoSpace.far - this.orthoSpace.near), (-1) * (this.orthoSpace.far + this.orthoSpace.near) / (this.orthoSpace.far - this.orthoSpace.near),
        0, 0, 0, 1
      ]
    )

    this.frustum = {
      fovAngleX: this.convertDegToRad(60),
      fovAngleY: this.convertDegToRad(60),
      far: 1000,
      near: 1,
      aspect: glCntxt.canvas.clientWidth / glCntxt.canvas.clientHeight
    }

    this.v = 1

    let f = Math.tan(Math.PI * 0.5 - 0.5 * this.frustum.fovAngleX)
    this.perspectiveProjectionMatrix = new Matrix4x4([
      f / this.frustum.aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (this.frustum.far + this.frustum.near) / (this.frustum.far - this.frustum.near), -1,
      0, 0, this.frustum.far * this.frustum.near * (2 / (this.frustum.far - this.frustum.near)), 0
    ])
    
    this.spot = new Vector3([ 0, 0, 0 ])
    this.upDir = new Vector3([ 0, 1, 0 ])
    this.lookAtMatrix = new Matrix4x4()
    this.worldMatrix = new Matrix4x4()

    this.translateZIncremental(-10)

  }

  lookAt() {
    let zAxis = this.math.vector3.subtract(this.worldPosition, this.spot)
    zAxis.normalize()
    let xAxis = this.math.vector3.cross(this.upDir, zAxis)
    xAxis.normalize()
    let yAxis = this.math.vector3.cross(zAxis, xAxis)
    yAxis.normalize()

    this.lookAtMatrix.cells[0] = xAxis.cells[0]
    this.lookAtMatrix.cells[1] = xAxis.cells[1]
    this.lookAtMatrix.cells[2] = xAxis.cells[2]
    this.lookAtMatrix.cells[3] = 0.0

    this.lookAtMatrix.cells[4] = yAxis.cells[0]
    this.lookAtMatrix.cells[5] = yAxis.cells[1]
    this.lookAtMatrix.cells[6] = yAxis.cells[2]
    this.lookAtMatrix.cells[7] = 0.0

    this.lookAtMatrix.cells[8] = zAxis.cells[0]
    this.lookAtMatrix.cells[9] = zAxis.cells[1]
    this.lookAtMatrix.cells[10] = zAxis.cells[2]
    this.lookAtMatrix.cells[11] = 0.0

    this.lookAtMatrix.cells[12] = this.worldPosition.cells[0]
    this.lookAtMatrix.cells[13] = this.worldPosition.cells[1]
    this.lookAtMatrix.cells[14] = this.worldPosition.cells[2]
    this.lookAtMatrix.cells[15] = 1.0

    this.lookAtMatrix.invert()

  }

  update() {
    this.worldMatrix.reset()
    this.modelTransformationMatrix.reset()
    // this.translateZIncremental(-0.01)
    // this.translateXIncremental(-0.1)
    // this.rotateXIncremental(0.1)
    // this.rotateYIncremental(0.1)
    // this.lookAt()
    // this.worldMatrix.multiplyM4(this.lookAtMatrix)
    this.worldMatrix.multiplyM4(this.modelTransformationMatrix)
    this.worldMatrix.multiplyM4(this.worldTranslationMatrix)
  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, this.worldMatrix.cells)
    // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.orthoProjectionMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.perspectiveProjectionMatrix.cells)
  }
}
