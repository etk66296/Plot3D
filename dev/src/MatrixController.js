class MatrixController extends PlotterObject {
  constructor(glCntxt) {
    super()
    this.EPSILON = 0.000001
    this.glCntxt = glCntxt
    this.fieldOfView = 45 * Math.PI / 180
    this.aspect = glCntxt.canvas.clientWidth / glCntxt.canvas.clientHeight
    this.zNear = 0.1
    this.zFar = 100.0
    this.projectionMatrix = this.perspective(
      this.fieldOfView,
      this.aspect,
      this.zNear,
      this.zFar
    )
    this.modelViewMatrix = this.translate(this.create(), [0.0, 0.0, -6.0])
  }

  create() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }

  perspective(fovy, aspect, near, far) {
    let f = 1.0 / Math.tan(fovy / 2)
    let nf = 1 / (near - far)

    return [
      f / aspect, 0.0, 0.0, 0.0,
      0.0, f, 0.0, 0.0,
      0.0, 0.0, (far + near) * nf, -1.0,
      0.0, 0.0, 2 * far * near * nf, 0.0
    ]
  }

  translate(a, v) {
    let x = v[0], y = v[1], z = v[2]
    let out = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    out[3] = a[3]
    out[4] = a[4]
    out[5] = a[5]
    out[6] = a[6]
    out[7] = a[7]
    out[8] = a[8]
    out[9] = a[9]
    out[10] = a[10]
    out[11] = a[11]
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12]
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13]
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14]
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15]
    return out
  }

  rotate(a, rad, axis) {
    let len = Math.hypot(axis.x, axis.y, axis.z)
    let s, c, t

    let out = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  
    let a11, a12, a13, a14
    let a21, a22, a23, a24
    let a31, a32, a33, a34
    let b11, b12, b13
    let b21, b22, b23
    let b31, b32, b33
  
    if (len < this.EPSILON) {
      return null
    }
  
    len = 1 / len
    axis.x *= len
    axis.y *= len
    axis.z *= len
    s = Math.sin(rad)
    c = Math.cos(rad)
    t = 1 - c
    a11 = a[0]
    a12 = a[1]
    a13 = a[2]
    a14 = a[3]
    a21 = a[4]
    a22 = a[5] 
    a23 = a[6]
    a24 = a[7]
    a31 = a[8]
    a32 = a[9]
    a33 = a[10]
    a34 = a[11]
  
    b11 = axis.x * axis.x * t + c
    b12 = axis.y * axis.x * t + axis.z * s
    b13 = axis.z * axis.x * t - axis.y * s
    b21 = axis.x * axis.y * t - axis.z * s
    b22 = axis.y * axis.y * t + c
    b23 = axis.z * axis.y * t + axis.x * s
    b31 = axis.x * axis.z * t + axis.y * s
    b32 = axis.y * axis.z * t - axis.x * s
    b33 = axis.z * axis.z * t + c
  
    out[0] = a11 * b11 + a21 * b12 + a31 * b13
    out[1] = a12 * b11 + a22 * b12 + a32 * b13
    out[2] = a13 * b11 + a23 * b12 + a33 * b13
    out[3] = a14 * b11 + a24 * b12 + a34 * b13
    out[4] = a11 * b21 + a21 * b22 + a31 * b23
    out[5] = a12 * b21 + a22 * b22 + a32 * b23
    out[6] = a13 * b21 + a23 * b22 + a33 * b23
    out[7] = a14 * b21 + a24 * b22 + a34 * b23
    out[8] = a11 * b31 + a21 * b32 + a31 * b33
    out[9] = a12 * b31 + a22 * b32 + a32 * b33
    out[10] = a13 * b31 + a23 * b32 + a33 * b33
    out[11] = a14 * b31 + a24 * b32 + a34 * b33
    out[12] = a[12]
    out[13] = a[13]
    out[14] = a[14]
    out[15] = a[15]

    return out
  }

  invert(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]
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
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det
    return out
  }

  transpose(out, a) {
    if (out === a) {
      let a01 = a[1], a02 = a[2], a03 = a[3]
      let a12 = a[6], a13 = a[7]
      let a23 = a[11]
      out[1] = a[4]
      out[2] = a[8]
      out[3] = a[12]
      out[4] = a01
      out[6] = a[9]
      out[7] = a[13]
      out[8] = a02
      out[9] = a12
      out[11] = a[14]
      out[12] = a03
      out[13] = a13
      out[14] = a23
    } else {
      out[0] = a[0]
      out[1] = a[4]
      out[2] = a[8]
      out[3] = a[12]
      out[4] = a[1]
      out[5] = a[5]
      out[6] = a[9]
      out[7] = a[13]
      out[8] = a[2]
      out[9] = a[6]
      out[10] = a[10]
      out[11] = a[14]
      out[12] = a[3]
      out[13] = a[7]
      out[14] = a[11]
      out[15] = a[15]
    }
    return out
  }

  print(matrix) {
    console.log(matrix[0], matrix[1], matrix[2], matrix[3])
    console.log(matrix[4], matrix[5], matrix[6], matrix[7])
    console.log(matrix[8], matrix[9], matrix[10], matrix[11])
    console.log(matrix[12], matrix[13], matrix[14], matrix[15])
  }
}