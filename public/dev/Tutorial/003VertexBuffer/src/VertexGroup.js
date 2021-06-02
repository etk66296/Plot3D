class VertexGroup extends DevObject {
  constructor(glCntxt, shaderAttribute, positionsList = [
    // 3
      0, 0,
      0.1, 0,
      0.1, 0.2,
      0, 0.2,
      0.1, 0.1,
      0.05, 0.1,
    // d
      0.2, 0,
      0.3, 0,
      0.3, 0.2,
      0.3, 0.1,
      0.2, 0.1,
      0.2, 0.0,
    // p
      0.4, 0,
      0.5, 0,
      0.5, 0.1,
      0.4, 0.1,
      0.4, -0.1
    ]) {
    super()
    this.glCntxt = glCntxt
    this.glBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glBuffer)
    
    this.shaderAttribute = shaderAttribute
    
    this.positionsList = positionsList
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.positionsList), glCntxt.STATIC_DRAW)

    this.bufferCfg = new BufferConfiguration(this.glCntxt)
    this.bufferCfg.setElementCount(positionsList.length / this.bufferCfg.blockSize)
  }

  update() {

  }

  draw() {
    this.glCntxt.enableVertexAttribArray(this.shaderAttribute)
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shaderAttribute,
      this.bufferCfg.blockSize,
      this.bufferCfg.type,
      this.bufferCfg.normalize,
      this.bufferCfg.stride,
      this.bufferCfg.offset
    )
    this.glCntxt.drawArrays(
      this.bufferCfg.primitiveType,
      this.bufferCfg.offset,
      this.bufferCfg.count
    )
  }
}