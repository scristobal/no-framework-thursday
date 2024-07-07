const counter = {
    state: 1,
    previousState: 1,
    increment() {
        ;[this.state, this.previousState] = [
            this.previousState + this.state,
            this.state,
        ]
    },
}

export { counter }
