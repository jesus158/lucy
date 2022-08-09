import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { GET_HOTSPOT_LIST_ACTIVE, getHostspotListActiveSuccess, getHostspotListActiveError, configureHotspotError, configureHotspotSuccess, CONFIGURE_HOTSPOT, findHotspotError, findHotspotSuccess, FIND_HOTSPOT_LIST, getHotspotByIdError, getHotspotByIdSuccess, GET_HOTSPOT_BY_ID, inactiveHotspotError, inactiveHotspotSuccess, INACTIVE_HOTSPOT } from 'modules/buttons/hotspot/HotspotActions.js';
import HotspotApi from 'modules/buttons/hotspot/HotspotApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findHotspot = (action$, state$) => action$.pipe(
    ofType(FIND_HOTSPOT_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(HotspotApi.filterHotspot(action.apiPaginationAction
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
                        obs.next(findHotspotSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findHotspotError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findHotspotError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findHotspotError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findHotspotError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureHotspot = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_HOTSPOT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(HotspotApi.configureHotspot(action.hotspot))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureHotspotSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureHotspotError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureHotspotError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureHotspotError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureHotspotError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getHotspotById = (action$, state$) => action$.pipe(
    ofType(GET_HOTSPOT_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(HotspotApi.getHotspotById(action.idHotspotCallButton))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getHotspotByIdSuccess(data.hotspotCallButton));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getHotspotByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getHotspotByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getHotspotByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getHotspotByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveHotspot = (action$, state$) => action$.pipe(
    ofType(INACTIVE_HOTSPOT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(HotspotApi.inactiveHotspot(action.idHotspotCallButton))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveHotspotSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveHotspotError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveHotspotError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveHotspotError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveHotspotError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);


export const getHostspotListActive = (action$, state$) => action$.pipe(
    ofType(GET_HOTSPOT_LIST_ACTIVE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(HotspotApi.getHostspotListActive())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getHostspotListActiveSuccess(data.listHotspotCallButton));
                       // obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getHostspotListActiveError(response.data.apiResponse.message));
                       // obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getHostspotListActiveError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getHostspotListActiveError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getHostspotListActiveError(error)
            //, addMessage({ variant: "error", message: "Error" })
            ,action.onSuccess("ERROR")
        )))
    )
);