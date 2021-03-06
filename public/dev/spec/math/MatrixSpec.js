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

  it("sould have a methos log which prints the matrix well formated in the console", function() {
    expect(typeof myMatrix.log).toEqual('function')
  })

  describe('log', function() {
    it("should log the each cell", function() {
      spyOn(console, 'log')
      myMatrix.cells = [ '1', '2', '3', '4' ]
      myMatrix.log()
      expect(console.log).toHaveBeenCalledTimes(myMatrix.cells.length)
    })
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

  it("should have a method which rests the matrix to the identity matrix", function() {
    expect(typeof myMatrix4x4.reset).toEqual('function')
  })

  describe("reset", function() {
    it("should reset the cells array to the identity matrix", function() {
      myMatrix4x4.cells = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
      ]
      myMatrix4x4.reset()
      expect(myMatrix4x4.cells).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ])
    })
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
        9, 8, 7, 6,
        5, 4, 3, 2
      ])
      myMatrix4x4.cells = [
        2, 3, 4, 5,
        6, 7, 8, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
      ]
      myMatrix4x4.multiplyM4(myMultiplierMatrix4x4)
      expect(myMatrix4x4.cells).toEqual([
        54 , 50 , 46 , 42 ,
        134, 130, 126, 122,
        146, 150, 154, 158,
        66 , 70 , 74 , 78
      ])
    })
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

  it("should have a method for setting the cells to act as rotation matrix around arbitrary direction", function() {
    expect(typeof myMatrix4x4.setCellsForRotationAroundV3Dir).toBe('function')
  })

  describe("setCellsForRotationAroundV3Dir", function() {
    it("should take two arguments the rotation angle in rad and the direction v3 vector", function() {
      spyOn(myMatrix4x4, 'setCellsForRotationAroundV3Dir')
      let direction = new Vector3([ 0.1, 0.2, 0.3 ])
      myMatrix4x4.setCellsForRotationAroundV3Dir(0.05, direction)
      expect(myMatrix4x4.setCellsForRotationAroundV3Dir).toHaveBeenCalledWith(0.05, direction)
    })

    it("should calculate the length of the direction vector for normalizing its components", function() {
      spyOn(Math, 'hypot')
      let direction = new Vector3([ 0.1, 0.2, 0.3 ])
      myMatrix4x4.setCellsForRotationAroundV3Dir(0.05, direction)
      expect(Math.hypot).toHaveBeenCalledWith(0.1, 0.2, 0.3)
    })

    it("should calculate the sinus value of the rotation angel", function() {
      spyOn(Math, 'sin')
      let direction = new Vector3([ 0.1, 0.2, 0.3 ])
      myMatrix4x4.setCellsForRotationAroundV3Dir(0.05, direction)
      expect(Math.sin).toHaveBeenCalledWith(0.05)
    })

    it("should calculate the cos value of the rotation angel", function() {
      spyOn(Math, 'cos')
      let direction = new Vector3([ 0.1, 0.2, 0.3 ])
      myMatrix4x4.setCellsForRotationAroundV3Dir(0.05, direction)
      expect(Math.cos).toHaveBeenCalledWith(0.05)
    })

    it("should set the cells for rotation around the direction vector", function() {
      let direction = new Vector3([ 0.1, 0.2, 0.3 ])
      myMatrix4x4.setCellsForRotationAroundV3Dir(0.05, direction)
      expect(myMatrix4x4.cells).toEqual([
        0.9988395275096116, 0.040251018776388835, -0.02644718835412974, 0,
        -0.03989395031780777, 0.9991073288535474, 0.013893097536904361, 0,
        0.026982791042001335, -0.012821892161161176, 0.9995536644267736, 0,
        0, 0, 0, 1
      ])

    })
  })

  it("should have a method for calculating a matrix out of a quaternion.", function() {
    expect(typeof myMatrix4x4.setCellsFromQuaternion).toBe('function')
  })

  describe("setCellsFromQuaternion", function() {
    
  })

  describe('log', function() {
    it("should log the each cell", function() {
      spyOn(console, 'log')
      myMatrix4x4.log()
      expect(console.log).toHaveBeenCalledTimes(myMatrix4x4.cells.length / 4 + 2)
    })
  })
})

