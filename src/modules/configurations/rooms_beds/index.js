import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from 'components/Grid/GridContainer'
import React from 'react'
import {connect} from 'react-redux'
import RoomBedList from "./RoomsBedList";
import {setRoomBed} from "./RoomsBedActions";

class RoomBeds extends React.Component {
    
    render() {
        return(<GridContainer justify="center">
            <GridItem xs={12} >
            <Button color="white" round onClick={() => {
          this.props.setRoomBed({
            id: 0,
            name: "",
            description: "",
            active: 1
          });
          this.props.history.push('/admin/admin-room-bed');
        }}>
          <ViewList /> Nuevo tipo habitación/cama
            </Button>
            </GridItem>
            <RoomBedList/>
        </GridContainer>)
    }
}

const mapStateToProps = state => {
  return {
    roomBedState: state.roomBedState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setRoomBed: (roomBed) => dispatch(setRoomBed(roomBed)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomBeds);