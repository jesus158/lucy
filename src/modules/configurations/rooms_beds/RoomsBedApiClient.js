import {
    LUCY_CONFIGURATION_SERVICE
} from 'modules/utils/ApiUtil.js'

class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
    }

    filterRoomBed = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => {
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
            url: `${this.url}/typeRoom/getByFilter/${this.account}` + encodeURI(uriFilter),
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }


        return request;
    }

    //add data to roomsBed json
    

    configureRoomBed = (roomBed) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'post',
            url: `${this.url}/typeRoom/createUpdate/${this.account}`,
            data: roomBed,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getRoomBedById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/typeRoom/getById/${this.account}?idTypeAlert=${id}`,
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveTypeRoomBed = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete',
            url: `${this.url}/room/delete/${this.account}?idTypeAlert=${id}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getListActiveRoomBed = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/typeRoom/getListActive/${this.account}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

}

const RoomBedApi = new ApiClient();
export default RoomBedApi;