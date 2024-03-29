import { LUCY_CONFIGURATION_SERVICE } from 'modules/utils/ApiUtil.js';

class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
    }

    filterAlert = (apiPaginationAction
        , apiPaginationCurrentPage
        , apiPaginationDirection
        , apiPaginationLimit
        , apiPaginationOrderColumn
        , apiPaginationMoveToPage
        , apiPaginationFilter) => {
        this.account = sessionStorage["accountCode"];
        var uriFilter = '';

        if (apiPaginationAction !== undefined) {
            uriFilter += '?ApiPaginationAction=' + apiPaginationAction
        } else {
            uriFilter += '?ApiPaginationAction=0';
        }

        if (apiPaginationCurrentPage !== undefined) {
            uriFilter += '&ApiPaginationCurrentPage=' + apiPaginationCurrentPage
        }

        if (apiPaginationDirection !== undefined) {
            uriFilter += '&ApiPaginationDirection=' + apiPaginationDirection
        }

        if (apiPaginationLimit !== undefined) {
            uriFilter += '&ApiPaginationLimit=' + apiPaginationLimit
        }

        if (apiPaginationOrderColumn !== undefined) {
            uriFilter += '&ApiPaginationOrderColumn=' + apiPaginationOrderColumn
        }

        if (apiPaginationMoveToPage !== undefined) {
            uriFilter += '&ApiPaginationMoveToPage=' + apiPaginationMoveToPage
        }

        if (apiPaginationFilter !== undefined) {
            uriFilter += '&ApiPaginationFilter=' + apiPaginationFilter
        }

        let request = {
            method: 'get'
            , url: `${this.url}/alert/getByFilter/${this.account}` + encodeURI(uriFilter)
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    configureAlert = (Alert) => {


        let alertServer = {
            id:Alert.id,
            active:Alert.active,
            alertGateway:Alert.ubication.id,
            alertTag:Alert.asset,
            typeAlert:Alert.typeAlert,
            time:Alert.time,
            account:{id:sessionStorage["accountId"] }
        };

          
    
        let request = {
           method: 'post'
           , url: `${this.url}/alert/createUpdate/${this.account}`
           , data: alertServer
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              , "Accept": "application/json;charset=UTF-8"
           }
        }
  
        return request;
     }

    getAlertById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/alert/getById/${this.account}?idAlert=${id}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveAlert = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete'
            , url: `${this.url}/alert/delete/${this.account}?idAlert=${id}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

}

const AlertApi = new ApiClient();
export default AlertApi;