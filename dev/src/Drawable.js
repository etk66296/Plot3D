class Drawable extends PlotterObject {
  constructor(glCntxt, shaderControl, matrixControl) {
    super()
    this.shaderControl = shaderControl
    this.matrixControl = matrixControl
    this.glCntxt = glCntxt

    this.isInitialized = false

    this.modelViewMatrix = this.matrixControl.translate(this.matrixControl.create(), [0.0, 0.0, -6.0])

    this.rotation = 0.01
    this.rotAxis = { x: 0.0, y: 0.0, z: 1.0 }

    this.glVerticeBuffer = null
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
    

    this.glColorBuffer = null
    this.numOfColorComponents = 4
    this.colorType = this.glCntxt.FLOAT
    this.normalizeColors = false
    this.colorStride = 0
    this.colorOffset = 0
    this.colors = [
      1.0,  1.0,  1.0,  1.0,
      1.0,  0.0,  0.0,  1.0,
      0.0,  1.0,  0.0,  1.0,
      0.0,  0.0,  1.0,  1.0
    ]
  }

  init() {
    if (!this.isInitialized) {
      this.glVerticeBuffer = this.glCntxt.createBuffer()
      this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVerticeBuffer)
      this.glCntxt.bufferData(
        this.glCntxt.ARRAY_BUFFER,
        new Float32Array(this.vertices),
        this.glCntxt.STATIC_DRAW
      )
      this.glColorBuffer = this.glCntxt.createBuffer()
      this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glColorBuffer)
      this.glCntxt.bufferData(
        this.glCntxt.ARRAY_BUFFER,
        new Float32Array(this.colors),
        this.glCntxt.STATIC_DRAW
      )
      this.isInitialized = true
    }
  }

  setVertices(vertices) {
    if (this.isInitialized) {
      this.vertices = vertices
      this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVerticeBuffer)
      this.glCntxt.bufferData(
        this.glCntxt.ARRAY_BUFFER,
        new Float32Array(this.vertices),
        this.glCntxt.STATIC_DRAW
      )
    }
  }

  update() {
    if (this.isInitialized) {
      if (this.rotation !== 0.0) {
        this.modelViewMatrix = this.matrixControl.rotate(
          this.modelViewMatrix,
          this.rotation,
          this.rotAxis
        )
      }
    }
  }

  draw() {
    if (this.isInitialized) {
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
        this.modelViewMatrix
      )
      this.glCntxt.drawArrays(this.glCntxt.TRIANGLE_STRIP, 0, this.vertexCount)
    }
  }
}