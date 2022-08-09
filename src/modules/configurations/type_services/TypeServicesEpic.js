import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureTypeServiceError, configureTypeServiceSuccess, CONFIGURE_TYPE_SERVICE, findTypeServiceError, findTypeServiceSuccess, FIND_TYPE_SERVICE_LIST, getListActiveTypeServiceError, getListActiveTypeServiceSuccess, getTypeServiceByIdError, getTypeServiceByIdSuccess, GET_LIST_ACTIVE_TYPE_SERVICE, GET_TYPE_SERVICE_BY_ID, inactiveTypeServiceError, inactiveTypeServiceSuccess, INACTIVE_TYPE_SERVICE } from 'modules/configurations/type_services/TypeServicesActions.js';
import TypeServicesApi from 'modules/configurations/type_services/TypeServicesApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findTypeService = (action$, state$) => action$.pipe(
    ofType(FIND_TYPE_SERVICE_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeServicesApi.filterTypeService(action.apiPaginationAction
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
                        obs.next(findTypeServiceSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findTypeServiceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findTypeServiceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findTypeServiceError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findTypeServiceError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTypeService = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_SERVICE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeServicesApi.configureTypeService(action.typeService))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeServiceSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeServiceError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeServiceError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeServiceError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTypeServiceError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getTypeServiceById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_SERVICE_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeServicesApi.getTypeServiceById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeServiceByIdSuccess(data.typeService));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeServiceByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTypeServiceByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeServiceByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getTypeServiceByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTypeService = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_SERVICE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeServicesApi.inactiveTypeService(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeServiceSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeServiceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeServiceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeServiceError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTypeServiceError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getListActiveTypeService = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_TYPE_SERVICE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeServicesApi.getListActiveTypeService())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListActiveTypeServiceSuccess(data.listTypeService));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getListActiveTypeServiceError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListActiveTypeServiceError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getListActiveTypeServiceError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getListActiveTypeServiceError(error)
            // , addMessage({variant:"error", message:"Error"})
        )))
    )
);