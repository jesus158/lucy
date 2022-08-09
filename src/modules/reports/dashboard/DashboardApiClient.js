import { LUCY_REPORT_SERVICE } from 'modules/utils/ApiUtil';
class ApiClient {

  constructor() {
    this.url = LUCY_REPORT_SERVICE;
  }
  

  /**
   * URL para consumir el servicio
   * que recupera los estados de las solicitudes
   */
  getNumberRequests = () => {
    this.account = sessionStorage["accountCode"];

    let request = {
      method: "get",
      url:
        `${this.url}/reports/getNumberRequests/${this.account}`,
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };
}

const DashboardApi = new ApiClient();
export default DashboardApi;