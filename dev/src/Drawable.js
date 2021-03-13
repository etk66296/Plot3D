class Drawable extends PlotterObject {
  constructor(glCntxt, shaderControl, matrixControl) {
    super()
    this.shaderControl = shaderControl
    this.matrixControl = matrixControl
    this.glCntxt = glCntxt

    this.glVerticeBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVerticeBuffer)

    this.numOfVertexComponents = 2
    this.vertexType = this.glCntxt.FLOAT
    this.normalizeVertices = false
    this.vertexStride = 0
    this.vertexOffset = 0
    this.vertexCount = 4

    this.vertices = [
      -1.0,  1.0,
      1.0,  1.0,
      -1.0, -1.0,
      1.0, -1.0
    ]

    this.glCntxt.bufferData(
      this.glCntxt.ARRAY_BUFFER,
      new Float32Array(this.vertices),
      this.glCntxt.STATIC_DRAW
    )

    this.numOfColorComponents = 4
    this.colorType = this.glCntxt.FLOAT
    this.normalizeColors = false
    this.colorStride = 0
    this.colorOffset = 0
    this.colorCount = 4

    this.colors = [
      1.0,  1.0,  1.0,  1.0,
      1.0,  0.0,  0.0,  1.0,
      0.0,  1.0,  0.0,  1.0,
      0.0,  0.0,  1.0,  1.0
    ]
    this.glColorBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glColorBuffer)
    this.glCntxt.bufferData(
      this.glCntxt.ARRAY_BUFFER,
      new Float32Array(this.colors),
      this.glCntxt.STATIC_DRAW
    )
  }

  setVertices(vertices) {
    this.vertices = vertices
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVerticeBuffer)
    this.glCntxt.bufferData(
      this.glCntxt.ARRAY_BUFFER,
      new Float32Array(this.vertices),
      this.glCntxt.STATIC_DRAW
    )
  }

  draw() {
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVerticeBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shaderControl.attributes.vertexPosition,
      this.numOfVertexComponents,
      this.vertexType,
      this.normalizeVertices,
      this.vertexStride,
      this.vertexOffset
    )
    this.glCntxt.enableVertexAttribArray(this.shaderControl.attributes.vertexPosition)

    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glColorBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shaderControl.attributes.vertexColor,
      this.numOfColorComponents,
      this.colorType,
      this.normalizeColors,
      this.colorStride,
      this.colorOffset
    )
    this.glCntxt.enableVertexAttribArray(this.shaderControl.attributes.vertexColor)

    this.glCntxt.useProgram(this.shaderControl.program)
    this.glCntxt.uniformMatrix4fv(
      this.shaderControl.uniforms.projectionMatrix,
      false,
      this.matrixControl.projectionMatrix
    )
    this.glCntxt.uniformMatrix4fv(
      this.shaderControl.uniforms.modelViewMatrix,
      false,
      this.matrixControl.modelViewMatrix
    )
    this.glCntxt.drawArrays(this.glCntxt.TRIANGLE_STRIP, 0, this.vertexCount)

  }
}