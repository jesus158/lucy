import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { changeTwoZonesError, changeTwoZonesSuccess, CHANGE_TWO_ZONES, createUpdateZoneError, createUpdateZoneSuccess, CREATE_UPDATE_ZONE, deleteZoneError, deleteZoneSuccess, DELETE_ZONE } from 'modules/locations/zones/zoneActions.js';
import ZoneApi from 'modules/locations/zones/zoneApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const createUpdateZone = (action$, state$) => action$.pipe(
  ofType(CREATE_UPDATE_ZONE)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(ZoneApi.createUpdateZone(action.onSuccess, action.zoneUbication))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(createUpdateZoneSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(createUpdateZoneError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(createUpdateZoneError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(createUpdateZoneError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(createUpdateZoneError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);

export const changeTwoZones = (action$, state$) => action$.pipe(
  ofType(CHANGE_TWO_ZONES)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(ZoneApi.changeTwoZones(action.onSuccess, action.idZone1, action.idZone2))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(changeTwoZonesSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(changeTwoZonesError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(changeTwoZonesError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(changeTwoZonesError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(changeTwoZonesError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);

export const deleteZone = (action$, state$) => action$.pipe(
  ofType(DELETE_ZONE)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(ZoneApi.deleteZone(action.onSuccess, action.idZoneUbication))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(deleteZoneSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(deleteZoneError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(deleteZoneError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(deleteZoneError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(deleteZoneError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);
