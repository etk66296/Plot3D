class Lines2D extends VertexGroup {
  constructor(glCntxt, shader2d, posAttributeKey, positionsList) {
    if (positionsList === undefined) {
      super(glCntxt, shader2d, posAttributeKey)
    } else {
      super(glCntxt, shader2d, posAttributeKey, positionsList)
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINES
  }

  update() {

  }

}