import { LUCY_LOCATION_SERVICE } from 'modules/utils/ApiUtil.js';
class ApiClient {
    constructor() {
        this.url = LUCY_LOCATION_SERVICE;
        this.headerGet = {
            Accept: "application/json;charset=UTF-8"
        };
        this.headerPost = {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json;charset=UTF-8"
        };
    }

    getMap = (onSuccess) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        let request = {
            method: "get",
            url:
                `${this.url}/mapMain/get/${this.account}`,
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };
}

const MapApiClient = new ApiClient();
export default MapApiClient;
