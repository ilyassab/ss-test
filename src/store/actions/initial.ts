const actions = {
  setTheme: (isDark: boolean) => ({
    type: 'INITIAL:SET_THEME',
    payload: isDark,
  }),
};

export default actions;
