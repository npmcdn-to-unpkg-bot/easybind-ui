import { createStore } from 'redux';

/**
 * Centralized application state
 * See http://redux.js.org/
 */
const store = createStore((state, action) => {
  // TODO: Add action handlers (aka "reduces")
  switch (action) {
    case 'COUNT':
      return { ...state, count: (state.count || 0) + 1 };
    default:
      return state;
  }
});

export default store;
