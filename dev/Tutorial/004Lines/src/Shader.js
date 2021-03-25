class Shader {
  constructor(
    vertexShaderCode,
    fragmentShaderCode,
    attributeList,
    uniformList
  ) {
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