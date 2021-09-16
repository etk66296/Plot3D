class Camera3D extends Renderable3D {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader, math)
    
    this.viewToProjection = new Matrix4x4Projection()
    
    this.worldPosToLookAt = new Vector3([ 0, 0, -3 ])
    this.up = new Vector3([ 0, 1, 0 ])

  }

  update() {
    this.glCntxt.useProgram(this.shader.program)
    
    this.glCntxt.uniform3fv(this.shader.glVertexUniformLocation['u_cameraUpDir'], this.up.cells)
    this.glCntxt.uniform3fv(this.shader.glVertexUniformLocation['u_cameraWorldPos'], this.worldPos.cells)
    this.glCntxt.uniform3fv(this.shader.glVertexUniformLocation['u_cameraWorldPosToLookAt'], this.worldPosToLookAt.cells)
    
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.modelToWorldMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.viewToProjection.cells)
  }

  draw() {
  }
}
