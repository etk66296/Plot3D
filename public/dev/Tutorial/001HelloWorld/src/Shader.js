class Shader {
  constructor(
    vertexShaderCode = '',
    fragmentShaderCode = '',
    attributeList = ['a_position'],
    uniformList = ['']
  ) {

    this.program = null
    this.fragmentSource = null
    this.vertexSource = null
    this.attributeList = attributeList
    this.attributes = {}
    this.uniformList = uniformList
    this.uniforms = {}
    
    this.vertexShaderCode = vertexShaderCode
    if (this.vertexShaderCode === '') {
      this.vertexShaderCode = `
        attribute vec4 a_position;
        void main() {
          gl_Position = a_position;
        }
      `
    }
    
    this.fragmentShaderCode = fragmentShaderCode
    if (this.fragmentShaderCode === '') {
      this.fragmentShaderCode = `
        precision mediump float;
        void main() {
          gl_FragColor = vec4(1, 0, 0.5, 1);
        }
      `
    }
  }
}