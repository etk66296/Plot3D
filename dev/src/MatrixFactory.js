class MatrixFactory extends PlotterObject {
  constructor(glCntxt) {
    super()
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

  print(matrix) {
    console.log(matrix[0], matrix[1], matrix[2], matrix[3])
    console.log(matrix[4], matrix[5], matrix[6], matrix[7])
    console.log(matrix[8], matrix[9], matrix[10], matrix[11])
    console.log(matrix[12], matrix[13], matrix[14], matrix[15])
  }
}