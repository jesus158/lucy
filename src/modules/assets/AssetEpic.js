import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import AssetApi from 'modules/assets/AssetApiClient.js';
import { configureAssetError, configureAssetSuccess, 
    CONFIGURE_ASSET,GET_TYPE_ASSET_LIST, findAssetError, findAssetSuccess, FIND_ASSET_LIST, 
    getListActiveAssetError, getListActiveAssetSuccess, getAssetByIdError, getAssetByIdSuccess, 
    GET_LIST_ACTIVE_ASSET, GET_ASSET_BY_ID, inactiveAssetError, inactiveAssetSuccess, INACTIVE_ASSET, getListAssetTypeError, getListAssetTypeSuccess} 
    from 'modules/assets/AssetActions.js';

export const findAsset = (action$, state$) => action$.pipe(
    ofType(FIND_ASSET_LIST), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AssetApi.filterAsset(action.apiPaginationAction, action.apiPaginationCurrentPage, action.apiPaginationDirection, action.apiPaginationLimit, action.apiPaginationOrderColumn, action.apiPaginationMoveToPage, action.apiPaginationFilter))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(findAssetSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(findAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(findAssetError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of (findAssetError("Error"), console.warn("ERROR OBSERVABLE"), addMessage({
                variant: "error",
                message: "Error"
            }))))
    )
);

export const configureAsset = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_ASSET), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AssetApi.configureAsset(action.asset))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureAssetSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureAssetError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureAssetError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureAssetError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (configureAssetError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getAssetById = (action$, state$) => action$.pipe(
    ofType(GET_ASSET_BY_ID), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AssetApi.getAssetById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getAssetByIdSuccess(data.asset));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getAssetByIdError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(getAssetByIdError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getAssetByIdError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(catchError(error => of (getAssetByIdError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const inactiveAsset = (action$, state$) => action$.pipe(
    ofType(INACTIVE_ASSET), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AssetApi.inactiveAsset(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveAssetSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveAssetError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveAssetError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (inactiveAssetError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getListActiveAsset = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_ASSET), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AssetApi.getListActiveAsset())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListActiveAssetSuccess(data.listAsset));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getListActiveAssetError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListActiveAssetError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getListActiveAssetError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (getListActiveAssetError(error)
            // , addMessage({variant:"error", message:"Error"})
        )))
    )
);

export const getListTypeAsset = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_ASSET_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AssetApi.getListActiveTypeAsset())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    console.log(code)
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        console.log(data)
                        obs.next(getListAssetTypeSuccess(data.listTypeAsset));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getListAssetTypeError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListAssetTypeError(response.data.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getListAssetTypeError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                    console.log("error axios")
                });
        }).pipe(catchError(error => of(getListAssetTypeError(error)
            //  , addMessage({ variant: "error", message: "Error" })
            , console.log("error observable")
            , action.onSuccess("ERROR")
        )))
    )
);