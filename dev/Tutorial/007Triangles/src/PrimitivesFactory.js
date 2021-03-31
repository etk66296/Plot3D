class Primitves2DFactory extends Plot3DFactory{
  constructor(glCntxt, shaderFactory) {
    super()
    this.glCntxt = glCntxt
    this.shaderFactory = shaderFactory

    this.primitves2DVertexShaderCode = `
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

  createLines2D(color = undefined, coordinateList = undefined) {
    return new Lines2D(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineStrip2D(color = undefined, coordinateList = undefined) {
    return new LineStrip2D(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineLoop2D(color = undefined, coordinateList = undefined) {
    return new LineLoop2D(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }

  createTriangles2D(color = undefined, coordinateList = undefined) {
    return new Triangles2D(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesStrip2D(color = undefined, coordinateList = undefined) {
    return new TrianglesStrip2D(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesLoop2D(color = undefined, coordinateList = undefined) {
    return new TrianglesLoop2D(this.glCntxt, this.shader, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  
}