describe("Matrix4x4Projection", function() {
  var myProjectionMatrix

  beforeEach(function() {
    myProjectionMatrix = new Matrix4x4Projection()
  })

  it("has the parent class Matrix4x4", function() {
    expect(myProjectionMatrix.__proto__.__proto__.constructor.name).toEqual('Matrix4x4')
  })

  it("has an attribute, which holds te vertical field of view val??ue in radian", function() {
    expect(myProjectionMatrix.fieldOfViewY).toEqual(2 / 3 * Math.PI)
  })

  it("has an attribute, which holds width and height ratio", function() {
    expect(myProjectionMatrix.aspect).toEqual(16 / 9)
  })

  it("has an attribute, which holds the near frustum range", function() {
    expect(myProjectionMatrix.near).toEqual(0.1)
  })

  it("has an attribute, which holds the far frustum range", function() {
    expect(myProjectionMatrix.far).toEqual(1000)
  })

  it("has a method for setting the matrix cells", function() {
    expect(typeof myProjectionMatrix.setCellsForPerspectiveProjection).toBe('function')
  })

  describe('setCellsForPerspectiveProjection', function() {
    it ("should set the matrix cells for the expected projection", function() {
      myProjectionMatrix.setCellsForPerspectiveProjection(Math.PI * 0.5, 4 / 3, 2, 200)
      expect(myProjectionMatrix.cells).toEqual([
        (1.0 / Math.tan(Math.PI * 0.5 * 0.5)) / (4 / 3), 0, 0, 0,
        0, 1.0 / Math.tan(Math.PI * 0.5 * 0.5), 0, 0,
        0, 0, (200 + 2) * (1 / (2 - 200)), -1,
        0, 0, 2 * 200 * 2 * (1 / (2 - 200)), 0

      ])
    })
  })

})

