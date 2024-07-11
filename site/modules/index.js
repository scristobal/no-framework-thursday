const counterSpan = document.getElementById("count");

const increaseButton = document.getElementById("increase");
const randomButton = document.getElementById("random");

let counter;
let add_random;

async function initCounter() {
	if (counter) return;

	const module = await import("counter");

	counter = module.counter;
}

async function initAddRandom() {
	if (add_random) return;

	const response = await fetch("./rust_wasm.wasm");
	const module = await WebAssembly.instantiateStreaming(response, { Math });

	add_random = module.instance.exports.add_random;
}

async function increaseCounter() {
	await initCounter();

	counter.increment();
	counterSpan.textContent = counter.text;
}

async function addRandomCounter() {
	await initCounter();
	await initAddRandom();

	counter.state = add_random(counter.state);
	counterSpan.textContent = counter.text;
}

increaseButton.addEventListener("click", increaseCounter);
randomButton.addEventListener("click", addRandomCounter);
