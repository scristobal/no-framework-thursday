// get the canvas and check in webgl2 is supported
const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl2");

if (!gl) alert("WebGL2 not supported in this browser");

// vertex shader source code
const vertexShaderSource = `#version 300 es

#pragma vscode_glsllint_stage: vert


in vec4 a_position;

// all shaders have a main function
void main() {
  gl_Position = a_position;
}
`;

// fragment shader source code
const fragmentShaderSource = `#version 300 es

#pragma vscode_glsllint_stage: frag

precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4(1, 0, 0, 1);
}
`;

function main() {
	// compile vertex shader
	const vertexShader = gl.createShader(gl.VERTEX_SHADER);

	gl.shaderSource(vertexShader, vertexShaderSource);
	gl.compileShader(vertexShader);

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error(
			"failed to compile vertex shader",
			gl.getShaderInfoLog(vertexShader),
		);
		gl.deleteShader(vertexShader);
	}

	// compile fragment shader
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(fragmentShader, fragmentShaderSource);
	gl.compileShader(fragmentShader);

	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error(
			"failed to compile fragment shader",
			gl.getShaderInfoLog(fragmentShader),
		);
		gl.deleteShader(fragmentShader);
	}

	// link both shaders into the program
	const program = gl.createProgram();

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.log("failed to link the program", gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
	}

	// load information into the vertex shader using an attribute
	const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

	const positionBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// x_0, y_0, x_1, y_1, x_2, y_2
	const positions = new Float32Array([-1, -1, 0, 1, 1, -1]);

	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

	const vertexArrayObject = gl.createVertexArray();

	gl.bindVertexArray(vertexArrayObject);

	gl.enableVertexAttribArray(positionAttributeLocation);

	gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

	// set the view port and clean the canvas
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// use the program and draw stuff
	gl.useProgram(program);

	// is it necessary to bind the vertex array again?
	// gl.bindVertexArray(vertexArrayObject);

	// execute the program
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

main();
