import { LUCY_CONFIGURATION_SERVICE } from 'modules/utils/ApiUtil.js';

class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
    }

    filterCallButton = (apiPaginationAction
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
            , url: `${this.url}/callButton/getByFilter/${this.account}` + encodeURI(uriFilter)
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    configureCallButton = (CallButton) => {
        let request = {
           method: 'post'
           , url: `${this.url}/callButton/createUpdate/${this.account}`
           , data: CallButton
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              , "Accept": "application/json;charset=UTF-8"
           }
        }
  
        return request;
     }

    getCallButtonById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/callButton/getById/${this.account}?idCallButton=${id}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveCallButton = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete'
            , url: `${this.url}/callButton/delete/${this.account}?idCallButton=${id}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

}

const ButtonServiceApi = new ApiClient();
export default ButtonServiceApi;