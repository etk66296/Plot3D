class MatrixFactory extends Plot3DFactory {
  constructor() {
    super()
  }

  createIdentityMatrix4x4() {
    return new Matrix4x4()
  }
}

class Matrix extends Plot3DObject {
  constructor(cells = []) {
    super()
    this.cells = cells
  }

  log() {
    this.cells.forEach(cell => {
      console.log(cell, ',')
    })
  }
}

class Matrix4x4 extends Matrix {
  constructor(cells = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]) {
    super(cells)
  }

  reset() {
    this.cells = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }

  log() {
    console.log('---------------------------------------------')
    console.log(this.cells[0], this.cells[1], this.cells[2], this.cells[3])
    console.log(this.cells[4], this.cells[5], this.cells[6], this.cells[7])
    console.log(this.cells[8], this.cells[9], this.cells[10], this.cells[11])
    console.log(this.cells[12], this.cells[13], this.cells[14], this.cells[15])
    console.log('---------------------------------------------')
  }

  multiplyM4(multiplier) {
    let a00 = this.cells[0],  a01 = this.cells[1],  a02 = this.cells[2],  a03 = this.cells[3]
    let a10 = this.cells[4],  a11 = this.cells[5],  a12 = this.cells[6],  a13 = this.cells[7]
    let a20 = this.cells[8],  a21 = this.cells[9],  a22 = this.cells[10], a23 = this.cells[11]
    let a30 = this.cells[12], a31 = this.cells[13], a32 = this.cells[14], a33 = this.cells[15]

    let b0 = multiplier.cells[0]
    let b1 = multiplier.cells[1]
    let b2 = multiplier.cells[2]
    let b3 = multiplier.cells[3]

    this.cells[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = multiplier.cells[4]
    b1 = multiplier.cells[5]
    b2 = multiplier.cells[6]
    b3 = multiplier.cells[7]

    this.cells[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
    
    b0 = multiplier.cells[8]
    b1 = multiplier.cells[9]
    b2 = multiplier.cells[10]
    b3 = multiplier.cells[11]

    this.cells[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = multiplier.cells[12]
    b1 = multiplier.cells[13]
    b2 = multiplier.cells[14]
    b3 = multiplier.cells[15]

    this.cells[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    return this
  }

  transpose() {
    let a01 = this.cells[1]
    let a02 = this.cells[2]
    let a03 = this.cells[3]
    let a12 = this.cells[6]
    let a13 = this.cells[7]
    let a23 = this.cells[11]
    this.cells[1] = this.cells[4]
    this.cells[2] = this.cells[8]
    this.cells[3] = this.cells[12]
    this.cells[4] = a01
    this.cells[6] = this.cells[9]
    this.cells[7] = this.cells[13]
    this.cells[8] = a02
    this.cells[9] = a12
    this.cells[11] = this.cells[14]
    this.cells[12] = a03
    this.cells[13] = a13
    this.cells[14] = a23

    return this
  }

  invert() {
    let a00 = this.cells[0],  a01 = this.cells[1],  a02 = this.cells[2],  a03 = this.cells[3]
    let a10 = this.cells[4],  a11 = this.cells[5],  a12 = this.cells[6],  a13 = this.cells[7]
    let a20 = this.cells[8],  a21 = this.cells[9],  a22 = this.cells[10], a23 = this.cells[11]
    let a30 = this.cells[12], a31 = this.cells[13], a32 = this.cells[14], a33 = this.cells[15]
  
    let b00 = a00 * a11 - a01 * a10
    let b01 = a00 * a12 - a02 * a10
    let b02 = a00 * a13 - a03 * a10
    let b03 = a01 * a12 - a02 * a11
    let b04 = a01 * a13 - a03 * a11
    let b05 = a02 * a13 - a03 * a12
    let b06 = a20 * a31 - a21 * a30
    let b07 = a20 * a32 - a22 * a30
    let b08 = a20 * a33 - a23 * a30
    let b09 = a21 * a32 - a22 * a31
    let b10 = a21 * a33 - a23 * a31
    let b11 = a22 * a33 - a23 * a32
  
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06
  
    if (!det) {
      return null
    }
    det = 1.0 / det
    this.cells[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det
    this.cells[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det
    this.cells[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det
    this.cells[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det
    this.cells[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det
    this.cells[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det
    this.cells[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det
    this.cells[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det
    this.cells[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det
    this.cells[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det
    this.cells[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det
    this.cells[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det
    this.cells[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det
    this.cells[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det
    this.cells[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det
    this.cells[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det
  
    return this
  }

  setCellsForRotationAroundV3Dir(angleInRad, directionV3) {
    let x = directionV3.cells[0],
      y = directionV3.cells[1],
      z = directionV3.cells[2]
    let len = 1 /  Math.hypot(x, y, z)
    let s, c, t
    x *= len
    y *= len
    z *= len
    s = Math.sin(angleInRad)
    c = Math.cos(angleInRad)
    t = 1 - c
    this.cells[0] = x * x * t + c
    this.cells[1] = y * x * t + z * s
    this.cells[2] = z * x * t - y * s
    this.cells[3] = 0
    this.cells[4] = x * y * t - z * s
    this.cells[5] = y * y * t + c
    this.cells[6] = z * y * t + x * s
    this.cells[7] = 0
    this.cells[8] = x * z * t + y * s
    this.cells[9] = y * z * t - x * s
    this.cells[10] = z * z * t + c
    this.cells[11] = 0
    this.cells[12] = 0
    this.cells[13] = 0
    this.cells[14] = 0
    this.cells[15] = 1
  }

  setCellsFromQuaternion(quat) {
    let x = quat.cells[0]
    let y = quat.cells[1]
    let z = quat.cells[2]
    let w = quat.cells[3]
    let x2 = x + x
    let y2 = y + y
    let z2 = z + z
    let xx = x * x2
    let yx = y * x2
    let yy = y * y2
    let zx = z * x2
    let zy = z * y2
    let zz = z * z2
    let wx = w * x2
    let wy = w * y2
    let wz = w * z2
    this.cells[0] = 1 - yy - zz
    this.cells[1] = yx + wz
    this.cells[2] = zx - wy
    this.cells[3] = 0
    this.cells[4] = yx - wz
    this.cells[5] = 1 - xx - zz
    this.cells[6] = zy + wx
    this.cells[7] = 0
    this.cells[8] = zx + wy
    this.cells[9] = zy - wx
    this.cells[10] = 1 - xx - yy
    this.cells[11] = 0
    this.cells[12] = 0
    this.cells[13] = 0
    this.cells[14] = 0
    this.cells[15] = 1
  }
  
}

class Matrix4x4Projection extends Matrix4x4 {
  constructor(fieldOfViewY = 2 / 3 * Math.PI, aspect = 16 / 9, near = 0.1, far = 1000) {
    super()
    this.fieldOfViewY = fieldOfViewY
    this.aspect = aspect
    this.near = near
    this.far = far
    this.setCellsForPerspectiveProjection(fieldOfViewY, aspect, near, far)
  }

  setCellsForPerspectiveProjection(fieldOfViewY, aspect, near, far) {
    this.fieldOfViewY = fieldOfViewY
    this.aspect = aspect
    this.near = near
    this.far = far
    
    let f = 1.0 / Math.tan(this.fieldOfViewY * 0.5)
    let nf
    this.cells[0] = f / this.aspect
    this.cells[1] = 0
    this.cells[2] = 0
    this.cells[3] = 0
    this.cells[4] = 0
    this.cells[5] = f
    this.cells[6] = 0
    this.cells[7] = 0
    this.cells[8] = 0
    this.cells[9] = 0
    this.cells[11] = -1
    this.cells[12] = 0
    this.cells[13] = 0
    this.cells[15] = 0
  
    if (this.far != null && this.far !== Infinity) {
      nf = 1 / (this.near - this.far)
      this.cells[10] = (this.far + this.near) * nf
      this.cells[14] = 2 * this.far * this.near * nf
    } else {
      this.cells[10] = -1
      this.cells[14] = -2 * this.near
    }
  }
}

class Matrix4x4View extends Matrix4x4 {
  constructor(worldPosition, pointToLookAt, upDirection) {
    super()
    this.setCellsLookAtFromWorldPosition(worldPosition, pointToLookAt, upDirection)
  }

  setCellsLookAtFromWorldPosition(worldPosition, pointToLookAt, upDirection) {
    let x0, x1, x2, y0, y1, y2, len
    let z0 = worldPosition.cells[0] - pointToLookAt.cells[0]
    let z1 = worldPosition.cells[1] - pointToLookAt.cells[1]
    let z2 = worldPosition.cells[2] - pointToLookAt.cells[2]
    let xToClose = Math.abs(z0) < this.EPSILON
    let yToClose = Math.abs(z1) < this.EPSILON
    let zToClose = Math.abs(z2) < this.EPSILON
      Math.abs(z1) < this.EPSILON &&
      Math.abs(z0) < this.EPSILON
    if (xToClose && yToClose && zToClose) {
      return this.reset()
    }
    len = 1 / Math.hypot(z0, z1, z2)
    z0 *= len
    z1 *= len
    z2 *= len
    x0 = upDirection.cells[1] * z2 - upDirection.cells[2] * z1
    x1 = upDirection.cells[2] * z0 - upDirection.cells[0] * z2
    x2 = upDirection.cells[0] * z1 - upDirection.cells[1] * z0
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
    this.cells[0] = x0
    this.cells[1] = y0
    this.cells[2] = z0
    this.cells[3] = 0
    this.cells[4] = x1
    this.cells[5] = y1
    this.cells[6] = z1
    this.cells[7] = 0
    this.cells[8] = x2
    this.cells[9] = y2
    this.cells[10] = z2
    this.cells[11] = 0
    this.cells[12] = -(x0 * worldPosition.cells[0] + x1 * worldPosition.cells[1] + x2 * worldPosition.cells[2])
    this.cells[13] = -(y0 * worldPosition.cells[0] + y1 * worldPosition.cells[1] + y2 * worldPosition.cells[2])
    this.cells[14] = -(z0 * worldPosition.cells[0] + z1 * worldPosition.cells[1] + z2 * worldPosition.cells[2])
    this.cells[15] = 1
  }
}

class Matrix4x4Math {
  constructor() {}

  multiplyTwoM4x4(ma, mb) {
    return new Matrix4x4([
      ma.cells[0] * mb.cells[0] + ma.cells[1] * mb.cells[4] + ma.cells[2] * mb.cells[8] + ma.cells[3] *  mb.cells[12],
      ma.cells[0] * mb.cells[1] + ma.cells[1] * mb.cells[5] + ma.cells[2] * mb.cells[9] + ma.cells[3] *  mb.cells[13],
      ma.cells[0] * mb.cells[2] + ma.cells[1] * mb.cells[6] + ma.cells[2] * mb.cells[10] + ma.cells[3] *  mb.cells[14],
      ma.cells[0] * mb.cells[3] + ma.cells[1] * mb.cells[7] + ma.cells[2] * mb.cells[11] + ma.cells[3] *  mb.cells[15],
      ma.cells[4] * mb.cells[0] + ma.cells[5] * mb.cells[4] + ma.cells[6] * mb.cells[8] +  ma.cells[7] *  mb.cells[12],
      ma.cells[4] * mb.cells[1] + ma.cells[5] * mb.cells[5] + ma.cells[6] * mb.cells[9] +  ma.cells[7] *  mb.cells[13],
      ma.cells[4] * mb.cells[2] + ma.cells[5] * mb.cells[6] + ma.cells[6] * mb.cells[10] + ma.cells[7] *  mb.cells[14],
      ma.cells[4] * mb.cells[3] + ma.cells[5] * mb.cells[7] + ma.cells[6] * mb.cells[11] + ma.cells[7] *  mb.cells[15],
      ma.cells[8] * mb.cells[0] + ma.cells[9] * mb.cells[4] + ma.cells[10] * mb.cells[8] +  ma.cells[11] *  mb.cells[12],
      ma.cells[8] * mb.cells[1] + ma.cells[9] * mb.cells[5] + ma.cells[10] * mb.cells[9] +  ma.cells[11] *  mb.cells[13],
      ma.cells[8] * mb.cells[2] + ma.cells[9] * mb.cells[6] + ma.cells[10] * mb.cells[10] + ma.cells[11] *  mb.cells[14],
      ma.cells[8] * mb.cells[3] + ma.cells[9] * mb.cells[7] + ma.cells[10] * mb.cells[11] + ma.cells[11] *  mb.cells[15],
      ma.cells[12] * mb.cells[0] + ma.cells[13] * mb.cells[4] + ma.cells[14] * mb.cells[8] +  ma.cells[15] *  mb.cells[12],
      ma.cells[12] * mb.cells[1] + ma.cells[13] * mb.cells[5] + ma.cells[14] * mb.cells[9] +  ma.cells[15] *  mb.cells[13],
      ma.cells[12] * mb.cells[2] + ma.cells[13] * mb.cells[6] + ma.cells[14] * mb.cells[10] + ma.cells[15] *  mb.cells[14],
      ma.cells[12] * mb.cells[3] + ma.cells[13] * mb.cells[7] + ma.cells[14] * mb.cells[11] + ma.cells[15] *  mb.cells[15]
    ])
  }

  appendXRotationToM4X4(m, angleInRad) {
    let s = Math.sin(angleInRad)
    let c = Math.cos(angleInRad)  
    let a10 = m.cells[4]
    let a11 = m.cells[5]
    let a12 = m.cells[6]
    let a13 = m.cells[7]
    let a20 = m.cells[8]
    let a21 = m.cells[9]
    let a22 = m.cells[10]
    let a23 = m.cells[11]
  
    m.cells[4] = a10 * c + a20 * s
    m.cells[5] = a11 * c + a21 * s
    m.cells[6] = a12 * c + a22 * s
    m.cells[7] = a13 * c + a23 * s
    m.cells[8] = a20 * c - a10 * s
    m.cells[9] = a21 * c - a11 * s
    m.cells[10] = a22 * c - a12 * s
    m.cells[11] = a23 * c - a13 * s
  }

  appendYRotationToM4X4(m, angleInRad) {
    let s = Math.sin(angleInRad)
    let c = Math.cos(angleInRad)
  
    let a00 = m.cells[0]
    let a01 = m.cells[1]
    let a02 = m.cells[2]
    let a03 = m.cells[3]
    let a20 = m.cells[8]
    let a21 = m.cells[9]
    let a22 = m.cells[10]
    let a23 = m.cells[11]

    m.cells[0] = a00 * c - a20 * s  
    m.cells[1] = a01 * c - a21 * s
    m.cells[2] = a02 * c - a22 * s
    m.cells[3] = a03 * c - a23 * s
    m.cells[8] = a00 * s + a20 * c
    m.cells[9] = a01 * s + a21 * c
    m.cells[10] = a02 * s + a22 * c
    m.cells[11] = a03 * s + a23 * c
  }

  appendZRotationToM4X4(m, angleInRad) {
    let s = Math.sin(angleInRad)
    let c = Math.cos(angleInRad)
  
    let a00 = m.cells[0]
    let a01 = m.cells[1]
    let a02 = m.cells[2]
    let a03 = m.cells[3]
    let a10 = m.cells[4]
    let a11 = m.cells[5]
    let a12 = m.cells[6]
    let a13 = m.cells[7]

    m.cells[0] = a00 * c + a10 * s
    m.cells[1] = a01 * c + a11 * s
    m.cells[2] = a02 * c + a12 * s
    m.cells[3] = a03 * c + a13 * s
    m.cells[4] = a10 * c - a00 * s
    m.cells[5] = a11 * c - a01 * s
    m.cells[6] = a12 * c - a02 * s
    m.cells[7] = a13 * c - a03 * s
  }

  transpose(m) {
    let a01 = m.cells[1]
    let a02 = m.cells[2]
    let a03 = m.cells[3]
    let a12 = m.cells[6]
    let a13 = m.cells[7]
    let a23 = m.cells[11]
    return new Matrix4x4([
      m.cells[0], m.cells[4], m.cells[8], m.cells[12],
      a01, m.cells[5], m.cells[9], m.cells[13],
      a02, a12, m.cells[10], m.cells[14],
      a03, a13, a23, m.cells[15]
    ])
  }

  invert(m) {
    let a00 = m.cells[0],  a01 = m.cells[1],  a02 = m.cells[2],  a03 = m.cells[3]
    let a10 = m.cells[4],  a11 = m.cells[5],  a12 = m.cells[6],  a13 = m.cells[7]
    let a20 = m.cells[8],  a21 = m.cells[9],  a22 = m.cells[10], a23 = m.cells[11]
    let a30 = m.cells[12], a31 = m.cells[13], a32 = m.cells[14], a33 = m.cells[15]
  
    let b00 = a00 * a11 - a01 * a10
    let b01 = a00 * a12 - a02 * a10
    let b02 = a00 * a13 - a03 * a10
    let b03 = a01 * a12 - a02 * a11
    let b04 = a01 * a13 - a03 * a11
    let b05 = a02 * a13 - a03 * a12
    let b06 = a20 * a31 - a21 * a30
    let b07 = a20 * a32 - a22 * a30
    let b08 = a20 * a33 - a23 * a30
    let b09 = a21 * a32 - a22 * a31
    let b10 = a21 * a33 - a23 * a31
    let b11 = a22 * a33 - a23 * a32
  
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06
  
    if (!det) {
      return null
    }

    det = 1.0 / det
    return new Matrix4x4([
      (a11 * b11 - a12 * b10 + a13 * b09) * det,
      (a02 * b10 - a01 * b11 - a03 * b09) * det,
      (a31 * b05 - a32 * b04 + a33 * b03) * det,
      (a22 * b04 - a21 * b05 - a23 * b03) * det,
      (a12 * b08 - a10 * b11 - a13 * b07) * det,
      (a00 * b11 - a02 * b08 + a03 * b07) * det,
      (a32 * b02 - a30 * b05 - a33 * b01) * det,
      (a20 * b05 - a22 * b02 + a23 * b01) * det,
      (a10 * b10 - a11 * b08 + a13 * b06) * det,
      (a01 * b08 - a00 * b10 - a03 * b06) * det,
      (a30 * b04 - a31 * b02 + a33 * b00) * det,
      (a21 * b02 - a20 * b04 - a23 * b00) * det,
      (a11 * b07 - a10 * b09 - a12 * b06) * det,
      (a00 * b09 - a01 * b07 + a02 * b06) * det,
      (a31 * b01 - a30 * b03 - a32 * b00) * det,
      (a20 * b03 - a21 * b01 + a22 * b00) * det
    ])
  }

}

class Matrix3x3 extends Matrix{
  constructor() {
    super()
  }
}