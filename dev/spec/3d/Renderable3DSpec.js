describe("Renderable3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  
  var shader
  var myRenderable3D
  
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
    matrixFactory = new MatrixFactory()
    myRenderable3D = new Renderable3D(glCntxt, shader, matrixFactory)
  })
  
  it("has the parent class Renderable", function() {
    expect(myRenderable3D.__proto__.__proto__.constructor.name).toEqual('Renderable')
  })

  it("has a model rotation object which holds an angle in radian for all three directions x, y, z", function() {
    expect(myRenderable3D.modelSpaceRotation).toEqual({ x: 0.0, y: 0.0, z: 0.0 })
  })

  it("should have a injected instance of MatrixFactory", function() {
    expect(myRenderable3D.matrixFactory.constructor.name).toEqual('MatrixFactory')
  })

  it("should have a 4x4 model 'modelMatrix', wich is initialy the identity matrix", function() {
    expect(myRenderable3D.modelMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myRenderable3D.modelMatrix.cells).toEqual([ 1, 0, 0, 0,
                                                       0, 1, 0, 0,
                                                       0, 0, 1, 0,
                                                       0, 0, 0, 1 ])
  })

  it("should have a 4x4 modelrotation 'modelRotationMatrix', wich is initialy the identity matrix", function() {
    expect(myRenderable3D.modelRotationMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myRenderable3D.modelRotationMatrix.cells).toEqual([ 1, 0, 0, 0,
                                                               0, 1, 0, 0,
                                                               0, 0, 1, 0,
                                                               0, 0, 0, 1 ])
  })

  it("should have a method rotate", function() {
    expect(typeof myRenderable3D.rotate).toEqual('function')
  })

  it("should have a method draw", function() {
    expect(typeof myRenderable3D.draw).toEqual('function')
  })

  describe("draw", function() {
    it("should call gl useProgram", function() {
      spyOn(myRenderable3D.glCntxt, 'useProgram').withArgs(shader.program).and.callThrough()
      myRenderable3D.draw()
      expect(myRenderable3D.glCntxt.useProgram).toHaveBeenCalled()
    })

    // it("should call uniformMatrix4fv to set the uniform u_modelMatrix", function() {
    //   spyOn(myRenderable3D.glCntxt, 'uniformMatrix4fv').withArgs('u_modelMatrix', false, myRenderable3D.modelMatrix).and.callThrough()
    //   myRenderable3D.draw()
    //   expect(myRenderable3D.glCntxt.uniformMatrix4fv).toHaveBeenCalled()
    // })
  })

  // it("should have a method update", function() {
  //   expect(typeof myTriangleMesh.update).toEqual('function')
  // })

  // describe("update", function() {

  // })

  // it("should have a method draw", function() {
  //   expect(typeof myTriangleMesh.draw).toEqual('function')
  // })
  
  // describe("draw", function() {
  //   it("should call gl useProgram", function() {
  //     spyOn(myPlot3DShaderBuilder.glCntxt, 'useProgram').withArgs(shader.program).and.callThrough()
  //     myTriangleMesh.draw()
  //     expect(myPlot3DShaderBuilder.glCntxt.useProgram).toHaveBeenCalled()
  //   })
  // })

})