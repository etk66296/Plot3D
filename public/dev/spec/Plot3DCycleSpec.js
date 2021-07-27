describe("Cycle", function() {
  var myCycle

  beforeAll(function() {
    myCycle = new Cycle(true)
  })

  afterAll(function() {
    myCycle.stop()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myCycle.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("has an boolean attribute isCycling", function() {
    expect(typeof myCycle.isCycling).toBe('boolean')
  })

  it("has an numeric attribute tickCount", function() {
    expect(typeof myCycle.tickCount).toBe('number')
  })

  it("has an attribute for storing the updatelist of userio objects", function() {
    expect(myCycle.userIoObjectList.constructor.name).toEqual('Array')
  })

  it("has an attribute renderObjectList of type array", function() {
    expect(myCycle.renderObjectList.constructor.name).toEqual('Array')
  })

  it("has a method for adding updateable and drawable objects to the render list", function() {
    expect(typeof myCycle.addRenderable).toEqual('function')
  })

  describe("addRenderable", function() {
    it("should add a renderable object to the render list", function() {
      spyOn(myCycle.renderObjectList, 'push')
      myCycle.addRenderable(null)
      expect(myCycle.renderObjectList.push).toHaveBeenCalled()
    })
  })

  it("has a method for adding user io objects to the corresponding list", function() {
    expect(typeof myCycle.addUserIo).toBe('function')
  })

  describe("addUserIo", function() {
    it("should add a userio object to the update list", function() {
      spyOn(myCycle.userIoObjectList, 'push')
      myCycle.addUserIo(null)
      expect(myCycle.userIoObjectList.push).toHaveBeenCalled()
    })
  })

  it("has a method for stop the recursion", function() {
    expect(typeof myCycle.stop).toEqual('function')
  })

  describe("stop", function() {
    it("should set the tick count to zero", function() {
      myCycle.stop()
      expect(myCycle.tickCount).toEqual(0)
    })

    it("should stop the recursion by setting isCycling to false", function() {
      myCycle.stop()
      expect(myCycle.isCycling).toEqual(false)
    })

    it("should make the recusion undefined", function() {
      myCycle.stop()
      expect(myCycle.tickRunner).toEqual(null)
    })
  })

  it("has a method for pause the recursion", function() {
    expect(typeof myCycle.pause).toEqual('function')
  })

  describe("pause", function() {
    it("should pause the recursion by setting isCycling to false", function() {
      myCycle.pause()
      expect(myCycle.isCycling).toEqual(false)
    })
  })

  it("has a method for run the recursion", function() {
    expect(typeof myCycle.play).toEqual('function')
  })

  describe("play", function() {
    it("should pause the recursion by setting isCycling to false", function() {
      myCycle.stop()
      myCycle.play()
      expect(myCycle.isCycling).toEqual(true)
    })
  })
  
})