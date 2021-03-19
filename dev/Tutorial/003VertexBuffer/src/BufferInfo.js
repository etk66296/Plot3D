class BufferInfo extends DevObject {
  constructor(
    glCntxt
  ) {
    super()
    this.size = 2,
    this.type = glCntxt.FLOAT,
    this.normalize = false,
    this.stride = 0,
    this.offset = 0,
    this.primitiveType = glCntxt.TRIANGLES,
    this.count = 3
  }

}