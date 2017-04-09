import _ from 'lodash'

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

export function syncUser() {
  let user = {}
  if (typeof localStorage !== 'undefined')
    user = JSON.parse(localStorage.getItem('ul'))
  
  return (dispatch, getState) => {
    dispatch(storeUser(user))
  }
}

export function updateUser(user, type) {
  let storage = {}
  if (type === 'LOGOFF') {
    user = {
      accessToken: '',
      id: '',
      name: '',
      email: '',
      picture: ''   
    }
  } else {
    switch (type) {
      case 'FACEBOOK':
          storage = {fi: user.id}
        break;
      case 'GOOGLE':
          storage = {gi: user.id}
        break;
    }
    _.merge(storage, {
      accessToken: user.accessToken,
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture
    })
  }

  if (typeof localStorage !== 'undefined')
    localStorage.setItem('ul', JSON.stringify(storage))

  return (dispatch, getState) => {
    dispatch(storeUser(user))
  }
}