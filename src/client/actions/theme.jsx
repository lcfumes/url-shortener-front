export const changeTheme = (theme) => {
  return {
    type: `CHANGE_THEME`,
    theme
  }
}

export function setTheme() {
  let theme = {}
  if (typeof localStorage !== 'undefined')
    theme = localStorage.getItem('t')
  return (dispatch, getState) => {
    dispatch(changeTheme(theme))
  }
}

export function updateTheme(theme) {
  if (typeof localStorage !== 'undefined')
    localStorage.setItem('t', theme)

  return (dispatch, getState) => {
    dispatch(changeTheme(theme))
  }
}