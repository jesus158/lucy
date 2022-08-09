import { LUCY_LOCATION_SERVICE } from 'modules/utils/ApiUtil.js';
class ApiClient {

    constructor() {
        this.url = LUCY_LOCATION_SERVICE;
    }

    createUpdateZone = (onSuccess, zoneUbication) => {
        this.account = sessionStorage["accountCode"];
        let request = {
           method: 'post'
           , url: `${this.url}/zoneUbication/createUpdate/${this.account}`
           , data: zoneUbication
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              ,"Accept": "application/json;charset=UTF-8"
            }
         }
         return request;
     }

     changeTwoZones = (onSuccess, idZone1,idZone2) => {
        this.account = sessionStorage["accountCode"];
        let request = {
           method: 'put'
           , url: `${this.url}/zoneUbication/changeTwoZones/${this.account}/${idZone1}/${idZone2}`
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              ,"Accept": "application/json;charset=UTF-8"
            }
         }
         return request;
     }

     deleteZone = (onSuccess, idZoneUbication) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/zoneUbication/delete/${this.account}?idZoneUbication=${idZoneUbication}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            ,"Accept": "application/json;charset=UTF-8"
          }
       }
       return request;
   }
     

}

const ZoneApi = new ApiClient();
export default ZoneApi;