export const FIND_TYPE_ASSET_LIST = 'FIND_TYPE_ASSET_LIST';
export const FIND_TYPE_ASSET_LIST_SUCCESS = 'FIND_TYPE_ASSET_LIST_SUCCESS';
export const FIND_TYPE_ASSET_LIST_ERROR = 'FIND_TYPE_ASSET_LIST_ERROR';

export const CONFIGURE_TYPE_ASSET = 'CONFIGURE_TYPE_ASSET';
export const CONFIGURE_TYPE_ASSET_SUCCESS = 'CONFIGURE_TYPE_ASSET_SUCCESS';
export const CONFIGURE_TYPE_ASSET_ERROR = 'CONFIGURE_TYPE_ASSET_ERROR';

export const GET_TYPE_ASSET_BY_ID = 'GET_TYPE_ASSET_BY_ID';
export const GET_TYPE_ASSET_BY_ID_SUCCESS = 'GET_TYPE_ASSET_BY_ID_SUCCESS';
export const GET_TYPE_ASSET_BY_ID_ERROR = 'GET_TYPE_ASSET_BY_ID_ERROR';

export const INACTIVE_TYPE_ASSET = 'INACTIVE_TYPE_ASSET';
export const INACTIVE_TYPE_ASSET_SUCCESS = 'INACTIVE_TYPE_ASSET_SUCCESS';
export const INACTIVE_TYPE_ASSET_ERROR = 'INACTIVE_TYPE_ASSET_ERROR';

export const GET_LIST_ACTIVE_TYPE_ASSET = 'GET_LIST_ACTIVE_TYPE_ASSET';
export const GET_LIST_ACTIVE_TYPE_ASSET_SUCCESS = 'GET_LIST_ACTIVE_TYPE_ASSET_SUCCESS';
export const GET_LIST_ACTIVE_TYPE_ASSET_ERROR = 'GET_LIST_ACTIVE_TYPE_ERROR';

export const SET_TYPE_ASSET = 'SET_TYPE_ASSET';

/******************************
 * Filtrar  tipos de activos *
 ******************************/

export const findTypeAsset = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: FIND_TYPE_ASSET_LIST,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});

export const findTypeAssetSuccess = (listResultSetTypeAsset) => ({
    type: FIND_TYPE_ASSET_LIST_SUCCESS,
    listResultSetTypeAsset
});

export const findTypeAssetError = (error) => ({
    type: FIND_TYPE_ASSET_LIST_ERROR,
    error
});

/******************************
 * Manejo de tipos de activo *
 *******************************/

export const configureTypeAsset = (typeAsset, ownProps, onSuccess) => ({
    type: CONFIGURE_TYPE_ASSET,
    typeAsset,
    ownProps,
    onSuccess

});

export const configureTypeAssetSuccess = () => ({
    type: CONFIGURE_TYPE_ASSET_SUCCESS
});

export const configureTypeAssetError = (error) => ({
    type: CONFIGURE_TYPE_ASSET_ERROR,
    error
});

export const setTypeAsset = (typeAsset) => ({
    type: SET_TYPE_ASSET,
    typeAsset
});

/********************************
 * Buscar tipo de activo por ID *
 *********************************/

export const getTypeAssetById = (id) => ({
    type: GET_TYPE_ASSET_BY_ID,
    id
});

export const getTypeAssetByIdSuccess = (typeAsset) => ({
    type: GET_TYPE_ASSET_BY_ID_SUCCESS,
    typeAsset
});

export const getTypeAssetByIdError = (error) => ({
    type: GET_TYPE_ASSET_BY_ID_ERROR,
    error
});

/*************************************
 * Desactivar tipo de activo por ID *
 **************************************/

export const inactiveTypeAsset = (id, onSuccess) => ({
    type: INACTIVE_TYPE_ASSET,
    id,
    onSuccess

});

export const inactiveTypeAssetSuccess = () => ({
    type: INACTIVE_TYPE_ASSET_SUCCESS
});

export const inactiveTypeAssetError = (error) => ({
    type: INACTIVE_TYPE_ASSET_ERROR,
    error
});

/*************************************************
 * Recuperar listado de tipos de activos en modo activo *
 *************************************************/

export const getListActiveTypeAlert = (onSuccess) => ({
    type: GET_LIST_ACTIVE_TYPE_ASSET,
    onSuccess
});

export const getListActiveTypeAlertSuccess = (listTypeAlert) => ({
    type: GET_LIST_ACTIVE_TYPE_ASSET_SUCCESS,
    listTypeAlert
});

export const getListActiveTypeAlertError = (error) => ({
    type: GET_LIST_ACTIVE_TYPE_ASSET_ERROR,
    error
});