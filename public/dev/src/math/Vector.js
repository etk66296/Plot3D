class Vector extends Plot3DObject {
  constructor(cells = []) {
    super()
    this.cells = cells
  }

}

class Vector3 extends Vector {
  constructor(cells = [
    0, 0, 0
  ]) {
    super(cells)
  }

  cross(multiplier) {
    let ax = this.cells[0]
    let ay = this.cells[1]
    let az = this.cells[2]
  
    let bx = multiplier.cells[0]
    let by = multiplier.cells[1]
    let bz = multiplier.cells[2]
  
    this.cells[0] = ay * bz - az * by
    this.cells[1] = az * bx - ax * bz
    this.cells[2] = ax * by - ay * bx
  
    return this
  }

  subtract(subtrahend) {
    this.cells[0] = this.cells[0] - subtrahend.cells[0]
    this.cells[1] = this.cells[1] - subtrahend.cells[1]
    this.cells[2] = this.cells[2] - subtrahend.cells[2]
    return this
  }

  normalize() {
    let len = 1 / Math.hypot(this.cells[0], this.cells[1], this.cells[2])
    this.cells[0] = this.cells[0] * len
    this.cells[1] = this.cells[1] * len
    this.cells[2] = this.cells[2] * len
    return this
  }
}

class Vector3Math {
  constructor(){}
  cross(v1, v2) {
    let result = new Vector3()
    result.cells[0] = v1.cells[1] * v2.cells[2] - v1.cells[2] * v2.cells[1]
    result.cells[1] = v1.cells[2] * v2.cells[0] - v1.cells[0] * v2.cells[2]
    result.cells[2] = v1.cells[0] * v2.cells[1] - v1.cells[1] * v2.cells[0]
  
    return result
  }

  subtract(minuend, subtrahend) {
    let result = new Vector3()
    result.cells[0] = minuend.cells[0] - subtrahend.cells[0]
    result.cells[1] = minuend.cells[1] - subtrahend.cells[1]
    result.cells[2] = minuend.cells[2] - subtrahend.cells[2]
    return result
  }

  normalize(v) {
    let result = new Vector3([ v.cells[0], v.cells[1], v.cells[2] ])
    let len = 1 / Math.hypot(result.cells[0], result.cells[1], result.cells[2])
    result.cells[0] = result.cells[0] * len
    result.cells[1] = result.cells[1] * len
    result.cells[2] = result.cells[2] * len
    return result
  }

}

class Vector4 extends Vector {
  constructor(cells = [
    0, 0, 0, 0
  ]) {
    super(cells)
  }

  normalize() {
    let len = 1 / Math.hypot(this.cells[0], this.cells[1], this.cells[2], this.cells[3])
    this.cells[0] = this.cells[0] * len
    this.cells[1] = this.cells[1] * len
    this.cells[2] = this.cells[2] * len
    this.cells[3] = this.cells[3] * len
    return this
  }
}

class Quaternion extends Vector4 {
  constructor() {
    super([ 0.0, 0.0, 0.0, 1.0 ])
    this.dirFwd = new Vector3()
    this.dirUp = new Vector3()
    this.dirLeft = new Vector3()
    this.updateDirFwd()
    this.updateDirUp()
    this.updateDirLeft()
  }

  getAxis() {
    let rad = Math.acos(this.cells[3]) * 2.0
    let s = Math.sin(rad / 2.0)
    let axis = new Vector3()
    if (s > 0.0000001) {
      axis.cells[0] = this.cells[0] / s
      axis.cells[1] = this.cells[1] / s
      axis.cells[2] = this.cells[2] / s
    } else {
      axis.cells[0] = 1
      axis.cells[1] = 0
      axis.cells[2] = 0
    }
    return axis
  }

  setAxisAngle(angleInRad, axisV3) {
    angleInRad = angleInRad * 0.5;
    let s = Math.sin(angleInRad)
    this.cells[0] = s * axisV3.cells[0]
    this.cells[1] = s * axisV3.cells[1]
    this.cells[2] = s * axisV3.cells[2]
    this.cells[3] = Math.cos(angleInRad)
  }

