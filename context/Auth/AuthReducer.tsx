const AuthReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_SESSION":
      return {
        ...state,
        session: payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
