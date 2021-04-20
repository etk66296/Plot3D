class ShaderFactory extends Plot3dBase {
  constructor(glCntxt) {
    super()
    this.glCntxt = glCntxt
  }

  create(
    vertexShaderCode = '',
    fragmentShaderCode = '',
    attributeList = ['a_position'],
    uniformList = ['']
  ) {
    return this.compileAndLink(
      new Shader(
        vertexShaderCode,
        fragmentShaderCode,
        attributeList,
        uniformList
      )
    )
  }

  compileAndLink(shader) {
    this.debugLog('..compile vertex shader')
    shader.vertexSource = this.glCntxt.createShader(this.glCntxt.VERTEX_SHADER)
    this.glCntxt.shaderSource(shader.vertexSource, shader.vertexShaderCode)
    this.glCntxt.compileShader(shader.vertexSource)

    this.debugLog('..compile fragment shader')
    shader.fragmentSource = this.glCntxt.createShader(this.glCntxt.FRAGMENT_SHADER)
    this.glCntxt.shaderSource(shader.fragmentSource, shader.fragmentShaderCode)
    this.glCntxt.compileShader(shader.fragmentSource)

    if (!this.glCntxt.getShaderParameter(shader.vertexSource, this.glCntxt.COMPILE_STATUS) ||
        !this.glCntxt.getShaderParameter(shader.fragmentSource, this.glCntxt.COMPILE_STATUS)) {
      this.errorLog([
        'An error occurred compiling the shaders: ',
        'vertex log: ' + this.glCntxt.getShaderInfoLog(shader.vertexSource),
        'fragment log: ' + this.glCntxt.getShaderInfoLog(shader.fragmentSource)
      ])
      this.glCntxt.deleteShader(shader.vertexSource)
      this.glCntxt.deleteShader(shader.fragmentSource)
    } else {
      this.debugLog('..link shader program')
      shader.program = this.glCntxt.createProgram()
      this.glCntxt.attachShader(shader.program, shader.vertexSource)
      this.glCntxt.attachShader(shader.program, shader.fragmentSource)
      this.glCntxt.linkProgram(shader.program)
    }

    shader.attributeList.forEach((attributeName) => {
      shader.attributes[attributeName] = this.glCntxt.getAttribLocation(shader.program, attributeName)
    })

    shader.uniformList.forEach((uniformName) => {
      shader.uniforms[uniformName] = this.glCntxt.getUniformLocation(shader.program, uniformName)
    })

    return shader
  }
}