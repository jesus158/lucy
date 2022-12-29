import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import {
    CONFIGURE_IDEAL_TIME,
    configureIdealTimeError,
    configureIdealTimeSuccess,
    FIND_IDEAL_TIME_LIST,
    findIdealTimeListError,
    findIdealTimeListSuccess, GET_LIST_ACTIVE_IDEAL_TIME,
    GET_IDEAL_TIME_BY_ID, getListActiveIdealTime, getListActiveIdealTimeError, getListActiveIdealTimeSuccess,
    getIdealTimeByIdError,
    getIdealTimeByIdSuccess,
    INACTIVE_IDEAL_TIME,
    inactiveIdealTimeError, inactiveIdealTimeSuccess, GET_LIST_ACTIVE_SHOW, getListActiveShowSuccess, getListActiveShowError
} from "./IdealTimeActions";
import IdealTimeApi from "./IdealTimeApiClient";

export const findIdealTime = (action$, state$) => action$.pipe(
        ofType(FIND_IDEAL_TIME_LIST), mergeMap(action =>
            Observable.create(obs => {
                axios.defaults.timeout = apiTimeout;
                axios(IdealTimeApi.filterIdealTime(action.apiPaginationAction, action.apiPaginationCurrentPage, action.apiPaginationDirection, action.apiPaginationLimit, action.apiPaginationOrderColumn, action.apiPaginationMoveToPage, action.apiPaginationFilter))
                    .then(response => {
                        let code = response.data.apiResponse.code;
                        if (response.status >= 200 && response.status < 300 && code === 200) {
                            let data = response.data;
                            obs.next(findIdealTimeListSuccess(data));
                            obs.complete();
                        } else if (response.status === 401) {
                            obs.next(findIdealTimeListError(response.data.apiResponse.message));
                            obs.next(addMessage({
                                variant: "error",
                                message: response.data.apiResponse.message
                            }));
                            obs.complete();
                        } else {
                            obs.next(findIdealTimeListError(response.data.apiResponse.message));
                            obs.next(addMessage({
                                variant: "error",
                                message: response.data.apiResponse.message
                            }));
                            obs.complete();
                        }
                    })
                    .catch(error => {
                        obs.next(findIdealTimeListError(error));
                        obs.next(addMessage({
                            variant: "error",
                            message: error.message
                        }));
                        obs.complete();
                    });
            }).pipe(
                catchError(error => of(findIdealTimeListError("Error"), console.warn("ERROR OBSERVABLE"), addMessage({
                    variant: "error",
                    message: "Error"
                }))))
        )
    );


export const configureIdealTime = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_IDEAL_TIME), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(IdealTimeApi.configureIdealTime(action.idealTime))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureIdealTimeSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureIdealTimeError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureIdealTimeError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureIdealTimeError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (configureIdealTimeError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getIdealTimeById = (action$, state$) => action$.pipe(
    ofType(GET_IDEAL_TIME_BY_ID), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(IdealTimeApi.getIdealTimeById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getIdealTimeByIdSuccess(data.idealTime));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getIdealTimeByIdError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(getIdealTimeByIdError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getIdealTimeByIdError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(catchError(error => of (getIdealTimeByIdError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const inactiveIdealTime = (action$, state$) => action$.pipe(
    ofType(INACTIVE_IDEAL_TIME), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(IdealTimeApi.inactiveTypeIdealTime(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveIdealTimeSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveIdealTimeError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveIdealTimeError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveIdealTimeError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (inactiveIdealTimeError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const activeIdealTime = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_IDEAL_TIME), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(IdealTimeApi.getListActiveIdealTime(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListActiveIdealTimeSuccess(data));
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getListActiveIdealTimeError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(getListActiveIdealTimeError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();

                    }
                })
                .catch(error => {
                    obs.next(getListActiveIdealTimeError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(catchError(error => of (getListActiveIdealTimeError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getListActiveShow = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_SHOW)
    , mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout;
        axios(IdealTimeApi.getListActiveIdealTimeLocations())
          .then(response => {
            let code = response.data.apiResponse.code;
            if (response.status >= 200 && response.status < 300 && code === 200) {
              let data = response.data;
              obs.next(getListActiveShowSuccess(data.listUbication));
              obs.complete();
            } else if (response.status === 401) {
              obs.next(getListActiveShowError(response.data.apiResponse.message));
              // obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
              obs.complete();
            } else {
              obs.next(getListActiveShowError(response.data.apiResponse.message));
              //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
              obs.complete();
            }
  
          })
          .catch(error => {
            obs.next(getListActiveShowError(error));
            //obs.next(addMessage({variant:"error", message:error.message}));
            obs.complete();
          });
      }).pipe(
        catchError(error => of(getListActiveShowError("Error")
          //, addMessage({variant:"error", message:"Error"})
        )))
    )
);


