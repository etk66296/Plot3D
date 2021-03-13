describe("PlotterObj", function() {
  var myPlotterObj = new PlotterObj()

  it("must have a string name attribute", () => {
    expect(myPlotterObj.name).toBeInstanceOf(String);
  })
  
})
