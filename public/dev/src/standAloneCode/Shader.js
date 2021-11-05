class Plot3DShader {
  constructor() {

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

}