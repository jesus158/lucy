
export const FIND_USER_LIST = 'FIND_USER_LIST';
export const FIND_USER_LIST_SUCCESS = 'FIND_USER_LIST_SUCCESS';
export const FIND_USER_LIST_ERROR = 'FIND_USER_LIST_ERROR';

export const CONFIGURE_USER = 'CONFIGURE_USER';
export const CONFIGURE_USER_SUCCESS = 'CONFIGURE_USER_SUCCESS';
export const CONFIGURE_USER_ERROR = 'CONFIGURE_USER_ERROR';

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_ERROR = 'GET_USER_BY_ID_ERROR';

export const GET_USER_BY_EMAIL = 'GET_USER_BY_EMAIL';
export const GET_USER_BY_EMAIL_SUCCESS = 'GET_USER_BY_EMAIL_SUCCESS';
export const GET_USER_BY_EMAIL_ERROR = 'GET_USER_BY_EMAIL_ERROR';

export const INVITE_USER = 'INVITE_USER';
export const INVITE_USER_SUCCESS = 'INVITE_USER_SUCCESS';
export const INVITE_USER_ERROR = 'INVITE_USER_ERROR';

export const INACTIVE_USER = 'INACTIVE_USER';
export const INACTIVE_USER_SUCCESS = 'INACTIVE_USER_SUCCESS';
export const INACTIVE_USER_ERROR = 'INACTIVE_USER_ERROR';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const GET_TYPE_LIST_IDENTIFICATION = 'GET_TYPE_LIST_IDENTIFICATION';
export const GET_TYPE_LIST_IDENTIFICATION_SUCCESS = 'GET_TYPE_LIST_IDENTIFICATION_SUCCESS';
export const GET_TYPE_LIST_IDENTIFICATION_ERROR = 'GET_TYPE_LIST_IDENTIFICATION_ERROR';

export const GET_TYPE_LIST_PROFILE = 'GET_TYPE_LIST_PROFILE';
export const GET_TYPE_LIST_PROFILE_SUCCESS = 'GET_TYPE_LIST_PROFILE_SUCCESS';
export const GET_TYPE_LIST_PROFILE_ERROR = 'GET_TYPE_LIST_PROFILE_ERROR';

export const SEND_EMAIL_REMEMBER_ACCESS = 'SEND_EMAIL_REMEMBER_ACCESS'
export const SEND_EMAIL_REMEMBER_ACCESS_SUCCESS = 'SEND_EMAIL_REMEMBER_ACCESS_SUCCESS'
export const SEND_EMAIL_REMEMBER_ACCESS_ERROR = 'SEND_EMAIL_REMEMBER_ACCESS_ERROR'

export const SET_USER = 'SET_USER';

export const SET_MENU_USER = 'SET_MENU_USER';


/*********************
 * Filtrar  usuarios *
 *********************/

export const findUsers = (apiPaginationAction
  , apiPaginationCurrentPage
  , apiPaginationDirection
  , apiPaginationLimit
  , apiPaginationOrderColumn
  , apiPaginationMoveToPage
  , apiPaginationFilter) => (
    {
      type: FIND_USER_LIST
      , apiPaginationAction
      , apiPaginationCurrentPage
      , apiPaginationDirection
      , apiPaginationLimit
      , apiPaginationOrderColumn
      , apiPaginationMoveToPage
      , apiPaginationFilter
    }
  );

export const findUsersSuccess = (listResultSetUser) => (
  {
    type: FIND_USER_LIST_SUCCESS
    , listResultSetUser
  }
);

export const findUsersError = (error) => (
  {
    type: FIND_USER_LIST_ERROR
    , error
  }
);

/*********************
 * Manejo de usuario *
 *********************/

export const configureUser = (user, ownProps, onSuccess) => (
  {
    type: CONFIGURE_USER
    , user
    , ownProps
    , onSuccess

  }
);

