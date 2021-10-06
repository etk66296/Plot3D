class ShaderItem extends Plot3DObject {
  constructor(type, identifier) {
    super()

    this.type = type
    this.identifier = identifier

  }

  concat() {
    return this.type + ' ' + this.identifier + ';'
  }
}