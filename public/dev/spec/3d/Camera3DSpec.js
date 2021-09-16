describe("Camera", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var math
  var myCamera
  
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
    uniform mat4 u_worldToViewMatrix;
    uniform mat4 u_ViewToProjectionMatrix;
  
    varying lowp vec4 v_color;

    void main(void) {
      gl_Position = u_ViewToProjectionMatrix * u_worldToViewMatrix * u_modelToWorldMatrix * u_modelMatrix * vec4(a_position, 1.0);
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
    myCamera = new Camera3D(glCntxt, shader, math)
  })

  it("should have the parent class Renderable3D", function() {
    expect(myCamera.__proto__.__proto__.constructor.name).toEqual('Renderable3D')
  })

  it("should have a vector 3 for describing the world point to view at", function() {
    expect(myCamera.worldPosToLookAt.constructor.name).toEqual('Vector3')
  })

  it("should have a vector 3 for describing the cameras up direction in world space", function() {
    expect(myCamera.up.constructor.name).toEqual('Vector3')
  })

  it("should have a function for updating the camera each cycle", function() {
    expect(typeof myCamera.update).toBe('function')
  })

  it("should have an object for storing data of an 3d object to follow", function() {
    expect(myCamera.traceObject.constructor.name).toEqual('Object')
  })

  describe("traceObject", function() {
    it("should have a attribute for storing the reference to the renderable to follow", function() {
      expect(myCamera.traceObject.refToRenderable).toEqual(null)
    })

    it("should have a boolean shifter for enable and disable follow the referenced object", function() {
      expect(myCamera.traceObject.chaseIt).toEqual(false)
    })
  })

  it("should have a method for setting the reference to a follow object and enabling the camera follow feature", function() {
    expect(typeof myCamera.followTheRenderable3d).toBe('function')
  })

  describe("followTheRenderable", function() {
    it("should safe the reference to the internal trace object attribute", function() {
      class Renderable3D { }
      let myRenderable3D = new Renderable3D()
      myCamera.followTheRenderable3d(myRenderable3D)
      expect(myCamera.traceObject.refToRenderable).toEqual(myRenderable3D)
    })
    it("should enable the camera to follow the object by setting the corresponding boolean", function() {
      class Renderable3D { }
      let myRenderable3D = new Renderable3D()
      myCamera.followTheRenderable3d(myRenderable3D)
      expect(myCamera.traceObject.chaseIt).toEqual(true)
    })
  })

  describe("update", function() {
    it("should call the use programm from the webgl context", function() {
      spyOn(glCntxt, 'useProgram')
      myCamera.update()
      expect(glCntxt.useProgram).toHaveBeenCalledWith(myCamera.shader.program)
    })

    it("should set the shaders model matrix 4x4 uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myCamera.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_modelMatrix'], false, myCamera.modelMatrix.cells)

    })

    it("should set the shaders model to world matrix 4x4 uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myCamera.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, myCamera.modelToWorldMatrix.cells)

    })

    it("should set the shaders world to view matrix 4x4 uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myCamera.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, myCamera.viewToProjection.cells)
    })
  })

  
})