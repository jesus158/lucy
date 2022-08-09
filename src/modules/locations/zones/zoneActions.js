export const CREATE_UPDATE_ZONE = 'CREATE_UPDATE_ZONE';
export const CREATE_UPDATE_ZONE_SUCCESS = 'CREATE_UPDATE_ZONE_SUCCESS';
export const CREATE_UPDATE_ZONE_ERROR = 'CREATE_UPDATE_ZONE_ERROR';

export const CHANGE_TWO_ZONES = 'CHANGE_TWO_ZONES';
export const CHANGE_TWO_ZONES_SUCCESS = 'CHANGE_TWO_ZONES_SUCCESS';
export const CHANGE_TWO_ZONES_ERROR = 'CHANGE_TWO_ZONES_ERROR';

export const DELETE_ZONE = 'DELETE_ZONE';
export const DELETE_ZONE_SUCCESS = 'DELETE_ZONE_SUCCESS';
export const DELETE_ZONE_ERROR = 'DELETE_ZONE_ERROR';

/******************************
 * Crea o actualiza el contenido
 * de una zona
 ******************************/

export const createUpdateZone = (onSuccess, zoneUbication) => (
    {
        type: CREATE_UPDATE_ZONE,
        onSuccess,
        zoneUbication
    }
);

export const createUpdateZoneSuccess = () => (
    {
        type: CREATE_UPDATE_ZONE_SUCCESS
    }
);

export const createUpdateZoneError = (error) => (
    {
        type: CREATE_UPDATE_ZONE_ERROR
        , error
    }
);
/************************************
 * Cambia la ubicación entre dos 
 * zonas dadas
 ***********************************/
export const changeTwoZones = (onSuccess, idZone1, idZone2) => (
    {
        type: CHANGE_TWO_ZONES,
        onSuccess,
        idZone1,
        idZone2
    }
);

export const changeTwoZonesSuccess = () => (
    {
        type: CHANGE_TWO_ZONES_SUCCESS
    }
);

export const changeTwoZonesError = (error) => (
    {
        type: CHANGE_TWO_ZONES_ERROR
        , error
    }
);
/************************************
* Realiza el borrado de una zona,
* intenta hacerlo físico y sino lo
* hace lógico
 ***********************************/
export const deleteZone = (onSuccess, idZoneUbication) => (
    {
        type: DELETE_ZONE,
        onSuccess,
        idZoneUbication,
    }
);

export const deleteZoneSuccess = () => (
    {
        type: DELETE_ZONE_SUCCESS
    }
);

export const deleteZoneError = (error) => (
    {
        type: DELETE_ZONE_ERROR
        , error
    }
);