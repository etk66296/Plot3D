describe("Plot3DGlTfLoader", function() {
  var myPlot3DGlTfLoader

  beforeEach(function() {
    myPlot3DGlTfLoader = new Plot3DGlTfLoader()
  })

  it("has the parent class Plot3DLoader", function() {
    expect(myPlot3DGlTfLoader.__proto__.__proto__.constructor.name).toEqual('Plot3DLoader')
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
      let url = './spec/assets/mesh3d/cube.gltf'
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
      let url = './spec/assets/mesh3d/cube.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      expect(myPlot3DGlTfLoader.gltfRequester.open).toHaveBeenCalledWith('GET', url, true)
      expect(myPlot3DGlTfLoader.gltfRequester.send).toHaveBeenCalledWith(null)
    })
  })

  it("should have a method, that extracts the mesh data from the gltf json", function() {
    expect(typeof myPlot3DGlTfLoader.extractDataFromGltfJson).toBe('function')
  })

  describe("extractDataFromGltfJson", function() {
    it("should log an error when the gltf object is not version 2", function(done) {
      spyOn(console, 'error')
      let url = './spec/assets/mesh3d/cubeWrongVersion.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      setTimeout(() => {
        expect(console.error).toHaveBeenCalledWith('check your gltf file, version must be 2.0')
        done()
      }, 300)
    })

    it("should extract the raw data from the base64 string", function(done) {
      spyOn(window, 'atob').and.callThrough()
      let url = './spec/assets/mesh3d/cube.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      setTimeout(() => {
        expect(atob).toHaveBeenCalled()
        done()
      }, 300)
    })
  })

})