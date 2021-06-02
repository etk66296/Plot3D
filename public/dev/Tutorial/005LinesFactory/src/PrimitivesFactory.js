class Primitves2DFactory extends Plot3DFactory{
  constructor(glCntxt, shaderFactory) {
    super()
    this.glCntxt = glCntxt
    this.shaderFactory = shaderFactory

    this.primitves2DVertexShaderCode = `
      attribute vec4 a_position;
      uniform vec4 u_color;
      varying vec4 v_color;
      void main() {
        gl_Position = a_position;
        v_color = u_color;
      }
    `
    this.primitves2DFragmentShaderCode = `
      precision mediump float;
      varying vec4 v_color;
      void main() {
        gl_FragColor = v_color;
      }
    `
    this.attributeList = ['a_position']
    this.uniformList = ['u_color']
    this.shader = this.shaderFactory.create(
      this.primitves2DVertexShaderCode,
      this.primitves2DFragmentShaderCode,
      this.attributeList,
      this.uniformList
    )
  }

  createLines2D(coordinateList = undefined, color = undefined){
    return new LineLoop2D(this.glCntxt, this.shader, 'u_color', 'a_position', color, coordinateList)
  }
  createLineStrip2D(coordinateList = undefined, color = undefined){
    return new LineLoop2D(this.glCntxt, this.shader, 'u_color', 'a_position', color, coordinateList)
  }
  createLineLoop2D(coordinateList = undefined, color = undefined){
    return new LineLoop2D(this.glCntxt, this.shader, 'u_color', 'a_position', color, coordinateList)
  }
  
}