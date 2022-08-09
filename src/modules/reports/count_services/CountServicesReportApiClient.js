import { LUCY_REPORT_SERVICE } from 'modules/utils/ApiUtil';
class ApiClient {

  constructor() {
    this.url = LUCY_REPORT_SERVICE;
  }
  

  /**
   * URL para consumir el servicio
   * que recupera el conteo de servicios
   */
  getServiceAccount = (beginDate,
                        endDate,  
                        groupBy,
                        apiPaginationAction,
                        apiPaginationCurrentPage,
                        apiPaginationDirection,
                        apiPaginationLimit,
                        apiPaginationOrderColumn,
                        apiPaginationMoveToPage,
                        apiPaginationFilter) => {
    this.account = sessionStorage["accountCode"];

    var uriFilter = "";


    //Ajuste del rango de fecha inicial
    let days = 7;
    var endDateP = new Date();
    endDateP.setHours(0,0,0,0);
    var startDateP = new Date(endDateP.getTime() - (days * 24 * 60 * 60 * 1000));
    endDateP.setHours(23,59,59,0);

    if (beginDate !== undefined) {
        uriFilter += "?beginDate=" + beginDate;
    } else {
        uriFilter += "?beginDate=" + startDateP.getTime();
    }

    if (endDate !== undefined) {
        uriFilter += "&endDate=" + endDate;
    } else {
        uriFilter += "&endDate=" + endDateP.getTime();
    }

    if (apiPaginationAction !== undefined) {
        uriFilter += "&ApiPaginationAction=" + apiPaginationAction;
    } else {
        uriFilter += "&ApiPaginationAction=0";
    }
  
    if (apiPaginationCurrentPage !== undefined) {
        uriFilter += "&ApiPaginationCurrentPage=" + apiPaginationCurrentPage;
    }
  
    if (apiPaginationDirection !== undefined) {
        uriFilter += "&ApiPaginationDirection=" + apiPaginationDirection;
    }
  
    if (apiPaginationLimit !== undefined) {
        uriFilter += "&ApiPaginationLimit=" + apiPaginationLimit;
    }
  
    if (apiPaginationOrderColumn !== undefined) {
        uriFilter += "&ApiPaginationOrderColumn=" + apiPaginationOrderColumn;
    }
  
    if (apiPaginationMoveToPage !== undefined) {
        uriFilter += "&ApiPaginationMoveToPage=" + apiPaginationMoveToPage;
    }
  
    if (apiPaginationFilter !== undefined) {
        uriFilter += "&ApiPaginationFilter=" + apiPaginationFilter;
    }
  
    if (groupBy !== undefined) {
        uriFilter += "&groupBy=" + groupBy;
    }

    let request = {
      method: "get",
      url:
        `${this.url}/reports/getServiceAccount/${this.account}/` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };
}

const CountServicesReportApi = new ApiClient();
export default CountServicesReportApi;