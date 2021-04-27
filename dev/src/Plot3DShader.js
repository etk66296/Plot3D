class Plot3DShader extends Plot3DObject {
  constructor() {
    super()

    this.name = ''

    this.program = null
    this.attributeList = []
    this.vertexUniformList = []
    this.fragmentUniformList = []
    
    this.vertexShaderCode = ''
    this.fragmentShaderCode = ''
  }
}