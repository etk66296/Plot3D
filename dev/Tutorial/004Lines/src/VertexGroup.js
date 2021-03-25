class VertexGroup2D extends DevObject {
  constructor(
    glCntxt,
    shader,
    colorUnivormKey,
    posAttributeKey,
    color4fv = [ 1.0, 0.0, 1.0, 1.0 ],
    vertices2fv = [
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
    
    this.colorUnivormKey = colorUnivormKey
    this.color4fv = color4fv

    this.glCntxt = glCntxt
    this.shader = shader
    this.glVertexBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)

    this.posAttributeKey = posAttributeKey
    
    this.vertices2fv = vertices2fv
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.vertices2fv), glCntxt.STATIC_DRAW)

    this.bufferCfg = new BufferConfiguration(this.glCntxt)
    this.bufferCfg.setElementCount(vertices2fv.length / this.bufferCfg.blockSize)
  }

  update() {

  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)
    
    this.glCntxt.uniform4fv(this.shader.uniforms[this.colorUnivormKey], this.color4fv)

    this.glCntxt.enableVertexAttribArray(this.shader.attributes[this.posAttributeKey])
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shader.attributes[this.posAttributeKey],
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