describe("Matrix4x4View", function() {
  var myViewMatrix

  beforeEach(function() {
    myViewMatrix = new Matrix4x4View(
      new Vector3([ 0, 4, 10 ]),
      new Vector3([ -1, 0, -1 ]),
      new Vector3([ 0, 1, 0 ])
    )
  })

  it("has the parent class Matrix4x4", function() {
    expect(myViewMatrix.__proto__.__proto__.constructor.name).toEqual('Matrix4x4')
  })

  it("should have the cell values as expected", function() {
    expect(myViewMatrix.cells).toEqual([
      0.995893206467704, 3.469446951953614e-18, -0.09053574604251854, 0,
      -0.030827658034323767, 0.940243570046875, -0.33910423837756143, 0,
      0.08512565307587486, 0.3405026123034994, 0.9363821838346236, -0,
      2.7755575615628914e-17, 4, 10.000000000000002, 1
    ])
  })

  it("should have a function for calculating the look at view matrix", function() {
    expect(typeof myViewMatrix.setCellsLookAtFromWorldPosition).toBe('function')
  })

  describe("setCellsLookAtFromWorldPosition", function() {
    it("should calculate the X distance between the world position and the look at point", function() {
      spyOn(Math, 'abs')
      let myWorldPos = { cells: [ 1, 0, 0 ] }
      let myWorldPointToLookAt = { cells: [ 10, 0, 0 ] }
      let myCameraDeviceWorldUpDir = { cells: [ 0, 1, 0 ] }
      myViewMatrix.setCellsLookAtFromWorldPosition(myWorldPos, myWorldPointToLookAt, myCameraDeviceWorldUpDir)
      expect(Math.abs).toHaveBeenCalledWith(1 - 10)
    })

    it("should calculate the Y distance between the world position and the look at point", function() {
      spyOn(Math, 'abs')
      let myWorldPos = { cells: [ 0, 2, 0 ] }
      let myWorldPointToLookAt = { cells: [ 0, 20, 0 ] }
      let myCameraDeviceWorldUpDir = { cells: [ 0, 1, 0 ] }
      myViewMatrix.setCellsLookAtFromWorldPosition(myWorldPos, myWorldPointToLookAt, myCameraDeviceWorldUpDir)
      expect(Math.abs).toHaveBeenCalledWith(2 - 20)
    })

    it("should calculate the Z distance between the world position and the look at point", function() {
      spyOn(Math, 'abs')
      let myWorldPos = { cells: [ 0, 0, 3 ] }
      let myWorldPointToLookAt = { cells: [ 0, 0, 30 ] }
      let myCameraDeviceWorldUpDir = { cells: [ 0, 1, 0 ] }
      myViewMatrix.setCellsLookAtFromWorldPosition(myWorldPos, myWorldPointToLookAt, myCameraDeviceWorldUpDir)
      expect(Math.abs).toHaveBeenCalledWith(3 - 30)
    })

    it("should return the identity matrix when the distance between the world position and the point to view at is smaller then a defined value", function() {
      let myWorldPos = { cells: [ 0, 0, 0 ] }
      let myWorldPointToLookAt = { cells: [ 0, 0, 0 ] }
      let myCameraDeviceWorldUpDir = { cells: [ 0, 1, 0 ] }
      myViewMatrix.setCellsLookAtFromWorldPosition(myWorldPos, myWorldPointToLookAt, myCameraDeviceWorldUpDir)
      expect(myViewMatrix.cells).toEqual([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ])
    })

    it("should the inverse dinstance from point to view to the world pisition for normalizing the new z vector", function() {
      let myWorldPos = { cells: [ 1, 2, 3 ] }
      let myWorldPointToLookAt = { cells: [ 4, 5, 6 ] }
      let myCameraDeviceWorldUpDir = { cells: [ 0, 1, 0 ] }
      let z0 = myWorldPos.cells[0] - myWorldPointToLookAt.cells[0]
      let z1 = myWorldPos.cells[1] - myWorldPointToLookAt.cells[1]
      let z2 = myWorldPos.cells[2] - myWorldPointToLookAt.cells[2]
      spyOn(Math, 'hypot')
      myViewMatrix.setCellsLookAtFromWorldPosition(myWorldPos, myWorldPointToLookAt, myCameraDeviceWorldUpDir)
      expect(Math.hypot).toHaveBeenCalledWith(z0, z1, z2)
    })

    it("should calculate the new x direction out of the up vector and the calculated z compontents", function() {
      let myWorldPos = { cells: [ 10, 20, 30 ] }
      let myWorldPointToLookAt = { cells: [ 4, 5, 6 ] }
      let myCameraDeviceWorldUpDir = { cells: [ 0, 1, 0 ] }
      let z0 = myWorldPos.cells[0] - myWorldPointToLookAt.cells[0]
      let z1 = myWorldPos.cells[1] - myWorldPointToLookAt.cells[1]
      let z2 = myWorldPos.cells[2] - myWorldPointToLookAt.cells[2]
      let len = 1 / Math.hypot(z0, z1, z2)
      z0 *= len
      z1 *= len
      z2 *= len
      let x0 = myCameraDeviceWorldUpDir.cells[1] * z2 - myCameraDeviceWorldUpDir.cells[2] * z1
      let x1 = myCameraDeviceWorldUpDir.cells[2] * z0 - myCameraDeviceWorldUpDir.cells[0] * z2
      let x2 = myCameraDeviceWorldUpDir.cells[0] * z1 - myCameraDeviceWorldUpDir.cells[1] * z0
      spyOn(Math, 'hypot').and.callThrough()
      myViewMatrix.setCellsLookAtFromWorldPosition(myWorldPos, myWorldPointToLookAt, myCameraDeviceWorldUpDir)
      expect(Math.hypot).toHaveBeenCalledWith(x0, x1, x2)
    })

    it("should calculate the new y direction out of the calculated x vector and z compontents", function() {
      let myWorldPos = { cells: [ 10, 20, 30 ] }
      let myWorldPointToLookAt = { cells: [ 4, 5, 6 ] }
      let myCameraDeviceWorldUpDir = { cells: [ 0, 1, 0 ] }
      let z0 = myWorldPos.cells[0] - myWorldPointToLookAt.cells[0]
      let z1 = myWorldPos.cells[1] - myWorldPointToLookAt.cells[1]
      let z2 = myWorldPos.cells[2] - myWorldPointToLookAt.cells[2]
      let len = 1 / Math.hypot(z0, z1, z2)
      z0 *= len
      z1 *= len
      z2 *= len
      let x0 = myCameraDeviceWorldUpDir.cells[1] * z2 - myCameraDeviceWorldUpDir.cells[2] * z1
      let x1 = myCameraDeviceWorldUpDir.cells[2] * z0 - myCameraDeviceWorldUpDir.cells[0] * z2
      let x2 = myCameraDeviceWorldUpDir.cells[0] * z1 - myCameraDeviceWorldUpDir.cells[1] * z0
      len = 1 / Math.hypot(x0, x1, x2)
      x0 *= len
      x1 *= len
      x2 *= len
      let y0 = z1 * x2 - z2 * x1
      let y1 = z2 * x0 - z0 * x2
      let y2 = z0 * x1 - z1 * x0
      spyOn(Math, 'hypot').and.callThrough()
      myViewMatrix.setCellsLookAtFromWorldPosition(myWorldPos, myWorldPointToLookAt, myCameraDeviceWorldUpDir)
      expect(Math.hypot).toHaveBeenCalledWith(y0, y1, y2)
    })

  })

})

