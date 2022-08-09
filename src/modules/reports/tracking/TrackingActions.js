export const TRACKING_STATE_USERS = 'TRACKING_STATE_USERS';
export const TRACKING_STATE_USERS_SUCCESS = 'TRACKING_STATE_USERS_SUCCESS';
export const TRACKING_STATE_USERS_ERROR = 'TRACKING_STATE_USERS_ERROR';

export const TRACKING_STATE_ASSETS = 'TRACKING_STATE_ASSETS';
export const TRACKING_STATE_ASSETS_SUCCESS = 'TRACKING_STATE_ASSETS_SUCCESS';
export const TRACKING_STATE_ASSETS_ERROR = 'TRACKING_STATE_ASSETS_ERROR';

export const TRACKING_STATE_SOS = 'TRACKING_STATE_SOS';
export const TRACKING_STATE_SOS_SUCCESS = 'TRACKING_STATE_SOS_SUCCESS';
export const TRACKING_STATE_SOS_ERROR = 'TRACKING_STATE_SOS_ERROR';

export const TRACKING_STATE_ALERTS = 'TRACKING_STATE_ALERTS';
export const TRACKING_STATE_ALERTS_SUCCESS = 'TRACKING_STATE_ALERTS_SUCCESS';
export const TRACKING_STATE_ALERTS_ERROR = 'TRACKING_STATE_ALERTS_ERROR';

export const CLOSE_ALERT = 'CLOSE_ALERT';
export const CLOSE_ALERT_SUCCESS = 'CLOSE_ALERT_SUCCESS';
export const CLOSE_ALERT_ERROR = 'CLOSE_ALERT_ERROR';


export const trackingStateUsers = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: TRACKING_STATE_USERS,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});

export const trackingStateAssets = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: TRACKING_STATE_ASSETS,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});

export const trackingStateUsersSuccess = (listUsers, apiPaginationUser) => ({
    type: TRACKING_STATE_USERS_SUCCESS,
    listUsers,
    apiPaginationUser
});

export const trackingStateUsersError = (error) => ({
    type: TRACKING_STATE_USERS_ERROR,
    error
});

export const trackingStateAssetsSuccess = (listAssets, apiPaginationAsset) => ({
    type: TRACKING_STATE_ASSETS_SUCCESS,
    listAssets,
    apiPaginationAsset
});

export const trackingStateAssetsError = (error) => ({
    type: TRACKING_STATE_ASSETS_ERROR,
    error
});

export const trackingStateSOS = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: TRACKING_STATE_SOS,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});
export const trackingStateSOSSuccess = (listSOS, apiPaginationSOS) => ({
    type: TRACKING_STATE_SOS_SUCCESS,
    listSOS,
    apiPaginationSOS
});

export const trackingStateSOSError = (error) => ({
    type: TRACKING_STATE_SOS_ERROR,
    error
});


export const closeAlert = (id, onSuccess) => (
    {
        type: CLOSE_ALERT
        , id
        , onSuccess

    }
);

export const closeAlertSuccess = () => (
    {
        type: CLOSE_ALERT_SUCCESS
    }
);

export const closeAlertError = (error) => (
    {
        type: CLOSE_ALERT_ERROR
        , error
    }
);

export const trackingStateAlerts = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: TRACKING_STATE_ALERTS,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});
export const trackingStateAlertsSuccess = (listAlerts, apiPaginationAlerts) => ({
    type: TRACKING_STATE_ALERTS_SUCCESS,
    listAlerts,
    apiPaginationAlerts
});

export const trackingStateAlertsError = (error) => ({
    type: TRACKING_STATE_ALERTS_ERROR,
    error
});