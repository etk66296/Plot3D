class ShaderItem extends ShaderObject {
  constructor(type, identifier) {
    super()

    this.type = type
    this.identifier = identifier

    this.shaderType = {
      NONE: 0,
      VERTEX: 1,
      FRAGMENT: 2
    }
    this.targetShaderType = this.shaderType.NONE
  }

  concat() {
    return this.type + ' ' + this.identifier + ';'
  }
}