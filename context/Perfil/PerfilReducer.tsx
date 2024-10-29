const PerfilReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_SESSION":
      return {
        ...state,
        session: payload,
      };
    case "UPDATE_USER_DETAILS":
      console.log("UPDATE_USER_DETAILS payload:", payload);
      return { ...state, userDetails: action.payload };

    case "UPDATE_PUNTOS_FIDELIDAD":
      console.log("UPDATE_PUNTOS_FIDELIDAD payload:", payload);
      return { ...state, puntosFidelidad: payload };

    case "UPDATE_TRANSACCIONES":
      console.log("UPDATE_TRANSACCIONES payload:", payload);
      return { ...state, transacciones: payload };
    default:
      return state;
  }
};

export default PerfilReducer;
