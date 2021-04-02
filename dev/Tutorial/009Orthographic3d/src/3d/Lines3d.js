class Lines3d extends VertexGroup3d {
  constructor(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices3fv) {
    if (color4fv === undefined && vertices3fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices3fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices3fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices3fv.length < 6) {
        this.errorLog("a 3d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINES
  }
}

class LineStrip3d extends VertexGroup3d {
  constructor(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices3fv) {
    if (color4fv === undefined && vertices3fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices3fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices3fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices3fv.length < 6) {
        this.errorLog("a 3d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_STRIP
  }
}

class LineLoop3d extends VertexGroup3d {
  constructor(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices3fv) {
    if (color4fv === undefined && vertices3fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices3fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices3fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices3fv.length < 6) {
        this.errorLog("a 3d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_LOOP
  }
}