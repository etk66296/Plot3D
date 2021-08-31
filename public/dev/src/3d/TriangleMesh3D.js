class TriangleMesh3D extends Renderable3D {
  constructor(
    glCntxt,
    shader,
    math,
    meshData = [
      {
        vertices: [
          1.0,  1.0,  -2.0,
          -1.0, 1.0,  -2.0,
          1.0,  -1.0, -2.0,
          -1.0, -1.0, -2.0
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
        ],
        colors: [
          0.04400941729545593, 0.8000000715255737, 0.014428908936679363, 1,
          0.04400941729545593, 0.8000000715255737, 0.014428908936679363, 1,
          0.04400941729545593, 0.8000000715255737, 0.014428908936679363, 1,
          0.04400941729545593, 0.8000000715255737, 0.014428908936679363, 1
        ]
      },
      {
        vertices: [
          -1.0,  1.0,  -2.0,
          1.0, 1.0,  -2.0,
          -1.0,  -1.0, -2.0,
          1.0, -1.0, -2.0
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
        ],
        colors: [
          0.8000000715255737, 0.04400941729545593, 0.014428908936679363, 1,
          0.8000000715255737, 0.04400941729545593, 0.014428908936679363, 1,
          0.8000000715255737, 0.04400941729545593, 0.014428908936679363, 1,
          0.8000000715255737, 0.04400941729545593, 0.014428908936679363, 1
        ]
      }
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

    this.glColorBuffers = []
    this.primitivesColors = []

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

      this.glColorBuffers.push(this.glCntxt.createBuffer())
      this.glCntxt.bindBuffer(
        this.glCntxt.ARRAY_BUFFER,
        this.glColorBuffers[this.glColorBuffers.length -1]
      )
      this.primitivesColors.push(
        (primitiveData.indices.constructor.name === 'Float32Array') ?
          primitiveData.colors :
            new Float32Array(primitiveData.colors))
      this.glCntxt.bufferData(
        glCntxt.ARRAY_BUFFER,
        this.primitivesColors[this.primitivesColors.length -1],
        glCntxt.STATIC_DRAW
      )
    })

    if(this.shader.glAttrLocation['a_normal'] === undefined) {
      throw new this.exceptions.ShaderAttributeNotFound('shader does not provide the attribute a_normal')
    }

    if(this.shader.glAttrLocation['a_color'] === undefined) {
      throw new this.exceptions.ShaderAttributeNotFound('shader does not provide the attribute a_color')
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
          
      this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_color'])
      this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glColorBuffers[primitiveIndex])
      this.glCntxt.vertexAttribPointer(
        this.shader.glAttrLocation['a_color'],
        4,
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
      
      
      // *******************************************************************************************************************
      // let squareVerticesBuffer = this.glCntxt.createBuffer()
      // this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, squareVerticesBuffer)
      // var vertices = [
      //   1.0,  1.0,  -2.0,
      //   -1.0, 1.0,  -2.0,
      //   1.0,  -1.0, -2.0,
      //   -1.0, -1.0, -2.0
      // ]
      // this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_position'])
      // this.glCntxt.bufferData(this.glCntxt.ARRAY_BUFFER, new Float32Array(vertices), this.glCntxt.STATIC_DRAW)
      // this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, squareVerticesBuffer)
      // this.glCntxt.vertexAttribPointer(this.shader.glAttrLocation['a_position'], 3, this.glCntxt.FLOAT, false, 0, 0)
      // this.glCntxt.drawArrays(this.glCntxt.TRIANGLE_STRIP, 0, 4)
      // *******************************************************************************************************************
    })
  }
}
        