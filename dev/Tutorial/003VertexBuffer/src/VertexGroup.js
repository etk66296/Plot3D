class VertexGroup extends DevObject {
  constructor(glCntxt, shaderAttribute, positionsList = [ 0, 0, 0, 0.5, 0.7, 0]) {
    super()
    this.glCntxt = glCntxt
    this.glBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glBuffer)
    
    this.shaderAttribute = shaderAttribute
    
    this.positionsList = positionsList
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.positionsList), glCntxt.STATIC_DRAW)

    this.bufferInfo = new BufferInfo(this.glCntxt)
  }

  update() {

  }

  draw() {
    console.log('draw')
    this.glCntxt.enableVertexAttribArray(this.shaderAttribute)
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shaderAttribute,
      this.bufferInfo.size,
      this.bufferInfo.type,
      this.bufferInfo.normalize,
      this.bufferInfo.stride,
      this.bufferInfo.offset
    )
    this.glCntxt.drawArrays(
      this.bufferInfo.primitiveType,
      this.bufferInfo.offset,
      this.bufferInfo.count
    )
  }
}