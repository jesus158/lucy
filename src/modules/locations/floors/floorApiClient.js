import { LUCY_LOCATION_SERVICE } from 'modules/utils/ApiUtil.js';
class ApiClient {

    constructor() {
        this.url = LUCY_LOCATION_SERVICE;
    }

    createUpdateFloor = (onSuccess, FloorUbication) => {
        this.account = sessionStorage["accountCode"];
        let request = {
           method: 'post'
           , url: `${this.url}/floorUbication/createUpdate/${this.account}`
           , data: FloorUbication
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              ,"Accept": "application/json;charset=UTF-8"
            }
         }
         return request;
     }

     changeTwoFloors = (onSuccess, idFloor1,idFloor2) => {
        this.account = sessionStorage["accountCode"];
        let request = {
           method: 'put'
           , url: `${this.url}/floorUbication/changeTwoFloors/${this.account}/${idFloor1}/${idFloor2}`
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              ,"Accept": "application/json;charset=UTF-8"
            }
         }
         return request;
     }

     deleteFloor = (onSuccess, idFloorUbication) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/floorUbication/delete/${this.account}?idFloorUbication=${idFloorUbication}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            ,"Accept": "application/json;charset=UTF-8"
          }
       }
       return request;
   }
     

}

const FloorApi = new ApiClient();
export default FloorApi;