const { Config, Container, Scenario } = require("@holochain/holochain-nodejs")
Scenario.setTape(require('tape'))

const dnaPath = "./dist/junto-rust.dna.json"

const dna = Config.dna(dnaPath)
const agentJosh = Config.agent("josh")
const agentEric = Config.agent("eric")
const instanceJosh = Config.instance(agentJosh, dna)
const instanceEric = Config.instance(agentEric, dna)
const scenario = new Scenario([instanceJosh, instanceEric], {debugLog: false}) 

scenario.runTape('Can post expression and do basic DOS query', async (t, {josh, eric}) => {
    const register_result = await josh.callSync('core', 'create_user', {user_data: {username: "jdeepee", first_name: "Josh", last_name: "Parkin", bio: "Junto Testing", profile_picture: "pictureurl"}});
    console.log("Register user result", register_result);
    t.equal(JSON.stringify(register_result), JSON.stringify({"Ok":{"private_den":{"address":"QmRhbdLQupJsE4NZajLCR2oCpCZjncoP656bh5TwXBTyHi","entry":{"parent":"QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn","name":"Josh\'s Den","privacy":"Private"}},"shared_den":{"address":"Qmb3U3NGDvzr9H74yiXq1LZEwx5V5qrCivVWuk5jJhr4Mf","entry":{"parent":"QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn","name":"Josh\'s Den","privacy":"Shared"}},"public_den":{"address":"Qmf4LcJ77idWGMPeGN1ngoqnmwot8tNmSHZ3mF1dZC8xsp","entry":{"parent":"QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn","name":"Josh\'s Den","privacy":"Public"}},"pack":{"address":"QmU6oLeoZrQjNeT8kmpXRYn8U58FmqZ8rC6f7jr7tfMWKC","entry":{"name":"Josh\'s Pack","owner":"QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn","privacy":"Shared"}},"profile":{"address":"QmQ2UTpz5EGD3v5N5iZe6FwaGWgbFGazATTC2RQvB5SuR1","entry":{"parent":"QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn","first_name":"Josh","last_name":"Parkin","bio":"Junto Testing","profile_picture":"pictureurl","verified":true}},"username":{"address":"QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn","entry":{"username":"jdeepee"}},"user_perspective":{"address":"QmaAhrUjfAKVSoZRs6VUjEk3WWuzEXCTqQozWRFS4Au4mz","entry":{"parent":"QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn","name":"Default Perspective"}}}}));
    console.log("Completed register profile\n\n\n");

    const register_result_eric = await eric.callSync('core', 'create_user', {user_data: {username: "sunyatax", first_name: "Eric", last_name: "Yang", bio: "Junto Testing", profile_picture: "pictureurl"}});
    console.log("Register user eric result", register_result_eric);
    t.equal(JSON.stringify(register_result_eric), JSON.stringify({"Ok":{"private_den":{"address":"QmS1MKMD9s2Uxcx26TstJczRULv2fjuy5x2aztD4VHStFD","entry":{"parent":"QmYCk7czLzXxbvCucMA8HTxyVbHtKz95egfkYhBhznmZcU","name":"Eric\'s Den","privacy":"Private"}},"shared_den":{"address":"Qmcq52qEYRsTVeirfR4sEPFRi6UxraHY8G5BGfESh9PMDf","entry":{"parent":"QmYCk7czLzXxbvCucMA8HTxyVbHtKz95egfkYhBhznmZcU","name":"Eric\'s Den","privacy":"Shared"}},"public_den":{"address":"QmRW661xqgbR2wC31dFVKf2y95YiEGfDKZNfi5SZAGRCMR","entry":{"parent":"QmYCk7czLzXxbvCucMA8HTxyVbHtKz95egfkYhBhznmZcU","name":"Eric\'s Den","privacy":"Public"}},"pack":{"address":"QmdZyapF7huQvjsB8tUw7riBXU1hoDDVYdG94qCgbvKpw8","entry":{"name":"Eric\'s Pack","owner":"QmYCk7czLzXxbvCucMA8HTxyVbHtKz95egfkYhBhznmZcU","privacy":"Shared"}},"profile":{"address":"QmXF2BASNKjFg76hth4b6PJ4Btj6oeJLmn7AuZerCLrZiM","entry":{"parent":"QmYCk7czLzXxbvCucMA8HTxyVbHtKz95egfkYhBhznmZcU","first_name":"Eric","last_name":"Yang","bio":"Junto Testing","profile_picture":"pictureurl","verified":true}},"username":{"address":"QmYCk7czLzXxbvCucMA8HTxyVbHtKz95egfkYhBhznmZcU","entry":{"username":"sunyatax"}},"user_perspective":{"address":"QmWR9cLyApeJvZWoMgFcnZkqu6tVJLVH8DwsnMMzJBnCVc","entry":{"parent":"QmYCk7czLzXxbvCucMA8HTxyVbHtKz95egfkYhBhznmZcU","name":"Default Perspective"}}}}));
    console.log("Completed register profile\n\n\n");

    const add_pack_member = await eric.callSync('core', 'add_pack_member', {username_address: 'QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn'}); //add eric to josh's group
    t.equal(JSON.stringify(add_pack_member), JSON.stringify({ Ok: { message: 'User added to group' } }));
    console.log("add group member result", add_pack_member);
    console.log("Completed add group member to eric's group\n\n\n");

    const holochain_env = await josh.callSync('core', 'show_env', {});
    console.log("Show env result, holochain_env", holochain_env);
    const dna = holochain_env.Ok.dna_address;
    console.log("DNA of application: ", dna, "\n\n\n");

    const update_bit_prefix_value = await josh.callSync('core', 'update_bit_prefix', {bit_prefix: 2});
    console.log("Update bit prefix result", update_bit_prefix_value);
    t.equal(JSON.stringify(update_bit_prefix_value), JSON.stringify({ Ok: 2}));
    console.log("Completed bit prefix config setting")

    //Post expression to one context (global) with all four tags specified - all unique with one tag having an uppercase letter
    const post_global_expression = await josh.callSync('core', 'post_expression', {
                                                                                    expression: 
                                                                                            {
                                                                                                expression: {
                                                                                                    ShortForm: {
                                                                                                        background: "",
                                                                                                        body: "This is the first test expression"
                                                                                                    }
                                                                                                },
                                                                                                expression_type: "ShortForm"
                                                                                            }, 
                                                                                    tags: ["holochain", "Junto", "social", "holo"], 
                                                                                    context: [dna]
                                                                                });
    console.log("Post expression 1 result", post_global_expression);
    t.equal(JSON.stringify(post_global_expression), JSON.stringify({"Ok":"QmT9LnUxYb6dBUpwvwfDnLTsDcKTAmKYqj9LHcW3ZWyyQW"}));
    console.log("Completed posting expression\n\n\n\n");

    const post_private_pack_expression = await josh.callSync('core', 'post_expression', {
        expression: 
                {
                    expression: {
                        ShortForm: {
                            background: "",
                            body: "This is the second test expression"
                        }
                    },
                    expression_type: "ShortForm"
                }, 
        tags: ["holochain", "Junto", "social", "holo"], 
        context: ["QmRhbdLQupJsE4NZajLCR2oCpCZjncoP656bh5TwXBTyHi"]
    });
    console.log("Post expression 2 result", post_private_pack_expression);
    t.equal(JSON.stringify(post_global_expression), JSON.stringify({"Ok":"QmT9LnUxYb6dBUpwvwfDnLTsDcKTAmKYqj9LHcW3ZWyyQW"}));
    console.log("Completed posting expression\n\n\n\n");

    let d = new Date();
    let year = d.getFullYear();
    let month = d.getUTCMonth() + 1;
    let day = d.getUTCDate();
    let hour = d.getUTCHours();    
    const make_1_dos_query = await eric.callSync('core', 'get_expression', {perspective: "dos", 
                                                                            query_points: ["social<tag>", "junto<tag>", "holochain<tag>", "holo<tag>", "jdeepee<user>", "shortform<type>", year+"<time:y>", "0"+month+"<time:m>", day+"<time:d>", hour+"<time:h>"],
                                                                            query_options: "FilterNew",
                                                                            target_type: "ExpressionPost",
                                                                            query_type: "And",
                                                                            dos: 1,
                                                                            seed: "totally random seed"});
    console.log("Make 1 dos query result", make_1_dos_query);
    t.equal(JSON.stringify(make_1_dos_query), JSON.stringify({"Ok":[{"address":"QmT9LnUxYb6dBUpwvwfDnLTsDcKTAmKYqj9LHcW3ZWyyQW","entry":{"expression_type":"ShortForm","expression":{"ShortForm":{"background":"","body":"This is the first test expression"}}}}]}));
    console.log("Completed ")
});