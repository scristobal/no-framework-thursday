const counter = {
	state: 0,
	increment() {
		this.state++;
	},
	get text() {
		return this.state.toString();
	},
};

export { counter };
