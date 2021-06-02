class Triangles3d extends VertexGroup3d {
  constructor(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 6) {
        this.errorLog("a 3d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.TRIANGLES
  }
}

class TrianglesStrip3d extends VertexGroup3d {
  constructor(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 6) {
        this.errorLog("a 3d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.TRIANGLE_STRIP
  }
}

class TrianglesLoop3d extends VertexGroup3d {
  constructor(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, matrixMath4x4, camera, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 6) {
        this.errorLog("a 3d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.TRIANGLE_FAN
  }
}