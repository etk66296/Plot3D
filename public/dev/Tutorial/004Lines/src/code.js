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
  const vertexShaderCode = `
    attribute vec4 a_position;
    uniform vec4 u_color;
    varying vec4 v_color;

    void main() {
      gl_Position = a_position;
      v_color = u_color;
    }
  `
  const fragmentShaderCode = `
    precision mediump float;

    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
  `
  const attributeList = ['a_position']
  const uniformList = ['u_color']
  let my2DShader = shaderFactory.create(vertexShaderCode, fragmentShaderCode, attributeList, uniformList)

  let cycle = new Cylce()
  // let mesh = new LineStrip2D(glCntxt, my2DShader, 'u_color', 'a_position', [ 0.0, 1.0, 0.0, 1.0 ])
  // let myVertexGroup2D = new VertexGroup2D(glCntxt, my2DShader, 'u_color', 'a_position', [ 0.9, 0.2, 0.1, 0.1 ])
  // let myLines2D = new Lines2D(glCntxt, my2DShader, 'u_color', 'a_position', [ 0.0, 0.0, 0.4, 0.8 ])
  // let myLineStrip2D = new LineStrip2D(glCntxt, my2DShader, 'u_color', 'a_position', [ 0.0, 0.8, 0.0, 0.9 ])
  let myLineLoop2D = new LineLoop2D(glCntxt, my2DShader, 'u_color', 'a_position', [ 0.0, 0.0, 0.5, 0.9 ])
  // cycle.add(myVertexGroup2D)
  // cycle.add(myLines2D)
  // cycle.add(myLineStrip2D)
  cycle.add(myLineLoop2D)

  
 
  glCntxt.viewport(0, 0, glCntxt.canvas.width, glCntxt.canvas.height)
  glCntxt.clearColor(0, 0, 0, 1.0)
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
  
  
}