class TexturedTriangleMesh3D extends TriangleMesh3D {
  constructor(
    glCntxt,
    shader,
    math,
    meshData
  ) {
    super(glCntxt, shader, math, meshData)

    this.glTextureBuffers = []
    this.primitivesTextures = []
    this.material = []

    // this.meshData.forEach(primitiveData => {
    //   this.glTextureBuffers.push(this.glCntxt.createBuffer())
    //   this.glCntxt.bindBuffer(
    //     this.glCntxt.ARRAY_BUFFER,
    //     this.glTextureBuffers[this.glTextureBuffers.length -1]
    //   )

    //   this.primitivesTextures.push(
    //     (primitiveData.txtrCrds.constructor.name === 'Float32Array') ?
    //       primitiveData.txtrCrds :
    //         new Float32Array(primitiveData.txtrCrds)
    //   )

    //   this.material.push(primitiveData.material)
      
    //   this.glCntxt.bufferData(
    //     this.glCntxt.ARRAY_BUFFER,
    //     this.primitivesTextures[this.primitivesTextures.length -1],
    //     this.glCntxt.STATIC_DRAW
    //   )
    // })

  }


  update() {
    super.update()
  }

  draw() {
    super.draw()
  }
}