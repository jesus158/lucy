import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { configureTypeRejectError, configureTypeRejectSuccess, CONFIGURE_TYPE_REJECT, findTypeRejectError, findTypeRejectSuccess, FIND_TYPE_REJECT_LIST, getListActiveTypeRejectError, getListActiveTypeRejectSuccess, getTypeRejectByIdError, getTypeRejectByIdSuccess, GET_LIST_ACTIVE_TYPE_REJECT, GET_TYPE_REJECT_BY_ID, inactiveTypeRejectError, inactiveTypeRejectSuccess, INACTIVE_TYPE_REJECT } from 'modules/configurations/type_reject/TypeRejectActions.js';
import TypeRejectApiClient from 'modules/configurations/type_reject/TypeRejectApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil.js';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findTypeReject = (action$, state$) => action$.pipe(
    ofType(FIND_TYPE_REJECT_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeRejectApiClient.filterTypeReject(action.apiPaginationAction
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
                        obs.next(findTypeRejectSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findTypeRejectError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findTypeRejectError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findTypeRejectError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findTypeRejectError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTypeReject = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_REJECT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeRejectApiClient.configureTypeReject(action.typeReject))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeRejectSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeRejectError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeRejectError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeRejectError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTypeRejectError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getTypeRejectById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_REJECT_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeRejectApiClient.getTypeRejectById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeRejectByIdSuccess(data.typeReject));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeRejectByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTypeRejectByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeRejectByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getTypeRejectByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTypeReject = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_REJECT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeRejectApiClient.inactiveTypeReject(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeRejectSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeRejectError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeRejectError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeRejectError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTypeRejectError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

/**
 * Lista los tipos de rechazos activos
 * @param {*} action$ 
 * @param {*} state$ 
 */
export const getListActiveTypeReject = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_TYPE_REJECT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeRejectApiClient.getListActiveTypeReject(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListActiveTypeRejectSuccess(data.listTypeReject));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getListActiveTypeRejectError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListActiveTypeRejectError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getListActiveTypeRejectError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getListActiveTypeRejectError(error)
            //, addMessage({variant:"error", message:"Error"})
        )))
    )
);