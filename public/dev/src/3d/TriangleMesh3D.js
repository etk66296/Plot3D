class TriangleMesh3D extends Renderable3D {
  constructor(
    glCntxt,
    shader,
    math,
    meshData = {
      vertices: [
        -1, 0, 1,
        -1,0,0,
        0,0,1,
        0,0,0
      ],
      normals: [
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0
      ],
      indices: [
        2,1,0,
        2,3,1
      ]
    }
  ) {
    super(glCntxt, shader, math)

    this.modelMatrix = new Matrix4x4()

    this.reverseLightDirection = (new Vector3([ 0.5, 0.7, 1 ])).normalize()
  
    this.glVertexBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)
    this.vertices = (meshData.vertices.constructor.name === 'Float32Array') ? meshData.vertices : new Float32Array(meshData.vertices)
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, this.vertices, glCntxt.STATIC_DRAW)

    this.glNormalsBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glNormalsBuffer)
    this.normals = (meshData.normals.constructor.name === 'Float32Array') ? meshData.normals : new Float32Array(meshData.normals)
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, this.normals, glCntxt.STATIC_DRAW)

    this.glIndicesBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ELEMENT_ARRAY_BUFFER, this.glIndicesBuffer)
    this.indices = (meshData.indices.constructor.name === 'Uint16Array') ? meshData.indices : new Uint16Array(meshData.indices)
    this.glCntxt.bufferData(glCntxt.ELEMENT_ARRAY_BUFFER, this.indices, glCntxt.STATIC_DRAW)

  }


  update() {
    super.update()
    this.modelTransformationMatrix.reset()
    this.worldTranslationMatrix.reset()
    // this.translateXIncremental(0.001)
    this.rotateXIncremental(0.01)
    this.rotateYIncremental(0.01)
    this.rotateZIncremental(0.01)
    this.worldTranslationMatrix.multiplyM4(this.modelTransformationMatrix)
  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)

    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.worldTranslationMatrix.cells)
    // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, this.camera.lookAtMatrix.cells)
    // // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.camera.orthographicProjectionMatrix.cells)
    // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.camera.perspectiveProjectionMatrix.cells)
    
    this.glCntxt.uniform4fv(this.shader.glVertexUniformLocation['u_color'], this.color.cells)
    this.glCntxt.uniform4fv(this.shader.glVertexUniformLocation['u_reverseLightDirection'], this.reverseLightDirection.cells)

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

    this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_normal'])
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glNormalsBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shader.glAttrLocation['a_normal'],
      3,
      this.glCntxt.FLOAT,
      false,
      0,
      0
    )

    this.glCntxt.bindBuffer(this.glCntxt.ELEMENT_ARRAY_BUFFER, this.glIndicesBuffer)
    
    const vertexCount = this.indices.length
    const type = this.glCntxt.UNSIGNED_SHORT
    const offset = 0
    this.glCntxt.drawElements(this.glCntxt.TRIANGLES, vertexCount, type, offset)

  }
}
