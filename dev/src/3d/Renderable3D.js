class Renderable3D extends Renderable {
  constructor(glCntxt, shader, matrixFactory) {
    super(glCntxt, shader)
    this.matrixFactory = matrixFactory
    this.modelMatrix = this.matrixFactory.createIdentityMatrix4x4()
    this.modelRotationMatrix = this.matrixFactory.createIdentityMatrix4x4()
    this.modelSpaceRotation = { x: 0.0, y: 0.0, z: 0.0 }
  }

  rotate() {
    
  }  

  update() {

  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)

    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    
    // this.glCntxt.uniform4fv(this.shader.uniforms[this.colorUniformKey], this.color4fv)
  }
}
