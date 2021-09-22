describe("Plot3DFactory", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var myMeshFactory3D
  
  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    myPlot3DShaderBuilder = new Plot3DShaderBuilder(glCntxt)
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
  })

  beforeEach(function() {
    myMeshFactory3D = new MeshFactory3D(glCntxt, shader)
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

  it("should have a function for producing Colored Triangle Meshes out of loaded gltf data", function() {
    // Mesh data composition:
    // meshData = [
    //   {
    //     vertices: [..],
    //     normals: [..],
    //     indices: [..],
    //     colors: [..]
    //   },
    //   {
    //     vertices: [..],
    //     normals: [..],
    //     indices: [..],
    //     colors: [..]
    //   },
    //   ..
    // ]
    expect(typeof myMeshFactory3D.produceAColoredTriangleMesh3DFrom).toEqual('function')
  })


})