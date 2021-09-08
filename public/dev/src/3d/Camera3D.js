class Camera3D extends Renderable3D {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader, math)

    this.center = new Vector3([ 0, 0, 0 ])
    this.up = new Vector3([ 0, 1, 0 ])

    this.viewWorldPos = new Vector3()

    this.camModelMatrix = new Matrix4x4()
    this.camTranslationMatrix = new Matrix4x4()

    this.worldToViewMatrix = new Matrix4x4View(
      this.worldPos,
      this.center,
      this.up
    )
    
    this.viewToProjection = new Matrix4x4Projection()

    this.modelToFollow = {
      follow: false,
      model: undefined,
      viewFrom: new Vector3()
    }

  }

  lookAt() {
    this.worldToViewMatrix.setCellsLookAtFromWorldPosition( this.worldPos,
      this.center,
      this.up
    )
  }

  follow(renderable) {
    this.modelToFollow.follow = true
    this.modelToFollow.model = renderable
  }

  setWorldPos(x, y, z) {
    this.worldPos.cells[0] = x
    this.worldPos.cells[1] = y
    this.worldPos.cells[2] = z
    this.camTranslationMatrix.cells[12] = x
    this.camTranslationMatrix.cells[13] = y
    this.camTranslationMatrix.cells[14] = z
    // this.lookAt()
  }

  translateViewXIncremental(distance) {
    this.viewWorldPos.cells[0] += distance
    this.camTranslationMatrix.cells[12] = this.viewWorldPos.cells[0]
  }

  translateViewYIncremental(distance) {
    this.viewWorldPos.cells[1] += distance
    this.camTranslationMatrix.cells[13] = this.viewWorldPos.cells[1]
  }

  translateViewZIncremental(distance) {
    this.viewWorldPos.cells[2] += distance
    this.camTranslationMatrix.cells[14] = this.viewWorldPos.cells[2]
  }

  update() {
    if(this.modelToFollow.follow) {
      
    }
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
