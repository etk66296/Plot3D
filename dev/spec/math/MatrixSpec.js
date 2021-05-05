describe("MatrixFactory", function() {
  var myMatrixFactory

  beforeEach(function() {
    myMatrixFactory = new MatrixFactory()
  })

  it("has the parent class Plot3DFactory", function() {
    expect(myMatrixFactory.__proto__.__proto__.constructor.name).toEqual('Plot3DFactory')
  })

  it("should have a method createIdentityMatrix4x4 wich returns a new Instance of Matrix4x4", function() {
    let myIdentiyMatrix4x4 =  myMatrixFactory.createIdentityMatrix4x4()
    expect(myIdentiyMatrix4x4.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  })

})

describe("Matrix", function() {
  var myMatrix

  beforeEach(function() {
    myMatrix = new Matrix()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myMatrix.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("has an attribute cells which is an array object", function() {
    expect(myMatrix.cells.constructor.name).toEqual('Array')
  })
})

describe("Matrix4x4", function() {
  var myMatrix4x4

  beforeEach(function() {
    myMatrix4x4 = new Matrix4x4()
  })

  it("has the parent class Matrix", function() {
    expect(myMatrix4x4.__proto__.__proto__.constructor.name).toEqual('Matrix')
  })

  it("the attribute cells has the length 16", function() {
    expect(myMatrix4x4.cells.length).toEqual(16)
  })

  it("should provide a method multiplyM4", function() {
    expect(typeof myMatrix4x4.multiplyM4).toBe("function")
  })
  describe("multiplyM4", function() {
    it("should take one paramater as multiplier of object type Matrix4x4", function() {
      var myMultiplierMatrix4x4 = new Matrix4x4()
      spyOn(myMatrix4x4, 'multiplyM4')
      myMatrix4x4.multiplyM4(myMultiplierMatrix4x4)
      expect(myMatrix4x4.multiplyM4).toHaveBeenCalledWith(myMultiplierMatrix4x4)
    })
    it("should result the identity matrix when it was called with the identity matrix", function() {
      var myMultiplierMatrix4x4 = new Matrix4x4()
      myMatrix4x4.multiplyM4(myMultiplierMatrix4x4)
      expect(myMatrix4x4.cells).toEqual(myMatrix4x4.cells)
    })
    it("should result the correct caluclated matrix", function() {
      var myMultiplierMatrix4x4 = new Matrix4x4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
      ])
      myMatrix4x4.cells = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
      ]
      myMatrix4x4.multiplyM4(myMultiplierMatrix4x4)
      expect(myMatrix4x4.cells).toEqual([
        90,  100, 110, 120,
        202, 228,	254, 280,
        314, 356,	398, 440,
        426, 484,	542, 600
      ])
    })
    describe("transpose", function() {
      it("should result the identity matrix when it was called with the identity matrix", function() {
        myMatrix4x4.transpose()
        expect(myMatrix4x4.cells).toEqual(myMatrix4x4.cells)
      })
      it("should result the correct transposed matrix", function() {
        myMatrix4x4.cells = [
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, 15, 16
        ]
        myMatrix4x4.transpose()
        expect(myMatrix4x4.cells).toEqual([
          1, 5, 9,  13,
          2, 6,	10, 14,
          3, 7,	11, 15,
          4, 8,	12, 16
        ])
      })
    })
    
    describe("invert", function() {
      it("should result the identity matrix when it was called with the identity matrix", function() {
        myMatrix4x4.invert()
        expect(myMatrix4x4.cells).toEqual(myMatrix4x4.cells)
      })
      it("should result the correct inverse matrix", function() {
        myMatrix4x4.cells = [
           1,  1,  1, -1,
           1,  1, -1,  1,
           1, -1,  1,  1,
          -1,  1,  1,  1
        ]
        myMatrix4x4.invert()
        expect(myMatrix4x4.cells).toEqual([
           0.25,  0.25,  0.25, -0.25,
           0.25,  0.25, -0.25,  0.25,
           0.25, -0.25,  0.25,  0.25,
          -0.25,  0.25,  0.25,  0.25
        ])
      })
    })
  })
})

describe("Matrix3x3", function() {
  var myMatrix3x3

  beforeEach(function() {
    myMatrix3x3 = new Matrix3x3()
  })

  it("has the parent class Matrix", function() {
    expect(myMatrix3x3.__proto__.__proto__.constructor.name).toEqual('Matrix')
  })

})