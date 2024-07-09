#[link(wasm_import_module = "Math")]
extern "C" {
    fn random() -> f64;
}

#[no_mangle]
pub extern "C" fn add_random(value: usize) -> usize {
    value + unsafe { (random() * 100.0) as usize }
}
