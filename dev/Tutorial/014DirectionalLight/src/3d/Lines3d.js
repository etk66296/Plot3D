class Lines3d extends VertexGroup3d {
  constructor(
    glCntxt,
    shader,
    matrixMath4x4,
    camera,
    colorUniformKey,
    posAttributeKey,
    matrixUniformKey,
    color4fv,
    vertices3fv,
    normals3fv
  ) {
      super(
        glCntxt,
        shader,
        matrixMath4x4,
        camera,
        colorUniformKey,
        posAttributeKey,
        matrixUniformKey,
        color4fv,
        vertices3fv,
        normals3fv
      )
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices3fv.length < 6) {
        this.errorLog("a 3d line needs at least 4 3fv coordinate elements in the 'psotionList' parameter")
      }
      this.bufferCfg.primitiveType = this.glCntxt.LINES
  }
}

class LineStrip3d extends VertexGroup3d {
  constructor(
    glCntxt,
    shader,
    matrixMath4x4,
    colorUniformKey,
    posAttributeKey,
    matrixUniformKey,
    color4fv,
    vertices3fv,
    normals3fv
  ) {
    super(
      glCntxt,
      shader,
      matrixMath4x4,
      camera,
      colorUniformKey,
      posAttributeKey,
      matrixUniformKey,
      color4fv,
      vertices3fv,
      normals3fv
    )
    if (color4fv.length < 4) {
      this.errorLog("color data must be of the type 4fv")
    }
    if (vertices3fv.length < 6) {
      this.errorLog("a 3d line needs at least 4 3fv coordinate elements in the 'psotionList' parameter")
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_STRIP
  }
}

class LineLoop3d extends VertexGroup3d {
  constructor(
    glCntxt,
    shader,
    matrixMath4x4,
    camera,
    colorUniformKey,
    posAttributeKey,
    matrixUniformKey,
    color4fv,
    vertices3fv,
    normals3fv
  ) {
    super(
      glCntxt,
      shader,
      matrixMath4x4,
      camera,
      colorUniformKey,
      posAttributeKey,
      matrixUniformKey,
      color4fv,
      vertices3fv
    )
    if (color4fv.length < 4) {
      this.errorLog("color data must be of the type 4fv")
    }
    if (vertices3fv.length < 6) {
      this.errorLog("a 3d line needs at least 4 3fv coordinate elements in the 'psotionList' parameter")
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_LOOP
  }
}