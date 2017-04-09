const CHANGE_USER = 'CHANGE_USER'

export const userReducer = (store, action) => {
  if (action.type == CHANGE_USER) {
    return { 
      user: {
        accessToken: action.accessToken,
        id: action.id,
        name: action.name,
        email: action.email,
        picture: action.picture
      }
    }
  }

  return store || { user: { accessToken: '', id: '', user: '', email: '', picture: '' } }
}