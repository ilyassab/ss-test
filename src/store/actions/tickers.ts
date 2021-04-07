const actions = {
  setTickers: (items: any) => ({
    type: 'TICKER:SET_ITEMS',
    payload: items,
  }),
  setSort: (sortItem: any) => ({
    type: 'TICKER:SET_SORT',
    payload: sortItem,
  }),
  setItemsCount: (itemsCount: any) => ({
    type: 'TICKER:SET_ITEMS_COUNT',
    payload: itemsCount,
  }),
};

export default actions;
