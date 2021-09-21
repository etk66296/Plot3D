describe("ColoredTriangleMesh3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var math
  
  var myColoredTriangleMesh
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
      attribute vec4 a_color;

      uniform mat4 u_modelMatrix;
      uniform mat4 u_modelToWorldMatrix;
      uniform mat4 u_cameraModelMatrix;
      uniform mat4 u_cameraTranslationMatrix;
      uniform mat4 u_WorldToViewMatrix;
      uniform mat4 u_ViewToProjectionMatrix;

      varying lowp vec4 v_color;

      void main(void) {
        gl_Position = u_ViewToProjectionMatrix * u_cameraTranslationMatrix * u_cameraModelMatrix * u_WorldToViewMatrix * u_modelToWorldMatrix * u_modelMatrix * vec4(a_position, 1.0);
        v_color = a_color;
      }
    `
    let fragmentShaderCode = `
      precision mediump float;

      varying lowp vec4 v_color;

      void main(void) {
        gl_FragColor = v_color;
      }
    `
    shader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
    myColoredTriangleMesh = new ColoredTriangleMesh3D(glCntxt, shader, math)
  })
  
  it("has the parent class TriangleMesh3D", function() {
    expect(myColoredTriangleMesh.__proto__.__proto__.constructor.name).toEqual('TriangleMesh3D')
  })

  // it("should configure the color attribute pointer", function() {
  //   spyOn(glCntxt, 'vertexAttribPointer')
  //   myTriangleMesh.draw()
  //   expect(glCntxt.vertexAttribPointer).toHaveBeenCalledWith(myTriangleMesh.shader.glAttrLocation['a_color'],
  //     4,
  //     glCntxt.FLOAT,
  //     false,
  //     0,
  //     0)
  // })

  // it("should throw an error when the shader does not provide the color attribute", function() {
  //   let tmpVertexShaderCode = `
  //     attribute vec3 a_position;
  //     attribute vec3 a_normal;
  //     uniform mat4 u_modelToWorldMatrix;
  //     uniform mat4 u_modelMatrix;
  //     void main(void) {
  //     }
  //   `
  //   let tmpFragmentShaderCode = `
  //     void main(void) {
  //     }
  //   `
  //   let tmpShader = myPlot3DShaderBuilder.buildShader(tmpVertexShaderCode, tmpFragmentShaderCode)
  //   expect(function() { new TriangleMesh3D(glCntxt, tmpShader, math) }).toThrow()
  // })

  // it("should enable color attribute array for the a_normal shader attribute", function() {
  //   spyOn(glCntxt, 'enableVertexAttribArray')
  //   myTriangleMesh.draw()
  //   expect(glCntxt.enableVertexAttribArray).toHaveBeenCalledWith(myTriangleMesh.shader.glAttrLocation['a_color'])
  // })


})