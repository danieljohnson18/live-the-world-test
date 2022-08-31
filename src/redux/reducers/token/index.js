const initialNavbarState = {
  jwt: "",
};

export const tokenReducer = (state = initialNavbarState, action) => {
  switch (action.type) {
    case "SAVE_TOKEN": {
      return {
        ...state,
        jwt: action.jwt,
      };
    }
    default: {
      return state;
    }
  }
};

export default tokenReducer;
