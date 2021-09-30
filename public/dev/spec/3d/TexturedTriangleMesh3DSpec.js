describe("TexturedTriangleMesh3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var math
  
  var myTexturedTriangleMesh
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
      attribute vec3 a_position;
      attribute vec3 a_normal;
      attribute vec2 a_texcoord;

      uniform mat4 u_modelMatrix;
      uniform mat4 u_modelToWorldMatrix;
      uniform mat4 u_ViewToProjectionMatrix;
      uniform mat4 u_worldToViewMatrix;

      varying vec2 v_texcoord;

      void main(void) {
        gl_Position = u_ViewToProjectionMatrix * u_worldToViewMatrix * u_modelToWorldMatrix * u_modelMatrix * vec4(a_position, 1.0);
        v_texcoord = a_texcoord;
      }
    `
    let fragmentShaderCode = `
      precision mediump float;     
      varying vec2 v_texcoord;
      uniform sampler2D u_texture;
      void main(void) {
        gl_FragColor = texture2D(u_texture, v_texcoord);
      }
    `
    shader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
    // myTexturedTriangleMesh = new TexturedTriangleMesh3D(glCntxt, shader, math)
  })
  
  // it("has the parent class TriangleMesh3D", function() {
  //   expect(myTexturedTriangleMesh.__proto__.__proto__.constructor.name).toEqual('TriangleMesh3D')
  // })

})