class Lines2D extends VertexGroup2d {
  constructor(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 4) {
        this.errorLog("a 2d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINES
  }
}

class LineStrip2D extends VertexGroup2d {
  constructor(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 4) {
        this.errorLog("a 2d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_STRIP
  }
}

class LineLoop2D extends VertexGroup2d {
  constructor(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, matrixUnivormKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 4) {
        this.errorLog("a 2d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_LOOP
  }
}