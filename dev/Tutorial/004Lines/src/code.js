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
  let my2DShader = shaderFactory.create()

  let cycle = new Cylce()
  let mesh = new Lines2D(glCntxt, my2DShader, 'a_position')
  cycle.add(mesh)

  
 
  glCntxt.viewport(0, 0, glCntxt.canvas.width, glCntxt.canvas.height)
  glCntxt.clearColor(0, 0, 0, 1.0)
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
  
  
}