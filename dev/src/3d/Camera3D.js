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
      near: 1
    }

    this.v = 1

    this.perspectiveProjectionMatrix = new Matrix4x4([
      Math.atan(this.frustum.fovAngleX / 2), 0, 0, 0,
      0, Math.atan(this.frustum.fovAngleY / 2), 0, 0,
      0, 0, (-1) * (this.frustum.far + this.frustum.near) / (this.frustum.far - this.frustum.near), 2 * this.frustum.near * this.frustum.far / (this.frustum.far - this.frustum.near),
      0, 0, -1, 0
    ])
    
    this.spot = new Vector3([ 0, 0, 0 ])
    this.upDir = new Vector3([ 0, 1, 0 ])
    this.lookAtMatrix = new Matrix4x4()

    this.worldPosition.cells[2] = 10

    this.lookAt()
  }

  lookAt() {
    let zAxis = new Vector3([
      this.worldPosition.cells[0],
      this.worldPosition.cells[1],
      this.worldPosition.cells[2]
    ])
    let xAxis = new Vector3([
      this.upDir.cells[0],
      this.upDir.cells[1],
      this.upDir.cells[2]
    ])
    let spot = new Vector3([
      this.spot.cells[0],
      this.spot.cells[1],
      this.spot.cells[2]
    ])
    zAxis.subtract(spot).normalize()
    xAxis.cross(zAxis).normalize
    let yAxis = new Vector3([
      zAxis.cells[0],
      zAxis.cells[1],
      zAxis.cells[2]
    ])
    yAxis.cross(xAxis).normalize()
    this.lookAtMatrix.cells[0] = xAxis.cells[0]
    this.lookAtMatrix.cells[1] = xAxis.cells[1]
    this.lookAtMatrix.cells[2] = xAxis.cells[2]
    this.lookAtMatrix.cells[3] = 0
    this.lookAtMatrix.cells[4] = yAxis.cells[0]
    this.lookAtMatrix.cells[5] = yAxis.cells[1]
    this.lookAtMatrix.cells[6] = yAxis.cells[2]
    this.lookAtMatrix.cells[7] = 0
    this.lookAtMatrix.cells[8] = zAxis.cells[0]
    this.lookAtMatrix.cells[9] = zAxis.cells[1]
    this.lookAtMatrix.cells[10] = zAxis.cells[2]
    this.lookAtMatrix.cells[11] = 0
    this.lookAtMatrix.cells[12] = this.worldPosition.cells[0]
    this.lookAtMatrix.cells[13] = this.worldPosition.cells[0]
    this.lookAtMatrix.cells[14] = this.worldPosition.cells[0]
    this.lookAtMatrix.cells[15] = 0

  }

  update() {
    
  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, this.lookAtMatrix.cells)
       // // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.camera.orthographicProjectionMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.perspectiveProjectionMatrix.cells)
  }
}
