describe("Plot3DFactory", function() {
  var myMeshFactory3D

  beforeEach(function() {
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

  // it("should have a method for creating a 3d camera", function() {

  // })

})