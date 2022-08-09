import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureTypeCancellationError, configureTypeCancellationSuccess, CONFIGURE_TYPE_CANCELLATION, findTypeCancellationError, findTypeCancellationSuccess, FIND_TYPE_CANCELLATION_LIST, getListActiveTypeCancellationError, getListActiveTypeCancellationSuccess, getTypeCancellationByIdError, getTypeCancellationByIdSuccess, GET_LIST_ACTIVE_TYPE_CANCELLATION, GET_TYPE_CANCELLATION_BY_ID, inactiveTypeCancellationError, inactiveTypeCancellationSuccess, INACTIVE_TYPE_CANCELLATION } from 'modules/configurations/type_cancellation/TypeCancellationActions.js';
import TypeCancellationApiClient from 'modules/configurations/type_cancellation/TypeCancellationApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findTypeCancellation = (action$, state$) => action$.pipe(
    ofType(FIND_TYPE_CANCELLATION_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeCancellationApiClient.filterTypeCancellation(action.apiPaginationAction
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
                        obs.next(findTypeCancellationSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findTypeCancellationError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findTypeCancellationError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findTypeCancellationError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findTypeCancellationError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTypeCancellation = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_CANCELLATION)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeCancellationApiClient.configureTypeCancellation(action.typeCancellation))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeCancellationSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeCancellationError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeCancellationError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeCancellationError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTypeCancellationError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getTypeCancellationById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_CANCELLATION_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeCancellationApiClient.getTypeCancellationById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeCancellationByIdSuccess(data.typeCancellation));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeCancellationByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTypeCancellationByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeCancellationByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getTypeCancellationByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTypeCancellation = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_CANCELLATION)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeCancellationApiClient.inactiveTypeCancellation(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeCancellationSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeCancellationError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeCancellationError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeCancellationError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTypeCancellationError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getListActiveTypeCancellation = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_TYPE_CANCELLATION)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeCancellationApiClient.getListActiveTypeCancellation(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListActiveTypeCancellationSuccess(data.listTypeCancellation));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getListActiveTypeCancellationError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListActiveTypeCancellationError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getListActiveTypeCancellationError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getListActiveTypeCancellationError(error)
            //, addMessage({ variant: "error", message: "Error" })
        )))
    )
);