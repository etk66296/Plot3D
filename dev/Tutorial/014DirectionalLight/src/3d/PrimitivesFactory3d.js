class Primitves3dFactory extends FactoryBase{
  constructor(glCntxt, shaderFactory, camera) {
    super()
    this.glCntxt = glCntxt
    this.shaderFactory = shaderFactory
    this.matrixMath4x4 = camera.matrixMath4x4
    this.vectorMath3x1 = camera.vectorMath3x1
    this.camera = camera

    this.primitves3DVertexShaderCode = `
      attribute vec4 a_position;
      attribute vec3 a_normal;
      
      varying vec3 v_normal;

      uniform vec4 u_color;
      uniform mat4 u_matrix;
      uniform mat4 u_normalMatrix;

      varying vec4 v_color;
      void main() {
        gl_Position = u_matrix * a_position;
        v_color = u_color;
        v_normal = (u_normalMatrix * vec4(a_normal.xyz, 0.0)).xyz;
      }
    `
    this.primitves3DFragmentShaderCode = `
      precision mediump float;
      
      varying vec4 v_color;
      varying vec3 v_normal;

      uniform vec3 u_reverseLightDirection;

      void main() {
        vec3 normal = normalize(v_normal);
        float light = dot(normal, u_reverseLightDirection);
        gl_FragColor = v_color;
        gl_FragColor.rgb *= light;
      }
    `

    this.attributeList = ['a_position', 'a_normal']
    this.uniformList = [ 'u_color', 'u_matrix', 'u_normalMatrix', 'u_reverseLightDirection' ]
    this.shader = this.shaderFactory.create(
      this.primitves3DVertexShaderCode,
      this.primitves3DFragmentShaderCode,
      this.attributeList,
      this.uniformList
    )
  }


  createVertexGroup3d(color = undefined, coordinateList = undefined, normalsList = undefined) {
    return new VertexGroup3d(
      this.glCntxt,
      this.shader,
      this.matrixMath4x4,
      this.camera,
      'u_color',
      'a_position',
      'u_matrix',
      color,
      coordinateList,
      normalsList
    )
  }

  createLines3d(color = undefined, coordinateList = undefined, normalsList = undefined) {
    return new Lines3d(
      this.glCntxt,
      this.shader,
      this.matrixMath4x4,
      this.camera,
      'u_color',
      'a_position',
      'u_matrix',
      color,
      coordinateList,
      normalsList
    )
  }
  createLineStrip3d(color = undefined, coordinateList = undefined, normalsList = undefined) {
    return new LineStrip3d(
      this.glCntxt,
      this.shader,
      this.matrixMath4x4,
      this.camera,
      'u_color',
      'a_position',
      'u_matrix',
      color,
      coordinateList,
      normalsList
    )
  }
  createLineLoop3d(color = undefined, coordinateList = undefined, normalsList = undefined) {
    return new LineLoop3d(
      this.glCntxt,
      this.shader,
      this.matrixMath4x4,
      this.camera,
      'u_color',
      'a_position',
      'u_matrix',
      color,
      coordinateList,
      normalsList
    )
  }
  createTriangles3d(color = undefined, coordinateList = undefined, normalsList = undefined) {
    return new Triangles3d(
      this.glCntxt,
      this.shader,
      this.matrixMath4x4,
      this.camera,
      'u_color',
      'a_position',
      'u_matrix',
      color,
      coordinateList,
      normalsList
    )
  }
  createTrianglesStrip3d(color = undefined, coordinateList = undefined, normalsList = undefined) {
    return new TrianglesStrip3d(
      this.glCntxt,
      this.shader,
      this.matrixMath4x4,
      this.camera,
      'u_color',
      'a_position',
      'u_matrix',
      color,
      coordinateList,
      normalsList
    )
  }
  createTrianglesLoop3d(color = undefined, coordinateList = undefined, normalsList = undefined) {
    return new TrianglesLoop3d(
      this.glCntxt,
      this.shader,
      this.matrixMath4x4,
      this.camera,
      'u_color',
      'a_position',
      'u_matrix',
      color,
      coordinateList,
      normalsList
    )
  }
  
}