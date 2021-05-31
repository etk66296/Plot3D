describe("Plot3DFactory", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var math
  var myCamera
  var myMeshFactory3D
  
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
    myCamera = new Camera3D(glCntxt, shader, math)
    myMeshFactory3D = new MeshFactory3D()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myMeshFactory3D.__proto__.__proto__.constructor.name).toEqual('Plot3DFactory')
  })

  it("should have an object, which holds methods for all kind of math operations", function() {
    expect(myMeshFactory3D.math.constructor.name).toEqual('Object')
  })

  describe("math", function() {
    it("should have an instance of Vector3Math", function() {
      expect(myMeshFactory3D.math.vector3.constructor.name).toEqual('Vector3Math')
    })

    it("should have an instance of Matrix4x4Math", function() {
      expect(myMeshFactory3D.math.matrix4x4.constructor.name).toEqual('Matrix4x4Math')
    })
  })

  it("should have a method for creating a 3d standard camera", function() {
    expect(typeof myMeshFactory3D.createAStandardCamera3D).toBe('function')
  })

  describe("createAStandardCamera3D", function() {
    it("should take two arguments a compilsed shader an a web gl context", function() {
      spyOn(myMeshFactory3D, "createAStandardCamera3D")
      myMeshFactory3D.createAStandardCamera3D(glCntxt, shader)
      expect(myMeshFactory3D.createAStandardCamera3D).toHaveBeenCalledWith(glCntxt, shader)
    })

    it("returns a instantiated Camera3D object", function() {
      let tmpCamera = myMeshFactory3D.createAStandardCamera3D(glCntxt, shader)
      expect(tmpCamera.constructor.name).toEqual('Camera3D')
    })
  })

  it("should have a method for creating a cube", function() {
    expect(typeof myMeshFactory3D.createACube3D).toBe('function')
  })

  describe("createACube3D", function() {
    it("should create an instance of TriangleMesh3D", function() {
      expect(myMeshFactory3D.createACube3D(glCntxt, shader).constructor.name).toEqual('TriangleMesh3D')
    })

    it("should have vertices for building a cube out of triangles", function() {
      let cube = myMeshFactory3D.createACube3D(glCntxt, shader)
      expect(cube.vertices).toEqual([
        1.0,-1.0,-1.0,
     -1.0,-1.0, 1.0,
     -1.0, 1.0, 1.0,
      1.0, 1.0,-1.0,
     -1.0,-1.0,-1.0,
     -1.0, 1.0,-1.0,
      1.0,-1.0, 1.0,
     -1.0,-1.0,-1.0,
      1.0,-1.0,-1.0,
      1.0, 1.0,-1.0,
      1.0,-1.0,-1.0,
     -1.0,-1.0,-1.0,
     -1.0,-1.0,-1.0,
     -1.0, 1.0, 1.0,
     -1.0, 1.0,-1.0,
      1.0,-1.0, 1.0,
     -1.0,-1.0, 1.0,
     -1.0,-1.0,-1.0,
     -1.0, 1.0, 1.0,
     -1.0,-1.0, 1.0,
      1.0,-1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0,-1.0,-1.0,
      1.0, 1.0,-1.0,
      1.0,-1.0,-1.0,
      1.0, 1.0, 1.0,
      1.0,-1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0,-1.0,
     -1.0, 1.0,-1.0,
      1.0, 1.0, 1.0,
     -1.0, 1.0,-1.0,
     -1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
     -1.0, 1.0, 1.0,
      1.0,-1.0, 1.0
      ])
    })
  })

})