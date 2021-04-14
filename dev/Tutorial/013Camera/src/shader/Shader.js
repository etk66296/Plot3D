class Shader extends Plot3dBase {
  constructor(
    vertexShaderCode,
    fragmentShaderCode,
    attributeList,
    uniformList
  ) {
    super()
    this.program = null
    this.fragmentSource = null
    this.vertexSource = null
    this.attributeList = attributeList
    this.attributes = {}
    this.uniformList = uniformList
    this.uniforms = {}
    
    this.vertexShaderCode = vertexShaderCode
    this.fragmentShaderCode = fragmentShaderCode
  }
}