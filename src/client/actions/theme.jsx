export const changeTheme = (theme) => {
  return {
    type: "CHANGE_THEME",
    theme
  };
};

export const setTheme = () => {
  let theme = {};
  if (typeof localStorage !== "undefined") {
    // eslint-disable-next-line no-undef
    theme = localStorage.getItem("t");
  }
  return (dispatch) => {
    dispatch(changeTheme(theme));
  };
};

export const updateTheme = (theme) => {
  if (typeof localStorage !== "undefined") {
    // eslint-disable-next-line no-undef
    localStorage.setItem("t", theme);
  }

  return (dispatch) => {
    dispatch(changeTheme(theme));
  };
};
