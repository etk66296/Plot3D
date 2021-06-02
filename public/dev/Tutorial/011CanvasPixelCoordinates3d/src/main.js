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
    return
  }

  glCntxt.enable(glCntxt.CULL_FACE)
  // glCntxt.enable(glCntxt.DEPTH_TEST)

  let myBackground = new Background(glCntxt)

  let shaderFactory = new ShaderFactory(glCntxt)
  let myPrimitves3dFactory = new Primitves3dFactory(glCntxt, shaderFactory)

  // let myLineStrip3d = myPrimitves3dFactory.createLineStrip3d()
  let myTriangles3d = myPrimitves3dFactory.createTriangles3d(
    [0.0, 1.0, 0.0, 1.0],
    [
      // left column front
      0,   0,  0,
      0, 150,  0,
      30,   0,  0,
      0, 150,  0,
      30, 150,  0,
      30,   0,  0,

      // top rung front
      30,   0,  0,
      30,  30,  0,
      100,   0,  0,
      30,  30,  0,
      100,  30,  0,
      100,   0,  0,

      // middle rung front
      30,  60,  0,
      30,  90,  0,
      67,  60,  0,
      30,  90,  0,
      67,  90,  0,
      67,  60,  0,

      // left column back
      0,   0,  30,
      30,   0,  30,
      0, 150,  30,
      0, 150,  30,
      30,   0,  30,
      30, 150,  30,

      // top rung back
      30,   0,  30,
      100,   0,  30,
      30,  30,  30,
      30,  30,  30,
      100,   0,  30,
      100,  30,  30,

      // middle rung back
      30,  60,  30,
      67,  60,  30,
      30,  90,  30,
      30,  90,  30,
      67,  60,  30,
      67,  90,  30,

      // top
      0,   0,   0,
      100,   0,   0,
      100,   0,  30,
      0,   0,   0,
      100,   0,  30,
      0,   0,  30,

      // top rung right
      100,   0,   0,
      100,  30,   0,
      100,  30,  30,
      100,   0,   0,
      100,  30,  30,
      100,   0,  30,

      // under top rung
      30,   30,   0,
      30,   30,  30,
      100,  30,  30,
      30,   30,   0,
      100,  30,  30,
      100,  30,   0,

      // between top rung and middle
      30,   30,   0,
      30,   60,  30,
      30,   30,  30,
      30,   30,   0,
      30,   60,   0,
      30,   60,  30,

      // top of middle rung
      30,   60,   0,
      67,   60,  30,
      30,   60,  30,
      30,   60,   0,
      67,   60,   0,
      67,   60,  30,

      // right of middle rung
      67,   60,   0,
      67,   90,  30,
      67,   60,  30,
      67,   60,   0,
      67,   90,   0,
      67,   90,  30,

      // bottom of middle rung.
      30,   90,   0,
      30,   90,  30,
      67,   90,  30,
      30,   90,   0,
      67,   90,  30,
      67,   90,   0,

      // right of bottom
      30,   90,   0,
      30,  150,  30,
      30,   90,  30,
      30,   90,   0,
      30,  150,   0,
      30,  150,  30,

      // bottom
      0,   150,   0,
      0,   150,  30,
      30,  150,  30,
      0,   150,   0,
      30,  150,  30,
      30,  150,   0,

      // left side
      0,   0,   0,
      0,   0,  30,
      0, 150,  30,
      0,   0,   0,
      0, 150,  30,
      0, 150,   0
    ]
  )

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
  cycle.add(myBackground)
  // cycle.add(myLineStrip3d)
  cycle.add(myTriangles3d)
  // cycle.add(myLines2d)
  // cycle.add(myLineLoop2d)
  // cycle.add(myLineStrip2d)
  // cycle.add(myTriangles2d)
  // cycle.add(myTrianglesLoop2d)
  // cycle.add(myTrianglesStrip2d)
  
  
  glCntxt.viewport(0, 0, glCntxt.canvas.clientWidth, glCntxt.canvas.clientHeight)
  glCntxt.clearColor(1.0, 1.0, 1.0, 1.0)
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
  
  
}