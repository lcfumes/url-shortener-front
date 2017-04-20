import _ from "lodash";

export const storeUser = (user) => {
  return {
    type: "CHANGE_USER",
    accessToken: user.accessToken,
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture
  };
};

export const syncUser = () => {
  let user = {};
  if (typeof localStorage !== "undefined") {
    // eslint-disable-next-line no-undef
    user = JSON.parse(localStorage.getItem("ul"));
  }

  return (dispatch) => {
    dispatch(storeUser(user));
  };
};

export const logoff = () => {
  const storage = {};
  const user = {
    accessToken: "",
    id: "",
    name: "",
    email: "",
    picture: ""
  };

  if (typeof localStorage !== "undefined") {
    // eslint-disable-next-line no-undef
    localStorage.setItem("ul", JSON.stringify(storage));
  }

  return (dispatch) => {
    dispatch(storeUser(user));
  };
};

export const login = (user, type) => {
  let storage = {};
  switch (type) {
    // eslint-disable-next-line indent
    case "FACEBOOK": {
      storage = {fi: user.id};
      break;
    }
    // eslint-disable-next-line indent
    case "GOOGLE": {
      storage = {gi: user.id};
      break;
    }
  }

  _.merge(storage, {
    accessToken: user.accessToken,
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture
  });

  if (typeof localStorage !== "undefined") {
    // eslint-disable-next-line no-undef
    localStorage.setItem("ul", JSON.stringify(storage));
  }

  return (dispatch) => {
    dispatch(storeUser(user));
  };
};

export const updateUser = (user, type) => {
  switch (type) {
    // eslint-disable-next-line indent
    case "LOGOFF": {
      logoff();
      break;
    }
    // eslint-disable-next-line indent
    default: {
      login(user, type);
      break;
    }
  }
};
