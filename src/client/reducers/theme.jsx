const CHANGE_THEME = "CHANGE_THEME";

export const themeReducer = (store, action) => {
  if (action.type === CHANGE_THEME) {
    return { 
      theme: action.theme
    };
  }

  return store || { theme: '' };
};
