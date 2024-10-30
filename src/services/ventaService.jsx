import  apiClient from './apiService';

const ventaService = () => {
    const obtenerVentas = async () => {
        try {
        const response = await apiClient.get('/Ventas');
        return response.data;
        } catch (error) {
        throw error;
        }
    };
    
    const siguienteEstatusLanding = async (id) => {
        try {
        const response = await apiClient.put(`/Ventas/${id}/siguiente-estatus`);
        return response.data;
        } catch (error) {
        throw error;
        }
    };
    
    return {
        obtenerVentas,
        siguienteEstatusLanding,
    };
    };


export default ventaService;