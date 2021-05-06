class Renderable3D extends Renderable {
  constructor(glCntxt, shader, matrixFactory) {
    super(glCntxt, shader)
    this.matrixFactory = matrixFactory
    this.modelMatrix = this.matrixFactory.createIdentityMatrix4x4()
    this.modelRotationMatrix = this.matrixFactory.createIdentityMatrix4x4()
    this.modelSpaceRotationInRad = { x: 0.0, y: 0.0, z: 0.0 }
  }

  rotateXIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.x += angleInRadian
    let tyy = Math.cos(this.modelSpaceRotationInRad.x)
    let tzy = (-1) * Math.sin(this.modelSpaceRotationInRad.x)
    let tyz = Math.sin(this.modelSpaceRotationInRad.x)
    let tzz = Math.cos(this.modelSpaceRotationInRad.x)
    let xAxisRotation = new Matrix()
    xAxisRotation.cells = [
      1.0, 0.0, 0.0, 0.0,
      0.0, tyy, tzy, 0.0,
      0.0, tyz, tzz, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelRotationMatrix.multiplyM4(xAxisRotation)
    console.log(this.modelRotationMatrix.cells)
  }  

  update() {

  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)

    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    
    // this.glCntxt.uniform4fv(this.shader.uniforms[this.colorUniformKey], this.color4fv)
  }
}
