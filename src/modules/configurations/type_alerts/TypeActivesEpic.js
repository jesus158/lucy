import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import TypeAssetApi from 'modules/configurations/type_alerts/TypeActivesApiClient.js';
import { configureTypeAssetError, configureTypeAssetSuccess, CONFIGURE_TYPE_ASSET, findTypeAssetError, findTypeAssetSuccess, FIND_TYPE_ASSET_LIST, getListActiveTypeAlertError, getListActiveTypeAlertSuccess, getTypeAssetByIdError, getTypeAssetByIdSuccess, GET_LIST_ACTIVE_TYPE_ASSET, GET_TYPE_ASSET_BY_ID, inactiveTypeAssetError, inactiveTypeAssetSuccess, INACTIVE_TYPE_ASSET } from 'modules/configurations/type_actives/TypeActivesActions.js';

export const findTypeAsset = (action$, state$) => action$.pipe(
    ofType(FIND_TYPE_ASSET_LIST), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAssetApi.filterTypeAsset(action.apiPaginationAction, action.apiPaginationCurrentPage, action.apiPaginationDirection, action.apiPaginationLimit, action.apiPaginationOrderColumn, action.apiPaginationMoveToPage, action.apiPaginationFilter))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(findTypeAssetSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findTypeAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(findTypeAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(findTypeAssetError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of (findTypeAssetError("Error"), console.warn("ERROR OBSERVABLE"), addMessage({
                variant: "error",
                message: "Error"
            }))))
    )
);

export const configureTypeAsset = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_ASSET), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAssetApi.configureTypeAsset(action.typeAsset))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeAssetSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeAssetError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeAssetError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeAssetError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (configureTypeAssetError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getTypeAssetById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_ASSET_BY_ID), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAssetApi.getTypeAssetById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeAssetByIdSuccess(data.typeAsset));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeAssetByIdError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(getTypeAssetByIdError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeAssetByIdError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(catchError(error => of (getTypeAssetByIdError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const inactiveTypeAsset = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_ASSET), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAssetApi.inactiveTypeAsset(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeAssetSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeAssetError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (inactiveTypeAssetError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getListActiveTypeAlert = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_TYPE_ASSET), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAssetApi.getListActiveTypeAlert())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListActiveTypeAlertSuccess(data.listTypeAlert));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getListActiveTypeAlertError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListActiveTypeAlertError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getListActiveTypeAlertError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (getListActiveTypeAlertError(error)
            // , addMessage({variant:"error", message:"Error"})
        )))
    )
);
