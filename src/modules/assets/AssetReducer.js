import {
    FIND_ASSET_LIST,
    FIND_ASSET_LIST_SUCCESS,
    FIND_ASSET_LIST_ERROR

    ,
    CONFIGURE_ASSET,
    CONFIGURE_ASSET_SUCCESS,
    CONFIGURE_ASSET_ERROR

    ,
    GET_ASSET_BY_ID,
    GET_ASSET_BY_ID_SUCCESS,
    GET_ASSET_BY_ID_ERROR

    ,
    INACTIVE_ASSET,
    INACTIVE_ASSET_SUCCESS,
    INACTIVE_ASSET_ERROR

    ,
    GET_LIST_ACTIVE_ASSET,
    GET_LIST_ACTIVE_ASSET_SUCCESS,
    GET_LIST_ACTIVE_ASSET_ERROR,

    GET_TYPE_ASSET_LIST,
    GET_TYPE_ASSET_LIST_SUCCESS,
    GET_TYPE_ASSET_LIST_ERROR

    ,
    SET_ASSET
} from 'modules/assets/AssetActions.js';

const initialState = {
    data: {
        isActivityIndicatorShown: false,
        listResultSetAsset: {},
        listTypeAsset: [],
        asset: { 
            id: 0,
            active: 1,
            assetCode: "",
            assetZoneTag: 0,
            nameAsset: "",
            state: 1,
            typeAsset: {
                id: 0,
                active: 0,
                description: "",
                name: ""
            },
            account: {
                active: 0,
                id: 0,
                moreInformation: "",
                nameAccount: "",
                schemaAccount: ""
            }
        },
        listAsset: []
    }
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_ASSET_LIST:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case FIND_ASSET_LIST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    listResultSetAsset: action.listResultSetAsset,
                    isActivityIndicatorShown: false,
                },
            };
        case FIND_ASSET_LIST_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case CONFIGURE_ASSET:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case CONFIGURE_ASSET_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case CONFIGURE_ASSET_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_ASSET_BY_ID:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_ASSET_BY_ID_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    asset: action.asset,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_ASSET_BY_ID_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_ASSET:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case INACTIVE_ASSET_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case INACTIVE_ASSET_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };
        case SET_ASSET:
            return {
                ...state,
                data: {
                    ...state.data,
                    asset: action.asset,
                },
            };
        case GET_LIST_ACTIVE_ASSET:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };
        case GET_LIST_ACTIVE_ASSET_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    listAsset: action.listAsset,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_LIST_ACTIVE_ASSET_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        case GET_TYPE_ASSET_LIST:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                },
            };

        case GET_TYPE_ASSET_LIST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    listTypeAsset: action.listTypeAsset,
                    isActivityIndicatorShown: false,
                },
            };
        case GET_TYPE_ASSET_LIST_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                },
            };

        default:
            return state;
    }
};

export default assetReducer;