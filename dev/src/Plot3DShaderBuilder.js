class Plot3DShaderBuilder extends Plot3DBuilder {
  constructor(glCntxt = null) {
    super()
    this.glCntxt = glCntxt
    this.numberOfCompiledShaders = 0
    this.shaderList = []
    this.isInDebugMode = true
  }

  buildShader(vertexShaderCode, fragmentShaderCode) {
    if (typeof vertexShaderCode != 'string' ||
      typeof fragmentShaderCode != 'string') {
        console.error('vertex- and fragment shader code must be of type string')
        return null
    }
    if (vertexShaderCode === '') {
        console.error('vertex shader source code is empty')
        return null
    }
    if (fragmentShaderCode === '') {
      console.error('fragment shader source code is empty')
      return null
  }

    let shader = new Plot3DShader()
    shader.vertexShaderCode = vertexShaderCode
    shader.fragmentShaderCode = fragmentShaderCode
    this.shaderList.push(shader)
    let regExpUnfiromFilter = /(?<=uniform\s+\w+\s+).*(?=\s*;)/g
    shader.vertexUniformList = shader.vertexShaderCode.match(regExpUnfiromFilter)
    shader.fragmentUniformList = shader.fragmentShaderCode.match(regExpUnfiromFilter)
    let regExpAttributeFilter = /(?<=attribute\s+\w+\s+).*(?=\s*;)/g
    shader.attributeList = shader.vertexShaderCode.match(regExpAttributeFilter)

    return shader
  }

  compileVertexShader(shader) {
    this.debuglog('..compile vertex shader')
    shader.glVertexShader = this.glCntxt.createShader(this.glCntxt.VERTEX_SHADER)
    this.glCntxt.shaderSource(shader.glVertexShader, shader.vertexShaderCode)
    this.glCntxt.compileShader(shader.glVertexShader)
    if (!this.glCntxt.getShaderParameter(shader.glVertexShader, this.glCntxt.COMPILE_STATUS)) {
      console.error(this.glCntxt.getShaderInfoLog(shader.glVertexShader))
    }
    return shader
  }


  compileFragmentShader(shader) {
    this.debuglog('..compile fragment shader')
    shader.glFragmentShader = this.glCntxt.createShader(this.glCntxt.FRAGMENT_SHADER)
    this.glCntxt.shaderSource(shader.glFragmentShader, shader.fragmentShaderCode)
    this.glCntxt.compileShader(shader.glFragmentShader)
    if (!this.glCntxt.getShaderParameter(shader.glFragmentShader, this.glCntxt.COMPILE_STATUS)) {
      console.error(this.glCntxt.getShaderInfoLog(shader.glFragmentShader))
    }
    return shader
  }

  linkProgram(shader = null) {
    if (shader === null || shader.constructor.name !== 'Plot3DShader') {
      console.error("paramter must be of the type 'Plot3DShader'")
      return null
    }

    

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