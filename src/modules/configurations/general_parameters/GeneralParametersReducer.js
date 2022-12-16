import {
    CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER
    , CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_SUCCESS
    , CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_ERROR

    , GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER
    , GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER_SUCCESS
    , GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER_ERROR

    , INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER
    , INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_SUCCESS
    , INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_ERROR

    , SET_TIME_ALERT_SERVICE_WITHOUT_CARRIER

    , CONFIGURE_TIME_ALERT_FINALIZE_REQUEST
    , CONFIGURE_TIME_ALERT_FINALIZE_REQUEST_SUCCESS
    , CONFIGURE_TIME_ALERT_FINALIZE_REQUEST_ERROR

    , GET_TIME_ALERT_FINALIZE_REQUEST
    , GET_TIME_ALERT_FINALIZE_REQUEST_SUCCESS
    , GET_TIME_ALERT_FINALIZE_REQUEST_ERROR

    , INACTIVE_TIME_ALERT_FINALIZE_REQUEST
    , INACTIVE_TIME_ALERT_FINALIZE_REQUEST_SUCCESS
    , INACTIVE_TIME_ALERT_FINALIZE_REQUEST_ERROR

    , SET_TIME_ALERT_FINALIZE_REQUEST


    , CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY
    , CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY_SUCCESS
    , CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY_ERROR

    , GET_TIME_ALERT_CARRIER_INACTIVITY
    , GET_TIME_ALERT_CARRIER_INACTIVITY_SUCCESS
    , GET_TIME_ALERT_CARRIER_INACTIVITY_ERROR

    , INACTIVE_TIME_ALERT_CARRIER_INACTIVITY
    , INACTIVE_TIME_ALERT_CARRIER_INACTIVITY_SUCCESS
    , INACTIVE_TIME_ALERT_CARRIER_INACTIVITY_ERROR

    , SET_TIME_ALERT_CARRIER_INACTIVITY

    , CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING
    , CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_SUCCESS
    , CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_ERROR

    , GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING
    , GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_SUCCESS
    , GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_ERROR

    , INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING
    , INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_SUCCESS
    , INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_ERROR

    , SET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING

    , CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING
    , CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_SUCCESS
    , CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_ERROR

    , GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING
    , GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_SUCCESS
    , GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_ERROR

    , INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING
    , INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_SUCCESS
    , INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_ERROR

    , SET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING

    , CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING
    , CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_SUCCESS
    , CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_ERROR

    , GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING
    , GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_SUCCESS
    , GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_ERROR

    , INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING
    , INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_SUCCESS
    , INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_ERROR

    , SET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING

} from 'modules/configurations/general_parameters/GeneralParametersActions.js';

const initialState = {
    data: {
        isActivityIndicatorShown: false
        , timeAlertServiceWithoutCarrier: {
            id: 0,
            value: "1",
            active: 1
        }
        , timeAlertFinalizeRequest: {
            id: 0,
            value: "1",
            active: 1
        }
        , timeAlertCarrierInactivity: {
            id: 0,
            value: "1",
            active: 1
        }

        , numberAttentionsHighPriorityWaiting: {
            id: 0,
            value: "1",
            active: 1
        }
        , numberAttentionsMediumPriorityWaiting: {
            id: 0,
            value: "1",
            active: 1
        }
        , numberAttentionsLowPriorityWaiting: {
            id: 0,
            value: "1",
            active: 1
        }
    }
};


const generalParametersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeAlertServiceWithoutCarrier: action.timeAlertServiceWithoutCarrier,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_TIME_ALERT_SERVICE_WITHOUT_CARRIER_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case CONFIGURE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_TIME_ALERT_SERVICE_WITHOUT_CARRIER_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case SET_TIME_ALERT_SERVICE_WITHOUT_CARRIER:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeAlertServiceWithoutCarrier: action.timeAlertServiceWithoutCarrier,
                },
            };



        case GET_TIME_ALERT_FINALIZE_REQUEST:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_TIME_ALERT_FINALIZE_REQUEST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeAlertFinalizeRequest: action.timeAlertFinalizeRequest,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_TIME_ALERT_FINALIZE_REQUEST_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case CONFIGURE_TIME_ALERT_FINALIZE_REQUEST:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case CONFIGURE_TIME_ALERT_FINALIZE_REQUEST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case CONFIGURE_TIME_ALERT_FINALIZE_REQUEST_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_TIME_ALERT_FINALIZE_REQUEST:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case INACTIVE_TIME_ALERT_FINALIZE_REQUEST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_TIME_ALERT_FINALIZE_REQUEST_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case SET_TIME_ALERT_FINALIZE_REQUEST:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeAlertFinalizeRequest: action.timeAlertFinalizeRequest,
                },
            };

        //--

        case GET_TIME_ALERT_CARRIER_INACTIVITY:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_TIME_ALERT_CARRIER_INACTIVITY_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeAlertCarrierInactivity: action.timeAlertCarrierInactivity,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_TIME_ALERT_CARRIER_INACTIVITY_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case CONFIGURE_TIME_ALERT_CARRIER_INACTIVITY_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_TIME_ALERT_CARRIER_INACTIVITY:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case INACTIVE_TIME_ALERT_CARRIER_INACTIVITY_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_TIME_ALERT_CARRIER_INACTIVITY_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case SET_TIME_ALERT_CARRIER_INACTIVITY:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeAlertCarrierInactivity: action.timeAlertCarrierInactivity,
                },
            };

        //--

        case GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    numberAttentionsHighPriorityWaiting: action.numberAttentionsHighPriorityWaiting,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case CONFIGURE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case SET_NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    numberAttentionsHighPriorityWaiting: action.numberAttentionsHighPriorityWaiting,
                },
            };

        //--

        case GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    numberAttentionsMediumPriorityWaiting: action.numberAttentionsMediumPriorityWaiting,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case CONFIGURE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case SET_NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    numberAttentionsMediumPriorityWaiting: action.numberAttentionsMediumPriorityWaiting,
                },
            };

        //--

        case GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    numberAttentionsLowPriorityWaiting: action.numberAttentionsLowPriorityWaiting,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case CONFIGURE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case SET_NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING:
            return {
                ...state,
                data: {
                    ...state.data,
                    numberAttentionsLowPriorityWaiting: action.numberAttentionsLowPriorityWaiting,
                },
            };

        default:
            return state;
    }

};

export default generalParametersReducer;