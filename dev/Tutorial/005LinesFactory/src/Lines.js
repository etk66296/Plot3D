class Lines2D extends VertexGroup2D {
  constructor(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv)
    } else {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv, vertices2fv)
      if (positionsList.length < 4) {
        this.errorLog("a 2d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINES
  }

  update() {

  }
}

class LineStrip2D extends VertexGroup2D {
  constructor(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv)
    } else {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv, vertices2fv)
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_STRIP
  }

  update() {

  }
}

class LineLoop2D extends VertexGroup2D {
  constructor(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv)
    } else {
      super(glCntxt, shader, colorUnivormKey, posAttributeKey, color4fv, vertices2fv)
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_LOOP
  }

  update() {

  }
}