describe("Plot3DGlTfLoader", function() {

  var canvas
  var glCntxt

  var gltfObject

  var myPlot3DGlTfLoader

  beforeAll(async function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
  })

  beforeEach(async function() {
    myPlot3DGlTfLoader = new Plot3DGlTfLoader(glCntxt)
    await myPlot3DGlTfLoader.requestGlTf('./spec/assets/mesh3d/cube.gltf')
    gltfObject = JSON.parse(JSON.stringify(myPlot3DGlTfLoader.loaded[0]))
  })

  it("has the parent class Plot3DLoader", function() {
    expect(myPlot3DGlTfLoader.__proto__.__proto__.constructor.name).toEqual('Plot3DLoader')
  })

  it("should have a reference to the active web gl context", function() {
    expect(myPlot3DGlTfLoader.glCntxt.constructor.name).toEqual('WebGL2RenderingContext')
  })

  it("should have an attribute which is a regular expression for extracting the raw data from a base64 buffer", function() {
    expect(myPlot3DGlTfLoader.rawBufDataRegExMatcher).toEqual(/(?<=data:application\/octet-stream;base64,).*/)
  })

  it("should have a method for loading gltf files with embedded buffer data", function() {
    expect(typeof myPlot3DGlTfLoader.requestGlTf).toBe('function')
  })

  it("should have a list attribute for storing the gltf data object", function() {
    expect(myPlot3DGlTfLoader.loaded.constructor.name).toEqual('Array')
  })

  describe("requestGlTf", function() {
    it("should call open with the url given in parameter 1", function() {
      spyOn(myPlot3DGlTfLoader.gltfRequester, 'open').and.callThrough()
      spyOn(myPlot3DGlTfLoader.gltfRequester, 'send').and.callThrough()
      let url = './spec/assets/mesh3d/cube.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      expect(myPlot3DGlTfLoader.gltfRequester.open).toHaveBeenCalledWith('GET', url, true)
      expect(myPlot3DGlTfLoader.gltfRequester.send).toHaveBeenCalledWith(null)
    })

    it("should trigger the on ready state and trigger the data extraction", async function() {
      spyOn(myPlot3DGlTfLoader, 'extractDataFromGltfJson').and.callThrough()
      let url = './spec/assets/mesh3d/cube.gltf'
      await myPlot3DGlTfLoader.requestGlTf(url)
      expect(myPlot3DGlTfLoader.extractDataFromGltfJson).toHaveBeenCalled()
    })

    it("should log an error when the gltf object is not version 2", async function() {
      spyOn(console, 'error')
      let url = './spec/assets/mesh3d/cubeWrongVersion.gltf'
      await myPlot3DGlTfLoader.requestGlTf(url)
      expect(console.error).toHaveBeenCalledWith('check your gltf file, version must be 2.0')
    })

  })

  it("should have a method, that extracts the mesh data from the gltf json", function() {
    expect(typeof myPlot3DGlTfLoader.extractDataFromGltfJson).toBe('function')
  })

  describe("extractDataFromGltfJson", function() {

    it("should convert base64 string to a bytestring", function() {
      spyOn(window, 'atob').and.callThrough()
      myPlot3DGlTfLoader.extractDataFromGltfJson(gltfObject)
      expect(window.atob).toHaveBeenCalled()
    })

    it("should create an unsignet int8 array", function() {
      spyOn(window, 'Uint8Array').and.callThrough()
      myPlot3DGlTfLoader.extractDataFromGltfJson(gltfObject)
      expect(window.Uint8Array).toHaveBeenCalled()
    })

    it("should call the class internal function bytesToFloat when the accessor tells it is a float buffer of floats", function() {
      spyOn(myPlot3DGlTfLoader, 'bytesToFloats')
      myPlot3DGlTfLoader.extractDataFromGltfJson(gltfObject)
      expect(myPlot3DGlTfLoader.bytesToFloats).toHaveBeenCalledTimes(12)
    })

    it("should call the class internal function bytesToUShort when the accessor tells it is a buffer of unsigned shorts", function() {
      spyOn(myPlot3DGlTfLoader, 'bytesToUShorts')
      myPlot3DGlTfLoader.extractDataFromGltfJson(gltfObject)
      expect(myPlot3DGlTfLoader.bytesToUShorts).toHaveBeenCalledTimes(4)
    })

    it("should return the correct data", function() {
      let myData = myPlot3DGlTfLoader.extractDataFromGltfJson(gltfObject)
      let myExpectedArray = new Float32Array([ 1, 1, -1, 1, 1, 1, -1, 1, -1, -1, 1, 1 ])
      expect(myData.bufferViews[0].cells).toEqual(myExpectedArray)
      myExpectedArray = new Float32Array([ 0, 1, -0, 0, 1, -0, 0, 1, -0, 0, 1, -0 ])
      expect(myData.bufferViews[1].cells).toEqual(myExpectedArray)
      myExpectedArray = new Uint16Array([ 0, 2, 3, 0, 3, 1 ])
      expect(myData.bufferViews[2].cells).toEqual(myExpectedArray)
    })
    
  })

  it("should have a function bytesToFloats", function() {
    expect(typeof myPlot3DGlTfLoader.bytesToFloats).toBe('function')
  })

  describe("bytesToFloats", function() {
    it("should create a bytes array buffer", function() {
      let bytes = new Uint8Array(16)
      spyOn(window, 'ArrayBuffer').and.callThrough()
      myPlot3DGlTfLoader.bytesToFloats(bytes)
      expect(window.ArrayBuffer).toHaveBeenCalledWith(4)
    })

    it("should create a data view with the four bytes array buffer", function() {
      let bytes = new Uint8Array(16)
      spyOn(window, 'DataView').and.callThrough()
      myPlot3DGlTfLoader.bytesToFloats(bytes)
      expect(window.DataView).toHaveBeenCalled()
    })

    it("should create a float32 array with the neccessary size", function() {
      let bytes = new Uint8Array(16)
      spyOn(window, 'Float32Array')
      myPlot3DGlTfLoader.bytesToFloats(bytes)
      expect(window.Float32Array).toHaveBeenCalled()
    })

    it("should return the expected float values", function() {
      let cells = myPlot3DGlTfLoader.bytesToFloats(new Uint8Array(16))
      let expectedArray = new Float32Array([ 0, 0, 0, 0])
      expect(cells).toEqual(expectedArray)
    })
  })

  it("should have a function bytesToUShorts", function() {
    expect(typeof myPlot3DGlTfLoader.bytesToUShorts).toBe('function')
  })

  describe("bytesToUShorts", function() {
    it("should create a bytes array buffer", function() {
      let bytes = new Uint8Array(16)
      spyOn(window, 'ArrayBuffer').and.callThrough()
      myPlot3DGlTfLoader.bytesToUShorts(bytes)
      expect(window.ArrayBuffer).toHaveBeenCalledWith(2)
    })

    it("should create a data view with the four bytes array buffer", function() {
      let bytes = new Uint8Array(16)
      spyOn(window, 'DataView').and.callThrough()
      myPlot3DGlTfLoader.bytesToUShorts(bytes)
      expect(window.DataView).toHaveBeenCalled()
    })

    it("should create a float32 array with the neccessary size", function() {
      let bytes = new Uint8Array(16)
      spyOn(window, 'Uint16Array')
      myPlot3DGlTfLoader.bytesToUShorts(bytes)
      expect(window.Uint16Array).toHaveBeenCalled()
    })

    it("should return the expected float values", function() {
      let cells = myPlot3DGlTfLoader.bytesToUShorts(new Uint8Array(16))
      let expectedArray = new Uint16Array([ 0, 0, 0, 0, 0, 0, 0, 0 ])
      expect(cells).toEqual(expectedArray)
    })
  })

})