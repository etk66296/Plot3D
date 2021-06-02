class Plot3DShader extends Plot3DObject {
  constructor() {
    super()

    this.name = ''

    this.program = null
    this.attributeList = []
    this.vertexUniformList = []
    this.fragmentUniformList = []

    this.glAttrLocation = {}
    this.glVertexUniformLocation = {}
    this.glFragmentUniformLocation = {}
    
    this.vertexShaderCode = ''
    this.fragmentShaderCode = ''

    this.glVertexShader = null
    this.glFragmentShader = null
  }
}