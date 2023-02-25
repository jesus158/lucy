import {
  CANCELL_REQUEST,
  CANCELL_REQUEST_ERROR,
  CANCELL_REQUEST_SUCCESS,
  CARRIER_ACCEPTS_ASSIGNMENT,
  CARRIER_ACCEPTS_ASSIGNMENT_ERROR,
  CARRIER_ACCEPTS_ASSIGNMENT_SUCCESS,
  CREATE_REQUEST,
  CREATE_REQUEST_ERROR,
  CREATE_REQUEST_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_REQUEST_ERROR,
  UPDATE_REQUEST_SUCCESS,
  END_REQUEST,
  END_REQUEST_ERROR,
  END_REQUEST_SUCCESS,
  GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER,
  GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTERV_ERROR,
  GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER_SUCCESS,
  SET_CARRIER,
  SET_MORE_INFORMATION,
  SET_NAME_REQUESTED,
  SET_TYPE_CANCELLATION,
  SET_TYPE_REJECT,
  SET_TYPE_SERVICE,
  SET_UBICATION_BEGIN,
  SET_UBICATION_END,
  START_REQUEST,
  START_REQUEST_ERROR,
  START_REQUEST_SUCCESS,
  SET_ASSET
} from "modules/requests/RequestActions.js";

const initialState = {
  data: {
    isActivityIndicatorShown: false,
    apiPagination: {},
    apiPaginationWaiting: {},
    apiPaginationInprocess: {},
    listRequests: [],
    listRequestsWaiting: [],
    listRequestsInprocess: [],
    typeService: {
      id: 0,
      active: 1,
      serviceName: "Seleccione el tipo de servicio...",
      priority: 3,
    },
    ubicationEnd: {
      id: 0,
      nameUbication: "seleccione la ubicación..."
    },
    ubicationBegin: {
      id: 0,
      nameUbication: "seleccione la ubicación..."
    },
    typeReject: {
      id: 0,
      rejectName: "Seleccione el tipo de rechazo..."
    },
    typeCancellation: {
      id: 0,
      cancellationName: "Seleccione el tipo de cancelación..."
    },
    asset: {
      id: 0,
      active: 1,
      assetCode: "",
      assetZoneTag: 0,
      nameAsset: "Seleccione el activo...",
      state: 1,
      typeAsset: {
        id: 0,
        active: 0,
        description: "",
        name: ""
      },
      account: {
        id:0
      }
    },
    freeAsset: 0,
    freeAssetTime: 0,
    carrier: undefined,
    moreInformation: "",
    nameRequested: "",
  }
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER:
      return {
        ...state,
        isActivityIndicatorShown: true
      };

    case GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER_SUCCESS:
      switch (action.multiAction) {
        case "waiting":
          return {
            ...state,
            data: {
              ...state.data,
              apiPaginationWaiting: action.data.apiPagination,
              listRequestsWaiting: action.data.listRequests,
              isActivityIndicatorShown: false,
            },
          };

        case "inprocess":
          return {
            ...state,
            data: {
              ...state.data,
              apiPaginationInprocess: action.data.apiPagination,
              listRequestsInprocess: action.data.listRequests,
              isActivityIndicatorShown: false,
            },
          };

        default:
          return {
            ...state,
            data: {
              ...state.data,
              apiPagination: action.data.apiPagination,
              listRequests: action.data.listRequests,
              isActivityIndicatorShown: false,
            },
          };
      }


      case GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTERV_ERROR:
        return {
          ...state,
          isActivityIndicatorShown: false
        };

      case CREATE_REQUEST:
        return {
          ...state,
          isActivityIndicatorShown: true,
          saveActive: false
        };

      case CREATE_REQUEST_SUCCESS:
      
        return {
          ...state,
          data: {
            ...state.data,
            isActivityIndicatorShown: false
          },
        };

      case CREATE_REQUEST_ERROR:
      return {
        ...state,
        isActivityIndicatorShown: false
      };

      case UPDATE_REQUEST:
        return {
          ...state,
          isActivityIndicatorShown: true
        };

      case UPDATE_REQUEST_SUCCESS:
        return {
          ...state,
          data: {
            ...state.data,
            isActivityIndicatorShown: false,
          },
        };

      case UPDATE_REQUEST_ERROR:
        return {
          ...state,
          isActivityIndicatorShown: false
        };

      case CARRIER_ACCEPTS_ASSIGNMENT:
        return {
          ...state,
          isActivityIndicatorShown: true
        };

      case CARRIER_ACCEPTS_ASSIGNMENT_SUCCESS:
        return {
          ...state,
          data: {
            isActivityIndicatorShown: false,
          },
        };

      case CARRIER_ACCEPTS_ASSIGNMENT_ERROR:
        return {
          ...state,
          isActivityIndicatorShown: false
        };

      case CANCELL_REQUEST:
        return {
          ...state,
          isActivityIndicatorShown: true
        };

      case CANCELL_REQUEST_SUCCESS:
        return {
          ...state,
          data: {
            isActivityIndicatorShown: false,
          },
        };

      case CANCELL_REQUEST_ERROR:
        return {
          ...state,
          isActivityIndicatorShown: false
        };

      case START_REQUEST:
        return {
          ...state,
          isActivityIndicatorShown: true
        };

      case START_REQUEST_SUCCESS:
        return {
          ...state,
          data: {
            isActivityIndicatorShown: false,
          },
        };

      case START_REQUEST_ERROR:
        return {
          ...state,
          isActivityIndicatorShown: false
        };

      case END_REQUEST:
        return {
          ...state,
          isActivityIndicatorShown: true
        };

      case END_REQUEST_SUCCESS:
        return {
          ...state,
          data: {
            isActivityIndicatorShown: false,
          },
        };

      case END_REQUEST_ERROR:
        return {
          ...state,
          isActivityIndicatorShown: false
        };

      case SET_TYPE_SERVICE:
        return {
          ...state,
          data: {
            ...state.data,
            typeService: action.typeService,
          },
        };

      case SET_ASSET:
        return {
          ...state,
          data: {
            ...state.data,
            asset: action.asset,
          },
        }

      case SET_UBICATION_BEGIN:
        return {
          ...state,
          data: {
            ...state.data,
            ubicationBegin: action.ubicationBegin,
          },
        };

      case SET_UBICATION_END:
        return {
          ...state,
          data: {
            ...state.data,
            ubicationEnd: action.ubicationEnd,
          },
        };

      case SET_CARRIER:
        return {
          ...state,
          data: {
            ...state.data,
            carrier: action.carrier,
          },
        };

      case SET_MORE_INFORMATION:
        return {
          ...state,
          data: {
            ...state.data,
            moreInformation: action.moreInformation,
          },
        };

      case SET_NAME_REQUESTED:
        return {
          ...state,
          data: {
            ...state.data,
            nameRequested: action.nameRequested,
          },
        };

      case SET_TYPE_REJECT:
        return {
          ...state,
          data: {
            ...state.data,
            typeReject: action.typeReject,
          },
        };

      case SET_TYPE_CANCELLATION:
        return {
          ...state,
          data: {
            ...state.data,
            typeCancellation: action.typeCancellation,
          },
        };


      default:
        return state;
  }
};

export default requestReducer;
