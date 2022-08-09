export const FIND_HOTSPOT_LIST = 'FIND_HOTSPOT_LIST';
export const FIND_HOTSPOT_LIST_SUCCESS = 'FIND_HOTSPOT_LIST_SUCCESS';
export const FIND_HOTSPOT_LIST_ERROR = 'FIND_HOTSPOT_LIST_ERROR';

export const CONFIGURE_HOTSPOT = 'CONFIGURE_HOTSPOT';
export const CONFIGURE_HOTSPOT_SUCCESS = 'CONFIGURE_HOTSPOT_SUCCESS';
export const CONFIGURE_HOTSPOT_ERROR = 'CONFIGURE_HOTSPOT_ERROR';

export const GET_HOTSPOT_BY_ID = 'GET_HOTSPOT_BY_ID';
export const GET_HOTSPOT_BY_ID_SUCCESS = 'GET_HOTSPOT_BY_ID_SUCCESS';
export const GET_HOTSPOT_BY_ID_ERROR = 'GET_HOTSPOT_BY_ID_ERROR';

export const INACTIVE_HOTSPOT = 'INACTIVE_HOTSPOT';
export const INACTIVE_HOTSPOT_SUCCESS = 'INACTIVE_HOTSPOT_SUCCESS';
export const INACTIVE_HOTSPOT_ERROR = 'INACTIVE_HOTSPOT_ERROR';

export const GET_HOTSPOT_LIST_ACTIVE = 'GET_HOTSPOT_LIST_ACTIVE';
export const GET_HOTSPOT_LIST_ACTIVE_SUCCESS = 'GET_HOTSPOT_LIST_ACTIVE_SUCCESS';
export const GET_HOTSPOT_LIST_ACTIVE_ERROR = 'GET_HOTSPOT_LIST_ACTIVE_ERROR';

export const SET_HOTSPOT = 'SET_HOTSPOTS';

/******************************

 ******************************/

export const findHotspot = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_HOTSPOT_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findHotspotSuccess = (listHotspotCallButton) => (
    {
        type: FIND_HOTSPOT_LIST_SUCCESS
        , listHotspotCallButton
    }
);

export const findHotspotError = (error) => (
    {
        type: FIND_HOTSPOT_LIST_ERROR
        , error
    }
);

/******************************

*******************************/

export const configureHotspot = (hotspot, ownProps, onSuccess) => (
    {
        type: CONFIGURE_HOTSPOT
        , hotspot
        , ownProps
        , onSuccess

    }
);

export const configureHotspotSuccess = () => (
    {
        type: CONFIGURE_HOTSPOT_SUCCESS
    }
);

export const configureHotspotError = (error) => (
    {
        type: CONFIGURE_HOTSPOT_ERROR
        , error
    }
);

export const setHotspot = (hotspot) => (
    {
        type: SET_HOTSPOT
        , hotspot
    }
);

/********************************

*********************************/

export const getHotspotById = (idHotspotCallButton) => (
    {
        type: GET_HOTSPOT_BY_ID
        , idHotspotCallButton
    }
);

export const getHotspotByIdSuccess = (hotspot) => (
    {
        type: GET_HOTSPOT_BY_ID_SUCCESS
        , hotspot
    }
);

export const getHotspotByIdError = (error) => (
    {
        type: GET_HOTSPOT_BY_ID_ERROR
        , error
    }
);

/*************************************

**************************************/

export const inactiveHotspot = (idHotspotCallButton, onSuccess) => (
    {
        type: INACTIVE_HOTSPOT
        , idHotspotCallButton
        , onSuccess

    }
);

export const inactiveHotspotSuccess = () => (
    {
        type: INACTIVE_HOTSPOT_SUCCESS
    }
);

export const inactiveHotspotError = (error) => (
    {
        type: INACTIVE_HOTSPOT_ERROR
        , error
    }
);
/*************************************

**************************************/
export const getHostspotListActive = (onSuccess) => (
        {
            type: GET_HOTSPOT_LIST_ACTIVE
            , onSuccess
        }
    );

export const getHostspotListActiveSuccess = (listHotspotCallButton) => (
    {
        type: GET_HOTSPOT_LIST_ACTIVE_SUCCESS
        , listHotspotCallButton
    }
);

export const getHostspotListActiveError = (error) => (
    {
        type: GET_HOTSPOT_LIST_ACTIVE_ERROR
        , error
    }
);