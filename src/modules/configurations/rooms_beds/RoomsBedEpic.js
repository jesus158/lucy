import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { configureTypeAlertError, configureTypeAlertSuccess, CONFIGURE_TYPE_ALERT, findTypeAlertError, findTypeAlertSuccess, FIND_TYPE_ALERT_LIST, getListActiveTypeAlertError, getListActiveTypeAlertSuccess, getTypeAlertByIdError, getTypeAlertByIdSuccess, GET_LIST_ACTIVE_TYPE_ALERT, GET_TYPE_ALERT_BY_ID, inactiveTypeAlertError, inactiveTypeAlertSuccess, INACTIVE_TYPE_ALERT } from 'modules/configurations/type_alerts/TypeAlertsActions.js';
import RoomsBedApi from "modules/configurations/rooms_beds/RoomsBedApiClient.js";
import {findRoomBedListError, findRoomBedListSuccess} from "./RoomsBedActions";

export const findRoomBed = (action$, state$) => {
    console.log('$action', action$)
    return action$.pipe(
        ofType(FIND_TYPE_ALERT_LIST), mergeMap(action =>
            Observable.create(obs => {
                axios.defaults.timeout = apiTimeout;
                console.log('find room')
                axios(RoomsBedApi.filterRoomBed(action.apiPaginationAction, action.apiPaginationCurrentPage, action.apiPaginationDirection, action.apiPaginationLimit, action.apiPaginationOrderColumn, action.apiPaginationMoveToPage, action.apiPaginationFilter))
                    .then(response => {
                        let code = response.data.apiResponse.code;
                        if (response.status >= 200 && response.status < 300 && code === 200) {
                            let data = response.data;
                            obs.next(findRoomBedListSuccess(data));
                            obs.complete();
                        } else if (response.status === 401) {
                            obs.next(findRoomBedListError(response.data.apiResponse.message));
                            obs.next(addMessage({
                                variant: "error",
                                message: response.data.apiResponse.message
                            }));
                            obs.complete();
                        } else {
                            obs.next(findRoomBedListError(response.data.apiResponse.message));
                            obs.next(addMessage({
                                variant: "error",
                                message: response.data.apiResponse.message
                            }));
                            obs.complete();
                        }
                    })
                    .catch(error => {
                        obs.next(findTypeAlertError(error));
                        obs.next(addMessage({
                            variant: "error",
                            message: error.message
                        }));
                        obs.complete();
                    });
            }).pipe(
                catchError(error => of(findTypeAlertError("Error"), console.warn("ERROR OBSERVABLE"), addMessage({
                    variant: "error",
                    message: "Error"
                }))))
        )
    );
}

export const configureRoomBed = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_ALERT), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.configureTypeAlert(action.typeAlert))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeAlertSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeAlertError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeAlertError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeAlertError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (configureTypeAlertError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getRoomBedById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_ALERT_BY_ID), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.getTypeAlertById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeAlertByIdSuccess(data.typeAlert));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeAlertByIdError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(getTypeAlertByIdError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeAlertByIdError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(catchError(error => of (getTypeAlertByIdError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const inactiveRoomBed = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_ALERT), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.inactiveTypeAlert(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeAlertSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeAlertError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (inactiveTypeAlertError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getListActiveRoomBed = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_TYPE_ALERT), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.getListActiveTypeAlert())
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
                    //action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (getListActiveTypeAlertError(error)
            // , addMessage({variant:"error", message:"Error"})
        )))
    )
);