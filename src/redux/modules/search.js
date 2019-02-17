const initialState = {
  searching: false,
  searched: false,
  showModal: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SEARCH':
      return {
        ...state,
        searching: true,
        searched: false,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        searching: false,
        searched: true,
      };
    case 'SET_MODAL':
      return {
        ...state,
        searching: false,
        searched: true,
        showModal: payload,
      };
    default:
      return state;
  }
};

export function setModal(visible) {
  return {
    type: 'SET_MODAL',
    payload: visible,
  };
}
