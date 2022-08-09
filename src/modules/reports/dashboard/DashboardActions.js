export const GET_NUMBER_REQUEST = 'GET_NUMBER_REQUEST';
export const GET_NUMBER_REQUEST_SUCCESS = 'GET_NUMBER_REQUEST_SUCCESS';
export const GET_NUMBER_REQUEST_ERROR = 'GET_NUMBER_REQUEST_ERROR';



/******************************
 * Estados de las solicitudes
 ******************************/

export const getNumberRequests = (onSuccess) => (
    {
        type: GET_NUMBER_REQUEST,
        onSuccess
    }
);

export const getNumberRequestsSuccess = (numberRequests) => (
    {
        type: GET_NUMBER_REQUEST_SUCCESS
        , numberRequests
    }
);

export const getNumberRequestsError = (error) => (
    {
        type: GET_NUMBER_REQUEST_ERROR
        , error
    }
);
