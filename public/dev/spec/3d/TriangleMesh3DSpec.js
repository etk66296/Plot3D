describe("TriangleMesh3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var math
  
  var myTriangleMesh
  var shader
  
  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    math = {
      vector3: new Vector3Math(),
      matrix4x4: new Matrix4x4Math()
    }
    myPlot3DShaderBuilder = new Plot3DShaderBuilder(glCntxt)
  })

  beforeEach(function() {
    let vertexShaderCode = `
      attribute vec4 a_position;
      attribute vec3 a_normal;

      varying vec3 v_normal;
      // [View To Projection]x[World To View]x[Model to World]
      uniform vec4 u_color;


      uniform mat4 u_modelMatrix;
      uniform mat4 u_modelToWorldMatrix;
      uniform mat4 u_WorldToViewMatrix;
      uniform mat4 u_ViewToProjectionMatrix;

      varying vec4 v_color;

      void main() {
        mat4 modelToProjection = u_ViewToProjectionMatrix * u_WorldToViewMatrix * u_modelToWorldMatrix * u_modelMatrix;
        gl_Position = modelToProjection * a_position;
        v_color = u_color;
        v_normal = (modelToProjection * vec4(a_normal.xyz, 0.0)).xyz;
      }
    `
    let fragmentShaderCode = `
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
    shader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
    myTriangleMesh = new TriangleMesh3D(glCntxt, shader, math)
  })
  
  it("has the parent class Renderable", function() {
    expect(myTriangleMesh.__proto__.__proto__.constructor.name).toEqual('Renderable3D')
  })

  it("should have a web gl buffer object", function() {
    expect(myTriangleMesh.glVertexBuffer.constructor.name).toEqual('WebGLBuffer')
  })

  it("should have an array for the vertices position data", function() {
    expect(myTriangleMesh.vertices.constructor.name).toEqual('Float32Array')
  })

  it("should have a method update", function() {
    expect(typeof myTriangleMesh.update).toEqual('function')
  })

  it("should have a 4x4 model 'modelMatrix', which is initialy the identity matrix", function() {
    expect(myTriangleMesh.modelMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myTriangleMesh.modelMatrix.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  })

  describe("update", function() {

  })

  it("should have a method draw", function() {
    expect(typeof myTriangleMesh.draw).toEqual('function')
  })

  describe("draw", function() {
    
  })

})