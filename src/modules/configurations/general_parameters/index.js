// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GeneralParametersAdmin from "modules/configurations/general_parameters/GeneralParametersAdmin.jsx";
import React from "react";

class GeneralParameters extends React.Component {

    render() {

        return (<GridContainer justify="center">

            <GeneralParametersAdmin />

        </GridContainer>);
    }

}

export default GeneralParameters;
