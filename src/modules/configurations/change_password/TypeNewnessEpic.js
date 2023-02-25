import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureTypeNewnessError,
    configureTypeNewnessSuccess,
    CONFIGURE_TYPE_NEWNESS,
    findTypeNewnessError,
    findTypeNewnessSuccess,
    FIND_TYPE_NEWNESS_LIST,
    getActiveListTypeNewnessError,
    getActiveListTypeNewnessSuccess,
    getListRequestTypeNewnessError,
    getListRequestTypeNewnessSuccess,
    getTypeNewnessByIdError,
    getTypeNewnessByIdSuccess,
    GET_ACTIVE_LIST_TYPE_NEWNESS,
    GET_LIST_REQUEST_TYPE_NEWNESS,
    GET_TYPE_NEWNESS_BY_ID,
    inactiveTypeNewnessError,
    inactiveTypeNewnessSuccess,
    INACTIVE_TYPE_NEWNESS } from 'modules/configurations/type_newness/TypeNewnessActions.js';
import TypeNewnessApiClient from 'modules/configurations/type_newness/TypeNewnessApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import {CARRIER_NEWNESS_SHIFT, carrierNewnessShiftSuccess, carrierNewnessShiftError} from "../../requests/RequestActions";
import TypeNewnessApi from "modules/configurations/type_newness/TypeNewnessApiClient.js";


export const findTypeNewness = (action$, state$) => action$.pipe(
    ofType(FIND_TYPE_NEWNESS_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeNewnessApiClient.filterTypeNewness(action.apiPaginationAction
                , action.apiPaginationCurrentPage
                , action.apiPaginationDirection
                , action.apiPaginationLimit
                , action.apiPaginationOrderColumn
                , action.apiPaginationMoveToPage
                , action.apiPaginationFilter))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(findTypeNewnessSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findTypeNewnessError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findTypeNewnessError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findTypeNewnessError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findTypeNewnessError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTypeNewness = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_NEWNESS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeNewnessApiClient.configureTypeNewness(action.typeNewness))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeNewnessSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeNewnessError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeNewnessError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeNewnessError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTypeNewnessError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getTypeNewnessById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_NEWNESS_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeNewnessApiClient.getTypeNewnessById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeNewnessByIdSuccess(data.typeNewness));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeNewnessByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTypeNewnessByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeNewnessByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getTypeNewnessByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTypeNewness = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_NEWNESS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeNewnessApiClient.inactiveTypeNewness(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeNewnessSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeNewnessError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeNewnessError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeNewnessError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTypeNewnessError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getActiveListTypeNewness = (action$, state$) => action$.pipe(
    ofType(GET_ACTIVE_LIST_TYPE_NEWNESS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeNewnessApiClient.getActiveListTypeNewness(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getActiveListTypeNewnessSuccess(data.listTypeNewness));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getActiveListTypeNewnessError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getActiveListTypeNewnessError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getActiveListTypeNewnessError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getActiveListTypeNewnessError(error)
            //, addMessage({variant:"error", message:"Error"})
        )))
    )
);

//Lista las novedades asociadas a una solicitud

export const getListRequestTypeNewness = (action$, state$) => action$.pipe(
    ofType(GET_LIST_REQUEST_TYPE_NEWNESS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeNewnessApiClient.getListRequestTypeNewness(action.onSuccess, action.idRequest))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListRequestTypeNewnessSuccess(data.listTypeNewness));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getListRequestTypeNewnessError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListRequestTypeNewnessError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getListRequestTypeNewnessError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    // action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getListRequestTypeNewnessError(error)
            //, addMessage({variant:"error", message:"Error"})
        )))
    )
);



/**
 * Ejecuta el consumo del servicio que permite
 * tomar una novedad del turno del operador
 * @param {*} action$
 * @param {*} state$
 */
export const carrierNewnessShift = (action$, state$) => action$.pipe(
    ofType(CARRIER_NEWNESS_SHIFT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeNewnessApi.carrierNewnessShift(action.onSuccess, action.idTypeNewness, action.idRequest))
                .then(response => {
                    console.log(response)
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(carrierNewnessShiftSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.next(carrierNewnessShiftError(response.data.apiResponse.message));
                        obs.complete();
                        action.onSuccess("error");
                    } else {
                        obs.next(carrierNewnessShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(carrierNewnessShiftError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(carrierNewnessShiftError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);