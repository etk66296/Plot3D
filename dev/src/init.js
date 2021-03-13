function main() {
  const canvas = document.querySelector("#glCanvas")
  const glCntxt = canvas.getContext("webgl")
  if (!glCntxt) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.")
    return;
  }

  let matrixFactory = new MatrixFactory(glCntxt)
  let shaderFactory = new ShaderFactory(glCntxt)
  let myDrawableA = new Drawable(glCntxt, shaderFactory, matrixFactory)
  let myDrawableB = new Drawable(glCntxt, shaderFactory, matrixFactory)
  myDrawableB.setVertices([
    -3.0,  -1.0,
    -1.0,  -1.0,
    -3.0, -3.0,
    -1.0, -3.0
  ])
  let myRenderDevice = new RenderDevice(glCntxt, [myDrawableA, myDrawableB])

  glCntxt.clearColor(0.0, 0.0, 0.0, 1.0)
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
}