class Primitves3dFactory extends FactoryBase{
  constructor(glCntxt, shaderFactory) {
    super()
    this.glCntxt = glCntxt
    this.shaderFactory = shaderFactory

    this.primitves2DVertexShaderCode = `
      attribute vec4 a_position;
      uniform vec4 u_color;
      uniform mat4 u_matrix;

      varying vec4 v_color;
      void main() {
        gl_Position = u_matrix * a_position;
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
    this.uniformList = ['u_color', 'u_matrix']
    this.shader = this.shaderFactory.create(
      this.primitves2DVertexShaderCode,
      this.primitves2DFragmentShaderCode,
      this.attributeList,
      this.uniformList
    )
  }

  createLines3d(color = undefined, coordinateList = undefined) {
    return new Lines2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineStrip3d(color = undefined, coordinateList = undefined) {
    return new LineStrip2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineLoop3d(color = undefined, coordinateList = undefined) {
    return new LineLoop2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }

  createTriangles3d(color = undefined, coordinateList = undefined) {
    return new Triangles2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesStrip3d(color = undefined, coordinateList = undefined) {
    return new TrianglesStrip2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesLoop3d(color = undefined, coordinateList = undefined) {
    return new TrianglesLoop2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  
}