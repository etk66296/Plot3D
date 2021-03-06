class TriangleMesh3D extends Renderable3D {
  constructor(
    glCntxt,
    shader,
    math,
    meshData = [
      {
        vertices: [
          -1,  1, 0,
          -1, -1,  0,
          1,  -1, 0,
          1, 1, 0
        ],
        normals: [
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1
        ],
        indices: [
          0,1,2,
          0,2,3
        ]
      },
      {
        vertices: [
          0,  1, 1,
          0, -1,  1,
          0,  -1, -1,
          0, 1, -1
        ],
        normals: [
          1,0,0,
          1,0,0,
          1,0,0,
          1,0,0
        ],
        indices: [
          0,1,2,
          0,2,3
        ]
      },
    ] 
  ) {
    super(glCntxt, shader, math)

    this.exceptions.ShaderAttributeNotFound = function(message) {
      this.message = message
      this.name = 'ShaderAttributeNotFound'
    }

    this.meshData = meshData

    this.glVerticesBuffers = []
    this.primitivesVertices = []

    this.glNormalsBuffers = []
    this.primitivesNormals = []

    this.glIndicesBuffers = []
    this.primitivesIndices = []


    this.meshData.forEach(primitiveData => {
      this.glVerticesBuffers.push(this.glCntxt.createBuffer())
      this.glCntxt.bindBuffer(
        this.glCntxt.ARRAY_BUFFER,
        this.glVerticesBuffers[this.glVerticesBuffers.length -1]
      )
      this.primitivesVertices.push(
        (primitiveData.vertices.constructor.name === 'Float32Array') ?
          primitiveData.vertices :
            new Float32Array(primitiveData.vertices)
      )
      this.glCntxt.bufferData(
        this.glCntxt.ARRAY_BUFFER,
        this.primitivesVertices[this.primitivesVertices.length -1],
        this.glCntxt.STATIC_DRAW
      )

      this.glNormalsBuffers.push(this.glCntxt.createBuffer())
      this.glCntxt.bindBuffer(
        this.glCntxt.ARRAY_BUFFER,
        this.glNormalsBuffers[this.glNormalsBuffers.length -1]
      )
      this.primitivesNormals.push(
        (primitiveData.normals.constructor.name === 'Float32Array') ?
          primitiveData.normals :
            new Float32Array(primitiveData.normals)
      )
      this.glCntxt.bufferData(
        glCntxt.ARRAY_BUFFER,
        this.primitivesNormals[this.primitivesNormals.length - 1],
        glCntxt.STATIC_DRAW
      )

      this.glIndicesBuffers.push(this.glCntxt.createBuffer())
      this.glCntxt.bindBuffer(
        this.glCntxt.ELEMENT_ARRAY_BUFFER,
        this.glIndicesBuffers[this.glIndicesBuffers.length - 1]
      )
      this.primitivesIndices.push(
        (primitiveData.indices.constructor.name === 'Uint16Array') ?
          primitiveData.indices :
            new Uint16Array(primitiveData.indices)
      )
      this.glCntxt.bufferData(
        glCntxt.ELEMENT_ARRAY_BUFFER,
        this.primitivesIndices[this.primitivesIndices.length - 1],
        glCntxt.STATIC_DRAW
      )

    })

    if(this.shader.glAttrLocation['a_normal'] === undefined) {
      throw new this.exceptions.ShaderAttributeNotFound('shader does not provide the attribute a_normal')
    }


    if(this.shader.glAttrLocation['a_position'] === undefined) {
      throw new this.exceptions.ShaderAttributeNotFound('shader does not provide the attribute a_position')
    }

  }


  update() {
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.modelToWorldMatrix.cells)
  }

  draw() {
    this.meshData.forEach((primitive, primitiveIndex) => { 
      this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_position'])
      this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVerticesBuffers[primitiveIndex])
      this.glCntxt.vertexAttribPointer(
        this.shader.glAttrLocation['a_position'],
        3,
        this.glCntxt.FLOAT,
        false,
        0,
        0
      )
        
      this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_normal'])
      this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glNormalsBuffers[primitiveIndex])
      this.glCntxt.vertexAttribPointer(
      this.shader.glAttrLocation['a_normal'],
        3,
        this.glCntxt.FLOAT,
        false,
        0,
        0
      )


      this.glCntxt.bindBuffer(this.glCntxt.ELEMENT_ARRAY_BUFFER, this.glIndicesBuffers[primitiveIndex])
      let vertexCount = this.primitivesIndices[primitiveIndex].length
      let type = this.glCntxt.UNSIGNED_SHORT
      let offset = 0
      this.glCntxt.drawElements(this.glCntxt.TRIANGLES, vertexCount, type, offset)
      
    })
  }
}
        