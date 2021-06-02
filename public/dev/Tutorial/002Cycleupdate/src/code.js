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
  let myShader = shaderFactory.create()

  let cycle = new Cylce()

  
  
  
  
  
  
  
  


  // var positionBuffer = glCntxt.createBuffer()
  // glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, positionBuffer)
  // var positions = [ 0, 0, 0, 0.5, 0.7, 0]
  // glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(positions), glCntxt.STATIC_DRAW)
 
  // glCntxt.viewport(0, 0, glCntxt.canvas.width, glCntxt.canvas.height)
  // glCntxt.clearColor(0, 0, 0, 1.0)
  // glCntxt.clear(glCntxt.COLOR_BUFFER_BIT)
  // glCntxt.useProgram(myShader.program)
  // glCntxt.enableVertexAttribArray(myShader.attributes['a_position'])
  // glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, positionBuffer)
  // var size = 2
  // var type = glCntxt.FLOAT
  // var normalize = false
  // var stride = 0
  // var offset = 0
  // glCntxt.vertexAttribPointer(myShader.attributes['a_position'], size, type, normalize, stride, offset)
  // var primitiveType = glCntxt.TRIANGLES
  // var offset = 0
  // var count = 3
  // glCntxt.drawArrays(primitiveType, offset, count)
}