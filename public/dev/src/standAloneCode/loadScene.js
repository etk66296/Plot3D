
const clearRenderSurface = function(glCntxt, color = [ 0.0, 0.0, 0.0, 1.0 ]) {
  glCntxt.viewport(0, 0, glCntxt.canvas.width, glCntxt.canvas.height)
  glCntxt.clearColor(color[0], color[1], color[2], color[3])
  glCntxt.clear(glCntxt.COLOR_BUFFER_BIT | glCntxt.DEPTH_BUFFER_BIT)
}

const vertexShaderCodeA = `
  attribute vec3 a_position;
  attribute vec3 a_normal;
  attribute vec4 a_color;

  uniform mat4 u_modelToProjectionMatrix;
        
  varying lowp vec4 v_color;

  void main(void) {
    gl_Position = u_modelToProjectionMatrix * vec4(a_position, 1.0);
    v_color = a_color;
  }
`

const fragmentShaderCodeA = `
  precision mediump float;

  varying lowp vec4 v_color;

  void main(void) {
    gl_FragColor = v_color;
  }
`

const vertexShaderCodeB = `
  attribute vec3 a_position;
  attribute vec3 a_normal;
  attribute vec4 a_color;

  uniform mat4 u_modelToProjectionMatrix;
        
  varying highp vec4 v_color;

  void main(void) {
    gl_Position = u_modelToProjectionMatrix * vec4(a_position, 1.0);
    v_color = a_color * 0.9;
  }
`

const fragmentShaderCodeB = `
  precision highp float;

  const float Pi = 6.28318530718;

  const float Directions = 16.0;
  const float Quality = 3.0;
  const float Size = 8.0;
  vec2 Resolution = vec2(800, 450);

  const float PiDirRatio = Pi / Directions;

  vec2 Radius = Size / Resolution.xy;

  varying highp vec4 v_color;

  void main() {

    vec4 color = v_color;

    vec2 uv = gl_FragCoord.xy / Resolution.xy;

    for( float d = 0.0; d < Pi; d += PiDirRatio) {
      for(float i = 1.0 / Quality; i <= 1.0; i += 1.0 / Quality) {
        color += vec4(uv + vec2(cos(d), sin(d)) * Radius * i, color.z, 0.5);
      }
    }
    color /= Quality * Directions - 15.0;
    gl_FragColor = color;
  }
`

