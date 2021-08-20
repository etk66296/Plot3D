describe("Renderable", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  
  var myRenderable
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
    myRenderable = new Renderable(glCntxt, shader)
  })
  
   it("has the parent class Plot3DObject", function() {
    expect(myRenderable.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("should take an instance of canvas webgl context webgl2", function() {
    expect(myRenderable.glCntxt.constructor.name).toEqual('WebGL2RenderingContext')
  })

  it("should have an object math, which is injected by the constructor and holds methods for calculation stuff", function() {
    expect(myRenderable.math).toEqual(null)
  })

  it("should take an instance of a compiled and linked shader", function() {
    expect(myRenderable.shader.constructor.name).toEqual('Plot3DShader')
  })

  it("should have a method update", function() {
    expect(typeof myRenderable.update).toEqual('function')
  })

  it("should have a method draw", function() {
    expect(typeof myRenderable.draw).toEqual('function')
  })

  it("should have a method for updating the shader uniforms", function() {
    expect(typeof myRenderable.updateShaderUniforms).toEqual('function')
  })

  it("should have a method for processing the shader attributes", function() {
    expect(typeof myRenderable.processShaderAttributes).toEqual('function')
  })
})