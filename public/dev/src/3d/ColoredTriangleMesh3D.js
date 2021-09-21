class ColoredTriangleMesh3D extends TriangleMesh3D {
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
        ],
        colors: [
          0.8000000715255737, 0.04400941729545593, 0.014428908936679363, 1,
          0.8000000715255737, 0.04400941729545593, 0.014428908936679363, 1,
          0.04400941729545593, 0.8000000715255737, 0.014428908936679363, 1,
          0.04400941729545593, 0.8000000715255737, 0.014428908936679363, 1
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
        ],
        colors: [
          0.8000000715255737, 0.04400941729545593, 0.814428908936679363, 1,
          0.8000000715255737, 0.04400941729545593, 0.814428908936679363, 1,
          0.64400941729545593, 0.8000000715255737, 0.014428908936679363, 1,
          0.64400941729545593, 0.8000000715255737, 0.014428908936679363, 1
        ]
      }
    ] 
  ) {
    super(glCntxt, shader, math, meshData)
    this.glColorBuffers = []
    this.primitivesColors = []

    this.meshData.forEach(primitiveData => {
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

    if(this.shader.glAttrLocation['a_color'] === undefined) {
      throw new this.exceptions.ShaderAttributeNotFound('shader does not provide the attribute a_color')
    }


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
      
    })
  }
}
        