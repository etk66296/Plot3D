class TexturedTriangleMesh3D extends TriangleMesh3D {
  constructor(
    glCntxt,
    shader,
    math,
    meshData
  ) {
    super(glCntxt, shader, math, meshData)

    // add dummy texture coordinates
    this.meshData.forEach(primitive => {
      primitive.txtrCoord = [
        0, 1,
        0, 1
      ]
    })

    this.glTextureBuffers = []
    this.textureCorrdinates = []
    this.materials = []
    this.textures = []

    this.meshData.forEach(primitiveData => {
      this.glTextureBuffers.push(this.glCntxt.createBuffer())
      this.glCntxt.bindBuffer(
        this.glCntxt.ARRAY_BUFFER,
        this.glTextureBuffers[this.glTextureBuffers.length -1]
      )

      this.textureCorrdinates.push(
        (primitiveData.txtrCoord.constructor.name === 'Float32Array') ?
          primitiveData.txtrCoord :
            new Float32Array(primitiveData.txtrCoord)
      )

      this.materials.push(primitiveData.material)
      
      this.glCntxt.bufferData(
        this.glCntxt.ARRAY_BUFFER,
        this.textureCorrdinates[this.textureCorrdinates.length -1],
        this.glCntxt.STATIC_DRAW
      )

      // Create a texture.
      // if (this.materials[this.materials.length - 1].hasAnImage) {
      //   console.log(this.materials[this.materials.length - 1])
      //   this.textures.push(this.glCntxt.createTexture())
      //   this.glCntxt.bindTexture(this.glCntxt.TEXTURE_2D, this.glCntxt.createTexture())
      //     this.glCntxt.texImage2D(
      //       this.glCntxt.TEXTURE_2D,
      //       0,
      //       this.glCntxt.RGBA,
      //       this.glCntxt.RGBA,
      //       this.glCntxt.UNSIGNED_BYTE,
      //       this.materials[this.materials.length - 1].imageSrc.data
      //     )
      //     this.glCntxt.generateMipmap(this.glCntxt.TEXTURE_2D)   
      // }
    })
        
  }


  update() {
    super.update()
    this.glCntxt.uniform1i(this.shader.glVertexUniformLocation['u_texture'], 0)
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