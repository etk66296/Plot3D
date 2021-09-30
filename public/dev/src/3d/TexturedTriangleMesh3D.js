class TexturedTriangleMesh3D extends TriangleMesh3D {
  constructor(
    glCntxt,
    shader,
    math,
    meshData
  ) {
    super(glCntxt, shader, math, meshData)

    // add dummy texture coordinates
    // this.meshData.forEach(primitive => {
    //   primitive.txtrCoord = [
    //     0, 1,
    //     0, 1
    //   ]
    // })

    this.glTextureBuffers = []
    this.textureCorrdinates = []
    this.materials = []
    this.textures = []
    this.textureImages = []

    this.meshData.forEach(primitiveData => {
      this.glTextureBuffers.push(this.glCntxt.createBuffer())
      this.glCntxt.bindBuffer(
        this.glCntxt.ARRAY_BUFFER,
        this.glTextureBuffers[this.glTextureBuffers.length -1]
      )

      this.textureCorrdinates.push(new Float32Array(primitiveData.txtrCoord))

      this.materials.push(primitiveData.material)
      this.glCntxt.bufferData(
        this.glCntxt.ARRAY_BUFFER,
        this.textureCorrdinates[this.textureCorrdinates.length -1],
        this.glCntxt.STATIC_DRAW
      )
      
      this.textures.push(this.glCntxt.createTexture())
      this.glCntxt.bindTexture(
        this.glCntxt.TEXTURE_2D,
        this.textures[this.textures.length -1]
      )

      this.textureImages.push(new Uint8Array([200, 200, 200, 255]))
      if (this.materials[this.materials.length - 1].color != null) {
        this.textureImages[this.textureImages.length - 1] = new Uint8Array([
            Math.floor(255 * this.materials[this.materials.length - 1].color[0]),
            Math.floor(255 * this.materials[this.materials.length - 1].color[1]),
            Math.floor(255 * this.materials[this.materials.length - 1].color[2]),
            Math.floor(255 * this.materials[this.materials.length - 1].color[3])
          ]
        )
      }

      // this.glCntxt.texImage2D(
      //   this.glCntxt.TEXTURE_2D,
      //   0,
      //   this.glCntxt.RGBA,
      //   1,
      //   1,
      //   0,
      //   this.glCntxt.RGBA,
      //   this.glCntxt.UNSIGNED_BYTE,
      //   this.textureImages[this.textureImages.length - 1]
      // )
      
      // if (this.materials[this.materials.length - 1].hasAnImage) {
      //   this.glCntxt.bindTexture(this.glCntxt.TEXTURE_2D, this.glCntxt.createTexture())
      //   this.glCntxt.texImage2D(
      //     this.glCntxt.TEXTURE_2D,
      //     0,
      //     this.glCntxt.RGBA,
      //     this.glCntxt.RGBA,
      //     this.glCntxt.UNSIGNED_BYTE,
      //     this.materials[this.materials.length - 1].imageSrc.data
      //   )
      //   this.glCntxt.generateMipmap(this.glCntxt.TEXTURE_2D)   
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

      this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_texcoord'])
      this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glTextureBuffers[primitiveIndex])
      this.glCntxt.vertexAttribPointer(
        this.shader.glAttrLocation['a_texcoord'],
        2,
        this.glCntxt.FLOAT,
        false,
        0,
        0
      )


      this.glCntxt.bindTexture(
        this.glCntxt.TEXTURE_2D,
        this.textures[primitiveIndex]
      )

      this.glCntxt.texImage2D(
        this.glCntxt.
        TEXTURE_2D,
        0,
        this.glCntxt.RGBA,
        1,
        1,
        0,
        this.glCntxt.RGBA,
        this.glCntxt.UNSIGNED_BYTE,
        this.textureImages[primitiveIndex]
      )
      this.glCntxt.bindBuffer(this.glCntxt.ELEMENT_ARRAY_BUFFER, this.glIndicesBuffers[primitiveIndex])
      let vertexCount = this.primitivesIndices[primitiveIndex].length
      let type = this.glCntxt.UNSIGNED_SHORT
      let offset = 0
      this.glCntxt.drawElements(this.glCntxt.TRIANGLES, vertexCount, type, offset)
      
    })
  }
}