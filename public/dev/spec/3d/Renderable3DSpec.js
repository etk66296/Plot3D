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

  it("should have a x axis translation function for moving the renderable incremental in world space.", function() {
    expect(typeof myRenderable3D.translateXIncremental).toBe('function')
  })

  describe("translateXIncremental", function() {

    it("should append the passed distance to the world position vector", function() {
      myRenderable3D.translateXIncremental(11)
      expect(myRenderable3D.worldPos.cells).toEqual([ 11, 0, 0 ])
    })

    it("should append the position to the world matrix", function() {
      myRenderable3D.translateXIncremental(12)
      expect(myRenderable3D.modelToWorldMatrix.cells).toEqual([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 0, 0, 1 ])
    })
  })

  it("should have a y axis translation function for moving the renderable incremental in world space.", function() {
    expect(typeof myRenderable3D.translateYIncremental).toBe('function')
  })

  describe("translateYIncremental", function() {

    it("should append the passed distance to the world position vector", function() {
      myRenderable3D.translateYIncremental(18)
      expect(myRenderable3D.worldPos.cells).toEqual([ 0, 18, 0 ])
    })

    it("should append the position to the world matrix", function() {
      myRenderable3D.translateYIncremental(19)
      expect(myRenderable3D.modelToWorldMatrix.cells).toEqual([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 19, 0, 1 ])
    })
  })

  it("should have a z axis translation function for moving the renderable incremental in world space.", function() {
    expect(typeof myRenderable3D.translateYIncremental).toBe('function')
  })

  describe("translateZIncremental", function() {

    it("should append the passed distance to the world position vector", function() {
      myRenderable3D.translateZIncremental(29)
      expect(myRenderable3D.worldPos.cells).toEqual([ 0, 0, 29 ])
    })

    it("should append the position to the world matrix", function() {
      myRenderable3D.translateZIncremental(31)
      expect(myRenderable3D.modelToWorldMatrix.cells).toEqual([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 31, 1 ])
    })
  })

  it("should allow concatenation to incremental translations", function() {
    myRenderable3D.translateXIncremental(100)
    myRenderable3D.translateYIncremental(200)
    myRenderable3D.translateZIncremental(300)
    expect(myRenderable3D.modelToWorldMatrix.cells).toEqual([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 300, 1 ])
  })

  it("should have a 3d vector which gives the renderable3d an up direction", function() {
    expect(myRenderable3D.modelUpDir.constructor.name).toEqual('Vector3')
  })

  it("should have a 3d vector which gives the renderable3d a forward direction", function() {
    expect(myRenderable3D.modelFwdDir.constructor.name).toEqual('Vector3')
  })

  it("should have a 3d vector which gives the renderable3d a side direction", function() {
    expect(myRenderable3D.modelSideDir.constructor.name).toEqual('Vector3')
  })

  it("should have a function for rotating the around the model space x axis incremental", function() {
    expect(typeof myRenderable3D.rotateXIncremental).toBe('function')
  })

  describe("rotateXIncremental", function() {
    it("should use the injected matrix math for appending the x axis rotation to the model matrix", function() {
      spyOn(myRenderable3D.math.matrix4x4, 'appendXRotationToM4X4')
      myRenderable3D.rotateXIncremental(0.01)
      expect(myRenderable3D.math.matrix4x4.appendXRotationToM4X4).toHaveBeenCalledWith(
        myRenderable3D.modelMatrix,
        0.01
      )
    })

    it("should manipulate the necessary model matrix cells", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.5)
      expect(myRenderable3D.modelMatrix.cells).toEqual([ 1, 0, 0, 0, 0, 6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1 ])
    })

    it("should set the direction vectors cells", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      expect(myRenderable3D.modelSideDir.cells).toEqual([1, 0, 0])
      expect(myRenderable3D.modelFwdDir.cells).toEqual([0, -0.7071067811865475, 0.7071067811865476])
      expect(myRenderable3D.modelUpDir.cells).toEqual([0, 0.7071067811865476, 0.7071067811865475])
    })
  })

  it("should have a function for rotating the around the model space y axis incremental", function() {
    expect(typeof myRenderable3D.rotateYIncremental).toBe('function')
  })

  describe("rotateYIncremental", function() {
    it("should use the injected matrix math for appending the y axis rotation to the model matrix", function() {
      spyOn(myRenderable3D.math.matrix4x4, 'appendYRotationToM4X4')
      myRenderable3D.rotateYIncremental(0.03)
      expect(myRenderable3D.math.matrix4x4.appendYRotationToM4X4).toHaveBeenCalledWith(
        myRenderable3D.modelMatrix,
        0.03
      )
    })

    it("should manipulate the necessary model matrix cells", function() {
      myRenderable3D.rotateYIncremental(Math.PI * 0.5)
      expect(myRenderable3D.modelMatrix.cells).toEqual([ 6.123233995736766e-17, 0, -1, 0, 0, 1, 0, 0, 1, 0, 6.123233995736766e-17, 0, 0, 0, 0, 1 ])
    })

    it("should set the direction vectors cells", function() {
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      expect(myRenderable3D.modelSideDir.cells).toEqual([ 0.7071067811865476, 0, -0.7071067811865475 ])
      expect(myRenderable3D.modelFwdDir.cells).toEqual([ 0.7071067811865475, 0, 0.7071067811865476 ])
      expect(myRenderable3D.modelUpDir.cells).toEqual([ 0, 1, 0 ])
    })
  })

  it("should have a function for rotating the around the model space z axis incremental", function() {
    expect(typeof myRenderable3D.rotateZIncremental).toBe('function')
  })

  describe("rotateZIncremental", function() {
    it("should use the injected matrix math for appending the z axis rotation to the model matrix", function() {
      spyOn(myRenderable3D.math.matrix4x4, 'appendZRotationToM4X4')
      myRenderable3D.rotateZIncremental(0.03)
      expect(myRenderable3D.math.matrix4x4.appendZRotationToM4X4).toHaveBeenCalledWith(
        myRenderable3D.modelMatrix,
        0.03
      )
    })

    it("should manipulate the necessary model matrix cells", function() {
      myRenderable3D.rotateZIncremental(Math.PI * 0.5)
      expect(myRenderable3D.modelMatrix.cells).toEqual([ 6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ])
    })

    it("should set the direction vectors cells", function() {
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      expect(myRenderable3D.modelSideDir.cells).toEqual([ 0.7071067811865476,  0.7071067811865475, 0 ])
      expect(myRenderable3D.modelFwdDir.cells).toEqual([ 0, 0, 1 ])
      expect(myRenderable3D.modelUpDir.cells).toEqual([ -0.7071067811865475, 0.7071067811865476, 0 ])
    })
  })

  it("should be possible to concatenate the rotations", function() {
    myRenderable3D.rotateXIncremental(Math.PI * 0.25)
    myRenderable3D.rotateYIncremental(Math.PI * 0.25)
    myRenderable3D.rotateZIncremental(Math.PI * 0.25)
    expect(myRenderable3D.modelMatrix.cells).toEqual([
      0.5000000000000001, 0.8535533905932737, 0.1464466094067261 ,0,
      -0.5 , 0.14644660940672644, 0.8535533905932737 , 0,
      0.7071067811865475, -0.5, 0.5000000000000001, 0,
      0, 0, 0, 1
    ])
  })

  it("should have a function moveForward", function() {
    expect(typeof myRenderable3D.moveForward).toBe('function')
  })

  describe("moveForward", function() {
    it("should add the direction ratios to the models world position", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveForward(10)
      expect(myRenderable3D.worldPos.cells).toEqual([ 7.071067811865475, -5, 5.000000000000001 ])
    })

    it("should set the modelToWorldMatrix translation components", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveForward(10)
      expect(myRenderable3D.modelToWorldMatrix.cells[12]).toEqual(7.071067811865475)
      expect(myRenderable3D.modelToWorldMatrix.cells[13]).toEqual(-5)
      expect(myRenderable3D.modelToWorldMatrix.cells[14]).toEqual(5.000000000000001)
    })
  })

  it("should have a function moveBackwards", function() {
    expect(typeof myRenderable3D.moveBackwards).toBe('function')
  })

  describe("moveForward", function() {
    it("should add the direction ratios to the models world position", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveBackwards(10)
      expect(myRenderable3D.worldPos.cells).toEqual([ -7.071067811865475, 5, -5.000000000000001 ])
    })

    it("should set the modelToWorldMatrix translation components", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveBackwards(10)
      expect(myRenderable3D.modelToWorldMatrix.cells[12]).toEqual(-7.071067811865475)
      expect(myRenderable3D.modelToWorldMatrix.cells[13]).toEqual(5)
      expect(myRenderable3D.modelToWorldMatrix.cells[14]).toEqual(-5.000000000000001)
    })
  })

  it("should have a function moveRight", function() {
    expect(typeof myRenderable3D.moveRight).toBe('function')
  })

  describe("moveForward", function() {
    it("should add the direction ratios to the models world position", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveRight(10)
      expect(myRenderable3D.worldPos.cells).toEqual([ -5.000000000000001, -8.535533905932738, -1.464466094067261 ])
    })

    it("should set the modelToWorldMatrix translation components", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveRight(10)
      expect(myRenderable3D.modelToWorldMatrix.cells[12]).toEqual(-5.000000000000001)
      expect(myRenderable3D.modelToWorldMatrix.cells[13]).toEqual(-8.535533905932738)
      expect(myRenderable3D.modelToWorldMatrix.cells[14]).toEqual(-1.464466094067261)
    })
  })

  it("should have a function moveLeft", function() {
    expect(typeof myRenderable3D.moveLeft).toBe('function')
  })

  describe("moveForward", function() {
    it("should add the direction ratios to the models world position", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveLeft(10)
      expect(myRenderable3D.worldPos.cells).toEqual([ 5.000000000000001, 8.535533905932738, 1.464466094067261 ])
    })

    it("should set the modelToWorldMatrix translation components", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveLeft(10)
      expect(myRenderable3D.modelToWorldMatrix.cells[12]).toEqual(5.000000000000001)
      expect(myRenderable3D.modelToWorldMatrix.cells[13]).toEqual(8.535533905932738)
      expect(myRenderable3D.modelToWorldMatrix.cells[14]).toEqual(1.464466094067261)
    })
  })

  it("should have a function moveUp", function() {
    expect(typeof myRenderable3D.moveUp).toBe('function')
  })

  describe("moveForward", function() {
    it("should add the direction ratios to the models world position", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveUp(10)
      expect(myRenderable3D.worldPos.cells).toEqual([ -5, 1.4644660940672645, 8.535533905932738 ])
    })

    it("should set the modelToWorldMatrix translation components", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveUp(10)
      expect(myRenderable3D.modelToWorldMatrix.cells[12]).toEqual(-5)
      expect(myRenderable3D.modelToWorldMatrix.cells[13]).toEqual(1.4644660940672645)
      expect(myRenderable3D.modelToWorldMatrix.cells[14]).toEqual(8.535533905932738)
    })
  })

  it("should have a function moveDown", function() {
    expect(typeof myRenderable3D.moveDown).toBe('function')
  })

  describe("moveForward", function() {
    it("should add the direction ratios to the models world position", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveDown(10)
      expect(myRenderable3D.worldPos.cells).toEqual([ 5, -1.4644660940672645, -8.535533905932738 ])
    })

    it("should set the modelToWorldMatrix translation components", function() {
      myRenderable3D.rotateXIncremental(Math.PI * 0.25)
      myRenderable3D.rotateYIncremental(Math.PI * 0.25)
      myRenderable3D.rotateZIncremental(Math.PI * 0.25)
      myRenderable3D.moveDown(10)
      expect(myRenderable3D.modelToWorldMatrix.cells[12]).toEqual(5)
      expect(myRenderable3D.modelToWorldMatrix.cells[13]).toEqual(-1.4644660940672645)
      expect(myRenderable3D.modelToWorldMatrix.cells[14]).toEqual(-8.535533905932738)
    })
  })

  
})