describe("Matrix4x4Math", function() {
  var myMatrix4x4Math

  beforeEach(function() {
    myMatrix4x4Math = new Matrix4x4Math()
  })

  it("Should have a method for calulation the product of two 4x4 matrices", function() {
    expect(typeof myMatrix4x4Math.multiplyTwoM4x4).toBe('function')
  })

  describe("multiplyTwoM4x4", function() {
    
    var mA
    var mB

    beforeEach(function() {
      mA = new Matrix4x4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
      ])
      mB = new Matrix4x4([
        2, 3, 4, 5,
        6, 7, 8, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
      ])
    })
    
    it("should return a new Matrix4x4 object instance", function() {
      let result = myMatrix4x4Math.multiplyTwoM4x4(mA, mB)
      expect(result.constructor.name).toEqual('Matrix4x4')
    })

    it("should calculate the correct result", function() {
      let result = myMatrix4x4Math.multiplyTwoM4x4(mA, mB)
      expect(result.cells).toEqual([
        54 , 50 , 46 , 42 ,
        134, 130, 126, 122,
        146, 150, 154, 158,
        66 , 70 , 74 , 78
      ])
    })

  })

  it("should have a method for building the transpose matrix", function() {
    expect(typeof myMatrix4x4Math.transpose).toBe('function')
  })

  describe("transpose", function() {
    it("should build the correct transposed matrix", function() {
      let m = new Matrix4x4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
      ])
      expect(myMatrix4x4Math.transpose(m).cells).toEqual([
        1, 5, 9, 5,
        2, 6, 8, 4,
        3, 7, 7, 3,
        4, 8, 6, 2
      ])
    })
  })

  it("should have a method for inverting a matrix", function() {
    expect(typeof myMatrix4x4Math.invert).toBe('function')
  })

  describe("invert", function() {
    it("should calculate the correct inverted matrix", function() {
      let m = new Matrix4x4([
        1,  1,  1, -1,
        1,  1, -1,  1,
        1, -1,  1,  1,
       -1,  1,  1,  1
     ])
     
     expect(myMatrix4x4Math.invert(m).cells).toEqual([
        0.25,  0.25,  0.25, -0.25,
        0.25,  0.25, -0.25,  0.25,
        0.25, -0.25,  0.25,  0.25,
       -0.25,  0.25,  0.25,  0.25
     ])
    })
  })

  it("should have a function for appending x axis rotation to a matrix", function() {
    expect(typeof myMatrix4x4Math.appendXRotationToM4X4).toBe('function')
  })

  describe("appendXRotationToM4X4", function() {

    it("should calculate the sin of the passed angle", function() {
      spyOn(Math, 'sin')
      myMatrix4x4Math.appendXRotationToM4X4(new Matrix4x4(), Math.PI * 0.5)
      expect(Math.sin).toHaveBeenCalledWith(Math.PI * 0.5)
    })

    it("should calculate the cos of the passed angle", function() {
      spyOn(Math, 'cos')
      myMatrix4x4Math.appendXRotationToM4X4(new Matrix4x4(), Math.PI * 0.5)
      expect(Math.cos).toHaveBeenCalledWith(Math.PI * 0.5)
    })

    it("should append the rotation to the matrix cells", function() {
      let m = new Matrix4x4()
      myMatrix4x4Math.appendXRotationToM4X4(m, Math.PI * 0.5)
      expect(m.cells).toEqual([ 1, 0, 0, 0, 0, 6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1 ])
    })

  })

  it("should have a function for appending y axis rotation to a matrix", function() {
    expect(typeof myMatrix4x4Math.appendYRotationToM4X4).toBe('function')
  })

  describe("appendYRotationToM4X4", function() {

    it("should calculate the sin of the passed angle", function() {
      spyOn(Math, 'sin')
      myMatrix4x4Math.appendYRotationToM4X4(new Matrix4x4(), Math.PI * 0.5)
      expect(Math.sin).toHaveBeenCalledWith(Math.PI * 0.5)
    })

    it("should calculate the cos of the passed angle", function() {
      spyOn(Math, 'cos')
      myMatrix4x4Math.appendYRotationToM4X4(new Matrix4x4(), Math.PI * 0.5)
      expect(Math.cos).toHaveBeenCalledWith(Math.PI * 0.5)
    })

    it("should append the rotation to the matrix cells", function() {
      let m = new Matrix4x4()
      myMatrix4x4Math.appendYRotationToM4X4(m, Math.PI * 0.5)
      expect(m.cells).toEqual([ 6.123233995736766e-17, 0, -1, 0, 0, 1, 0, 0, 1, 0, 6.123233995736766e-17, 0, 0, 0, 0, 1 ])
    })

  })

  it("should have a function for appending z axis rotation to a matrix", function() {
    expect(typeof myMatrix4x4Math.appendZRotationToM4X4).toBe('function')
  })

  describe("appendZRotationToM4X4", function() {
    
    it("should calculate the sin of the passed angle", function() {
      spyOn(Math, 'sin')
      myMatrix4x4Math.appendZRotationToM4X4(new Matrix4x4(), Math.PI * 0.5)
      expect(Math.sin).toHaveBeenCalledWith(Math.PI * 0.5)
    })

    it("should calculate the cos of the passed angle", function() {
      spyOn(Math, 'cos')
      myMatrix4x4Math.appendZRotationToM4X4(new Matrix4x4(), Math.PI * 0.5)
      expect(Math.cos).toHaveBeenCalledWith(Math.PI * 0.5)
    })

    it("should append the rotation to the matrix cells", function() {
      let m = new Matrix4x4()
      myMatrix4x4Math.appendYRotationToM4X4(m, Math.PI * 0.5)
      expect(m.cells).toEqual([ 6.123233995736766e-17, 0, -1, 0, 0, 1, 0, 0, 1, 0, 6.123233995736766e-17, 0, 0, 0, 0, 1 ])
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