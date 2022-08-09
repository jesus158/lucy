export const CREATE_UPDATE_FLOOR = 'CREATE_UPDATE_FLOOR';
export const CREATE_UPDATE_FLOOR_SUCCESS = 'CREATE_UPDATE_FLOOR_SUCCESS';
export const CREATE_UPDATE_FLOOR_ERROR = 'CREATE_UPDATE_FLOOR_ERROR';

export const CHANGE_TWO_FLOORS ='CHANGE_TWO_FLOORS';
export const CHANGE_TWO_FLOORS_SUCCESS ='CHANGE_TWO_FLOORS_SUCCESS';
export const CHANGE_TWO_FLOORS_ERROR ='CHANGE_TWO_FLOORS_ERROR';

export const DELETE_FLOOR ='DELETE_FLOOR';
export const DELETE_FLOOR_SUCCESS ='DELETE_FLOOR_SUCCESS';
export const DELETE_FLOOR_ERROR ='DELETE_FLOOR_ERROR';

/******************************
 * Crea o actualiza el contenido
 * de una piso
 ******************************/

export const createUpdateFloor = (onSuccess, FloorUbication) => (
    {
        type: CREATE_UPDATE_FLOOR,
        onSuccess,
        FloorUbication
    }
);

export const createUpdateFloorSuccess = () => (
    {
        type: CREATE_UPDATE_FLOOR_SUCCESS
    }
);

export const createUpdateFloorError = (error) => (
    {
        type: CREATE_UPDATE_FLOOR_ERROR
        , error
    }
);
/************************************
 * Cambia la ubicación entre dos 
 * pisos dadas
 ***********************************/
export const changeTwoFloors = (onSuccess, idFloor1,idFloor2) => (
    {
        type: CHANGE_TWO_FLOORS,
        onSuccess,
        idFloor1,
        idFloor2
    }
);

export const changeTwoFloorsSuccess = () => (
    {
        type: CHANGE_TWO_FLOORS_SUCCESS
    }
);

export const changeTwoFloorsError = (error) => (
    {
        type: CHANGE_TWO_FLOORS_ERROR
        , error
    }
);
/************************************
* Realiza el borrado de una piso,
* intenta hacerlo físico y sino lo
* hace lógico
 ***********************************/
export const deleteFloor = (onSuccess, idFloorUbication) => (
    {
        type: DELETE_FLOOR,
        onSuccess,
        idFloorUbication,
    }
);

export const deleteFloorSuccess = () => (
    {
        type: DELETE_FLOOR_SUCCESS
    }
);

export const deleteFloorError = (error) => (
    {
        type: DELETE_FLOOR_ERROR
        , error
    }
);