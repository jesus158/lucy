export const FIND_ASSET_LIST = 'FIND_ASSET_LIST';
export const FIND_ASSET_LIST_SUCCESS = 'FIND_ASSET_LIST_SUCCESS';
export const FIND_ASSET_LIST_ERROR = 'FIND_ASSET_LIST_ERROR';

export const CONFIGURE_ASSET = 'CONFIGURE_ASSET';
export const CONFIGURE_ASSET_SUCCESS = 'CONFIGURE_ASSET_SUCCESS';
export const CONFIGURE_ASSET_ERROR = 'CONFIGURE_ASSET_ERROR';

export const GET_ASSET_BY_ID = 'GET_ASSET_BY_ID';
export const GET_ASSET_BY_ID_SUCCESS = 'GET_ASSET_BY_ID_SUCCESS';
export const GET_ASSET_BY_ID_ERROR = 'GET_ASSET_BY_ID_ERROR';

export const INACTIVE_ASSET = 'INACTIVE_ASSET';
export const INACTIVE_ASSET_SUCCESS = 'INACTIVE_ASSET_SUCCESS';
export const INACTIVE_ASSET_ERROR = 'INACTIVE_ASSET_ERROR';

export const GET_LIST_ACTIVE_ASSET = 'GET_LIST_ACTIVE_ASSET';
export const GET_LIST_ACTIVE_ASSET_SUCCESS = 'GET_LIST_ACTIVE_ASSET_SUCCESS';
export const GET_LIST_ACTIVE_ASSET_ERROR = 'GET_LIST_ACTIVE_ERROR';

export const GET_TYPE_ASSET_LIST = "GET_TYPE_ASSET_LIST"
export const GET_TYPE_ASSET_LIST_SUCCESS = "GET_TYPE_ASSET_LIST_SUCCESS"
export const GET_TYPE_ASSET_LIST_ERROR = "GET_TYPE_ASSET_LIST_ERROR"

export const SET_ASSET = 'SET_ASSET';

/******************************
 * Filtrar activos *
 ******************************/

export const findAsset = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: FIND_ASSET_LIST,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});

export const findAssetSuccess = (listResultSetAsset) => ({
    type: FIND_ASSET_LIST_SUCCESS,
    listResultSetAsset
});

export const findAssetError = (error) => ({
    type: FIND_ASSET_LIST_ERROR,
    error
});

/******************************
 * Manejo de activo *
 *******************************/

export const configureAsset = (asset, ownProps, onSuccess) => ({
    type: CONFIGURE_ASSET,
    asset,
    ownProps,
    onSuccess

});

export const configureAssetSuccess = () => ({
    type: CONFIGURE_ASSET_SUCCESS
});

export const configureAssetError = (error) => ({
    type: CONFIGURE_ASSET_ERROR,
    error
});

export const setAsset = (asset) => ({
    type: SET_ASSET,
    asset
});

export const getListAssetType = (onSuccess) => (
    {
      type: GET_TYPE_ASSET_LIST 
      , onSuccess
    }
  );
  
  export const getListAssetTypeSuccess = (listTypeAsset) => (
    {
      type: GET_TYPE_ASSET_LIST_SUCCESS
      , listTypeAsset: listTypeAsset
    }
  );
  
  export const getListAssetTypeError = (error) => (
    {
      type: GET_TYPE_ASSET_LIST_ERROR 
      , error
    }
  );

/********************************
 * Buscar activo por ID *
 *********************************/

export const getAssetById = (id) => ({
    type: GET_ASSET_BY_ID,
    id
});

export const getAssetByIdSuccess = (asset) => ({
    type: GET_ASSET_BY_ID_SUCCESS,
    asset
});

export const getAssetByIdError = (error) => ({
    type: GET_ASSET_BY_ID_ERROR,
    error
});

/*************************************
 * Desactivar activo por ID *
 **************************************/

export const inactiveAsset = (id, onSuccess) => ({
    type: INACTIVE_ASSET,
    id,
    onSuccess

});

export const inactiveAssetSuccess = () => ({
    type: INACTIVE_ASSET_SUCCESS
});

export const inactiveAssetError = (error) => ({
    type: INACTIVE_ASSET_ERROR,
    error
});

/*************************************************
 * Recuperar listado de activos en modo activo *
 *************************************************/

export const getListActiveAsset = (onSuccess) => ({
    type: GET_LIST_ACTIVE_ASSET,
    onSuccess
});

export const getListActiveAssetSuccess = (listAsset) => ({
    type: GET_LIST_ACTIVE_ASSET_SUCCESS,
    listAsset
});

export const getListActiveAssetError = (error) => ({
    type: GET_LIST_ACTIVE_ASSET_ERROR,
    error
});