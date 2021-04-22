describe("Matrix", function() {
  var myVector

  beforeEach(function() {
    myVector = new Vector()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myVector.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("has an attribute cells which is an array object", function() {
    expect(myVector.cells.constructor.name).toEqual('Array')
  })
})

describe("Vector3", function() {
  var myVector3

  beforeEach(function() {
    myVector3 = new Vector3()
  })

  it("has the parent class Vector", function() {
    expect(myVector3.__proto__.__proto__.constructor.name).toEqual('Vector')
  })

  it("should provide a method cross", function() {
    expect(typeof myVector3.cross).toBe("function")
  })

  describe("cross", function() {
    it("should take one paramater as multiplier of object type Matrix4x4", function() {
      var myMultiplierVector3 = new Vector3()
      spyOn(myVector3, 'cross')
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cross).toHaveBeenCalledWith(myMultiplierVector3)
    })
  })
})
