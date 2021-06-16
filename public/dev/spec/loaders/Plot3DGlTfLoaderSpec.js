describe("Plot3DGlTfLoader", function() {

  var canvas
  var glCntxt

  var gltfObjectCopy
  var gltfObject

  var myPlot3DGlTfLoader

  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    let gltfRequester = new XMLHttpRequest()
    gltfRequester.onreadystatechange = () => {
      if (gltfRequester.readyState === 4) {
        if (gltfRequester.status === 200) {
          gltfObjectCopy = JSON.parse(gltfRequester.responseText)
        } else {
           console.error(this.gltfRequester.statusText)
        }
      }
    }
    gltfRequester.open('GET', './spec/assets/mesh3d/triangle.gltf', true)
    gltfRequester.send(null)
    setTimeout(() => {}, 2000)
  })

  beforeEach(function() {
    myPlot3DGlTfLoader = new Plot3DGlTfLoader(glCntxt)
    if(gltfObjectCopy == undefined) {
      setTimeout(() => {
        gltfObject = JSON.parse(JSON.stringify(gltfObjectCopy))
      }, 300)
    } else {
      gltfObject = JSON.parse(JSON.stringify(gltfObjectCopy))
    }
  })

  it("has the parent class Plot3DLoader", function() {
    expect(myPlot3DGlTfLoader.__proto__.__proto__.constructor.name).toEqual('Plot3DLoader')
  })

  it("should have a reference to the active web gl context", function() {
    expect(myPlot3DGlTfLoader.glCntxt.constructor.name).toEqual('WebGL2RenderingContext')
  })

  it("should have a xmlhttprequester for gltf files", function() {
    expect(myPlot3DGlTfLoader.gltfRequester.constructor.name).toEqual("XMLHttpRequest")
  })

  it("should have an attribute which is a regular expression for extracting the raw data from a base64 buffer", function() {
    expect(myPlot3DGlTfLoader.rawBufDataRegExMatcher).toEqual(/(?<=data:application\/octet-stream;base64,).*/)
  })

  it("should have a method for loading gltf files with embedded buffer data", function() {
    expect(typeof myPlot3DGlTfLoader.requestGlTf).toBe('function')
  })

  it("should have an on ready state change function in the requester instance for saving the gltf data", function() {
    expect(typeof myPlot3DGlTfLoader.gltfRequester.onreadystatechange).toBe('function')
  })

  describe("onreadystatechange", function() {
    it("should log an error if the response status is not ok (!= 200)", function(done) {
      spyOn(console, 'error')
      myPlot3DGlTfLoader.requestGlTf('blablabla.gltf')
      setTimeout(() => {
        expect(console.error).toHaveBeenCalled()
        done()
      }, 300)
    })

    it("should call the class internal method for extracting the data from the gltf data", function(done) {
      spyOn(myPlot3DGlTfLoader, "extractDataFromGltfJson")
      let url = './spec/assets/mesh3d/triangle.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      setTimeout(() => {
        expect(myPlot3DGlTfLoader.extractDataFromGltfJson).toHaveBeenCalled()
        done()
      }, 300)
    })

  })

  it("should have a list attribute for storing the gltf data object", function() {
    expect(myPlot3DGlTfLoader.loaded.constructor.name).toEqual('Array')
  })

  describe("requestGlTf", function() {
    it("should call open with the url given in parameter 1", function() {
      spyOn(myPlot3DGlTfLoader.gltfRequester, 'open').and.callThrough()
      spyOn(myPlot3DGlTfLoader.gltfRequester, 'send').and.callThrough()
      let url = './spec/assets/mesh3d/triangle.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      expect(myPlot3DGlTfLoader.gltfRequester.open).toHaveBeenCalledWith('GET', url, true)
      expect(myPlot3DGlTfLoader.gltfRequester.send).toHaveBeenCalledWith(null)
    })

    it("should trigger the on ready state and trigger the data extraction", function(done) {
      spyOn(myPlot3DGlTfLoader, 'extractDataFromGltfJson').and.callThrough()
      let url = './spec/assets/mesh3d/triangle.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      setTimeout(() => {
        expect(myPlot3DGlTfLoader.extractDataFromGltfJson).toHaveBeenCalled()
        done()
      }, 300)
    })

    it("should log an error when the gltf object is not version 2", function(done) {
      spyOn(console, 'error')
      let url = './spec/assets/mesh3d/cubeWrongVersion.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      setTimeout(() => {
        expect(console.error).toHaveBeenCalledWith('check your gltf file, version must be 2.0')
        done()
      }, 300)
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
      expect(myPlot3DGlTfLoader.bytesToFloats).toHaveBeenCalledTimes(2)
    })

    it("should call the class internal function bytesToUShort when the accessor tells it is a buffer of unsigned shorts", function() {
      spyOn(myPlot3DGlTfLoader, 'bytesToUShorts')
      myPlot3DGlTfLoader.extractDataFromGltfJson(gltfObject)
      expect(myPlot3DGlTfLoader.bytesToUShorts).toHaveBeenCalledTimes(1)
    })

    it("should return the correct data", function() {
      let myData = myPlot3DGlTfLoader.extractDataFromGltfJson(gltfObject)
      let myExpectedArray = new Float32Array([ 1, 0, 1, 1, 0, -0, 0, 0, 0.5847219824790955 ])
      expect(myData.bufferViews[0].cells).toEqual(myExpectedArray)
      myExpectedArray = new Float32Array([ 0, 1, -0, 0, 1, -0, 0, 1, -0 ])
      expect(myData.bufferViews[1].cells).toEqual(myExpectedArray)
      myExpectedArray = new Uint16Array([ 1, 2, 0 ])
      expect(myData.bufferViews[2].cells).toEqual(myExpectedArray)
    })
    
  })

  it("should have a function bytesToFloats", function() {
    expect(typeof myPlot3DGlTfLoader.bytesToFloats).toBe('function')
  })

  describe("bytesToFloats", function() {
    it("should create a four bytes array buffer", function() {
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

})