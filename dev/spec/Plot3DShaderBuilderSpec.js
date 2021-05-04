describe("Plot3DShaderBuilder", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var vertexShaderCode
  var fragmentShaderCode
  var shader

  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    myPlot3DShaderBuilder = new Plot3DShaderBuilder(glCntxt)
  })

  beforeEach(function() {
    shader = new Plot3DShader()
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
    shader.vertexShaderCode = vertexShaderCode
    shader.fragmentShaderCode = fragmentShaderCode
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DShaderBuilder.__proto__.__proto__.constructor.name).toEqual('Plot3DBuilder')
  })

  it("should take an instance of canvas webgl context webgl2", function() {
    expect(myPlot3DShaderBuilder.glCntxt.constructor.name).toEqual('WebGL2RenderingContext')
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

    it("should log an error if the vertex shader code is an empty string", function() {
      spyOn(console, 'error')
      myPlot3DShaderBuilder.buildShader('', fragmentShaderCode)
      expect(console.error).toHaveBeenCalled()
    })

    it("should log an error if the fragment shader code is an empty string", function() {
      spyOn(console, 'error')
      myPlot3DShaderBuilder.buildShader(vertexShaderCode, '')
      expect(console.error).toHaveBeenCalled()
    })

    it("should push the built shader to the shader list", function() {
      let myShader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myShader).toEqual(myPlot3DShaderBuilder.shaderList[myPlot3DShaderBuilder.shaderList.length - 1])
    })
    
    it("should return a shader object", function() {
      let myShader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myShader.constructor.name).toEqual('Plot3DShader')
    })

    it("should filter all uniforms from the vertex shader code", function() {
      let myShader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myShader.vertexUniformList).toEqual([ 'u_color', 'u_matrix', 'u_normalMatrix' ])
    })

    it("should filter all attributes from the vertex shader code", function() {
      let myShader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myShader.attributeList).toEqual([ 'a_position', 'a_normal' ])
    })

    it("should filter all uniforms from the fragment shader code", function() {
      let myShader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myShader.fragmentUniformList).toEqual([ 'u_reverseLightDirection' ])
    })

    it("should call compileVertexShader", function() {
      spyOn(myPlot3DShaderBuilder, 'compileVertexShader').and.callThrough()
      myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myPlot3DShaderBuilder.compileVertexShader).toHaveBeenCalled()
    })

    it("should call compileVertexShader", function() {
      spyOn(myPlot3DShaderBuilder, 'compileFragmentShader').and.callThrough()
      myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myPlot3DShaderBuilder.compileFragmentShader).toHaveBeenCalled()
    })

    it("should call link Program", function() {
      spyOn(myPlot3DShaderBuilder, 'linkProgram').and.callThrough()
      myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      expect(myPlot3DShaderBuilder.linkProgram).toHaveBeenCalled()
    })

    it("map an unique name to the shader", function() {
      let myExtraPlot3DShaderBuilder = new Plot3DShaderBuilder(glCntxt)
      myExtraPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      myExtraPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      myExtraPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
      let myShaderNames = []
      myExtraPlot3DShaderBuilder.shaderList.forEach((shader) => {
        myShaderNames.push(shader.name)
      })
      expect(myShaderNames).toEqual([ "Shader0", "Shader1", "Shader2" ])
    })
  })

  it("should provide a method linkProgram with one parameter of type Plot3DShader", function() {
    expect(typeof myPlot3DShaderBuilder.linkProgram).toBe("function")
  })

  it("should provide a method compileVertexShader", function() {
    expect(typeof myPlot3DShaderBuilder.compileVertexShader).toBe("function")
  })

  describe("compileVertexShader", function() {
    it("should create an opengl vertex shader, map the vertex shader source code and compile it", function() {
      spyOn(myPlot3DShaderBuilder.glCntxt, 'createShader').withArgs(glCntxt.VERTEX_SHADER).and.callThrough()
      spyOn(myPlot3DShaderBuilder.glCntxt, 'shaderSource').and.callThrough()
      spyOn(myPlot3DShaderBuilder.glCntxt, 'compileShader').and.callThrough()
      myPlot3DShaderBuilder.compileVertexShader(shader)
      expect(myPlot3DShaderBuilder.glCntxt.createShader).toHaveBeenCalled()
      expect(myPlot3DShaderBuilder.glCntxt.shaderSource).toHaveBeenCalled()
      expect(myPlot3DShaderBuilder.glCntxt.compileShader).toHaveBeenCalled()
    })

    it("should report an error when the shader is not compiled succesfully", function() {
      shader.vertexShaderCode = `
        attribute vec4 a_position;
        attribute vec3 a_normal;

        varying vec3 v_normal

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
      spyOn(myPlot3DShaderBuilder.glCntxt, 'getShaderParameter').and.callThrough()
      spyOn(console, 'error')
      myPlot3DShaderBuilder.compileVertexShader(shader)
      expect(myPlot3DShaderBuilder.glCntxt.getShaderParameter).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalled()
    })

    it("should return a Plot3DShader shader object", function() {
      let myCompiledShader = myPlot3DShaderBuilder.compileVertexShader(shader)
      expect(myCompiledShader.constructor.name).toEqual('Plot3DShader')
    })
  })

  it("should provide a method compileFragmentShader", function() {
    expect(typeof myPlot3DShaderBuilder.compileFragmentShader).toBe("function")
  })

  describe("compileFragmentShader", function() {
    
    it("should create an opengl fragment shader, map the fragment shader source code and compile it", function() {
      spyOn(myPlot3DShaderBuilder.glCntxt, 'createShader').withArgs(glCntxt.FRAGMENT_SHADER).and.callThrough()
      spyOn(myPlot3DShaderBuilder.glCntxt, 'shaderSource').and.callThrough()
      spyOn(myPlot3DShaderBuilder.glCntxt, 'compileShader').and.callThrough()
      myPlot3DShaderBuilder.compileFragmentShader(shader)
      expect(myPlot3DShaderBuilder.glCntxt.createShader).toHaveBeenCalled()
      expect(myPlot3DShaderBuilder.glCntxt.shaderSource).toHaveBeenCalled()
      expect(myPlot3DShaderBuilder.glCntxt.compileShader).toHaveBeenCalled()
    })

    it("should report an error when the shader is not compiled succesfully", function() {
      shader.fragmentShaderCode = `
        precision mediump float;

        varying vec4 v_color;
        varying vec3 v_normal;

        uniform vec3 u_reverseLightDirection

        void main() {
          vec3 normal = normalize(v_normal);
          float light = dot(normal, u_reverseLightDirection);
          gl_FragColor = v_color;
          gl_FragColor.rgb *= light;
        }
      `
      spyOn(myPlot3DShaderBuilder.glCntxt, 'getShaderParameter').and.callThrough()
      spyOn(console, 'error')
      myPlot3DShaderBuilder.compileFragmentShader(shader)
      expect(myPlot3DShaderBuilder.glCntxt.getShaderParameter).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalled()
    })

    it("should return a Plot3DShader shader object", function() {
      let myCompiledShader = myPlot3DShaderBuilder.compileVertexShader(shader)
      expect(myCompiledShader.constructor.name).toEqual('Plot3DShader')
    })
  })

  describe("linkProgram", function() {
    beforeEach(function() {
      myPlot3DShaderBuilder.compileVertexShader(shader)
      myPlot3DShaderBuilder.compileFragmentShader(shader)
    })
   
    it("should log an error if the parameter shader is not an instance of Plot3DObject", function() {
      spyOn(console, 'error')
      myPlot3DShaderBuilder.linkProgram(null)
      expect(console.error).toHaveBeenCalled()
    })

    it("should create a gl program", function() {
      spyOn(myPlot3DShaderBuilder.glCntxt, 'createProgram').and.callThrough()
      myPlot3DShaderBuilder.linkProgram(shader)
      expect(myPlot3DShaderBuilder.glCntxt.createProgram).toHaveBeenCalled()
    })

    it("should return a Plot3DShader shader object with a shader program", function() {
      let myShader = myPlot3DShaderBuilder.linkProgram(shader)
      expect(myShader.program.constructor.name).toEqual('WebGLProgram')
    })

    it("should attach a compiled shaders to the program", function() {
      spyOn(myPlot3DShaderBuilder.glCntxt, 'attachShader').and.callThrough()
      myPlot3DShaderBuilder.linkProgram(shader)
      expect(myPlot3DShaderBuilder.glCntxt.attachShader).toHaveBeenCalledTimes(2)
    })

    it("should link the attached compiled shaders", function() {
      let myTestShader = myPlot3DShaderBuilder.linkProgram(shader) // call link program for make a withArgs prediction
      spyOn(myPlot3DShaderBuilder.glCntxt, 'linkProgram').withArgs(shader.program).and.callThrough()
      myPlot3DShaderBuilder.linkProgram(myTestShader)
      expect(myPlot3DShaderBuilder.glCntxt.linkProgram).toHaveBeenCalled()
    })

  })

})