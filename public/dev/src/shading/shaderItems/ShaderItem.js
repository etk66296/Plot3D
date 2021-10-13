class ShaderItem extends Plot3DObject {
  constructor(type, identifier) {
    super()

    this.type = type
    this.identifier = identifier

    this.targetShaderType = ''    
  }

  concat() {
    return this.type + ' ' + this.identifier + ';'
  }
}