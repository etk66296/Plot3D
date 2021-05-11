describe("Camera", function() {
  var canvas
  var glCntxt

  var myCamera
  
  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
  })

  beforeEach(function() {
    myCamera = new Camera()
  })
  
  it("has the parent class Plot3DObject", function() {
    expect(myCamera.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("should has an attribute position of type Vector3", function() {
    expect(myCamera.position.constructor.name).toEqual('Vector3')
  })

  it("should has a default position in the xy layer ", function() {
    expect(myCamera.position.cells).toEqual([ 10, 10, 0 ])
  })

  it("should has a vector3 attribute which represents a point to view in world space", function() {
    expect(myCamera.spot.constructor.name).toEqual('Vector3')
  })

  it("should look to a default point", function() {
    expect(myCamera.spot.cells).toEqual([ 0, 0, 0 ])
  })

  it("should have an attribute which defines the orientation in world space", function() {
    expect(myCamera.upDir.constructor.name).toEqual('Vector3')
  })

  it("should has the world y axis as defauilt up direction of the camera)", function() {
    expect(myCamera.upDir.cells).toEqual([ 0, 1, 0 ])
  })

  it("should has a look at transformation matrix", function() {
    expect(myCamera.lookAtMatrix.constructor.name).toEqual('Matrix4x4')
  })

  it("should have a method lookAt", function() {
    expect(typeof myCamera.lookAt).toEqual('function')
  })

  describe("lookAt", function() {

  })

})