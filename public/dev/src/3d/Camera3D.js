class Camera3D extends Renderable3D {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader, math)

    this.center = new Vector3([ 0, 0, 0 ])
    this.up = new Vector3([ 0, 1, 0 ])

    this.camModelMatrix = new Matrix4x4()
    this.camTranslationMatrix = new Matrix4x4()

    this.worldToViewMatrix = new Matrix4x4View(
      this.worldPos,
      this.center,
      this.up
    )
    
    this.viewToProjection = new Matrix4x4Projection()

  }

  lookAt() {
    this.worldToViewMatrix.setCellsForViewAt( this.worldPos,
      this.center,
      this.up
    )
  }

  setWorldPos(x, y, z) {
    this.worldPos.cells[0] = x
    this.worldPos.cells[1] = y
    this.worldPos.cells[2] = z
    this.camTranslationMatrix.cells[12] = x
    this.camTranslationMatrix.cells[13] = y
    this.camTranslationMatrix.cells[14] = z
    this.lookAt()
  }

  update() {
    this.lookAt()
    this.glCntxt.useProgram(this.shader.program)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.modelToWorldMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_cameraModelMatrix'], false, this.camModelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_cameraTranslationMatrix'], false, this.camTranslationMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, this.worldToViewMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.viewToProjection.cells)
  }

  draw() {
  }
}
