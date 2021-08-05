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
    it("should take one paramater as multiplier of object type Vector3", function() {
      var myMultiplierVector3 = new Vector3()
      spyOn(myVector3, 'cross')
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cross).toHaveBeenCalledWith(myMultiplierVector3)
    })
    it("should result the correct vector", function() {
      var myMultiplierVector3 = new Vector3([1, 0, 0])
      myVector3.cells = [0, 0, 1]
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cells).toEqual([0, 1, 0])
    })
    it("should result the correct vector with negative values", function() {
      var myMultiplierVector3 = new Vector3([ 0, -1.0, 0 ])
      myVector3.cells = [ 0, 0, -1.0 ]
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cells).toEqual([-1.0, -0, -0])
    })
    it("should result the correct vector with exact", function() {
      var myMultiplierVector3 = new Vector3([ 1.234, 5.678, 9.101112 ])
      myVector3.cells = [ 13.141516, 17.181920, 21.222324 ]
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cells).toEqual([ 35.87422262304004, -93.41406114979199, 53.41503856799999 ])
    })
    it("should return itself", function() {
      var myMultiplierVector3 = new Vector3([ 1.234, 5.678, 9.101112 ])
      let self = myVector3.cross(myMultiplierVector3)
      expect(self).toEqual(myVector3)
    })
  })

  it("should provide a method subtract", function() {
    expect(typeof myVector3.subtract).toBe("function")
  })

  describe("subtract", function() {
    it("should take one paramater as multiplier of object type Vector3", function() {
      var myMultiplierVector3 = new Vector3()
      spyOn(myVector3, 'subtract')
      myVector3.subtract(myMultiplierVector3)
      expect(myVector3.subtract).toHaveBeenCalledWith(myMultiplierVector3)
    })
    it("should return itself", function() {
      var mySubtrahendVector3 = new Vector3([ 1.234, 5.678, 9.101112 ])
      let self = myVector3.subtract(mySubtrahendVector3)
      expect(self).toEqual(myVector3)
    })
    it("should result the correct calulated vector", function() {
      var mySubtrahendVector3 = new Vector3([ 2 * 1.234, 2 * 5.678, 2 * 9.101112 ])
      myVector3.cells = [ 1.234, 5.678, 9.101112 ]
      myVector3.subtract(mySubtrahendVector3)
      expect(myVector3.cells).toEqual([ -1.234, -5.678, -9.101112 ])
    })
  })

  it("should provide a method normalize", function() {
    expect(typeof myVector3.normalize).toBe("function")
  })

  describe("normalize", function() {
    it("should return itself", function() {
      let self = myVector3.normalize()
      expect(self).toEqual(myVector3)
    })
    it("should return the same vector if it is a normalized vector", function() {
      myVector3.cells = [1, 0, 0]
      myVector3.normalize()
      expect(myVector3.cells).toEqual([ 1, 0, 0 ])
    })
    it("should return the correct normalized vector", function() {
      myVector3.cells = [1, 2, 3]
      myVector3.normalize()
      expect(myVector3.cells).toEqual([ 0.2672612419124244, 0.5345224838248488, 0.8017837257372732 ])
    })
  })
})

describe("Vector3Math", function() {
  var myVector3Math
  beforeEach(function() {
    myVector3Math = new Vector3Math()
  })

  it("should have a method for calculating the cross product of two vector3 instances", function() {
    expect(typeof myVector3Math.cross).toEqual('function')
  })

  describe("cross", function() {
    it("should take two vector3 instgance as parameters and return a new Vector3 instance with the correct caluclated vector ceslls", function() {
      let myVectorA = new Vector3([ 1, 0, 0 ])
      let myVectorB = new Vector3([ 0, 1, 0 ])
      let result = myVector3Math.cross(myVectorA, myVectorB)
      expect(result.cells).toEqual([ 0, 0, 1 ])
      myVectorA = new Vector3([ 0, 1, 0 ])
      myVectorB = new Vector3([ 0, 0, 1 ])
      result = myVector3Math.cross(myVectorA, myVectorB)
      expect(result.cells).toEqual([ 1, 0, 0 ])
    })
  })

  it("should have a method for calculating the vector between two vector3 instances", function() {
    expect(typeof myVector3Math.subtract).toEqual('function')
  })

  describe("subtract", function() {
    it("should calculate the correct result", function() {
      let myVectorA = new Vector3([ 1, 1, 1 ])
      let myVectorB = new Vector3([ -1, -1, -1 ])
      let result = myVector3Math.subtract(myVectorA, myVectorB)
      expect(result.cells).toEqual([ 2, 2, 2 ])
    })
  })

  it("should have a method for normalize a vector and return the result in a new Vector3 instance", function() {
    expect(typeof myVector3Math.normalize).toEqual('function')
  })

  describe("normalize", function() {
    it("should caluclate the normalized vector and return a new Vector3 instance", function() {
      let myVectorA = new Vector3([ Math.sqrt(2), Math.sqrt(2), 0 ])
      let result = myVector3Math.normalize(myVectorA)
      expect(result.cells).toEqual([ 0.7071067811865475, 0.7071067811865475, 0 ])
    })
  })

})

