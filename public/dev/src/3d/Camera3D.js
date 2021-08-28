class Camera3D extends Renderable3D {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader, math)

    this.center = new Vector3()
    this.up = new Vector3()

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

  update() {
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
