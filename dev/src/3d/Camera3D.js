class Camera extends Plot3DObject {
  constructor(sensorWidth = 100, sensorHeight = 100) {
    super()
    
    /*this.glCntxt = glCntxt*/

    this.position = new Vector3([ 10, 10, 0 ])
    this.spot = new Vector3([ 0, 0, 0 ])
    this.upDir = new Vector3([ 0, 1, 0 ])
    this.lookAtMatrix = new Matrix4x4()

    this.sensorWidth = sensorWidth
    this.sensorHeight = sensorHeight
    this.sensorFar = 100
    this.sensorNear = 1


    this.orthographicProjectionMatrix = new Matrix4x4([
      1 / this.sensorWidth, 0, 0, 0,
      0, 1 / this.sensorHeight, 0, 0,
      0, 0, (-2) / (this.sensorFar - this.sensorNear), (-1) * (this.sensorFar + this.sensorNear) / (this.sensorFar - this.sensorNear),
      0, 0, 0, 1
    ])

    this.xFieldOfViewAngle = 60
    this.yFieldOfViewAngle = 60

    this.perspectiveProjectionMatrix = new Matrix4x4([
      Math.atan(this.xFieldOfViewAngle / 2), 0, 0, 0,
      0, Math.atan(this.yFieldOfViewAngle / 2), 0, 0,
      0, 0, (-1) * (this.sensorFar + this.sensorNear) / (this.sensorFar - this.sensorNear), 2 * this.sensorNear * this.sensorFar / (this.sensorFar - this.sensorNear),
      0, 0, -1, 0
    ])

    this.EPSILON = 0.000001
  
  }

  lookAt() {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len
    let posX = this.position.cells[0]
    let posY = this.position.cells[1]
    let posZ = this.position.cells[2]
    let upDX = this.upDir.cells[0]
    let upDY = this.upDir.cells[1]
    let upDZ = this.upDir.cells[2]
    let sptX = this.spot.cells[0]
    let sptY = this.spot.cells[1]
    let sptZ = this.spot.cells[2]
    if (
      Math.abs(posX - sptX) < this.EPSILON &&
      Math.abs(posY - sptY) < this.EPSILON &&
      Math.abs(posZ - sptZ) < this.EPSILON
    ) {
      this.lookAtMatrix.reset()
      return
    }

    z0 = posX - sptX  
    z1 = posY - sptY
    z2 = posZ - sptZ
    len = 1 / Math.hypot(z0, z1, z2)
    z0 *= len
    z1 *= len
    z2 *= len
    x0 = upDY * z2 - upDZ * z1
    x1 = upDZ * z0 - upDX * z2
    x2 = upDX * z1 - upDY * z0
    len = Math.hypot(x0, x1, x2)

    if (!len) {
      x0 = 0
      x1 = 0
      x2 = 0
    } else {
      len = 1 / len
      x0 *= len
      x1 *= len
      x2 *= len
    }
    
    y0 = z1 * x2 - z2 * x1
    y1 = z2 * x0 - z0 * x2
    y2 = z0 * x1 - z1 * x0
    len = Math.hypot(y0, y1, y2)
    if (!len) {
      y0 = 0
      y1 = 0
      y2 = 0
    } else {
      len = 1 / len
      y0 *= len
      y1 *= len
      y2 *= len
    }
    
    this.lookAtMatrix.cells[0] = x0
    this.lookAtMatrix.cells[1] = y0
    this.lookAtMatrix.cells[2] = z0
    this.lookAtMatrix.cells[3] = 0
    this.lookAtMatrix.cells[4] = x1
    this.lookAtMatrix.cells[5] = y1
    this.lookAtMatrix.cells[6] = z1
    this.lookAtMatrix.cells[7] = 0
    this.lookAtMatrix.cells[8] = x2
    this.lookAtMatrix.cells[9] = y2
    this.lookAtMatrix.cells[10] = z2
    this.lookAtMatrix.cells[11] = 0
    this.lookAtMatrix.cells[12] = (-1) * (x0 * posX + x1 * posY + x2 * posZ)
    this.lookAtMatrix.cells[13] = (-1) * (y0 * posX + y1 * posY + y2 * posZ)
    this.lookAtMatrix.cells[14] = (-1) * (z0 * posX + z1 * posY + z2 * posZ)
    this.lookAtMatrix.cells[15] = 1
  }

  update() {

  }
}
