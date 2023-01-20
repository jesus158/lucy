import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from 'components/Grid/GridContainer'
import React from 'react'
import {connect} from 'react-redux'
import IdealTimeList from "./IdealTimeList";
import {setIdealTime} from "./IdealTimeActions";

class IdealTimes extends React.Component {
    
    render() {
        return(<GridContainer justify="center">
            <GridItem xs={12} >
            <Button color="white" round onClick={() => {
          this.props.setIdealTime({
            id: 0,
            name: "",
            description: "",
            active: 1
          });
          this.props.history.push('/admin/admin-ideal-times');
        }}>
          <ViewList /> Nuevo Tiempo ideal
            </Button>
            </GridItem>
            <IdealTimeList/>
        </GridContainer>)
    }
}

const mapStateToProps = state => {
  return {
    idealTimeState: state.idealTimeState,

  };
};

const mapDispatchToProps = dispatch => {
  return {
      setIdealTime: (idealTime) => dispatch(setIdealTime(idealTime)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdealTimes);