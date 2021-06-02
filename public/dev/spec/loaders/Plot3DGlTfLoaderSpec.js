describe("Plot3DGlTfLoader", function() {
  var myPlot3DGlTfLoader

  beforeEach(function() {
    myPlot3DGlTfLoader = new Plot3DGlTfLoader()
  })

  it("has the parent class Plot3DLoader", function() {
    expect(myPlot3DGlTfLoader.__proto__.__proto__.constructor.name).toEqual('Plot3DLoader')
  })

  it("should have a xmlhttprequester for json files", function() {
    expect(myPlot3DGlTfLoader.gltfRequester.constructor.name).toEqual("XMLHttpRequest")
  })

  it("should have a method for loading gltf files with embedded buffer data", function() {
    expect(typeof myPlot3DGlTfLoader.requestGlTf).toBe('function')
  })

  describe("requestGlTf", function() {
    it("should call open with the url given in parameter 1", function() {
      spyOn(myPlot3DGlTfLoader.gltfRequester, 'open').and.callThrough()
      let url = './assets/mesh3d/cube.gltf'
      myPlot3DGlTfLoader.requestGlTf(url)
      expect(myPlot3DGlTfLoader.gltfRequester.open).toHaveBeenCalledWith('GET', url, false)
    })
  })

})