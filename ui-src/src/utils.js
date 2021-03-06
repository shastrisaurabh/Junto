import { Settings } from "./settings.js";

export const makeHolochainCall = function makeHolochainCall(
  connection,
  zome,
  func,
  params,
  callback
) {
  connection.then(({ callZome }) => {
    callZome(
      Settings.InstanceId,
      zome,
      func
    )(params).then(result => callback(JSON.parse(result)));
  });
};

export const isSuccess = function isSuccess(data) {
  if ("Ok" in data) {
    return true;
  } else {
    return false;
  }
};
