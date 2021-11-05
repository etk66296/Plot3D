
const clearRenderSurface = function(glCntxt, color = [ 0.0, 0.0, 0.0, 1.0 ]) {
  glCntxt.viewport(0, 0, glCntxt.canvas.width, glCntxt.canvas.height)
  glCntxt.clearColor(color[0], color[1], color[2], color[3])
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT | glCntxt.DEPTH_BUFFER_BIT)
}

const vertexShaderCode = `
  attribute vec3 a_position;
  attribute vec3 a_normal;
  attribute vec4 a_color;

  uniform mat4 u_modelMatrix;
  uniform mat4 u_modelToWorldMatrix;
  uniform mat4 u_ViewToProjectionMatrix;
  uniform mat4 u_worldToViewMatrix;
        
  varying lowp vec4 v_color;

  void main(void) {
    gl_Position = u_ViewToProjectionMatrix * u_worldToViewMatrix * u_modelToWorldMatrix * u_modelMatrix * vec4(a_position, 1.0);
    v_color = a_color;
  }
`

const fragmentShaderCode = `
  precision mediump float;

  varying lowp vec4 v_color;

  void main(void) {
    gl_FragColor = v_color;
  }
`

window.addEventListener("load", () => {
  let rednerCanvas = document.getElementById("renderCanvas")
  let glCntxt = rednerCanvas.getContext("webgl2")
  clearRenderSurface(glCntxt)

  let shaderBuilder = new Plot3DShaderBuilder(glCntxt)

  let shader = shaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
  
})