describe("Vector4", function() {
  var myVector4

  beforeEach(function() {
    myVector4 = new Vector4()
  })

  it("has the parent class Vector", function() {
    expect(myVector4.__proto__.__proto__.constructor.name).toEqual('Vector')
  })
})

describe("Quaternion", function() {
  var myQuaternion

  beforeEach(function() {
    myQuaternion = new Quaternion()
  })

  it("has the parent class Vector4", function() {
    expect(myQuaternion.__proto__.__proto__.constructor.name).toEqual('Vector4')
  })

  it("should have initial cell values", function() {
    expect(myQuaternion.cells).toEqual([ 0.0, 0.0, 0.0, 1.0 ])
  })

  it("should have a method for calulating the rotation axis from the quaternion", function() {
    expect(typeof myQuaternion.getAxis).toBe('function')
  })

  describe("getAxis", function() {

  })

  it("should have a method for rotate the quaternion around the X axis", function() {
    expect(typeof myQuaternion.rotateX).toBe('function')
  })

  describe("rotateX", function() {
    it("should rotate the quternion around the x axis", function() {
      myQuaternion.rotateX(Math.PI * 0.125)
      expect(myQuaternion.cells).toEqual([ 0.19509032201612825, 0, 0, 0.9807852804032304 ])
    })
  })

  it("should have a method for rotate the quaternion around the y axis", function() {
    expect(typeof myQuaternion.rotateY).toBe('function')
  })

  describe("rotateY", function() {
    it("should rotate the quternion around the y axis", function() {
      myQuaternion.rotateY(Math.PI * 0.125)
      expect(myQuaternion.cells).toEqual([ 0, 0.19509032201612825, 0, 0.9807852804032304 ])
    })
  })

  it("should have a method for rotate the quaternion around the z axis", function() {
    expect(typeof myQuaternion.rotateZ).toBe('function')
  })

  describe("rotateZ", function() {
    it("should rotate the quternion around the z axis", function() {
      myQuaternion.rotateZ(Math.PI * 0.125)
      expect(myQuaternion.cells).toEqual([ 0, 0,  0.19509032201612825, 0.9807852804032304 ])
    })
  })

  it("should have a method for seting the angle of the quanternion along a parameter axis direction", function() {
    expect(typeof myQuaternion.setAxisAngle).toBe('function')
  })

  describe("setAxisAngle", function() {
    it("should have a method for seting the angle of the quanternion along a parameter axis direction", function() {
      let myAxis = new Vector3([ 1, 0, 0 ])
      myQuaternion.setAxisAngle(Math.PI * 0.5, myAxis)
      expect(myQuaternion.cells).toEqual([ 0.7071067811865475, 0, 0, 0.7071067811865476 ])
    })

    it("should have a method for seting the angle of the quanternion along a parameter axis direction", function() {
      let myAxis = new Vector3([ 1, 0, 0 ])
      myQuaternion.setAxisAngle(Math.PI * 0.5, myAxis)
      expect(myQuaternion.cells).toEqual([ 0.7071067811865475, 0, 0, 0.7071067811865476 ])
      myAxis.cells[0] = 1
      myAxis.cells[1] = 2
      myAxis.cells[2] = 3
      myAxis.normalize()
      myQuaternion.setAxisAngle(Math.PI * 0.5, myAxis)
      expect(myQuaternion.cells).toEqual([ 0.1889822365046136, 0.3779644730092272, 0.5669467095138409, 0.7071067811865476 ])
    })  
  })

  it("should have a method for requesting the angle between the x axis", function() {
    expect(typeof myQuaternion.getXAxisAngle).toBe('function')
  })

  describe("getXAxisAngle", function() {
    it("should return the correct angle in radian", function() {
      let myAxis = new Vector3([ 1, 2, 3 ])
      myAxis.normalize()
      myQuaternion.setAxisAngle(Math.PI * 0.5, myAxis)
      expect(myQuaternion.getXAxisAngle()).toEqual(0.2672612419124244)
    })
  })
})
