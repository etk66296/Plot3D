describe("Plot3DShaderBuilder", function() {
  var myPlot3DShaderBuilder
  var vertexShaderCode
  let fragmentShaderCode

  beforeEach(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    myPlot3DShaderBuilder = new Plot3DShaderBuilder(glCntxt)
    vertexShaderCode = `
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
    fragmentShaderCode = `
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
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DShaderBuilder.__proto__.__proto__.constructor.name).toEqual('Plot3DBuilder')
  })

  it("should take an instance of canvas webgl context webgl2", function() {
    expect(myPlot3DShaderBuilder.glCntxt.constructor.name).toEqual('WebGL2RenderingContext')
  })

  it("should has an counter for giving each shader an unique id", function() {
    expect(myPlot3DShaderBuilder.numberOfCompiledShaders).toEqual(0)
  })

  it("should have an attribute shaderList with all compiled shaders", function() {
    expect(myPlot3DShaderBuilder.shaderList.constructor.name).toEqual('Array')
  })

  it("should provide a method buildShader which takes two arguments the vertex- and the fragment shader code string", function() {
    expect(typeof myPlot3DShaderBuilder.buildShader).toBe("function")
    
    spyOn(myPlot3DShaderBuilder, 'buildShader')
    let vertexShader = ''
    let fragmentShader = ''
    myPlot3DShaderBuilder.buildShader(vertexShader, fragmentShader)
    expect(myPlot3DShaderBuilder.buildShader).toHaveBeenCalledWith(vertexShader, fragmentShader)
  })

  describe("buildShader", function() {

    it("should log an error if the parameters not typeof string", function() {
      spyOn(console, 'error')
      myPlot3DShaderBuilder.buildShader(12, undefined)
      expect(console.error).toHaveBeenCalled()
    })

    it("should push the built shader to the shader list", function() {
      let myShader = myPlot3DShaderBuilder.buildShader('', '')
      expect(myShader).toEqual(myPlot3DShaderBuilder.shaderList[myPlot3DShaderBuilder.shaderList.length - 1])
    })

    it("should pass trough the constructed shader object to the method compileAndLink", function() {
      spyOn(myPlot3DShaderBuilder, 'compileAndLink')
      myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myPlot3DShaderBuilder.compileAndLink).toHaveBeenCalled()
    })
    
    it("should return a shader object", function() {
      let myShader = myPlot3DShaderBuilder.buildShader('', '')
      expect(myShader.constructor.name).toEqual('Plot3DShader')
    })

    it("should filter all uniforms from the vertex shader code", function() {
      let myShader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, '')
      expect(myShader.vertexUniformList).toEqual([ 'u_color', 'u_matrix', 'u_normalMatrix' ])
    })

    it("should filter all attributes from the vertex shader code", function() {
      let myShader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, '')
      expect(myShader.attributeList).toEqual([ 'a_position', 'a_normal' ])
    })

    it("should filter all uniforms from the fragment shader code", function() {
      let myShader = myPlot3DShaderBuilder.buildShader('', fragmentShaderCode)
      expect(myShader.fragmentUniformList).toEqual([ 'u_reverseLightDirection' ])
    })
  })

  it("should provide a method compileAndLink with one parameter of type Plot3DShader", function() {
    expect(typeof myPlot3DShaderBuilder.compileAndLink).toBe("function")
  })

  describe("compileAndLink", function() {
    var shader
    beforeEach(function() {
      shader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
    })
    it("should log an error if the parameter shader is not an instance of Plot3DObject", function() {
      spyOn(console, 'error')
      myPlot3DShaderBuilder.compileAndLink(null)
      expect(console.error).toHaveBeenCalled()
    })

    it("should create a gl vertex shader", function() {
      spyOn(myPlot3DShaderBuilder.glCntxt, 'createShader')
      myPlot3DShaderBuilder.compileAndLink(shader)
      expect(myPlot3DShaderBuilder.glCntxt.createShader).toHaveBeenCalled()
    })
  })

})