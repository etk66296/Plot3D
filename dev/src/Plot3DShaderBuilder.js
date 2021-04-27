class Plot3DShaderBuilder extends Plot3DBuilder {
  constructor() {
    super()
    this.numberOfCompiledShaders = 0
    this.shaderList = []
  }

  buildShader(vertexShaderCode, fragmentShaderCode) {
    let shader = new Plot3DShader()
    this.shaderList.push(shader)
    let regExpUnfiromFilter = /(?<=uniform\s+\w+\s+).*(?=\s*;)/g
    shader.vertexUniformList = vertexShaderCode.match(regExpUnfiromFilter)
    shader.fragmentUniformList = fragmentShaderCode.match(regExpUnfiromFilter)
    return shader
  }

  compileAndLink(shader = null) {
    if (shader === null || shader.constructor.name !== 'Plot3DShader') {
      console.error("paramter must be of the type 'Plot3DShader'")
      return null
    }
    return shader
  }
}