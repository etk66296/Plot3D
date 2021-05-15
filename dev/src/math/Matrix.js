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
}

class Matrix3x3 extends Matrix{
  constructor() {
    super()
  }
}