class Cube extends Drawable {
  constructor(glCntxt, shaderControl, matrixControl) {
    super(glCntxt, shaderControl, matrixControl)
    this.numOfVertexComponents = 3

    this.vertices = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ]

    this.glIndexBuffer = null
    this.vertexCount = 36

    this.faceIndices = [
      0,  1,  2,      0,  2,  3, 
      4,  5,  6,      4,  6,  7, 
      8,  9,  10,     8,  10, 11,
      12, 13, 14,     12, 14, 15,
      16, 17, 18,     16, 18, 19,
      20, 21, 22,     20, 22, 23
    ]

    this.faceColors = [
      [1.0,  1.0,  1.0,  1.0],
      [1.0,  0.0,  0.0,  1.0],
      [0.0,  1.0,  0.0,  1.0],
      [0.0,  0.0,  1.0,  1.0],
      [1.0,  1.0,  0.0,  1.0],
      [1.0,  0.0,  1.0,  1.0]
    ]
    this.colors = []
    for (let j = 0; j < this.faceColors.length; ++j) {
      const c = this.faceColors[j]
      // Repeat each color four times for the four vertices of the face
      this.colors = this.colors.concat(c, c, c, c)
    }
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

      this.glIndexBuffer = this.glCntxt.createBuffer()
      this.glCntxt.bindBuffer(this.glCntxt.ELEMENT_ARRAY_BUFFER, this.glIndexBuffer)
      this.glCntxt.bufferData(
        this.glCntxt.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(this.faceIndices),
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
      this.glCntxt.drawElements(this.glCntxt.TRIANGLES, this.vertexCount, this.glCntxt.UNSIGNED_SHORT, this.vertexOffset)
    }
  }
}