  getXAxisAngle() {
    let rad = Math.acos(this.cells[3]) * 2.0
    let s = Math.sin(rad / 2.0)
    if (s > 0.0000001) {
      return this.cells[0] / s  
    } else {
      return 0
    }
  }

  getYAxisAngle() {
    let rad = Math.acos(this.cells[3]) * 2.0
    let s = Math.sin(rad / 2.0)
    if (s > 0.0000001) {
      return this.cells[1] / s  
    } else {
      return 0
    }
  }

  getZAxisAngle() {
    let rad = Math.acos(this.cells[3]) * 2.0
    let s = Math.sin(rad / 2.0)
    if (s > 0.0000001) {
      return this.cells[2] / s  
    } else {
      return 0
    }
  }

  updateDirFwd() {
      this.dirFwd.cells[0] = 2 * (this.cells[0] * this.cells[2] + this.cells[3] * this.cells[1])
      this.dirFwd.cells[1] = 2 * (this.cells[1] * this.cells[2] - this.cells[3] * this.cells[0])
      this.dirFwd.cells[2] = 1 - 2 * (this.cells[0] * this.cells[0] + this.cells[1] * this.cells[1])
  }

  updateDirUp() {
    this.dirUp.cells[0] = 2 * (this.cells[0] * this.cells[1] - this.cells[3] * this.cells[2])
    this.dirUp.cells[1] = 1 - 2 * (this.cells[0] * this.cells[0] + this.cells[2] * this.cells[2])
    this.dirUp.cells[2] = 2 * (this.cells[1] * this.cells[2] + this.cells[3] * this.cells[0])
  }

  updateDirLeft() {
    this.dirLeft.cells[0] = 1 - 2 * (this.cells[1] * this.cells[1] + this.cells[2] * this.cells[2])
    this.dirLeft.cells[1] = 2 * (this.cells[0] * this.cells[1] + this.cells[3] * this.cells[2])
    this.dirLeft.cells[2] = 2 * (this.cells[0] * this.cells[2] - this.cells[3] * this.cells[1])
  }

  rotateX(angleInRad) {
    angleInRad *= 0.5
    let bx = Math.sin(angleInRad)
    let bw = Math.cos(angleInRad)
    let ax = this.cells[0]
    let ay = this.cells[1]
    let az = this.cells[2]
    let aw = this.cells[3]
    this.cells[0] = ax * bw + aw * bx
    this.cells[1] = ay * bw + az * bx
    this.cells[2] = az * bw - ay * bx
    this.cells[3] = aw * bw - ax * bx
    this.updateDirFwd()
    this.updateDirUp()
    this.updateDirLeft()
  }

  rotateY(angleInRad) {
    angleInRad *= 0.5
    let by = Math.sin(angleInRad)
    let bw = Math.cos(angleInRad)
    let ax = this.cells[0]
    let ay = this.cells[1]
    let az = this.cells[2]
    let aw = this.cells[3] 
    this.cells[0] = ax * bw - az * by
    this.cells[1] = ay * bw + aw * by
    this.cells[2] = az * bw + ax * by
    this.cells[3] = aw * bw - ay * by
    this.updateDirFwd()
    this.updateDirUp()
    this.updateDirLeft()
  }

  rotateZ(angleInRad) {
    angleInRad *= 0.5
    let bz = Math.sin(angleInRad)
    let bw = Math.cos(angleInRad)
    let ax = this.cells[0]
    let ay = this.cells[1]
    let az = this.cells[2]
    let aw = this.cells[3]
    this.cells[0] = ax * bw + ay * bz
    this.cells[1] = ay * bw - ax * bz
    this.cells[2] = az * bw + aw * bz
    this.cells[3] = aw * bw - az * bz
    this.updateDirFwd()
    this.updateDirUp()
    this.updateDirLeft()
  }
}