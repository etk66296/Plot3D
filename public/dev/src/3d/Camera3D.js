class Camera3D extends Renderable3D {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader, math)
    
    this.viewToProjection = new Matrix4x4Projection()
    
    this.worldPosToLookAt = new Vector3([ 0, 0, -3 ])
    this.up = new Vector3([ 0, 1, 0 ])

    this.worldToViewMatrix = new Matrix4x4View(this.worldPos, this.worldPosToLookAt, this.up)

    this.traceObject = {
      refToRenderable: null,
      chaseIt: false
    }

    this.xAngle = 0

  }

  followTheRenderable3d(renderable3d) {
    this.traceObject.refToRenderable = renderable3d
    this.traceObject.chaseIt = true
  }

  update() {
    this.glCntxt.useProgram(this.shader.program)

    if(this.traceObject.chaseIt) {
      // this.worldPosToLookAt.setFromVector3(this.traceObject.refToRenderable.worldPos)

    } else {
      this.worldToViewMatrix.setCellsLookAtFromWorldPosition(this.worldPos, this.worldPosToLookAt, this.up)
      // this.worldToViewMatrix.setWorldPosition(this.worldPos)
    }
    
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.modelToWorldMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_worldToViewMatrix'], false, this.worldToViewMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.viewToProjection.cells)
  }

  draw() {
  }
}
