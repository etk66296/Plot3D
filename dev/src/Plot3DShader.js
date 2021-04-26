class Plot3DShader extends Plot3DObject {
  constructor() {
    super()

    this.name = ''

    this.program = null
    this.attributeList = []
    this.uniformList = []
    
    this.vertexShaderCode = ''
    this.fragmentShaderCode = ''
  }
}