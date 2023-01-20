export const FIND_ROOM_BED_LIST = 'FIND_ROOM_BED_LIST';
export const FIND_ROOM_BED_LIST_SUCCESS = 'FIND_ROOM_BED_LIST_SUCCESS';
export const FIND_ROOM_BED_LIST_ERROR = 'FIND_ROOM_BED_LIST_ERROR';

export const CONFIGURE_ROOM_BED = 'CONFIGURE_ROOM_BED';
export const CONFIGURE_ROOM_BED_SUCCESS = 'CONFIGURE_ROOM_BED_SUCCESS';
export const CONFIGURE_ROOM_BED_ERROR = 'CONFIGURE_ROOM_BED_ERROR';

export const GET_ROOM_BED_BY_ID = 'GET_ROOM_BED_BY_ID';
export const GET_ROOM_BED_BY_ID_SUCCESS = 'GET_ROOM_BED_BY_ID_SUCCESS';
export const GET_ROOM_BED_BY_ID_ERROR = 'GET_ROOM_BED_BY_ID_ERROR';

export const INACTIVE_ROOM_BED = 'INACTIVE_ROOM_BED';
export const INACTIVE_ROOM_BED_SUCCESS = 'INACTIVE_ROOM_BED_SUCCESS';
export const INACTIVE_ROOM_BED_ERROR = 'INACTIVE_ROOM_BED_ERROR';

export const GET_LIST_ACTIVE_ROOM_BED = 'GET_LIST_ACTIVE_ROOM_BED';
export const GET_LIST_ACTIVE_ROOM_BED_SUCCESS = 'GET_LIST_ACTIVE_ROOM_BED_SUCCESS';
export const GET_LIST_ACTIVE_ROOM_BED_ERROR = 'GET_LIST_ACTIVE_TYPE_ERROR';

export const SET_ROOM_BED = 'SET_ROOM_BED';

// Ubicaciones
export const GET_LIST_ACTIVE_SHOW = 'GET_LIST_ACTIVE_SHOW';
export const GET_LIST_ACTIVE_SHOW_SUCCESS = 'GET_LIST_ACTIVE_SHOW_SUCCESS';
export const GET_LIST_ACTIVE_SHOW_ERROR = 'GET_LIST_ACTIVE_SHOW_ERROR';

/******************************
 * Filtrar Habitaciones y Camas *
 * Filtrar Habitaciones y Camas *as
 ******************************/

export const findRoomBed = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: FIND_ROOM_BED_LIST,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});

export const findRoomBedListSuccess = (listResultSetRoomBed) => ({
    type: FIND_ROOM_BED_LIST_SUCCESS,
    listResultSetRoomBed
});

export const findRoomBedListError = (error) => ({
    type: FIND_ROOM_BED_LIST_ERROR,
    error
});

/******************************
 * Manejo de Habitaciones - camas *
 *******************************/

export const configureRoomBed = (roomBed, ownProps, onSuccess) => ({
    type: CONFIGURE_ROOM_BED,
    roomBed,
    ownProps,
    onSuccess

});

export const configureRoomBedSuccess = () => ({
    type: CONFIGURE_ROOM_BED_SUCCESS
});

export const configureRoomBedError = (error) => ({
    type: CONFIGURE_ROOM_BED_ERROR,
    error
});

export const setRoomBed = (roomBed) => ({
    type: SET_ROOM_BED,
    roomBed
});

/********************************
 * Buscar habitación/cama por ID *
 *********************************/

export const getRoomBedById = (id) => ({
    type: GET_ROOM_BED_BY_ID,
    id
});

export const getRoomBedByIdSuccess = (roomBed) => ({
    type: GET_ROOM_BED_BY_ID_SUCCESS,
    roomBed
});

export const getRoomBedByIdError = (error) => ({
    type: GET_ROOM_BED_BY_ID_ERROR,
    error
});

/*************************************
 * Desactivar habitación/cama por ID *
 **************************************/

export const inactiveRoomBed = (id, onSuccess) => ({

    type: INACTIVE_ROOM_BED,
    id,
    onSuccess

});

export const inactiveRoomBedSuccess = () => ({
    type: INACTIVE_ROOM_BED_SUCCESS
});

export const inactiveRoomBedError = (error) => ({
    type: INACTIVE_ROOM_BED_ERROR,
    error
});

export const getListActiveRoomBed = (onSuccess) => ({
    type: GET_LIST_ACTIVE_ROOM_BED,
    onSuccess
})

export const getListActiveRoomBedSuccess = (data) => ({
        type: GET_LIST_ACTIVE_ROOM_BED_SUCCESS,
        data
})
export const getListActiveRoomBedError = (error) => ({
    type: GET_LIST_ACTIVE_ROOM_BED_ERROR,
    error
})

export const getListActiveShowService = () => ({
    type: GET_LIST_ACTIVE_SHOW
});

export const getListActiveShowSuccess = (listUbication) => ({
    type: GET_LIST_ACTIVE_SHOW_SUCCESS
    , listUbication
});

export const getListActiveShowError = (error) => ({
    type: GET_LIST_ACTIVE_SHOW_ERROR
    , error
});