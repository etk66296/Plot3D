class Camera3D extends Renderable3D {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader, math)

    this.center = new Vector3([ 0, 0, 0 ])
    this.up = new Vector3([ 0, 1, 0 ])

    this.viewWorldPos = new Vector3()

    this.camViewModelMatrix = new Matrix4x4()
    this.camViewTranslationMatrix = new Matrix4x4()

    this.cameraMatrix = new Matrix4x4()
    this.cameraTranslationMatrix = new Matrix4x4()

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

  follow(renderable) {
    this.modelToFollow.follow = true
    this.modelToFollow.model = renderable
  }

  translateXIncremental(distance) {
    this.cameraTranslationMatrix.cells[12] = distance
  }

  translateYIncremental(distance) {
    this.cameraTranslationMatrix.cells[13] = distance
  }

  translateZIncremental(distance) {
    this.cameraTranslationMatrix.cells[14] = distance
  }

  rotateViewX(angleInRad) {
    this.math.matrix4x4.appendXRotationToM4X4(this.cameraMatrix, angleInRad)
  }

  rotateViewY(angleInRad) {
    this.math.matrix4x4.appendYRotationToM4X4(this.cameraMatrix, angleInRad)
  }

  rotateViewZ(angleInRad) {
    this.math.matrix4x4.appendZRotationToM4X4(this.cameraMatrix, angleInRad)
  }

  update() {
    if(this.modelToFollow.follow) {

    } else {
     
    }
    this.glCntxt.useProgram(this.shader.program)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.modelToWorldMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_cameraModelMatrix'], false, this.camViewModelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_cameraTranslationMatrix'], false, this.camViewTranslationMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, this.worldToViewMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.viewToProjection.cells)
  }

  draw() {
  }
}
