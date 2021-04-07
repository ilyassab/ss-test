const initialState = {
  darkTheme: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case 'INITIAL:SET_THEME': {
      return {
        ...state,
        darkTheme: payload,
      };
    }
    default:
      return state;
  }
};
