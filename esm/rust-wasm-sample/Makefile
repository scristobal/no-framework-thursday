default: build_wasm

build_wasm:
	@cargo build --target=wasm32-unknown-unknown --release
	cp target/wasm32-unknown-unknown/release/rust_wasm_sample.wasm ../modules/
