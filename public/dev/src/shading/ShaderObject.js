class ShaderObject extends Plot3DObject {
  constructor(name = '') {
    super()
    this.name = name

    this.shaderType = {
      NONE: 0,
      VERTEX: 1,
      FRAGMENT: 2
    }
    this.targetShaderType = this.shaderType.NONE
  }
}