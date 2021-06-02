function main() {
  const playButton = document.getElementById("playButton")
  const stopButton = document.getElementById("stopButton")
  const pauseButton = document.getElementById("pauseButton")
  let cameraTargetXSlider = document.getElementById("cameraTargetXSlider")
  let cameraTargetXValue = document.getElementById("cameraTargetXValue")
  let cameraTargetYSlider = document.getElementById("cameraTargetYSlider")
  let cameraTargetYValue = document.getElementById("cameraTargetYValue")
  let cameraTargetZSlider = document.getElementById("cameraTargetZSlider")
  let cameraTargetZValue = document.getElementById("cameraTargetZValue")

  let cameraPositionXSlider = document.getElementById("cameraPositionXSlider")
  let cameraPositionXValue = document.getElementById("cameraPositionXValue")
  let cameraPositionYSlider = document.getElementById("cameraPositionYSlider")
  let cameraPositionYValue = document.getElementById("cameraPositionYValue")
  let cameraPositionZSlider = document.getElementById("cameraPositionZSlider")
  let cameraPositionZValue = document.getElementById("cameraPositionZValue")

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
  glCntxt.enable(glCntxt.DEPTH_TEST)

  let myBackground = new Background(glCntxt)
  let myMatrixMath = new MatrixMath4x4()
  let myVectorMath = new VectorMath3x1()

  myCamera = new Camera(glCntxt, myMatrixMath, myVectorMath)

  cameraTargetXSlider.oninput = function() {
    cameraTargetXValue.innerHTML = cameraTargetXSlider.value
    myCamera.target.x = cameraTargetXSlider.value
  }
  cameraTargetYSlider.oninput = function() {
    cameraTargetYValue.innerHTML = cameraTargetYSlider.value
    myCamera.target.y = cameraTargetYSlider.value
  }
  cameraTargetZSlider.oninput = function() {
    cameraTargetZValue.innerHTML = cameraTargetZSlider.value
    myCamera.target.z = cameraTargetZSlider.value
  }

  cameraPositionXSlider.oninput = function() {
    cameraPositionXValue.innerHTML = cameraPositionXSlider.value
    myCamera.position.x = cameraPositionXSlider.value
  }
  cameraPositionYSlider.oninput = function() {
    cameraPositionYValue.innerHTML = cameraPositionYSlider.value
    myCamera.position.y = cameraPositionYSlider.value
  }
  cameraPositionZSlider.oninput = function() {
    cameraPositionZValue.innerHTML = cameraPositionZSlider.value
    myCamera.position.z = cameraPositionZSlider.value
  }

  let shaderFactory = new ShaderFactory(glCntxt)
  let myPrimitves3dFactory = new Primitves3dFactory(glCntxt, shaderFactory, myCamera)

  

  // let myLineStrip3d = myPrimitves3dFactory.createLineStrip3d()
  let myTriangles3d = []
  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.3, 1.0, 0.0, 1.0], [
      // left column front
      0,   0,  0,
      0, 150,  0,
      30,   0,  0,
      0, 150,  0,
      30, 150,  0,
      30,   0,  0
    ], [
      // left column front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.6, 1.0, 0.0, 1.0], [
      // top rung front
      30,   0,  0,
      30,  30,  0,
      100,   0,  0,
      30,  30,  0,
      100,  30,  0,
      100,   0,  0
    ], [
      // top rung front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.9, 1.0, 0.0, 1.0], [
      // middle rung front
      30,  60,  0,
      30,  90,  0,
      67,  60,  0,
      30,  90,  0,
      67,  90,  0,
      67,  60,  0
    ], [
      // middle rung front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.0, 1.0, 0.3, 1.0], [
      // left column back
      0,   0,  30,
      30,   0,  30,
      0, 150,  30,
      0, 150,  30,
      30,   0,  30,
      30, 150,  30
    ], [
      // left column back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.0, 1.0, 0.6, 1.0], [
      // top rung back
      30,   0,  30,
      100,   0,  30,
      30,  30,  30,
      30,  30,  30,
      100,   0,  30,
      100,  30,  30
  ], [
      // top rung back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.0, 1.0, 0.9, 1.0], [
      // middle rung back
      30,  60,  30,
      67,  60,  30,
      30,  90,  30,
      30,  90,  30,
      67,  60,  30,
      67,  90,  30
    ], [
      // middle rung back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.0, 0.0, 1.0, 1.0], [
      // top
      0,   0,   0,
      100,   0,   0,
      100,   0,  30,
      0,   0,   0,
      100,   0,  30,
      0,   0,  30
    ], [
      // top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0
  ]))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.0, 0.3, 1.0, 1.0], [
      // top rung right
      100,   0,   0,
      100,  30,   0,
      100,  30,  30,
      100,   0,   0,
      100,  30,  30,
      100,   0,  30
    ], [
      // top rung right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.0, 0.6, 1.0, 1.0], [
      // under top rung
      30,   30,   0,
      30,   30,  30,
      100,  30,  30,
      30,   30,   0,
      100,  30,  30,
      100,  30,   0
    ], [
      // under top rung
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [0.0, 0.9, 1.0, 1.0], [
      // between top rung and middle
      30,   30,   0,
      30,   60,  30,
      30,   30,  30,
      30,   30,   0,
      30,   60,   0,
      30,   60,  30
    ], [
      // between top rung and middle
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [1.0, 0.0, 0.0, 1.0], [
      // top of middle rung
      30,   60,   0,
      67,   60,  30,
      30,   60,  30,
      30,   60,   0,
      67,   60,   0,
      67,   60,  30
    ], [
      // top of middle rung
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [1.0, 0.3, 0.0, 1.0], [
      // right of middle rung
      67,   60,   0,
      67,   90,  30,
      67,   60,  30,
      67,   60,   0,
      67,   90,   0,
      67,   90,  30
    ], [
      // right of middle rung
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [1.0, 0.6, 0.0, 1.0], [
      // bottom of middle rung.
      30,   90,   0,
      30,   90,  30,
      67,   90,  30,
      30,   90,   0,
      67,   90,  30,
      67,   90,   0
    ], [
      // bottom of middle rung.
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [1.0, 0.9, 0.0, 1.0], [
      // right of bottom
      30,   90,   0,
      30,  150,  30,
      30,   90,  30,
      30,   90,   0,
      30,  150,   0,
      30,  150,  30
    ], [
      // right of bottom
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [1.0, 0.0, 1.0, 1.0], [
      // bottom
      0,   150,   0,
      0,   150,  30,
      30,  150,  30,
      0,   150,   0,
      30,  150,  30,
      30,  150,   0
    ], [
      // bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
    ]
  ))

  myTriangles3d.push(myPrimitves3dFactory.createTriangles3d(
    [1.0, 0.3, 1.0, 1.0], [
      // left side
      0,   0,   0,
      0,   0,  30,
      0, 150,  30,
      0,   0,   0,
      0, 150,  30,
      0, 150,   0
    ], [
      // left side
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0
    ]
  ))

  let cycle = new Cylce()
  cycle.add(myCamera)
  cycle.add(myBackground)
  myTriangles3d.forEach((faces) => {
    cycle.add(faces)
  })
  
  
  glCntxt.viewport(0, 0, glCntxt.canvas.clientWidth, glCntxt.canvas.clientHeight)
  glCntxt.clearColor(1.0, 1.0, 1.0, 1.0)
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
  
  
}