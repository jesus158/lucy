import NearMe from "@material-ui/icons/NearMe";
import Button from "components/CustomButtons/Button.jsx";
import LocationList from "modules/locations/LocationList.jsx";
import React from "react";
import { connect } from "react-redux";



class Location extends React.Component {

  render() {

    return (
      <div>
        <Button
          color="white"
          round onClick={() => {
            this.props.history.push('/admin/admin-location');
          }}>
          <NearMe /> Mapa de ubicaciones
        </Button>
        <br />
        <LocationList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);