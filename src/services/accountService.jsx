import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { environment } from '../../../environments/environment.development';
import { API_URL } from '@env';

const _baseURL = `${APIURL}/Account`;
const _baseURLMayorista = `${APIURL}/ClienteMayorista`;

const registrarCuenta = async (request) => {
    console.log("ENTREEEEEE")
    try {
        const response = await axios.post(`${_baseURL}/register`, request);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const registrarCuentaMayorista = async (request) => {
    return await axios.post(`${_baseURLMayorista}`, request);
};

const iniciarSesion = async (request) => {
    return await axios.post(`${_baseURL}/login`, request);
};

const activar = async (id) => {
    return await axios.get(`${_baseURL}/activar/${id}`);
};

const desactivar = async (id) => {
    return await axios.get(`${_baseURL}/desactivar/${id}`);
};

const renovarToken = async (data) => {
    return await axios.post(`${_baseURL}/refresh-token`, data);
};

const recuperarContrasena = async (email) => {
    return await axios.post(`${_baseURL}/forgot-password`, { email });
};

const resetearContrasena = async (data) => {
    return await axios.post(`${_baseURL}/reset-password`, data);
};

const cambiarContrasena = async (changePasswordDTO) => {
    return await axios.post(`${_baseURL}/change-password`, changePasswordDTO);
};

const obtenerPerfil = async () => {
    return await axios.get(`${_baseURL}/detail`);
};

const obtenerUsuarios = async () => {
    return await axios.get(`${_baseURL}`);
};

const cerrarSesion = async (token, carritoService) => {
    carritoService.vaciarProductosCarrito();

    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(`${_baseURL}/logout`, {}, { headers });
};

const obtenerDetallesCuenta = async (token) => {
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.get(`${_baseURL}/detail`, { headers });
};
