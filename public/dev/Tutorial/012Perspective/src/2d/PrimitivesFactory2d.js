class Primitves2dFactory extends FactoryBase{
  constructor(glCntxt, shaderFactory) {
    super()
    this.glCntxt = glCntxt
    this.shaderFactory = shaderFactory

    this.primitves2dVertexShaderCode = `
      attribute vec2 a_position;
      uniform vec4 u_color;
      uniform mat3 u_matrix;

      varying vec4 v_color;
      void main() {
        vec2 position = (u_matrix * vec3(a_position, 1)).xy;
        gl_Position = vec4(position, 0, 1);
        v_color = u_color;
      }
    `
    this.primitves2dFragmentShaderCode = `
      precision mediump float;
      varying vec4 v_color;
      void main() {
        gl_FragColor = v_color;
      }
    `
    this.attributeList = ['a_position']
    this.uniformList = ['u_color', 'u_matrix']
    this.shader = this.shaderFactory.create(
      this.primitves2dVertexShaderCode,
      this.primitves2dFragmentShaderCode,
      this.attributeList,
      this.uniformList
    )
  }

  createLines2d(color = undefined, coordinateList = undefined) {
    return new Lines2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineStrip2d(color = undefined, coordinateList = undefined) {
    return new LineStrip2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineLoop2d(color = undefined, coordinateList = undefined) {
    return new LineLoop2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }

  createTriangles2d(color = undefined, coordinateList = undefined) {
    return new Triangles2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesStrip2d(color = undefined, coordinateList = undefined) {
    return new TrianglesStrip2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesLoop2d(color = undefined, coordinateList = undefined) {
    return new TrianglesLoop2d(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  
}