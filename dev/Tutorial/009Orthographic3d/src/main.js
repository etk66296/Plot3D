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
  let myPrimitves2dFactory = new Primitves2dFactory(glCntxt, shaderFactory)
  let myPrimitves3dFactory = new Primitves3dFactory(glCntxt, shaderFactory)

  let myLines3d = myPrimitves3dFactory.createLines3d()

  // let myLines2d = myPrimitves2dFactory.createLines2d([ 1.0, 0.0, 0.0, 1.0 ], [ 0.0,0.0,-1.0,1.0 ])
  // let myLineLoop2d = myPrimitves2dFactory.createLineLoop2d([ 0.0, 1.0, 0.0, 1.0 ], [ 0.0,0.0,1.0,1.0 ])
  // let myLineStrip2d = myPrimitves2dFactory.createLineStrip2d([ 0.0, 0.0, 1.0, 1.0 ], [ 0.0,0.0,1.0,-1.0 ])  
  // myLines2d.update = () => {
  //   myLines2d.setAngle(myLines2d.angle + 0.01)
  // }

  // let myTriangles2d = myPrimitves2dFactory.createTriangles2d([ 1.0, 0.0, 0.0, 1.0 ])
  // let myTrianglesLoop2d = myPrimitves2dFactory.createTrianglesLoop2d([ 0.0, 1.0, 0.0, 1.0 ])
  // let myTrianglesStrip2d = myPrimitves2dFactory.createTrianglesStrip2d([ 0.0, 0.0, 1.0, 1.0 ])
  // myTriangles2d.update = () => {
  //   myTriangles2d.setAngle(myTriangles2d.angle + 0.01)
  // }
  // myTrianglesLoop2d.update = () => {
  //   myTrianglesLoop2d.setAngle(myTrianglesLoop2d.angle + 0.02)
  // }
  // myTrianglesStrip2d.update = () => {
  //   myTrianglesStrip2d.setAngle(myTrianglesStrip2d.angle + 0.03)
  // }

  let cycle = new Cylce()
  cycle.add(myLines3d)
  // cycle.add(myLines2d)
  // cycle.add(myLineLoop2d)
  // cycle.add(myLineStrip2d)
  // cycle.add(myTriangles2d)
  // cycle.add(myTrianglesLoop2d)
  // cycle.add(myTrianglesStrip2d)
  
  
  glCntxt.viewport(0, 0, glCntxt.canvas.width, glCntxt.canvas.height)
  glCntxt.clearColor(0, 0, 0, 1.0)
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
  
  
}