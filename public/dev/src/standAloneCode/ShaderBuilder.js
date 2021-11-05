class Plot3DShaderBuilder {
  constructor(glCntxt = null) {
    this.glCntxt = glCntxt
    this.numberOfCompiledShaders = 0
    this.shaderList = []
  }

  buildShader(vertexShaderCode, fragmentShaderCode) {
    let shader = new Plot3DShader()
    shader.vertexShaderCode = vertexShaderCode
    shader.fragmentShaderCode = fragmentShaderCode
    let regExpUnfiromFilter = /(?<=uniform\s+\w+\s+).*(?=\s*;)/g
    shader.inputs.vertexUniformList = shader.vertexShaderCode.match(regExpUnfiromFilter)
    shader.inputs.fragmentUniformList = shader.fragmentShaderCode.match(regExpUnfiromFilter)
    let regExpAttributeFilter = /(?<=attribute\s+\w+\s+).*(?=\s*;)/g
    shader.inputs.attributeList = shader.vertexShaderCode.match(regExpAttributeFilter)

    shader = this.compileVertexShader(shader)
    shader = this.compileFragmentShader(shader)
    shader = this.linkProgram(shader)

    shader.name = 'Shader' + String(this.numberOfCompiledShaders)
    this.numberOfCompiledShaders++

    this.shaderList.push(shader)

    return shader
  }

  compileVertexShader(shader) {
    console.log('..compile vertex shader')
    shader.glVertexShader = this.glCntxt.createShader(this.glCntxt.VERTEX_SHADER)
    this.glCntxt.shaderSource(shader.glVertexShader, shader.vertexShaderCode)
    this.glCntxt.compileShader(shader.glVertexShader)
    if (!this.glCntxt.getShaderParameter(shader.glVertexShader, this.glCntxt.COMPILE_STATUS)) {
      console.error(this.glCntxt.getShaderInfoLog(shader.glVertexShader))
    }
    return shader
  }

  compileFragmentShader(shader) {
    console.log('..compile fragment shader')
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

    console.log('..link shader program')
    shader.program = this.glCntxt.createProgram()
    this.glCntxt.attachShader(shader.program, shader.glVertexShader)
    this.glCntxt.attachShader(shader.program, shader.glFragmentShader)
    this.glCntxt.linkProgram(shader.program)

    shader.inputs.attributeList.forEach((attribute) => {
      shader.glAttrLocation[attribute] = this.glCntxt.getAttribLocation(shader.program, attribute)
    })

    shader.inputs.vertexUniformList.forEach((vertexUniform) => {
      shader.glVertexUniformLocation[vertexUniform] = this.glCntxt.getUniformLocation(shader.program, vertexUniform)
    })

    if (shader.inputs.fragmentUniformList != null) {
      shader.inputs.fragmentUniformList.forEach((fragmentUniform) => {
        shader.glFragmentUniformLocation[fragmentUniform] = this.glCntxt.getUniformLocation(shader.program, fragmentUniform)
      })
    }

    return shader
  }
}