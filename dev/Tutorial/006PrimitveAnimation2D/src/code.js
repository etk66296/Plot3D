function main() {
  const playButton = document.getElementById("playButton")
  const stopButton = document.getElementById("stopButton")
  const pauseButton = document.getElementById("pauseButton")
  playButton.onclick = () => { cycle.play() }
  stopButton.onclick = () => { cycle.stop() }
  pauseButton.onclick = () => { cycle.pause() }
  const canvas = document.querySelector("#glCanvas")
  const glCntxt = canvas.getContext("webgl")
  if (!glCntxt) {
    alert("Unable to initialize WebglCntxt. Your browser or machine may not support it.")
    return;
  }

  let shaderFactory = new ShaderFactory(glCntxt)
  let myPrimitves2DFactory = new Primitves2DFactory(glCntxt, shaderFactory)

  let myLines2D = myPrimitves2DFactory.createLines2D([ 0.0,0.0,-1.0,1.0 ], [ 1.0, 0.0, 0.0, 1.0 ])
  let myLineLoop2D = myPrimitves2DFactory.createLineLoop2D([ 0.0,0.0,1.0,1.0 ], [ 0.0, 1.0, 0.0, 1.0 ])
  let myLineStrip2D = myPrimitves2DFactory.createLineStrip2D([ 0.0,0.0,1.0,-1.0 ], [ 0.0, 0.0, 1.0, 1.0 ])
  

  let cycle = new Cylce()
  cycle.add(myLines2D)
  cycle.add(myLineLoop2D)
  cycle.add(myLineStrip2D)
  
  
  glCntxt.viewport(0, 0, glCntxt.canvas.width, glCntxt.canvas.height)
  glCntxt.clearColor(0, 0, 0, 1.0)
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
  
  
}