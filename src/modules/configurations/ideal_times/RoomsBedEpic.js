import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import RoomsBedApi from "modules/configurations/rooms_beds/RoomsBedApiClient.js";
import {
    CONFIGURE_ROOM_BED,
    configureRoomBedError,
    configureRoomBedSuccess,
    FIND_ROOM_BED_LIST,
    findRoomBedListError,
    findRoomBedListSuccess, GET_LIST_ACTIVE_ROOM_BED,
    GET_ROOM_BED_BY_ID, getListActiveRoomBed, getListActiveRoomBedError, getListActiveRoomBedSuccess,
    getRoomBedByIdError,
    getRoomBedByIdSuccess,
    INACTIVE_ROOM_BED,
    inactiveRoomBedError, inactiveRoomBedSuccess, GET_LIST_ACTIVE_SHOW, getListActiveShowSuccess, getListActiveShowError
} from "./RoomsBedActions";

export const findRoomBed = (action$, state$) => action$.pipe(
        ofType(FIND_ROOM_BED_LIST), mergeMap(action =>
            Observable.create(obs => {
                axios.defaults.timeout = apiTimeout;
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
                        obs.next(findRoomBedListError(error));
                        obs.next(addMessage({
                            variant: "error",
                            message: error.message
                        }));
                        obs.complete();
                    });
            }).pipe(
                catchError(error => of(findRoomBedListError("Error"), console.warn("ERROR OBSERVABLE"), addMessage({
                    variant: "error",
                    message: "Error"
                }))))
        )
    );


export const configureRoomBed = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_ROOM_BED), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.configureRoomBed(action.roomBed))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureRoomBedSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureRoomBedError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureRoomBedError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureRoomBedError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (configureRoomBedError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const getRoomBedById = (action$, state$) => action$.pipe(
    ofType(GET_ROOM_BED_BY_ID), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.getRoomBedById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getRoomBedByIdSuccess(data.roomBed));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getRoomBedByIdError(""));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(getRoomBedByIdError(response.data.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getRoomBedByIdError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(catchError(error => of (getRoomBedByIdError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const inactiveRoomBed = (action$, state$) => action$.pipe(
    ofType(INACTIVE_ROOM_BED), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.inactiveTypeRoomBed(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveRoomBedSuccess());
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveRoomBedError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveRoomBedError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveRoomBedError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of (inactiveRoomBedError(error), addMessage({
            variant: "error",
            message: "Error"
        }))))
    )
);

export const activeRoomBed = (action$, state$) => action$.pipe(
    ofType(GET_LIST_ACTIVE_ROOM_BED), mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(RoomsBedApi.getListActiveRoomBed(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListActiveRoomBedSuccess(data));
                        obs.next(addMessage({
                            variant: "success",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getListActiveRoomBedError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();
                    } else {
                        obs.next(getListActiveRoomBedError(response.data.apiResponse.message));
                        obs.next(addMessage({
                            variant: "error",
                            message: response.data.apiResponse.message
                        }));
                        obs.complete();

                    }
                })
                .catch(error => {
                    obs.next(getListActiveRoomBedError(error));
                    obs.next(addMessage({
                        variant: "error",
                        message: error.message
                    }));
                    obs.complete();
                });
        }).pipe(catchError(error => of (getListActiveRoomBedError(error), addMessage({
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
        axios(RoomsBedApi.getListActiveRoomBedLocations())
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


