import {
    LUCY_CONFIGURATION_SERVICE
} from 'modules/utils/ApiUtil.js'
import {LUCY_LOCATION_SERVICE} from "../../utils/ApiUtil";

class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
        this.locationUrl = LUCY_LOCATION_SERVICE;
    }

    filterIdealTime = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => {
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
            method: 'get',
            url: `${this.url}/idealTime/getByFilter/${this.account}` + encodeURI(uriFilter),
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }


        return request;
    }


    

    configureIdealTime = (idealTime) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'post',
            url: `${this.url}/idealTime/createUpdate/${this.account}`,
            data: idealTime,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getIdealTimeById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/typeIdealTime/getById/${this.account}?idTypeAlert=${id}`,
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveTypeIdealTime = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete',
            url: `${this.url}/idealTime/delete/${this.account}?idIdealTime=${id}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    // Obtiene las categorías Habitación o Cama
    getListActiveIdealTime = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/typeIdealTime/getListActive/${this.account}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getListActiveIdealTimeLocations = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.locationUrl}/ubication/getListActiveShow/${this.account}`
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

}

const IdealTimeApi = new ApiClient();
export default IdealTimeApi;