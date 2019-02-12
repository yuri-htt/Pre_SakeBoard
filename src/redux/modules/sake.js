const initialState = {
  categoryId: 0,
  categoryName: '',
  sakeName: '',
  areaName: '',
  companyName: '',
  starCount: 0,
  text: '',
};

export default function reducers(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT':
      return {
        categoryId: payload.categoryId,
        categoryName: payload.categoryName,
        sakeName: payload.name,
        areaName: payload.areaName,
        companyName: payload.companyName,
        starCount: payload.starCount,
        text: payload.text,
      };
    case 'CLEAR': {
      return {
        initialState,
      };
    }
    default:
      return state;
  }
}

export function selectSake(sake) {
  console.log('TTTTT');
  console.log(sake);
  return {
    type: 'SELECT',
    payload: sake,
  };
}
