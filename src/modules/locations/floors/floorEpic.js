import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { changeTwoFloorsError, changeTwoFloorsSuccess, CHANGE_TWO_FLOORS, createUpdateFloorError, createUpdateFloorSuccess, CREATE_UPDATE_FLOOR, deleteFloorError, deleteFloorSuccess, DELETE_FLOOR } from 'modules/locations/floors/floorActions.js';
import FloorApi from 'modules/locations/floors/floorApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil.js';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const createUpdateFloor = (action$, state$) => action$.pipe(
  ofType(CREATE_UPDATE_FLOOR)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(FloorApi.createUpdateFloor(action.onSuccess, action.FloorUbication))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(createUpdateFloorSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(createUpdateFloorError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(createUpdateFloorError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(createUpdateFloorError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(createUpdateFloorError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);

export const changeTwoFloors = (action$, state$) => action$.pipe(
  ofType(CHANGE_TWO_FLOORS)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(FloorApi.changeTwoFloors(action.onSuccess, action.idFloor1, action.idFloor2))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(changeTwoFloorsSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(changeTwoFloorsError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(changeTwoFloorsError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(changeTwoFloorsError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(changeTwoFloorsError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);

export const deleteFloor = (action$, state$) => action$.pipe(
  ofType(DELETE_FLOOR)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(FloorApi.deleteFloor(action.onSuccess, action.idFloorUbication))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(deleteFloorSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(deleteFloorError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(deleteFloorError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(deleteFloorError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(deleteFloorError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);
