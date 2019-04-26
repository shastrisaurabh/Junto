const { Config, Container, Scenario } = require("@holochain/holochain-nodejs")
//const n3h = require('n3h');
Scenario.setTape(require('tape'))

const dnaPath = "./dist/junto-rust.dna.json"

const dna = Config.dna(dnaPath)
const agentJosh = Config.agent("josh")
const instanceJosh = Config.instance(agentJosh, dna)
const scenario = new Scenario([instanceJosh], { debugLog: true }) 

scenario.runTape('Can register a profile and retrieve', async (t, {josh}) => {
  const register_result = await josh.callSync('core', 'create_user', {user_data: {username: "jdeepee", first_name: "Josh", last_name: "Parkin", bio: "Junto Testing", profile_picture: "pictureurl"}})
  console.log("Register user result", register_result)
  t.equal(JSON.stringify(register_result), JSON.stringify({ Ok: 'QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn' }))
  console.log("Completed register profile\n\n\n")

  const get_username_from_address = await josh.callSync('core', 'get_username_from_address', {user: 'QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn'})
  console.log("Getting user by address", get_username_from_address) //should return username
  t.equal(JSON.stringify(get_username_from_address), JSON.stringify({ Ok: { username: 'jdeepee' } }))
  console.log("Completed get username by address\n\n\n")

  const get_user_profile_from_address = await josh.callSync('core', 'get_user_profile_from_address', {user: 'QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn'})
  console.log("Getting user profile by address", get_user_profile_from_address) //should return profile
  t.equal(JSON.stringify(get_user_profile_from_address), JSON.stringify({ Ok: 
    { parent: 'QmVscvEFw3xCU6gkX5wZQBNx5zybjK1JD6oedetxc2BSw3',
      first_name: 'Josh',
      last_name: 'Parkin',
      bio: 'Junto Testing',
      profile_picture: 'pictureurl',
      verified: true } }))
  console.log("Completed get profile by address\n\n\n")

  const get_user_profile_by_agent_address = await josh.callSync('core', 'get_user_profile_by_agent_address', {})
  console.log("Get user profile", get_user_profile_by_agent_address) //should return profile
  t.equal(JSON.stringify(get_user_profile_by_agent_address), JSON.stringify({ Ok: 
    { parent: 'QmVscvEFw3xCU6gkX5wZQBNx5zybjK1JD6oedetxc2BSw3',
      first_name: 'Josh',
      last_name: 'Parkin',
      bio: 'Junto Testing',
      profile_picture: 'pictureurl',
      verified: true } }))
  console.log("Completed get profile by agent address\n\n\n")

  const get_user_profile_address_by_agent_address = await josh.callSync('core', 'get_user_profile_address_by_agent_address', {})
  console.log("Get user profile address", get_user_profile_address_by_agent_address) //should return address
  t.equal(JSON.stringify(get_user_profile_address_by_agent_address), JSON.stringify({ Ok: 'QmNpYEaZJtuwicveTj6kxFS1G66oQYUEzynRi8SSbaatbA' }))
  console.log("Completed get profile address by agent address\n\n\n")

  const get_user_username_by_agent_address = await josh.callSync('core', 'get_user_username_by_agent_address', {})
  console.log("Get user username", get_user_username_by_agent_address) //should return username
  t.equal(JSON.stringify(get_user_username_by_agent_address), JSON.stringify({ Ok: { username: 'jdeepee' } }))
  console.log("Completed get username by agent address\n\n\n")

  const get_user_username_address_by_agent_address = await josh.callSync('core', 'get_user_username_address_by_agent_address', {})
  console.log("Get username address", get_user_username_address_by_agent_address) //should return username address 
  t.equal(JSON.stringify(get_user_username_address_by_agent_address), JSON.stringify({ Ok: 'QmT7TDNsrKw2psyvYJztAMVFyKowPtR5VLbwDVHbtuoWSn' }))
  console.log("Completed get username address by agent address\n\n\n")
})



// const testNewChannelParams = {
//   name: "test new stream",
//   description: "for testing...",
//   initial_members: [],
//   public: true
// }

// const testMessage = {
//   timestamp: 0,
//   message_type: "text",
//   payload: "I am the message payload",
//   meta: "{}",
// }


// scenario.runTape('Can register a profile and retrieve', async (t, {alice}) => {
//   const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
//   console.log(register_result)
//   t.equal(register_result.Ok.length, 63)

//   const get_profile_result = await alice.callSync('chat', 'get_member_profile', {agent_address: register_result.Ok})
//   console.log(get_profile_result)
// })

// scenario.runTape('Can create a public stream with no other members and retrieve it', async (t, {alice}) => {
 
//   const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
//   console.log(register_result)
//   t.equal(register_result.Ok.length, 63)

//   const create_result = await alice.callSync('chat', 'create_stream', testNewChannelParams)
//   console.log(create_result)
//   t.deepEqual(create_result.Ok.length, 46)

//   const get_all_members_result = await alice.callSync('chat', 'get_members', {stream_address: create_result.Ok})
//   console.log('all members:', get_all_members_result)
//   let allMembers = get_all_members_result.Ok
//   t.true(allMembers.length > 0, 'gets at least one member')
  
//   const get_result = await alice.callSync('chat', 'get_all_public_streams', {})
//   console.log(get_result)
//   t.deepEqual(get_result.Ok.length, 1)

// })

// scenario.runTape('Can post a message to the stream and retrieve', async (t, {alice}) => {

//   const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
//   console.log(register_result)
//   t.equal(register_result.Ok.length, 63)

//   const create_result = await alice.callSync('chat', 'create_stream', testNewChannelParams)
//   console.log(create_result)
//   const stream_addr = create_result.Ok
//   t.deepEqual(stream_addr.length, 46)

//   const get_result = await alice.callSync('chat', 'get_all_public_streams', {})
//   console.log(get_result)
//   t.deepEqual(get_result.Ok.length, 1)

//   const post_result = await alice.callSync('chat', 'post_message', {stream_address: stream_addr, message: testMessage})
//   console.log(post_result)
//   t.notEqual(post_result.Ok, undefined, 'post should return Ok')

//   const get_message_result = await alice.callSync('chat', 'get_messages', {address: stream_addr})
//   console.log(get_message_result)
//   t.deepEqual(get_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')
// })

// scenario.runTape('Can create a public stream with some members', async (t, {alice}) => {

//   const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
//   console.log(register_result)
//   t.equal(register_result.Ok.length, 63)

//   const create_result = await alice.callSync('chat', 'create_stream', {...testNewChannelParams, public: false, initial_members: []})
//   console.log(create_result)
//   t.deepEqual(create_result.Ok.length, 46)

//   const get_all_members_result = await alice.callSync('chat', 'get_members', {stream_address: create_result.Ok})
//   console.log('all members:', get_all_members_result)
//   let allMemberAddrs = get_all_members_result.Ok
//   t.true(allMemberAddrs.length > 0, 'gets at least one member')
// })
