export const GET_HISTORY_REQUEST = 'GET_HISTORY_REQUEST';
export const GET_HISTORY_REQUEST_SUCCESS = 'GET_HISTORY_REQUEST_SUCCESS';
export const GET_HISTORY_REQUEST_ERROR = 'GET_HISTORY_REQUEST_ERROR';

export const GET_HISTORY_REQUEST_EXPORT = 'GET_HISTORY_REQUEST_EXPORT';
export const GET_HISTORY_REQUEST_SUCCESS_EXPORT = 'GET_HISTORY_REQUEST_SUCCESS_EXPORT';
export const GET_HISTORY_REQUEST_ERROR_EXPORT = 'GET_HISTORY_REQUEST_ERROR_EXPORT';



/***************************************
      REPORTE DE LAS SOLICITUDES
 ***************************************/

export const getHistoryRequest = (
    onSuccess
    , beginDate
    , endDate
    , idTypeService
    , stateRequest
    , idCarrier
    , locationBegin
    , locationEnd
    , apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: GET_HISTORY_REQUEST,
            onSuccess,
            beginDate,
            endDate,
            idTypeService,
            stateRequest,
            idCarrier,
            locationBegin,
            locationEnd,
            apiPaginationAction,
            apiPaginationCurrentPage,
            apiPaginationDirection,
            apiPaginationLimit,
            apiPaginationOrderColumn,
            apiPaginationMoveToPage,
            apiPaginationFilter
        }
    );

export const getHistoryRequestSuccess = (resultHistoryRequest) => (
    {
        type: GET_HISTORY_REQUEST_SUCCESS
        , resultHistoryRequest
    }
);

export const getHistoryRequestError = (error) => (
    {
        type: GET_HISTORY_REQUEST_ERROR
        , error
    }
);

export const getHistoryRequestExport = (
    onSuccess
    , beginDate
    , endDate
    , idTypeService
    , stateRequest
    , idCarrier
    , locationBegin
    , locationEnd
    , apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: GET_HISTORY_REQUEST_EXPORT,
            onSuccess,
            beginDate,
            endDate,
            idTypeService,
            stateRequest,
            idCarrier,
            locationBegin,
            locationEnd,
            apiPaginationAction,
            apiPaginationCurrentPage,
            apiPaginationDirection,
            apiPaginationLimit,
            apiPaginationOrderColumn,
            apiPaginationMoveToPage,
            apiPaginationFilter
        }
    );

export const getHistoryRequestExportSuccess = (resultHistoryRequestExport) => (
    {
        type: GET_HISTORY_REQUEST_SUCCESS_EXPORT
        , resultHistoryRequestExport
    }
);

export const getHistoryRequestExportError = (error) => (
    {
        type: GET_HISTORY_REQUEST_ERROR_EXPORT
        , error
    }
);
