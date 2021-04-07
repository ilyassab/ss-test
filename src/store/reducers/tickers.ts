const initialState = {
  items: {},
  sort: {
    value: 'last',
    type: 'desc',
  },
  itemsCount: '',
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case 'TICKER:SET_ITEMS': {
      return {
        ...state,
        items: {
          ...state.items,
          ...payload,
        },
      };
    }
    case 'TICKER:SET_SORT': {
      return {
        ...state,
        sort: payload,
      };
    }
    case 'TICKER:SET_ITEMS_COUNT': {
      return {
        ...state,
        itemsCount: payload,
      };
    }
    default:
      return state;
  }
};
