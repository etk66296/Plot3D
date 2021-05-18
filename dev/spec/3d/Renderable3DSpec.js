describe("Renderable3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  
  var camera
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
    camera = new Camera3D()
    myRenderable3D = new Renderable3D(glCntxt, shader, camera)
  })
  
  it("should has the parent class Renderable", function() {
    expect(myRenderable3D.__proto__.__proto__.constructor.name).toEqual('Renderable')
  })

  it("should has a attribute camera, which is passed with thethird argument", function() {
    expect(myRenderable3D.camera.constructor.name).toEqual('Camera3D')
  })

  it("should has a a vector with four elements, which represents the current render color", function() {
    expect(myRenderable3D.color.constructor.name).toEqual('Vector4')
  })

  it("has a model rotation object which holds an angle in radian for all three directions x, y, z", function() {
    expect(myRenderable3D.modelSpaceRotationInRad).toEqual({ x: 0.0, y: 0.0, z: 0.0 })
  })

  it("should have a 4x4 model 'modelMatrix', which is initialy the identity matrix", function() {
    expect(myRenderable3D.modelMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myRenderable3D.modelMatrix.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  })

  it("should have a 4x4 modelrotation 'modelRotationMatrix', which is initialy the identity matrix", function() {
    expect(myRenderable3D.modelRotationMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myRenderable3D.modelRotationMatrix.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1 ])
  })

  it("should have a method rotateXIncremental", function() {
    expect(typeof myRenderable3D.rotateXIncremental).toEqual('function')
  })

  describe("rotateXIncremental", function() {
    it("should greate the rotation transformation values", function() {
      spyOn(Math, 'cos').and.callThrough()
      spyOn(Math, 'sin').and.callThrough()
      myRenderable3D.rotateXIncremental(0.1)
      expect(Math.cos).toHaveBeenCalledTimes(2)
      expect(Math.sin).toHaveBeenCalledTimes(2)
    })
    it("should multipy the x rotation to the modelRotationMatrix", function() {
      spyOn(myRenderable3D.modelRotationMatrix, 'multiplyM4')
      myRenderable3D.rotateXIncremental(0.1)
      expect(myRenderable3D.modelRotationMatrix.multiplyM4).toHaveBeenCalled()
    })
    it("should result the expected rotation matrix", function() {
      myRenderable3D.rotateXIncremental(0.1)
      expect(myRenderable3D.modelRotationMatrix.cells).toEqual([
        1, 0, 0, 0,
        0, 0.9950041652780258, -0.09983341664682815, 0,
        0, 0.09983341664682815, 0.9950041652780258, 0,
        0, 0, 0, 1 
      ])
    })
  })

  it("should have a method rotateYIncremental", function() {
    expect(typeof myRenderable3D.rotateYIncremental).toEqual('function')
  })

  describe("rotateYIncremental", function() {
    it("should greate the rotation transformation values", function() {
      spyOn(Math, 'cos').and.callThrough()
      spyOn(Math, 'sin').and.callThrough()
      myRenderable3D.rotateYIncremental(0.1)
      expect(Math.cos).toHaveBeenCalledTimes(2)
      expect(Math.sin).toHaveBeenCalledTimes(2)
    })
    it("should multipy the y rotation to the modelRotationMatrix", function() {
      spyOn(myRenderable3D.modelRotationMatrix, 'multiplyM4')
      myRenderable3D.rotateYIncremental(0.1)
      expect(myRenderable3D.modelRotationMatrix.multiplyM4).toHaveBeenCalled()
    })
    it("should result the expected rotation matrix", function() {
      myRenderable3D.rotateYIncremental(0.1)
      expect(myRenderable3D.modelRotationMatrix.cells).toEqual([
        0.9950041652780258, 0.0, 0.09983341664682815, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -0.09983341664682815, 0.0, 0.9950041652780258, 0.0,
        0.0, 0.0, 0.0, 1.0
      ])
    })
  })

  it("should have a method rotateZIncremental", function() {
    expect(typeof myRenderable3D.rotateZIncremental).toEqual('function')
  })

  describe("rotateZIncremental", function() {
    it("should greate the rotation transformation values", function() {
      spyOn(Math, 'cos').and.callThrough()
      spyOn(Math, 'sin').and.callThrough()
      myRenderable3D.rotateZIncremental(0.1)
      expect(Math.cos).toHaveBeenCalledTimes(2)
      expect(Math.sin).toHaveBeenCalledTimes(2)
    })
    it("should multipy the z rotation to the modelRotationMatrix", function() {
      spyOn(myRenderable3D.modelRotationMatrix, 'multiplyM4')
      myRenderable3D.rotateZIncremental(0.1)
      expect(myRenderable3D.modelRotationMatrix.multiplyM4).toHaveBeenCalled()
    })
    it("should result the expected rotation matrix", function() {
      myRenderable3D.rotateZIncremental(0.1)
      expect(myRenderable3D.modelRotationMatrix.cells).toEqual([
        0.9950041652780258, -0.09983341664682815, 0.0, 0.0,
        0.09983341664682815, 0.9950041652780258, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ])
    })
  })

  it("has a world position object which holds a value for all three directions x, y, z", function() {
    expect(myRenderable3D.worldPosition).toEqual({ x: 0.0, y: 0.0, z: 0.0 })
  })
  
  it("should have a 4x4 model 'worldTranslationMatrix', which is initialy the identity matrix", function() {
    expect(myRenderable3D.worldTranslationMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myRenderable3D.worldTranslationMatrix.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  })

  it("should have a method translateXIncremental", function() {
    expect(typeof myRenderable3D.translateXIncremental).toEqual('function')
  })

  describe("translateXIncremental", function() {

    it("should change the model world position x component", function() {
      myRenderable3D.translateXIncremental(11)
      expect(myRenderable3D.worldPosition.x).toEqual(11)
    })

    it("should maipulate the worldTranslationMatrix", function() {
      myRenderable3D.translateXIncremental(123.456)
      expect(myRenderable3D.worldTranslationMatrix.cells).toEqual([
        1, 0, 0, 123.456,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ])
    })
  })

  it("should have a method translateYIncremental", function() {
    expect(typeof myRenderable3D.translateYIncremental).toEqual('function')
  })

  describe("translateYIncremental", function() {

    it("should change the model world position z component", function() {
      myRenderable3D.translateYIncremental(10)
      expect(myRenderable3D.worldPosition.y).toEqual(10)
    })

    it("should maipulate the worldTranslationMatrix", function() {
      myRenderable3D.translateYIncremental(789.101112)
      expect(myRenderable3D.worldTranslationMatrix.cells).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 789.101112,
        0, 0, 1, 0,
        0, 0, 0, 1
      ])
    })
  })

  it("should have a method translateZIncremental", function() {
    expect(typeof myRenderable3D.translateZIncremental).toEqual('function')
  })

  describe("translateZIncremental", function() {
    
    it("should change the model world position z component", function() {
      myRenderable3D.translateZIncremental(75)
      expect(myRenderable3D.worldPosition.z).toEqual(75)
    })

    it("should maipulate the worldTranslationMatrix", function() {
      myRenderable3D.translateZIncremental(131415.161718)
      expect(myRenderable3D.worldTranslationMatrix.cells).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 131415.161718,
        0, 0, 0, 1
      ])
    })
  })
  
  it("should have a model Scale Matrix", function() {
    expect(myRenderable3D.modelScaleMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myRenderable3D.modelScaleMatrix.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  })

  it("should have an attribute scale, which is an object holding the scaling in each direction", function() {
    expect(myRenderable3D.modelScale).toEqual({ x: 0.0, y: 0.0, z: 0.0 })
  })

  it("should have a method for scaling the model on the x axis", function() {
    expect(typeof myRenderable3D.scaleX).toEqual('function')
  })

  describe("scaleX", function() {

    it("should change the model scale value", function() {
      myRenderable3D.scaleX(1.5)
      expect(myRenderable3D.modelScale.x).toEqual(1.5)
    })

    it("should maipulate the model scale matrix in the x component",function() {
      myRenderable3D.scaleX(1.5)
      expect(myRenderable3D.modelScaleMatrix.cells).toEqual([
        1.5, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ])
    })
  })

  it("should have a method for scaling the model on the y axis", function() {
    expect(typeof myRenderable3D.scaleY).toEqual('function')
  })

  describe("scaleY", function() {

    it("should change the model scale value", function() {
      myRenderable3D.scaleY(8)
      expect(myRenderable3D.modelScale.y).toEqual(8)
    })

    it("should maipulate the model scale matrix in the y component",function() {
      myRenderable3D.scaleY(9)
      expect(myRenderable3D.modelScaleMatrix.cells).toEqual([
        1, 0, 0, 0,
        0, 9, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ])
    })
  })

  it("should have a method for scaling the model on the z axis", function() {
    expect(typeof myRenderable3D.scaleZ).toEqual('function')
  })

  describe("scaleYZ", function() {

    it("should change the model scale value", function() {
      myRenderable3D.scaleZ(154)
      expect(myRenderable3D.modelScale.z).toEqual(154)
    })

    it("should maipulate the model scale matrix in the z component",function() {
      myRenderable3D.scaleZ(839)
      expect(myRenderable3D.modelScaleMatrix.cells).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 839, 0,
        0, 0, 0, 1
      ])
    })
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

    it("should call uniformMatrix4fv to set the uniform u_modelMatrix", function() {
      spyOn(myRenderable3D.glCntxt, 'uniformMatrix4fv').and.callThrough()
      myRenderable3D.draw()
      expect(myRenderable3D.glCntxt.uniformMatrix4fv).toHaveBeenCalledTimes(4)
    })

    it("should pass the current color to a corresponding webgl uniform", function() {
      spyOn(myRenderable3D.glCntxt, 'uniform4fv').and.callThrough()
      myRenderable3D.draw()
      expect(myRenderable3D.glCntxt.uniform4fv).toHaveBeenCalled()
    })

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