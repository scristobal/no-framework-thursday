const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl2");

if (!gl) alert("WebGL2 not supported in this browser");

const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`;
const fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Just set the output to a constant redish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	console.error(gl.getShaderInfoLog(vertexShader));
	gl.deleteShader(vertexShader);
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(fragmentShader, vertexShaderSource);
gl.compileShader(fragmentShader);

if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	console.error(gl.getShaderInfoLog(fragmentShader));
	gl.deleteShader(fragmentShader);
}

const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = new Float32Array([0, 0, 0, 0.5, 0.7, 0]);

gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const vertexArrayObject = gl.createVertexArray();

gl.bindVertexArray(vertexArrayObject);

gl.enableVertexAttribArray(positionAttributeLocation);

gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// clean the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);

// why again ?
gl.bindVertexArray(vertexArrayObject);

// execute the program
gl.drawArrays(gl.TRIANGLES, 0, 3);
