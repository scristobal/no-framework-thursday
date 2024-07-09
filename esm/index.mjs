const counterSpan = document.getElementById("count");

const increaseButton = document.getElementById("increase");
const randomButton = document.getElementById("random");

let counter;
let add_random;

async function increaseCounter() {
	if (!counter) {
		const module = await import("counter");

		counter = module.counter;
	}

	counter.increment();
	counterSpan.textContent = counter.text;
}

async function addRandomCounter() {
	if (!add_random) {
		const response = await fetch("./modules/rust_wasm_sample.wasm");
		const module = await WebAssembly.instantiateStreaming(response, { Math });

		add_random = module.instance.exports.add_random;
	}

	counter.state = add_random(counter.state);
	counterSpan.textContent = counter.text;
}

increaseButton.addEventListener("click", increaseCounter);
randomButton.addEventListener("click", addRandomCounter);
