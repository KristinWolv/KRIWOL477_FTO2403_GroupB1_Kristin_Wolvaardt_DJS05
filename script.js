// store class manages the state and handling actions
class Store {
    constructor(reducer) {
      this.state = reducer(undefined, {});
      this.reducer = reducer;
      this.listeners = [];
    }
  // 'reduser' = function passed to constructor, that will manage state transition
  // 'state' initialized reduser by naming it undefined with empty action. Sets initial state
  // 'listeners' array to store callback functions taht are called when the state changes

    getState() { // returns current state of store
      return this.state;
    }
  
    dispatch(action) {
      this.state = this.reducer(this.state, action);
      this.listeners.forEach(listener => listener());
    }
    // takes an action object, passes it to the reducer to compute the new state, and updates the state
    // notifies all sub listeners of the state changes by calling each one
  
    subscribe(listener) { // adds a listener function the the listen array
      this.listeners.push(listener);
    }
  }
  

  // REDUCER FUNCTION
  // manages state transitions based on the type of action
  const initialState = { count: 0 };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD':
        return { count: state.count + 1 };
      case 'SUBTRACT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        return state;
    }
  }
  

  // Store Initialization and usage
  const store = new Store(reducer);
  
  // Subscribe to state changes and log the state
  store.subscribe(() => {
    console.log(store.getState());
  });
  
  // Simulating user stories
  console.log("Initial State:");
  console.log(store.getState()); // SCENARIO 1
  
  store.dispatch({ type: 'ADD' });
  store.dispatch({ type: 'ADD' }); // SCENARIO 2
  
  store.dispatch({ type: 'SUBTRACT' }); // SCENARIO 3
  
  store.dispatch({ type: 'RESET' }); // SCENARIO 4