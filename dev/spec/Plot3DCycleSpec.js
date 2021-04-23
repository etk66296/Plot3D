describe("Cycle", function() {
  var myCycle

  beforeEach(function() {
    myCycle = new Cycle(true)
  })

  it("has the parent class Plot3DObject", function() {
    expect(myCycle.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })
  it("has an boolean attribute isCycling", function() {
    expect(typeof myCycle.isCycling).toBe("boolean")
  })
  it("has an numeric attribute tickCount", function() {
    expect(typeof myCycle.tickCount).toBe("number")
  })
  it("has a constructor which takes the the boolean parameter cycleInstantly", function() {
    var theConstructor = {
      call: function(param1) {
        return new Cycle(param1)
      }
    }
    var cSpy = spyOn(theConstructor, 'call')
    theConstructor.call(true)
    expect(cSpy).toHaveBeenCalledWith(true)
  })

  it("should provide a method tick", function() {
    expect(typeof myCycle.tick).toBe("function")
  })
  it("should provide a method update", function() {
    expect(typeof myCycle.update).toBe("function")
  })

  describe("tick", function() {
    it("should have been called several times", function() {
      
    })
  })
})