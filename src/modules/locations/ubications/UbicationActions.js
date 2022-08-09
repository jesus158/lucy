export const GET_LIST_ACTIVE_SHOW = 'GET_LIST_ACTIVE_SHOW';
export const GET_LIST_ACTIVE_SHOW_SUCCESS = 'GET_LIST_ACTIVE_SHOW_SUCCESS';
export const GET_LIST_ACTIVE_SHOW_ERROR = 'GET_LIST_ACTIVE_SHOW_ERROR';

export const CREATE_UPDATE_UBICATION = 'CREATE_UPDATE_UBICATION';
export const CREATE_UPDATE_UBICATION_SUCCESS = 'CREATE_UPDATE_UBICATION_SUCCESS';
export const CREATE_UPDATE_UBICATION_ERROR = 'CREATE_UPDATE_UBICATION_ERROR';

export const CHANGE_TWO_UBICATIONS ='CHANGE_TWO_UBICATIONS';
export const CHANGE_TWO_UBICATIONS_SUCCESS ='CHANGE_TWO_UBICATIONS_SUCCESS';
export const CHANGE_TWO_UBICATIONS_ERROR ='CHANGE_TWO_UBICATIONS_ERROR';

export const DELETE_UBICATION ='DELETE_UBICATION';
export const DELETE_UBICATION_SUCCESS ='DELETE_UBICATION_SUCCESS';
export const DELETE_UBICATION_ERROR ='DELETE_UBICATION_ERROR';

export const GET_UBICATIONS_BY_FILTER ='GET_UBICATIONS_BY_FILTER';
export const GET_UBICATIONS_BY_FILTER_SUCCESS ='GET_UBICATIONS_BY_FILTER_SUCCESS';
export const GET_UBICATIONS_BY_FILTER_ERROR ='GET_UBICATIONS_BY_FILTER_ERROR';

/*************************************************
 * Procesa el listado de ubicaciones mediante
 * el uso de filtros y pagiancion
 **************************************************/
export const getUbicationByFilter = (
    onSuccess,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
  ) => ({
    type: GET_UBICATIONS_BY_FILTER,
    onSuccess,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
  });
  
  export const getUbicationByFilterSuccess = data => ({
    type: GET_UBICATIONS_BY_FILTER_SUCCESS,
    data
  });
  
  export const getUbicationByFilterError = error => ({
    type: GET_UBICATIONS_BY_FILTER_ERROR,
    error
  });

/******************************
 * Obtener listado de las 
 * ubicaciones que se 
 * visualizan en lista *
 ******************************/

export const getListActiveShowService = () => (
    {
        type: GET_LIST_ACTIVE_SHOW
    }
);

export const getListActiveShowSuccess = (listUbication) => (
    {
        type: GET_LIST_ACTIVE_SHOW_SUCCESS
        , listUbication
    }
);

export const getListActiveShowError = (error) => (
    {
        type: GET_LIST_ACTIVE_SHOW_ERROR
        , error
    }
);

/******************************
 * Crea o actualiza el contenido
 * de una ubicación
 ******************************/

export const createUpdateUbication = (onSuccess, Ubication) => (
    {
        type: CREATE_UPDATE_UBICATION,
        onSuccess,
        Ubication
    }
);

export const createUpdateUbicationSuccess = () => (
    {
        type: CREATE_UPDATE_UBICATION_SUCCESS
    }
);

export const createUpdateUbicationError = (error) => (
    {
        type: CREATE_UPDATE_UBICATION_ERROR
        , error
    }
);
/************************************
 * Cambia la ubicación entre dos 
 * ubicaciones dadas
 ***********************************/
export const changeTwoUbications = (onSuccess, idUbication1,idUbication2) => (
    {
        type: CHANGE_TWO_UBICATIONS,
        onSuccess,
        idUbication1,
        idUbication2
    }
);

export const changeTwoUbicationsSuccess = () => (
    {
        type: CHANGE_TWO_UBICATIONS_SUCCESS
    }
);

export const changeTwoUbicationsError = (error) => (
    {
        type: CHANGE_TWO_UBICATIONS_ERROR
        , error
    }
);
/************************************
* Realiza el borrado de una ubicación,
* intenta hacerlo físico y sino lo
* hace lógico
 ***********************************/
export const deleteUbication = (onSuccess, idUbication) => (
    {
        type: DELETE_UBICATION,
        onSuccess,
        idUbication,
    }
);

export const deleteUbicationSuccess = () => (
    {
        type: DELETE_UBICATION_SUCCESS
    }
);

export const deleteUbicationError = (error) => (
    {
        type: DELETE_UBICATION_ERROR
        , error
    }
);