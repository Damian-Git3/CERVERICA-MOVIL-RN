export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Acción cuando el login es exitoso
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

// Acción para cerrar sesión
export const logout = () => ({
  type: LOGOUT,
});