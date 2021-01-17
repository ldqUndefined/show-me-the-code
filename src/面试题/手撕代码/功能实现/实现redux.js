//手写一个功能较完备的redux

function createStore(reducer) {
  let state;
  let listener = [];
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listener.forEach(fn => fn());
  };
  const subscribe = fn => {
    listener.push(fn);
    return () => {
      listener = listener.filter(item => item !== fn);
    };
  };
  const replaceReducer = toReplaceReducer => {
    reducer = toReplaceReducer;
    dispatch({ type: '$$REPLACE' });
  };
  dispatch({ type: '$$INIT' });
  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  };
}

function combineReducers(reducers) {
  return function(state = {}, action) {
    const nextState = {};
    const reducersKey = Object.keys(reducers);
    let hasChange = false;
    for (let key of reducersKey) {
      const prevStateForKey = state[key];
      const nextStateForKey = reducers[key](prevStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChange = hasChange || prevStateForKey !== nextStateForKey;
    }
    return hasChange ? nextState : state;
  };
}

function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);

    let middleApi = {
      getState: store.getState,
      dispatch: store.dispatch
    };

    middlewares = middlewares.map(item => item(middleApi));
    let dispatch = middlewares.reduceRight(
      (acc, cur) => cur(acc),
      store.dispatch
    );
    return {
      ...store,
      dispatch
    };
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
function bindActionCreators(actionCreators, dispatch) {
  let boundActionCreators = {};
  for (let key in actionCreators) {
    boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
  }
  return boundActionCreators;
}

//测试用例
let initStateA = {
  num: 1,
  str: 'haha'
};

let reducerA = (state = initStateA, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        num: state.num + 1
      };
    case 'change':
      return {
        ...state,
        str: action.payload
      };
    default:
      return state;
  }
};
let initStateB = {
  text: 'initB'
};
let reducerB = (state = initStateB, action) => {
  switch (action.type) {
    case 'changeB':
      return {
        ...state,
        text: action.payload
      };
    default:
      return state;
  }
};
let cr = combineReducers({
  a: reducerA,
  b: reducerB
});

let middleware1 = ({ getState, dispatch }) => next => action => {
  console.log('111');
  next(action);
  console.log('222');
};
let middleware2 = ({ getState, dispatch }) => next => action => {
  console.log('333');
  next(action);
  console.log('444');
};

let store = applyMiddleware(middleware1, middleware2)(createStore)(cr);
let unSubscribe = store.subscribe(() => {
  console.log('you dispatch', store.getState());
});
let actionCreator = {
  add: () => ({ type: 'add' }),
  change: payload => ({ type: 'change', payload }),
  changeB: payload => ({ type: 'changeB', payload })
};
let boundActionCreators = bindActionCreators(actionCreator, store.dispatch);

console.log(store.getState());
// store.dispatch({ type: 'add' });
// store.dispatch({ type: 'change', payload: 'hello world' });
// store.dispatch({ type: 'changeB', payload: 'B has change' });
boundActionCreators.add();
boundActionCreators.change('hello world');
boundActionCreators.changeB('B has change');
unSubscribe();
// store.dispatch({ type: 'add' });
boundActionCreators.add();
console.log(store.getState());
