const initialState = {
  launching: false,
  launched: false,
  isFirstTime: false,
};

export default function reducers(state = initialState, action = {}) {
  const { type, payload } = action;
  
  switch (type) {
    case 'SET_STARTER_MODAL': 
      return {
        ...state,
        isFirstTime: payload,
      };
    default:
      return state;
  }
}
