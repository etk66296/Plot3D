class ShaderItem extends ShaderObject {
  constructor(name, type) {
    super(name)

    this.type = type

    
  }

  concat() {
    return this.type + ' ' + this.name + ';'
  }
  
}