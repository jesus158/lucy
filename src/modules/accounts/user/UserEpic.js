import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { fetchAllAccount } from 'modules/accounts/account/AccountActions.js';
import { configureUserError, configureUserSuccess, CONFIGURE_USER, findUsersError, findUsersSuccess, FIND_USER_LIST, getListTypeIdentificationError, getListTypeIdentificationSuccess, getListTypeProfileError, getListTypeProfileSuccess, getUserByEmailError, getUserByEmailSuccess, getUserByIdError, getUserByIdSuccess, GET_TYPE_LIST_IDENTIFICATION, GET_TYPE_LIST_PROFILE, GET_USER_BY_EMAIL, GET_USER_BY_ID, inactiveUserError, inactiveUserSuccess, INACTIVE_USER, loginUserError, loginUserSuccess, LOGIN_USER, sendEmailRememberAccessError, sendEmailRememberAccessSuccess, SEND_EMAIL_REMEMBER_ACCESS } from 'modules/accounts/user/UserActions.js';
import UserApi from 'modules/accounts/user/UserApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

export const findUsers = (action$, state$) => action$.pipe(
    ofType(FIND_USER_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            //axios.defaults.timeout = apiTimeout; 
            axios(UserApi.filterUser(action.apiPaginationAction
                , action.apiPaginationCurrentPage
                , action.apiPaginationDirection
                , action.apiPaginationLimit
                , action.apiPaginationOrderColumn
                , action.apiPaginationMoveToPage
                , action.apiPaginationFilter))
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        let data = response.data;
                        obs.next(findUsersSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findUsersError("Er"));
                        //obs.next(addMessage({variant:"error", message:data.message}));
                        obs.complete();
                    } else {
                        obs.next(findUsersError("Err"));
                        //obs.next(addMessage({variant:"error", message:data.message}));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findUsersError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                });
        }).pipe(catchError(error => of(findUsersError(error)
            //, addMessage({variant:"error", message:"Error"})
        )))
    )
);

export const configureUser = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_USER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(UserApi.configureUser(action.user))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureUserSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureUserError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureUserError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureUserError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureUserError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getUserById = (action$, state$) => action$.pipe(
    ofType(GET_USER_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(UserApi.getUserById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getUserByIdSuccess(data.userSystemAccount));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getUserByIdError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getUserByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getUserByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getUserByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getUserByEmail = (action$, state$) => action$.pipe(
    ofType(GET_USER_BY_EMAIL)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(UserApi.getUserByEmail(action.email))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getUserByEmailSuccess(data));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getUserByEmailError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getUserByEmailError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getUserByEmailError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getUserByEmailError(error)
            , addMessage({ variant: "error", message: "Error" })
            , action.onSuccess("ERROR")
        )))
    )
);

export const inactiveUser = (action$, state$) => action$.pipe(
    ofType(INACTIVE_USER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(UserApi.inactiveUser(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveUserSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveUserError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveUserError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveUserError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveUserError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const loginUser = (action$, state$) => action$.pipe(
    ofType(LOGIN_USER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            sessionStorage["isLogged"]=false;
            axios(UserApi.loginUser(action.login, action.byToken, action.token))
                .then(response => {
                    var data = {};
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        data = response.data;
                        sessionStorage["user"] = data.userSystem.email;
                        sessionStorage["name"] = data.userSystem.nameUser;
                        sessionStorage["isSuperManager"] = data.userSystem.isSuperManager;
                        sessionStorage["byToken"] = action.byToken;
                        sessionStorage["isLogged"]=true;  
                        
                        var accounts = [];
                        var posAccountByToken = 0;
                        if (data.userSystem.isSuperManager !== 1) {
                            accounts = data.listUserSystemAccount
                                .map((object, index) => {
                                    if (action.byToken === true) {
                                        if (object.account.id === parseInt(action.accountCode, 10)) {
                                            posAccountByToken = index;
                                        }
                                    }
                                    return (
                                        { id: object.account.id, code: object.account.schemaAccount, name: object.account.nameAccount, userAccountId: object.id, userAccountProfileId: object.profile.id, userAccountProfileName: object.profile.nameProfile, canMakeRequest: object.canMakeRequest }
                                    );
                                });

                            sessionStorage["accountId"] = accounts[posAccountByToken].id;
                            sessionStorage["accountCode"] = accounts[posAccountByToken].code;
                            sessionStorage["accountName"] = accounts[posAccountByToken].name;
                            sessionStorage["userAccountId"] = accounts[posAccountByToken].userAccountId;
                            sessionStorage["userAccountProfileId"] = accounts[posAccountByToken].userAccountProfileId;
                            sessionStorage["userAccountProfileName"] = accounts[posAccountByToken].userAccountProfileName;
                            sessionStorage["canMakeRequest"] = accounts[posAccountByToken].canMakeRequest;
                            sessionStorage["accounts"] = JSON.stringify(accounts);
                        } else {
                            sessionStorage["accountId"] = 0;
                            sessionStorage["accountCode"] = "";
                            sessionStorage["accountName"] = "";
                            sessionStorage["userAccountId"] = 0;
                            sessionStorage["userAccountProfileName"] = "Super Manager";
                            sessionStorage["userAccountProfileId"] = "4";
                            sessionStorage["canMakeRequest"] = 0;
                            sessionStorage["accounts"] = JSON.stringify(accounts);

                            obs.next(fetchAllAccount());
                        }

                        obs.next(loginUserSuccess(data.listUserSystemAccount));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(loginUserError(response));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(loginUserError(response));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(loginUserError(error));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(loginUserError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getListTypeIdentification = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_LIST_IDENTIFICATION)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(UserApi.getListTypeIdentification())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListTypeIdentificationSuccess(data.listTypeIdentification));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getListTypeIdentificationError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListTypeIdentificationError(response.data.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getListTypeIdentificationError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getListTypeIdentificationError(error)
            //  , addMessage({ variant: "error", message: "Error" })
            , action.onSuccess("ERROR")
        )))
    )
);

export const getListTypeProfile = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_LIST_PROFILE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(UserApi.getListTypeProfile())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListTypeProfileSuccess(data.listProfile));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getListTypeProfileError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getListTypeProfileError(response.data.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getListTypeProfileError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getListTypeProfileError(error)
            //  , addMessage({ variant: "error", message: "Error" })
            , action.onSuccess("ERROR")
        )))
    )
);

export const sendEmailRememberAccess = (action$, state$) => action$.pipe(
    ofType(SEND_EMAIL_REMEMBER_ACCESS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(UserApi.sendEmailRememberAccess(action.email))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(sendEmailRememberAccessSuccess());
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(sendEmailRememberAccessError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(sendEmailRememberAccessError(response.data.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(sendEmailRememberAccessError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(sendEmailRememberAccessError(error)
            //  , addMessage({ variant: "error", message: "Error" })
            , action.onSuccess("ERROR")
        )))
    )
);