export const configureUserSuccess = () => (
  {
    type: CONFIGURE_USER_SUCCESS
  }
);

export const configureUserError = (error) => (
  {
    type: CONFIGURE_USER_ERROR
    , error
  }
);

export const setUser = (user) => (
  {
    type: SET_USER
    , user
  }
);


/*************************
 * Buscar usuario por ID *
 *************************/

export const getUserById = (id) => (
  {
    type: GET_USER_BY_ID
    , id
  }
);

export const getUserByIdSuccess = (user) => (
  {
    type: GET_USER_BY_ID_SUCCESS
    , user
  }
);

export const getUserByIdError = (error) => (
  {
    type: GET_USER_BY_ID_ERROR
    , error
  }
);

/***************************
* Buscar usuario por email *
****************************/

export const getUserByEmail = (email, onSuccess) => (
  {
    type: GET_USER_BY_EMAIL
    , email
    , onSuccess
  }
);

export const getUserByEmailSuccess = (user) => (
  {
    type: GET_USER_BY_EMAIL_SUCCESS
    , user
  }
);

export const getUserByEmailError = (error) => (
  {
    type: GET_USER_BY_EMAIL_ERROR
    , error
  }
);

/****************************
* Desactivar usuario por ID *
****************************/

export const inactiveUser = (id, onSuccess) => (
  {
    type: INACTIVE_USER
    , id
    , onSuccess

  }
);

export const inactiveUserSuccess = () => (
  {
    type: INACTIVE_USER_SUCCESS
  }
);

export const inactiveUserError = (error) => (
  {
    type: INACTIVE_USER_ERROR
    , error
  }
);


/*******************************
 * Inicio de sesión de usuario *
 *******************************/

export const loginUser = (login, ownProps, byToken, token, accountCode, onSuccess) => (
  {
    type: LOGIN_USER
    , login
    , ownProps
    , byToken
    , token
    , accountCode
    , onSuccess

  }
);

export const loginUserSuccess = (user) => (
  {
    type: LOGIN_USER_SUCCESS
    , user: user
  }
);

export const loginUserError = (data) => (
  {
    type: LOGIN_USER_ERROR
    , data
  }
);

export const getListTypeIdentification = (onSuccess) => (
  {
    type: GET_TYPE_LIST_IDENTIFICATION
    , onSuccess

  }
);

export const getListTypeIdentificationSuccess = (listTypeIdentification) => (
  {
    type: GET_TYPE_LIST_IDENTIFICATION_SUCCESS
    , listTypeIdentification: listTypeIdentification
  }
);

export const getListTypeIdentificationError = (error) => (
  {
    type: GET_TYPE_LIST_IDENTIFICATION_ERROR
    , error
  }
);

export const getListTypeProfile = (onSuccess) => (
  {
    type: GET_TYPE_LIST_PROFILE
    , onSuccess

  }
);

export const getListTypeProfileSuccess = (listProfile) => (
  {
    type: GET_TYPE_LIST_PROFILE_SUCCESS
    , listProfile: listProfile
  }
);

export const getListTypeProfileError = (error) => (
  {
    type: GET_TYPE_LIST_PROFILE_ERROR
    , error
  }
);
/*****************************
 *
 *****************************/
export const sendEmailRememberAccess = (email, onSuccess) => (
  {
    type: SEND_EMAIL_REMEMBER_ACCESS
    , onSuccess
    , email
  }
);

export const sendEmailRememberAccessSuccess = () => (
  {
    type: SEND_EMAIL_REMEMBER_ACCESS_SUCCESS
  }
);

export const sendEmailRememberAccessError = (error) => (
  {
    type: SEND_EMAIL_REMEMBER_ACCESS_ERROR
    , error
  }
);

export const setMenuser = (menuContent, onSuccess) => (
  {
    type: SET_MENU_USER
    , onSuccess
    , menuContent
  }
);