class Matrix4x4 {
  constructor(cells = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]) {
    this.cells = cells
  }

  reset() {
    this.cells = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }

  multiplyMatrix4x4ToInstance(multiplier) {
    let a00 = this.cells[0],  a01 = this.cells[1],  a02 = this.cells[2],  a03 = this.cells[3]
    let a10 = this.cells[4],  a11 = this.cells[5],  a12 = this.cells[6],  a13 = this.cells[7]
    let a20 = this.cells[8],  a21 = this.cells[9],  a22 = this.cells[10], a23 = this.cells[11]
    let a30 = this.cells[12], a31 = this.cells[13], a32 = this.cells[14], a33 = this.cells[15]

    let b0 = multiplier.cells[0]
    let b1 = multiplier.cells[1]
    let b2 = multiplier.cells[2]
    let b3 = multiplier.cells[3]

    this.cells[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = multiplier.cells[4]
    b1 = multiplier.cells[5]
    b2 = multiplier.cells[6]
    b3 = multiplier.cells[7]

    this.cells[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
    
    b0 = multiplier.cells[8]
    b1 = multiplier.cells[9]
    b2 = multiplier.cells[10]
    b3 = multiplier.cells[11]

    this.cells[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = multiplier.cells[12]
    b1 = multiplier.cells[13]
    b2 = multiplier.cells[14]
    b3 = multiplier.cells[15]

    this.cells[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.cells[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.cells[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.cells[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    return this
  }

  multiplyMatrix4x4(multiplier) {
    return new Matrix4x4([
      this.cells[0] * multiplier.cells[0] + this.cells[1] * multiplier.cells[4] + this.cells[2] * multiplier.cells[8] + this.cells[3] *  multiplier.cells[12],
      this.cells[0] * multiplier.cells[1] + this.cells[1] * multiplier.cells[5] + this.cells[2] * multiplier.cells[9] + this.cells[3] *  multiplier.cells[13],
      this.cells[0] * multiplier.cells[2] + this.cells[1] * multiplier.cells[6] + this.cells[2] * multiplier.cells[10] + this.cells[3] *  multiplier.cells[14],
      this.cells[0] * multiplier.cells[3] + this.cells[1] * multiplier.cells[7] + this.cells[2] * multiplier.cells[11] + this.cells[3] *  multiplier.cells[15],
      this.cells[4] * multiplier.cells[0] + this.cells[5] * multiplier.cells[4] + this.cells[6] * multiplier.cells[8] +  this.cells[7] *  multiplier.cells[12],
      this.cells[4] * multiplier.cells[1] + this.cells[5] * multiplier.cells[5] + this.cells[6] * multiplier.cells[9] +  this.cells[7] *  multiplier.cells[13],
      this.cells[4] * multiplier.cells[2] + this.cells[5] * multiplier.cells[6] + this.cells[6] * multiplier.cells[10] + this.cells[7] *  multiplier.cells[14],
      this.cells[4] * multiplier.cells[3] + this.cells[5] * multiplier.cells[7] + this.cells[6] * multiplier.cells[11] + this.cells[7] *  multiplier.cells[15],
      this.cells[8] * multiplier.cells[0] + this.cells[9] * multiplier.cells[4] + this.cells[10] * multiplier.cells[8] +  this.cells[11] *  multiplier.cells[12],
      this.cells[8] * multiplier.cells[1] + this.cells[9] * multiplier.cells[5] + this.cells[10] * multiplier.cells[9] +  this.cells[11] *  multiplier.cells[13],
      this.cells[8] * multiplier.cells[2] + this.cells[9] * multiplier.cells[6] + this.cells[10] * multiplier.cells[10] + this.cells[11] *  multiplier.cells[14],
      this.cells[8] * multiplier.cells[3] + this.cells[9] * multiplier.cells[7] + this.cells[10] * multiplier.cells[11] + this.cells[11] *  multiplier.cells[15],
      this.cells[12] * multiplier.cells[0] + this.cells[13] * multiplier.cells[4] + this.cells[14] * multiplier.cells[8] +  this.cells[15] *  multiplier.cells[12],
      this.cells[12] * multiplier.cells[1] + this.cells[13] * multiplier.cells[5] + this.cells[14] * multiplier.cells[9] +  this.cells[15] *  multiplier.cells[13],
      this.cells[12] * multiplier.cells[2] + this.cells[13] * multiplier.cells[6] + this.cells[14] * multiplier.cells[10] + this.cells[15] *  multiplier.cells[14],
      this.cells[12] * multiplier.cells[3] + this.cells[13] * multiplier.cells[7] + this.cells[14] * multiplier.cells[11] + this.cells[15] *  multiplier.cells[15]
    ])
  }
  
}


window.addEventListener("load", () => {
  let rednerCanvas = document.getElementById("renderCanvas")
  let glCntxt = rednerCanvas.getContext("webgl2")
  glCntxt.disable(glCntxt.DEPTH_TEST)
  clearRenderSurface(glCntxt)

  let shaderBuilder = new Plot3DShaderBuilder(glCntxt)

  let shaderA = shaderBuilder.buildShader(vertexShaderCodeA, fragmentShaderCodeA)
  let shaderB = shaderBuilder.buildShader(vertexShaderCodeB, fragmentShaderCodeB)

  let modelMatrixA = new Matrix4x4()
  let modelMatrixB = new Matrix4x4()

  // /*
  // ┌─────────────┬─────────────┐
  // │ (-0.5, 0.5) │ (0.5, 0.5)  │
  // │      *------│------*      │
  // │       \     │     /       │
  // ├─────────\───┼───/─────────┤
  // │           \ │ /           │
  // │             *             │
  // │        (0.0, -0.5)        │
  // └─────────────┴─────────────┘
  // */
  vertices = [
    -0.5, 0.5, 1.0,
    0.5, 0.5, 1.0,
    0.0, -0.5, 1.0
  ]

  normals = [
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0
  ]

  colors = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
  ]


  let glVerticesBuffersA = glCntxt.createBuffer()
  glCntxt.bindBuffer(
    glCntxt.ARRAY_BUFFER,
    glVerticesBuffersA
  )
  glCntxt.bufferData(
    glCntxt.ARRAY_BUFFER,
    new Float32Array(vertices),
    glCntxt.STATIC_DRAW
  )

  let glNormalsBufferA = glCntxt.createBuffer()
  glCntxt.bindBuffer(
    glCntxt.ARRAY_BUFFER,
    glNormalsBufferA
  )
  glCntxt.bufferData(
    glCntxt.ARRAY_BUFFER,
    new Float32Array(normals),
    glCntxt.STATIC_DRAW
  )

  let glColorsBufferA = glCntxt.createBuffer()
  glCntxt.bindBuffer(
    glCntxt.ARRAY_BUFFER,
    glColorsBufferA
  )
  glCntxt.bufferData(
    glCntxt.ARRAY_BUFFER,
    new Float32Array(colors),
    glCntxt.STATIC_DRAW
  )

  let xDir = 1

  let draw =function() {


    clearRenderSurface(glCntxt)

    glCntxt.useProgram(shaderA.program)
    
    glCntxt.uniformMatrix4fv(shaderA.glVertexUniformLocation['u_modelToProjectionMatrix'], false, modelMatrixA.cells)

    glCntxt.enableVertexAttribArray(shaderA.glAttrLocation['a_position'])
    glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, glVerticesBuffersA)
    glCntxt.vertexAttribPointer(
      shaderA.glAttrLocation['a_position'],
      3,
      glCntxt.FLOAT,
      false,
      0,
      0
    )
          
    glCntxt.enableVertexAttribArray(shaderA.glAttrLocation['a_normal'])
    glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, glNormalsBufferA)
    glCntxt.vertexAttribPointer(
      shaderA.glAttrLocation['a_normal'],
      3,
      glCntxt.FLOAT,
      false,
      0,
      0
    )
  
    glCntxt.enableVertexAttribArray(shaderA.glAttrLocation['a_color'])
    glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, glColorsBufferA)
    glCntxt.vertexAttribPointer(
      shaderA.glAttrLocation['a_color'],
      4,
      glCntxt.FLOAT,
      false,
      0,
      0
    )
  
    glCntxt.drawArrays(glCntxt.TRIANGLES, 0, 3)
  
  
  
    glCntxt.useProgram(shaderB.program)
  
  
    modelMatrixB.cells[12] -= (0.01 * xDir)
    if (modelMatrixB.cells[12] < -1) {
      modelMatrixB.cells[12] = -1
      xDir *= -1
    }
    if (modelMatrixB.cells[12] > 1) {
      modelMatrixB.cells[12] = 1
      xDir *= -1
    }

  
    glCntxt.uniformMatrix4fv(shaderB.glVertexUniformLocation['u_modelToProjectionMatrix'], false, modelMatrixB.cells)
  
  
    glCntxt.enableVertexAttribArray(shaderB.glAttrLocation['a_position'])
    glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, glVerticesBuffersA)
    glCntxt.vertexAttribPointer(
      shaderB.glAttrLocation['a_position'],
      3,
      glCntxt.FLOAT,
      false,
      0,
      0
    )
          
    glCntxt.enableVertexAttribArray(shaderB.glAttrLocation['a_normal'])
    glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, glNormalsBufferA)
    glCntxt.vertexAttribPointer(
      shaderB.glAttrLocation['a_normal'],
      3,
      glCntxt.FLOAT,
      false,
      0,
      0
    )
  
    glCntxt.enableVertexAttribArray(shaderB.glAttrLocation['a_color'])
    glCntxt.bindBuffer(glCntxt.ARRAY_BUFFER, glColorsBufferA)
    glCntxt.vertexAttribPointer(
      shaderB.glAttrLocation['a_color'],
      4,
      glCntxt.FLOAT,
      false,
      0,
      0
    )
  
    // glCntxt.drawArrays(glCntxt.LINE_LOOP, 0, 3)
    glCntxt.drawArrays(glCntxt.TRIANGLES, 0, 3)
  }

  setInterval(draw, 60)

  
})

// buffer types
// https://www.khronos.org/opengl/wiki/Buffer_Object#General_use