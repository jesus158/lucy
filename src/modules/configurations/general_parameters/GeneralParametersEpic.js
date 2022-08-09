import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureNumberAttentionsHighPriorityWaitingError, configureNumberAttentionsHighPriorityWaitingSuccess, configureNumberAttentionsLowPriorityWaitingError, configureNumberAttentionsLowPriorityWaitingSuccess, configureNumberAttentionsMediumPriorityWaitingError, configureNumberAttentionsMediumPriorityWaitingSuccess, configureTimeAlertCarrierInactivityError, configureTimeAlertCarrierInactivitySuccess, configureTimeAlertFinalizeRequestError, configureTimeAlertFinalizeRequestSuccess, configureTimeAlertServiceWithoutCarrierError, configureTimeAlertServiceWithoutCarrierSuccess, CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING, CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING, CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING, CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY, CONFIGURE_TIME_ALERT_FINALIZE_REQUEST, CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER, getNumberAttentionsHighPriorityWaitingError, getNumberAttentionsHighPriorityWaitingSuccess, getNumberAttentionsLowPriorityWaitingError, getNumberAttentionsLowPriorityWaitingSuccess, getNumberAttentionsMediumPriorityWaitingError, getNumberAttentionsMediumPriorityWaitingSuccess, getTimeAlertCarrierInactivityError, getTimeAlertCarrierInactivitySuccess, getTimeAlertFinalizeRequestError, getTimeAlertFinalizeRequestSuccess, getTimeAlertServiceWithoutCarrierError, getTimeAlertServiceWithoutCarrierSuccess, GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING, GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING, GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING, GET_TIME_ALERT_CARRIER_INACTIVITY, GET_TIME_ALERT_FINALIZE_REQUEST, GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER, inactiveNumberAttentionsHighPriorityWaitingError, inactiveNumberAttentionsHighPriorityWaitingSuccess, inactiveNumberAttentionsLowPriorityWaitingError, inactiveNumberAttentionsLowPriorityWaitingSuccess, inactiveNumberAttentionsMediumPriorityWaitingError, inactiveNumberAttentionsMediumPriorityWaitingSuccess, inactiveTimeAlertCarrierInactivityError, inactiveTimeAlertCarrierInactivitySuccess, inactiveTimeAlertFinalizeRequestError, inactiveTimeAlertFinalizeRequestSuccess, inactiveTimeAlertServiceWithoutCarrierError, inactiveTimeAlertServiceWithoutCarrierSuccess, INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING, INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING, INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING, INACTIVE_TIME_ALERT_CARRIER_INACTIVITY, INACTIVE_TIME_ALERT_FINALIZE_REQUEST, INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER } from 'modules/configurations/general_parameters/GeneralParametersActions.js';
import GeneralParametersApiClient from 'modules/configurations/general_parameters/GeneralParametersApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


/**************************************
 * TIME_ALERT_SERVICE_WITHOUT_CARRIER *
 **************************************/

