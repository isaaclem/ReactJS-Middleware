// Originally
// export default function({ dispatch }) {
//   return function(next) {
//     return function(action) {
      
//     }
//   }
// }

export default ({ dispatch }) => next => action => {
  // Check to see if action has a promise
  // on it's payload property
  // If it does, wait for it to resolve
  // If it doesn't, send the action to the next middleware

  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // Wait for the promise to resolve
  // get the data and create a new action
  // with that data and dispatch it
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
