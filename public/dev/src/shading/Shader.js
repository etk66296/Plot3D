class Plot3DShader extends Plot3DObject {
  constructor() {
    super()

    this.name = ''

    this.program = null
    
    this.inputs = {
      attributeList: [],
      vertexUniformList: [],
      fragmentUniformList: []
    }
    

    this.glAttrLocation = {}
    this.glVertexUniformLocation = {}
    this.glFragmentUniformLocation = {}
    
    this.vertexShaderCode = ''
    this.fragmentShaderCode = ''

    this.glVertexShader = null
    this.glFragmentShader = null
  
  }

  addMat4Uniform(name) {

  }

  

}