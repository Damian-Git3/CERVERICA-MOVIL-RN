import apiService from "./apiService";

const recetaService = () => {
  const obtenerRecetas = async () => {
    try {
      const response = await apiService.get("/Recetas");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const siguienteEstatusReceta = async (id) => {
    try {
      const response = await apiService.put(`/Recetas/${id}/siguiente-estatus`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    obtenerRecetas,
    siguienteEstatusReceta,
  };
};

export default recetaService;
