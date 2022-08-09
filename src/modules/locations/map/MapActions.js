export const GET_MAP = "GET_MAP";
export const GET_MAP_SUCCESS = "GET_MAP_SUCCESS";
export const GET_MAP_ERROR = "GET_MAP_ERROR";

/****************************************
 * Gestiona los datos del mapa disponible
 * para la cuenta seleccionada
 ****************************************/
export const getMap = (onSuccess) => ({
    type: GET_MAP,
    onSuccess
});
export const getMapSuccess = (matrixZoneUbication) => ({
    type: GET_MAP_SUCCESS,
    matrixZoneUbication
});
export const getMapError = (error) => ({
    type: GET_MAP_ERROR,
    error
});