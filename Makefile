default: rust_wasm

rust_wasm:
	cd rust-wasm && cargo build --target=wasm32-unknown-unknown --release
	cp ./rust-wasm/target/wasm32-unknown-unknown/release/rust_wasm.wasm ./site/modules/
