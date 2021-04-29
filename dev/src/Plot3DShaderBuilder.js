class Plot3DShaderBuilder extends Plot3DBuilder {
  constructor(glCntxt = null) {
    super()
    this.glCntxt = glCntxt
    this.numberOfCompiledShaders = 0
    this.shaderList = []
    this.isInDebugMode = true
  }

  buildShader(vertexShaderCode, fragmentShaderCode) {
    if (typeof vertexShaderCode != 'string' &&
      typeof fragmentShaderCode != 'string') {
        console.error('vertex- and fragment shader code must be of type string')
        return null
      }
    let shader = new Plot3DShader()
    this.shaderList.push(shader)
    let regExpUnfiromFilter = /(?<=uniform\s+\w+\s+).*(?=\s*;)/g
    shader.vertexUniformList = vertexShaderCode.match(regExpUnfiromFilter)
    shader.fragmentUniformList = fragmentShaderCode.match(regExpUnfiromFilter)
    let regExpAttributeFilter = /(?<=attribute\s+\w+\s+).*(?=\s*;)/g
    shader.attributeList = vertexShaderCode.match(regExpAttributeFilter)

    this.compileAndLink(shader)

    return shader
  }

  compileAndLink(shader = null) {
    if (shader === null || shader.constructor.name !== 'Plot3DShader') {
      console.error("paramter must be of the type 'Plot3DShader'")
      return null
    }

    this.debuglog('..compile vertex shader')
    this.glCntxt.createShader(this.glCntxt.VERTEX_SHADER)
    // this.glCntxt.shaderSource(shader.vertexSource, shader.vertexShaderCode)
    // this.glCntxt.compileShader(shader.vertexSource)

    // this.debugLog('..compile fragment shader')
    // shader.fragmentSource = this.glCntxt.createShader(this.glCntxt.FRAGMENT_SHADER)
    // this.glCntxt.shaderSource(shader.fragmentSource, shader.fragmentShaderCode)
    // this.glCntxt.compileShader(shader.fragmentSource)

    // if (!this.glCntxt.getShaderParameter(shader.vertexSource, this.glCntxt.COMPILE_STATUS) ||
    //     !this.glCntxt.getShaderParameter(shader.fragmentSource, this.glCntxt.COMPILE_STATUS)) {
    //   this.errorLog([
    //     'An error occurred compiling the shaders: ',
    //     'vertex log: ' + this.glCntxt.getShaderInfoLog(shader.vertexSource),
    //     'fragment log: ' + this.glCntxt.getShaderInfoLog(shader.fragmentSource)
    //   ])
    //   this.glCntxt.deleteShader(shader.vertexSource)
    //   this.glCntxt.deleteShader(shader.fragmentSource)
    // } else {
    //   this.debugLog('..link shader program')
    //   shader.program = this.glCntxt.createProgram()
    //   this.glCntxt.attachShader(shader.program, shader.vertexSource)
    //   this.glCntxt.attachShader(shader.program, shader.fragmentSource)
    //   this.glCntxt.linkProgram(shader.program)
    // }

    // shader.attributeList.forEach((attributeName) => {
    //   shader.attributes[attributeName] = this.glCntxt.getAttribLocation(shader.program, attributeName)
    // })

    // shader.uniformList.forEach((uniformName) => {
    //   shader.uniforms[uniformName] = this.glCntxt.getUniformLocation(shader.program, uniformName)
    // })

    return shader
  }
}