class BufferConfiguration extends DevObject {
  constructor(
    glCntxt
  ) {
    super()
    this.blockSize = 2,
    this.type = glCntxt.FLOAT,
    this.normalize = false,
    this.stride = 0,
    this.offset = 0,
    this.primitiveType = glCntxt.POINTS,
    this.count = 1
  }

  setBlockSize(blockSize) {
    this.blockSize = blockSize
  }

  setElementType(type) {
    this.type = type
  }

  normalize(normalize) {
    this.normalize = normalize
  }

  setStride(stride) {
    this.stride = stride
  }

  setOffset(offset) {
    this.offset = offset
  }

  setPrimitiveType(type) {
    this.primitiveType = type
  }

  setElementCount(count) {
    this.count = count
  }

}