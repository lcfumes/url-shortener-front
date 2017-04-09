export const storeUser = (user) => {
  return {
    type: `CHANGE_USER`,
    accessToken: user.accessToken,
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture
  }
}


export function updateUser(user, logoff) {
  if (logoff) {
    user = {
      accessToken: '',
      id: '',
      name: '',
      email: '',
      picture: ''   
    }
  }
  localStorage.setItem('ul', JSON.stringify({fi: user.id}))
  return (dispatch, getState) => {
    dispatch(storeUser(user))
  }
}