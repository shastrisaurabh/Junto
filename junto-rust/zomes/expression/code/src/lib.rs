#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
extern crate maplit;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate holochain_json_derive;
extern crate types;
extern crate utils;

pub mod definition;

define_zome! {
    entries: [
        definition::post_definition()
    ]

    genesis: || { Ok(()) }

    functions: []

    traits: {
        hc_public []
    }
}
