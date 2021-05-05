describe("TriangleMesh3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  
  var myTriangleMesh
  var shader
  
  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    myPlot3DShaderBuilder = new Plot3DShaderBuilder(glCntxt)
  })

  beforeEach(function() {
    let vertexShaderCode = `
      attribute vec4 a_position;
      attribute vec3 a_normal;

      varying vec3 v_normal;
      // [View To Projection]x[World To View]x[Model to World]
      uniform vec4 u_color;
      
      uniform mat4 u_modelToWorld;
      uniform mat4 u_WorldToView;
      uniform mat4 u_ViewToProjection;

      varying vec4 v_color;
      void main() {
        gl_Position = u_ViewToProjection * u_WorldToView * u_modelToWorld * a_position;
        v_color = u_color;
        v_normal = (u_WorldToView * u_modelToWorld * vec4(a_normal.xyz, 0.0)).xyz;
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
    matrixFactory = new MatrixFactory()
    myTriangleMesh = new TriangleMesh3D(glCntxt, shader, matrixFactory)
  })
  
  it("has the parent class Renderable", function() {
    expect(myTriangleMesh.__proto__.__proto__.constructor.name).toEqual('Renderable3D')
  })

  it("should have a method update", function() {
    expect(typeof myTriangleMesh.update).toEqual('function')
  })

  describe("update", function() {

  })

  it("should have a method draw", function() {
    expect(typeof myTriangleMesh.draw).toEqual('function')
  })

})