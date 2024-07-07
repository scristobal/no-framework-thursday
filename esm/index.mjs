const counterSpan = document.getElementById('count')
const counterDescriptorSpan = document.getElementById('counter-descriptor')

const increaseButton = document.getElementById('increase')

const switchButton = document.getElementById('switch')

let currentCounterDescriptor = 'standard-counter'

switchButton.addEventListener('click', () => {
    switch (currentCounterDescriptor) {
        case 'standard-counter':
            currentCounterDescriptor = 'fibonacci-counter'
            break
        case 'fibonacci-counter':
            currentCounterDescriptor = 'standard-counter'
            break
    }

    switchCounter(currentCounterDescriptor)
})

switchCounter('standard-counter')

function switchCounter(counterDescriptor) {
    counterDescriptorSpan.textContent = counterDescriptor

    import(counterDescriptor).then((Module) => {
        const counter = Module.counter

        function updateCounter() {
            counterSpan.textContent = counter.state.toString().padStart(6, '0')
        }

        updateCounter()

        increaseButton.addEventListener('click', () => {
            counter.increment()
            updateCounter()
        })
    })
}
