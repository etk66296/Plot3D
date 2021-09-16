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
      uniform mat4 u_ViewToProjectionMatrix;
      
      mat4 worldToViewMatrix;
      uniform vec3 u_cameraUpDir;
      uniform vec3 u_cameraWorldPos;
      uniform vec3 u_cameraWorldPosToLookAt;

      vec3 cameraZDir;
      vec3 cameraYDir;
      vec3 cameraXDir;

      varying lowp vec4 v_color;

      void main(void) {
        // calculate the camera direction vectors
        cameraZDir = normalize(u_cameraWorldPos - u_cameraWorldPosToLookAt);
        cameraXDir = normalize(cross(u_cameraUpDir, cameraZDir));
        cameraYDir = normalize(cross(cameraZDir, cameraXDir));

        worldToViewMatrix[0] = vec4(cameraXDir, 0);
        worldToViewMatrix[1] = vec4(cameraYDir, 0);
        worldToViewMatrix[2] = vec4(cameraZDir, 0);
        worldToViewMatrix[3] = vec4(u_cameraWorldPos, 1);

        gl_Position = u_ViewToProjectionMatrix * worldToViewMatrix * u_modelToWorldMatrix * u_modelMatrix * vec4(a_position, 1.0);
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

  describe("update", function() {
    it("should call the use programm from the webgl context", function() {
      spyOn(glCntxt, 'useProgram')
      myCamera.update()
      expect(glCntxt.useProgram).toHaveBeenCalledWith(myCamera.shader.program)
    })

    it("should set the shaders camera vec3 up direction vector", function() {
      spyOn(glCntxt, 'uniform3fv')
      myCamera.update()
      expect(glCntxt.uniform3fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_cameraUpDir'], myCamera.up.cells)
    })

    it("should set the shaders camera world position direction vector", function() {
      spyOn(glCntxt, 'uniform3fv')
      myCamera.update()
      expect(glCntxt.uniform3fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_cameraWorldPos'], myCamera.worldPos.cells)
    })

    it("should set the shaders camera world look at position vector", function() {
      spyOn(glCntxt, 'uniform3fv')
      myCamera.update()
      expect(glCntxt.uniform3fv).toHaveBeenCalledWith(myCamera.shader.glVertexUniformLocation['u_cameraWorldPosToLookAt'], myCamera.worldPosToLookAt.cells)
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