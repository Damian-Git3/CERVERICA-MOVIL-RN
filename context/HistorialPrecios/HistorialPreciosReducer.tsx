const HistorialPreciosReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_LISTA_RECETAS":
      return {
        ...state,
        listaRecetas: payload,
      };
    default:
      return state;
  }
};

export default HistorialPreciosReducer;
