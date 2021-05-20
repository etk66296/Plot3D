describe("Camera", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder

  var myCamera
  
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
    myRenderable3D = new Renderable3D(glCntxt, shader)
    myCamera = new Camera3D(glCntxt, shader)
  })

  it("should have the parent class Renderable3D", function() {
    expect(myCamera.__proto__.__proto__.constructor.name).toEqual('Renderable3D')
  })

  it("should have an object wich defines the orthographic space", function() {
    expect(typeof myCamera.orthoSpace).toEqual('object')
  })

  describe("orthoSpace", function() {
    it("should have an attribute width", function() {
      expect(myCamera.orthoSpace.width).toEqual(glCntxt.canvas.clientWidth)
    })
    it("should have an attribute height", function() {
      expect(myCamera.orthoSpace.height).toEqual(glCntxt.canvas.clientHeight)
    })
    it("should have an attribute far", function() {
      expect(myCamera.orthoSpace.far).toEqual(1000)
    })
    it("should have an attribute near", function() {
      expect(myCamera.orthoSpace.near).toEqual(1)
    })
  })

  it("should have a orthographic projection matrix", function() {
    expect(myCamera.orthoProjectionMatrix.constructor.name).toEqual('Matrix4x4')
  })

  describe("orthoProjectionMatrix", function() {
    //   1 / this.sensorWidth, 0, 0, 0,
    //   0, 1 / this.sensorHeight, 0, 0,
    //   0, 0, (-2) / (this.sensorFar - this.sensorNear), (-1) * (this.sensorFar + this.sensorNear) / (this.sensorFar - this.sensorNear),
    //   0, 0, 0, 1
    it("should be composed out of the orthoSpace data", function() {
      expect(myCamera.orthoProjectionMatrix.cells[0]).toEqual(1 / glCntxt.canvas.width)
      expect(myCamera.orthoProjectionMatrix.cells[1]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[2]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[3]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[4]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[5]).toEqual(1 / glCntxt.canvas.height)
      expect(myCamera.orthoProjectionMatrix.cells[6]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[7]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[8]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[9]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[10]).toEqual((-2 / (1000 - 1)))
      expect(myCamera.orthoProjectionMatrix.cells[11]).toEqual((-1 * (1000 + 1) / (1000 - 1)))
      expect(myCamera.orthoProjectionMatrix.cells[12]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[13]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[14]).toEqual(0)
      expect(myCamera.orthoProjectionMatrix.cells[15]).toEqual(1)
    })
  })

  it("should have an object wich defines the frustum", function() {
    expect(typeof myCamera.frustum).toEqual('object')
  })

  describe("frustum", function() {
    it("should hold a value wich defines the field of view angle on the x axis", function() {
      expect(myCamera.frustum.fovAngleX).toEqual(60)
    })
  })
  
  // it("has the parent class Renderable3D", function() {
  //   expect(myCamera.__proto__.__proto__.constructor.name).toEqual('Renderable3D')
  // })

  // // it("should take an instance of canvas webgl context webgl2", function() {
  // //   expect(myCamera.glCntxt.constructor.name).toEqual('WebGL2RenderingContext')
  // // })

  // it("should has an attribute position of type Vector3", function() {
  //   expect(myCamera.position.constructor.name).toEqual('Vector3')
  // })

  // it("should has a default position in the xy layer ", function() {
  //   expect(myCamera.position.cells).toEqual([ 10, 10, 0 ])
  // })

  // it("should has a vector3 attribute which represents a point to view in world space", function() {
  //   expect(myCamera.spot.constructor.name).toEqual('Vector3')
  // })

  // it("should look to a default point", function() {
  //   expect(myCamera.spot.cells).toEqual([ 0, 0, 0 ])
  // })

  // it("should have an attribute which defines the orientation in world space", function() {
  //   expect(myCamera.upDir.constructor.name).toEqual('Vector3')
  // })

  // it("should has the world y axis as defauilt up direction of the camera)", function() {
  //   expect(myCamera.upDir.cells).toEqual([ 0, 1, 0 ])
  // })

  // it("should has a look at transformation matrix", function() {
  //   expect(myCamera.lookAtMatrix.constructor.name).toEqual('Matrix4x4')
  // })

  // it("should has a minimum range of allowed values", function() {
  //   expect(myCamera.EPSILON).toEqual(0.000001)
  // })

  // it("should have a method lookAt", function() {
  //   expect(typeof myCamera.lookAt).toEqual('function')
  // })

  // describe("lookAt", function() {
  //   it(`
  //     should reset the lookAtMatrix to identity matrix
  //     when the delta between camera position and the sport
  //     position is less than the defined minimum range
  //   `
  //   , function() {
  //       myCamera.position.cells = [ 0.0000000001, 0.0000000001, 0 ]
  //       myCamera.spot.cells = [ 0.0, 0.0, 0.0 ]
  //       myCamera.lookAtMatrix.cells = [
  //         1, 2, 3, 4,
  //         5, 6, 7, 8,
  //         9, 8, 7, 6,
  //         5, 4, 3, 2
  //       ]
  //       myCamera.lookAt()
  //       expect(myCamera.lookAtMatrix.cells).toEqual([
  //         1, 0, 0, 0,
  //         0, 1, 0, 0,
  //         0, 0, 1, 0,
  //         0, 0, 0, 1
  //       ])
  //   })

  //   it("should calculate the correct look at matrix", function() {
  //   // [      1       0       0      0 ]   [ xaxis.x  yaxis.x  zaxis.x 0 ]
  //   // |      0       1       0      0 | * | xaxis.y  yaxis.y  zaxis.y 0 |
  //   // |      0       0       1      0 |   | xaxis.z  yaxis.z  zaxis.z 0 |
  //   // [     -POSX   -POSY   -POSZ   1 ]   [       0        0        0 1 ]
  //     let cameraPosition = new Vector3([
  //       myCamera.position.cells[0],
  //       myCamera.position.cells[1],
  //       myCamera.position.cells[2]
  //     ])
  //     let cameraSpot = new Vector3([
  //       myCamera.spot.cells[0],
  //       myCamera.spot.cells[1],
  //       myCamera.spot.cells[2]
  //     ])
  //     let cameraUpDirection = new Vector3([
  //       myCamera.upDir.cells[0],
  //       myCamera.upDir.cells[1],
  //       myCamera.upDir.cells[2],
  //     ])
  //     let zaxis = (new Vector3([
  //       cameraPosition.cells[0],
  //       cameraPosition.cells[1],
  //       cameraPosition.cells[2]
  //     ])).subtract(cameraSpot).normalize()
  //     let xaxis = (new Vector3([
  //       zaxis.cells[0],
  //       zaxis.cells[1],
  //       zaxis.cells[2]
  //     ])).cross(cameraUpDirection).normalize()
  //     let yaxis = (new Vector3([
  //       xaxis.cells[0],
  //       xaxis.cells[1],
  //       xaxis.cells[2]
  //     ])).cross(zaxis)

  //     let cameraTranslation = new Matrix4x4()
  //     cameraTranslation.cells[12] = (-1) * cameraPosition.cells[0]
  //     cameraTranslation.cells[13] = (-1) * cameraPosition.cells[1]
  //     cameraTranslation.cells[14] = (-1) * cameraPosition.cells[2]

  //     let transformationMatrix = new Matrix4x4()
  //     transformationMatrix.cells[0] = xaxis.cells[0]
  //     transformationMatrix.cells[4] = xaxis.cells[1]
  //     transformationMatrix.cells[8] = xaxis.cells[2]

  //     transformationMatrix.cells[1] = yaxis.cells[0]
  //     transformationMatrix.cells[5] = yaxis.cells[1]
  //     transformationMatrix.cells[9] = yaxis.cells[2]

  //     transformationMatrix.cells[2] = zaxis.cells[0]
  //     transformationMatrix.cells[6] = zaxis.cells[1]
  //     transformationMatrix.cells[10] = zaxis.cells[2]

  //     let myLookAtMatrix = cameraTranslation.multiplyM4(transformationMatrix)
  //     myLookAtMatrix.cells[8] = (-1) * myLookAtMatrix.cells[8]
  //     myLookAtMatrix.cells[14] = (-1) * Math.sqrt(myLookAtMatrix.cells[12] * myLookAtMatrix.cells[12] + myLookAtMatrix.cells[13] * myLookAtMatrix.cells[13])
  //     myLookAtMatrix.cells[12] = -0
  //     myLookAtMatrix.cells[13] = -0

  //     myLookAtMatrix.invert()

  //     myCamera.lookAt()
  //     expect(myLookAtMatrix.cells[0]).toEqual(myCamera.lookAtMatrix.cells[0])
  //     expect(myLookAtMatrix.cells[1]).toEqual(myCamera.lookAtMatrix.cells[1])
  //     expect(myLookAtMatrix.cells[2]).toEqual(myCamera.lookAtMatrix.cells[2])
  //     expect(myLookAtMatrix.cells[3]).toEqual(myCamera.lookAtMatrix.cells[3])
  //     expect(myLookAtMatrix.cells[4]).toEqual(myCamera.lookAtMatrix.cells[4])
  //     expect(myLookAtMatrix.cells[5]).toEqual(myCamera.lookAtMatrix.cells[5])
  //     expect(myLookAtMatrix.cells[6]).toEqual(myCamera.lookAtMatrix.cells[6])
  //     expect(myLookAtMatrix.cells[7]).toEqual(myCamera.lookAtMatrix.cells[7])
  //     expect(myLookAtMatrix.cells[8]).toEqual(myCamera.lookAtMatrix.cells[8])
  //     expect(myLookAtMatrix.cells[9]).toEqual(myCamera.lookAtMatrix.cells[9])
  //     expect(myLookAtMatrix.cells[10]).toEqual(myCamera.lookAtMatrix.cells[10])
  //     expect(myLookAtMatrix.cells[11]).toEqual(myCamera.lookAtMatrix.cells[11])
  //     expect(myLookAtMatrix.cells[12]).toBeCloseTo(myCamera.lookAtMatrix.cells[12], 6)
  //     expect(myLookAtMatrix.cells[13]).toBeCloseTo(myCamera.lookAtMatrix.cells[13], 6)
  //     expect(myLookAtMatrix.cells[14]).toBeCloseTo(myCamera.lookAtMatrix.cells[14], 6)
  //     expect(myLookAtMatrix.cells[15]).toEqual(myCamera.lookAtMatrix.cells[15])
  //   })
  // })

  // it("should has an attribute which describes the camera sensor width in pixel", function() {
  //   expect(myCamera.sensorWidth).toEqual(100)
  // })

  // it("should has an attribute which describes the camera sensor height in pixel", function() {
  //   expect(myCamera.sensorHeight).toEqual(100)
  // })

  // it("should has an attribute render far border", function() {
  //   expect(myCamera.sensorFar).toEqual(100)
  // })

  // it("should has an attribute render near border", function() {
  //   expect(myCamera.sensorNear).toEqual(1)
  // })

  // it("should has an orthographic projection matrix", function() {
  //   expect(myCamera.orthographicProjectionMatrix.cells).toEqual([
  //     0.01, 0, 0, 0,
  //     0, 0.01, 0, 0,
  //     0, 0, -0.020202020202020204, -1.02020202020202,
  //     0, 0, 0, 1
  //   ])
  // })

  // it("should has a camera field of view angle in degree for the x axis", function() {
  //   expect(myCamera.xFieldOfViewAngle).toEqual(60)
  // })

  // it("should has a camera field of view angle in degree for the y axis", function() {
  //   expect(myCamera.yFieldOfViewAngle).toEqual(60)
  // })

  // it("should has an perspective projection matrix", function() {
  //   expect(myCamera.perspectiveProjectionMatrix.cells).toEqual([
  //     1.5374753309166493, 0, 0, 0,
  //     0, 1.5374753309166493, 0, 0,
  //     0, 0, -1.02020202020202, 2.0202020202020203,
  //     0, 0, -1, 0
  //   ])
  // })

})