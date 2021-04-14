class Primitves3dFactory extends FactoryBase{
  constructor(glCntxt, shaderFactory, matrixMath, vectorMath) {
    super()
    this.glCntxt = glCntxt
    this.shaderFactory = shaderFactory
    this.matrixMath4x4 = matrixMath
    this.vectorMath3x1 = vectorMath
    this.camera = new Camera(this.glCntxt, this.matrixMath4x4, this.vectorMath3x1)

    this.primitves3DVertexShaderCode = `
      attribute vec4 a_position;
      uniform vec4 u_color;
      uniform mat4 u_matrix;

      varying vec4 v_color;
      void main() {
        gl_Position = u_matrix * a_position;
        v_color = u_color;
      }
    `
    this.primitves3DFragmentShaderCode = `
      precision mediump float;
      varying vec4 v_color;
      void main() {
        gl_FragColor = v_color;
      }
    `

    this.attributeList = ['a_position']
    this.uniformList = ['u_color', 'u_matrix']
    this.shader = this.shaderFactory.create(
      this.primitves3DVertexShaderCode,
      this.primitves3DFragmentShaderCode,
      this.attributeList,
      this.uniformList
    )
  }


  createVertexGroup3d(color = undefined, coordinateList = undefined) {
    return new VertexGroup3d(this.glCntxt, this.shader, this.matrixMath4x4, this.camera, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }

  createLines3d(color = undefined, coordinateList = undefined) {
    return new Lines3d(this.glCntxt, this.shader, this.matrixMath4x4, this.camera, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineStrip3d(color = undefined, coordinateList = undefined) {
    return new LineStrip3d(this.glCntxt, this.shader, this.matrixMath4x4, this.camera, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createLineLoop3d(color = undefined, coordinateList = undefined) {
    return new LineLoop3d(this.glCntxt, this.shader, this.matrixMath4x4, this.camera, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }

  createTriangles3d(color = undefined, coordinateList = undefined) {
    return new Triangles3d(this.glCntxt, this.shader, this.matrixMath4x4, this.camera, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesStrip3d(color = undefined, coordinateList = undefined) {
    return new TrianglesStrip3d(this.glCntxt, this.shader, this.matrixMath4x4, this.camera, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  createTrianglesLoop3d(color = undefined, coordinateList = undefined) {
    return new TrianglesLoop3d(this.glCntxt, this.shader, this.matrixMath4x4, this.camera, 'u_color', 'a_position', 'u_matrix', color, coordinateList)
  }
  
}