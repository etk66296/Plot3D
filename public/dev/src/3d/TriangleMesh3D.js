class TriangleMesh3D extends Renderable3D {
  constructor(
    glCntxt,
    shader,
    math,
    vertices = [
      1.0,-1.0,-1.0,
      -1.0,-1.0, 1.0,
      -1.0, 1.0, 1.0
    ]) {
    super(glCntxt, shader, math)

    this.modelMatrix = new Matrix4x4()

    this.glVertexBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)
    this.vertices =  vertices
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.vertices), glCntxt.STATIC_DRAW)

  }


  update() {
  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)

    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.worldTranslationMatrix.cells)
    // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, this.camera.lookAtMatrix.cells)
    // // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.camera.orthographicProjectionMatrix.cells)
    // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.camera.perspectiveProjectionMatrix.cells)
    
    this.glCntxt.uniform4fv(this.shader.glVertexUniformLocation['u_color'], this.color.cells)

    this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_position'])
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shader.glAttrLocation['a_position'],
      3,
      this.glCntxt.FLOAT,
      false,
      0,
      0
    )

    this.glCntxt.drawArrays(
      this.glCntxt.TRIANGLES,
      0,
      36
    )

  }
}
