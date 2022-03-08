import { createStore } from "redux";
import getOrder from "./order.js";

const initialState = {
  counter: {
    value: 10,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "counter/increment":
      console.log("action.nbr: ", action.nbr);
      return { counter: { value: state.counter.value + action.nbr } };
    case "counter/decrement":
      return { counter: { value: state.counter.value - action.nbr } };
    default:
      return state;
  }
}

const store = createStore(reducer);

function runAction(type, nbr) {
  store.dispatch({ type, nbr });
}

async function main() {
  // listen the store.
  console.log(store.getState());
  store.subscribe(() => console.log(store.getState()));

  // listen order
  loop: while (true) {
    console.log("give an order (+/-/q): ");
    const order = await getOrder();
    switch (order) {
      case "+":
        runAction("counter/increment", 1);
        break;
      case "-":
        runAction("counter/decrement", 2);
        break;
      case "q":
        console.log("Bye");
        break loop;
      default:
        console.log("order not understood.");
    }
  }
}

main();
