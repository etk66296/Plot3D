describe("Renderable3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var math
  
  var shader
  var myRenderable3D
  
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
    myRenderable3D = new Renderable3D(glCntxt, shader, math)
  })
  
  it("should have the parent class Renderable", function() {
    expect(myRenderable3D.__proto__.__proto__.constructor.name).toEqual('Renderable')
  })

  it("should have a matrix 4x4 for rotating, scale and translate it in model space", function() {
    expect(myRenderable3D.modelMatrix.cells).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })

  it("should have a matrix 4x4 for rotating, scale and translate it in world space", function() {
    expect(myRenderable3D.modelToWorldMatrix.cells).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })

  it("should throw an exception in the constructor when the shader does not provide the model matrix uniform matrix", function() {
    let tmpVertexShaderCode = `
      attribute vec3 a_position;
      uniform mat4 u_modelToWorldMatrix;
      void main(void) {
        
      }
    `
    let tmpFragmentShaderCode = `
      void main(void) {
      }
    `
    let tmpShader = myPlot3DShaderBuilder.buildShader(tmpVertexShaderCode, tmpFragmentShaderCode)
    expect(function() { new Renderable3D(glCntxt, tmpShader, math) }).toThrow()

  })

  it("should throw an exception in the constructor when the shader does not provide the model to world uniform matrix", function() {
    let tmpVertexShaderCode = `
      attribute vec3 a_position;
      uniform mat4 u_modelMatrix;
      void main(void) {
        
      }
    `
    let tmpFragmentShaderCode = `
      void main(void) {
      }
    `
    let tmpShader = myPlot3DShaderBuilder.buildShader(tmpVertexShaderCode, tmpFragmentShaderCode)
    expect(function() { new Renderable3D(glCntxt, tmpShader, math) }).toThrow()

  })
  

  it("should append the exception message ShaderUniformNotFound", function() {
    expect(typeof myRenderable3D.exceptions.ShaderUniformNotFound).toEqual('function')
  })

  describe('exceptions.ShaderUniformNotFound', function() {
    var  myShaderUniformNotFound

    beforeEach(function() {
      myShaderUniformNotFound = new myRenderable3D.exceptions.ShaderUniformNotFound('blablba')
    })

    it("should have an attribute message, which is passed by the function parameter", function() {
      expect(myShaderUniformNotFound.message).toEqual('blablba')
    })

    it("should have an attribute name", function() {
      expect(myShaderUniformNotFound.name).toEqual('ShaderUniformNotFound')
    })

  })
})