export const getTimeAlertServiceWithoutCarrier = (action$, state$) => action$.pipe(
    ofType(GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.getTimeAlertServiceWithoutCarrier())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTimeAlertServiceWithoutCarrierSuccess(data.timeAlertServiceWithoutCarrier));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTimeAlertServiceWithoutCarrierError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTimeAlertServiceWithoutCarrierError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTimeAlertServiceWithoutCarrierError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(getTimeAlertServiceWithoutCarrierError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTimeAlertServiceWithoutCarrier = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.configureTimeAlertServiceWithoutCarrier(action.timeAlertServiceWithoutCarrier))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTimeAlertServiceWithoutCarrierSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTimeAlertServiceWithoutCarrierError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTimeAlertServiceWithoutCarrierError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTimeAlertServiceWithoutCarrierError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTimeAlertServiceWithoutCarrierError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTimeAlertServiceWithoutCarrier = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.inactiveTimeAlertServiceWithoutCarrier())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {

                        obs.next(inactiveTimeAlertServiceWithoutCarrierSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTimeAlertServiceWithoutCarrierError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTimeAlertServiceWithoutCarrierError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTimeAlertServiceWithoutCarrierError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTimeAlertServiceWithoutCarrierError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);


/*******************************
 * TIME_ALERT_FINALIZE_REQUEST *
 *******************************/

export const getTimeAlertFinalizeRequest = (action$, state$) => action$.pipe(
    ofType(GET_TIME_ALERT_FINALIZE_REQUEST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.getTimeAlertFinalizeRequest())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTimeAlertFinalizeRequestSuccess(data.timeAlertFinalizeRequest));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTimeAlertFinalizeRequestError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTimeAlertFinalizeRequestError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTimeAlertFinalizeRequestError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(getTimeAlertFinalizeRequestError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTimeAlertFinalizeRequest = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TIME_ALERT_FINALIZE_REQUEST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.configureTimeAlertFinalizeRequest(action.timeAlertFinalizeRequest))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTimeAlertFinalizeRequestSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTimeAlertFinalizeRequestError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTimeAlertFinalizeRequestError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTimeAlertFinalizeRequestError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTimeAlertFinalizeRequestError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTimeAlertFinalizeRequest = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TIME_ALERT_FINALIZE_REQUEST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.inactiveTimeAlertFinalizeRequest())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {

                        obs.next(inactiveTimeAlertFinalizeRequestSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTimeAlertFinalizeRequestError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTimeAlertFinalizeRequestError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTimeAlertFinalizeRequestError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTimeAlertFinalizeRequestError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

/*********************************
 * TIME_ALERT_CARRIER_INACTIVITY *
 *********************************/

export const getTimeAlertCarrierInactivity = (action$, state$) => action$.pipe(
    ofType(GET_TIME_ALERT_CARRIER_INACTIVITY)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.getTimeAlertCarrierInactivity())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTimeAlertCarrierInactivitySuccess(data.timeAlertCarrierInactivity));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTimeAlertCarrierInactivityError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTimeAlertCarrierInactivityError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTimeAlertCarrierInactivityError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(getTimeAlertCarrierInactivityError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTimeAlertCarrierInactivity = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.configureTimeAlertCarrierInactivity(action.timeAlertCarrierInactivity))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTimeAlertCarrierInactivitySuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTimeAlertCarrierInactivityError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTimeAlertCarrierInactivityError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTimeAlertCarrierInactivityError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTimeAlertCarrierInactivityError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTimeAlertCarrierInactivity = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TIME_ALERT_CARRIER_INACTIVITY)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.inactiveTimeAlertCarrierInactivity())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {

                        obs.next(inactiveTimeAlertCarrierInactivitySuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTimeAlertCarrierInactivityError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTimeAlertCarrierInactivityError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTimeAlertCarrierInactivityError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTimeAlertCarrierInactivityError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

/*******************************************
 * NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING *
 *******************************************/

export const getNumberAttentionsHighPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.getNumberAttentionsHighPriorityWaiting())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getNumberAttentionsHighPriorityWaitingSuccess(data.numberAttentionsHighPriorityWaiting));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getNumberAttentionsHighPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getNumberAttentionsHighPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getNumberAttentionsHighPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(getNumberAttentionsHighPriorityWaitingError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureNumberAttentionsHighPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.configureNumberAttentionsHighPriorityWaiting(action.numberAttentionsHighPriorityWaiting))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureNumberAttentionsHighPriorityWaitingSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureNumberAttentionsHighPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureNumberAttentionsHighPriorityWaitingError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureNumberAttentionsHighPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureNumberAttentionsHighPriorityWaitingError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveNumberAttentionsHighPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.inactiveNumberAttentionsHighPriorityWaiting())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {

                        obs.next(inactiveNumberAttentionsHighPriorityWaitingSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveNumberAttentionsHighPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveNumberAttentionsHighPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveNumberAttentionsHighPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveNumberAttentionsHighPriorityWaitingError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

/*********************************************
 * NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING *
 *********************************************/

export const getNumberAttentionsMediumPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.getNumberAttentionsMediumPriorityWaiting())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getNumberAttentionsMediumPriorityWaitingSuccess(data.numberAttentionsMediumPriorityWaiting));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getNumberAttentionsMediumPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getNumberAttentionsMediumPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getNumberAttentionsMediumPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(getNumberAttentionsMediumPriorityWaitingError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureNumberAttentionsMediumPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.configureNumberAttentionsMediumPriorityWaiting(action.numberAttentionsMediumPriorityWaiting))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureNumberAttentionsMediumPriorityWaitingSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureNumberAttentionsMediumPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureNumberAttentionsMediumPriorityWaitingError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureNumberAttentionsMediumPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureNumberAttentionsMediumPriorityWaitingError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveNumberAttentionsMediumPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.inactiveNumberAttentionsMediumPriorityWaiting())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {

                        obs.next(inactiveNumberAttentionsMediumPriorityWaitingSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveNumberAttentionsMediumPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveNumberAttentionsMediumPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveNumberAttentionsMediumPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveNumberAttentionsMediumPriorityWaitingError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

/******************************************
 * NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING *
 ******************************************/

export const getNumberAttentionsLowPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.getNumberAttentionsLowPriorityWaiting())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getNumberAttentionsLowPriorityWaitingSuccess(data.numberAttentionsLowPriorityWaiting));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getNumberAttentionsLowPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getNumberAttentionsLowPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getNumberAttentionsLowPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(getNumberAttentionsLowPriorityWaitingError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureNumberAttentionsLowPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.configureNumberAttentionsLowPriorityWaiting(action.numberAttentionsLowPriorityWaiting))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureNumberAttentionsLowPriorityWaitingSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureNumberAttentionsLowPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureNumberAttentionsLowPriorityWaitingError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureNumberAttentionsLowPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureNumberAttentionsLowPriorityWaitingError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveNumberAttentionsLowPriorityWaiting = (action$, state$) => action$.pipe(
    ofType(INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(GeneralParametersApiClient.inactiveNumberAttentionsLowPriorityWaiting())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {

                        obs.next(inactiveNumberAttentionsLowPriorityWaitingSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveNumberAttentionsLowPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveNumberAttentionsLowPriorityWaitingError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveNumberAttentionsLowPriorityWaitingError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveNumberAttentionsLowPriorityWaitingError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);