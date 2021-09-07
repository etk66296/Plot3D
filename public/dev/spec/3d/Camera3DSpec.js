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
    myCamera = new Camera3D(glCntxt, shader, math)
  })

  it("should have the parent class Renderable3D", function() {
    expect(myCamera.__proto__.__proto__.constructor.name).toEqual('Renderable3D')
  })

  it("should have a matrix for rotating the camera in view space", function() {
    expect(myCamera.camModelMatrix.cells).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })

  it("should have a matrix for translating the camera in view space", function() {
    expect(myCamera.camTranslationMatrix.cells).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })

  it("should have a matrix 4x4 for transforming from world space to view space", function() {
    expect(myCamera.worldToViewMatrix.cells).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })

  it("should have a matrix 4x4 for tranforming from view space to projection space", function() {
    expect(myCamera.viewToProjection.constructor.name).toEqual('Matrix4x4Projection')
  })

  it("should have a matrix 4x4 for tranforming from world space to view space", function() {
    expect(myCamera.worldToViewMatrix.constructor.name).toEqual('Matrix4x4View')
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

    it("should set the shaders camera matrix 4x4 uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myCamera.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_cameraModelMatrix'], false, myCamera.camModelMatrix.cells)
    })

    it("should set the shaders camera translation matrix 4x4 uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myCamera.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_cameraTranslationMatrix'], false, myCamera.camTranslationMatrix.cells)
    })

    it("should set the shaders world to view matrix 4x4 uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myCamera.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, myCamera.worldToViewMatrix.cells)
    })

    it("should set the shaders world to view matrix 4x4 uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myCamera.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, myCamera.viewToProjection.cells)
    })

    it("should have a attribte for safing the view world position", function() {
      expect(myCamera.viewWorldPos.constructor.name).toBe('Vector3')
    })

    it("should have a function for translating along the x axis in camera space", function() {
      expect(typeof myCamera.translateViewXIncremental).toBe('function')
    })

    describe("translateViewXIncremental", function() {
      it("add the passed distance to the world view position", function() {
        myCamera.translateViewXIncremental(10)
        expect(myCamera.viewWorldPos.cells).toEqual([10, 0, 0])
      })

      it("should put the new view world position in the camera translation matrix", function() {
        myCamera.translateViewXIncremental(11)
        expect(myCamera.camTranslationMatrix.cells[12]).toEqual(11)
      })
    })

    it("should have a function for translating alonge the y axis in camera space", function() {
      expect(typeof myCamera.translateViewYIncremental).toBe('function')
    })

    describe("translateViewYIncremental", function() {
      it("add the passed distance to the world view position", function() {
        myCamera.translateViewYIncremental(12)
        expect(myCamera.viewWorldPos.cells).toEqual([0, 12, 0])
      })

      it("should put the new view world position in the camera translation matrix", function() {
        myCamera.translateViewYIncremental(13)
        expect(myCamera.camTranslationMatrix.cells[13]).toEqual(13)
      })
    })

    it("should have a function for translating alonge the z axis in camera space", function() {
      expect(typeof myCamera.translateViewZIncremental).toBe('function')
    })

    describe("translateViewZIncremental", function() {
      it("add the passed distance to the world view position", function() {
        myCamera.translateViewZIncremental(14)
        expect(myCamera.viewWorldPos.cells).toEqual([0, 0, 14])
      })

      it("should put the new view world position in the camera translation matrix", function() {
        myCamera.translateViewZIncremental(15)
        expect(myCamera.camTranslationMatrix.cells[14]).toEqual(15)
      })
    })
  })
 
})