/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";

import styles from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";


import Button from "components/CustomButtons/Button.jsx";

class FixedPlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show",
      bg_checked: true,
      bgImage: this.props.bgImage,
      showImage: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleFixedClick();
  }
  handleChange = name => event => {
    switch (name) {
      case "miniActive":
        this.props.sidebarMinimize();
        break;
      case "image":
        if (event.target.checked) {
          this.props.handleImageClick(this.state.bgImage);
        } else {
          this.props.handleImageClick();
        }
        this.setState({ showImage: event.target.checked });
        break;
      default:
        break;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div
        className={
          "fixed-plugin" + (this.props.rtlActive ? " fixed-plugin-rtl" : "")
        }
      >
        <div id="fixedPluginClasses" className={this.props.fixedClasses}>
          <div onClick={this.handleClick}>
            <i className="fa fa-cog fa-2x" />
          </div>
          <ul className="dropdown-menu">
            <li className="header-title">SIDEBAR FILTERS</li>
            <li className="adjustments-line">
              <a className="switch-trigger active-color">
                <div className="badge-colors text-center">
                  <span
                    className={
                      this.props.color === "purple"
                        ? "badge filter badge-purple active"
                        : "badge filter badge-purple"
                    }
                    data-color="purple"
                    onClick={() => {
                      this.props.handleColorClick("purple");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "blue"
                        ? "badge filter badge-blue active"
                        : "badge filter badge-blue"
                    }
                    data-color="blue"
                    onClick={() => {
                      this.props.handleColorClick("blue");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "green"
                        ? "badge filter badge-green active"
                        : "badge filter badge-green"
                    }
                    data-color="green"
                    onClick={() => {
                      this.props.handleColorClick("green");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "red"
                        ? "badge filter badge-red active"
                        : "badge filter badge-red"
                    }
                    data-color="red"
                    onClick={() => {
                      this.props.handleColorClick("red");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "orange"
                        ? "badge filter badge-orange active"
                        : "badge filter badge-orange"
                    }
                    data-color="orange"
                    onClick={() => {
                      this.props.handleColorClick("orange");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "white"
                        ? "badge filter badge-white active"
                        : "badge filter badge-white"
                    }
                    data-color="orange"
                    onClick={() => {
                      this.props.handleColorClick("white");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "rose"
                        ? "badge filter badge-rose active"
                        : "badge filter badge-rose"
                    }
                    data-color="orange"
                    onClick={() => {
                      this.props.handleColorClick("rose");
                    }}
                  />
                </div>
                <div className="clearfix" />
              </a>
            </li>
            <li className="header-title">SIDEBAR BACKGROUND</li>
            <li className="adjustments-line">
              <a className="switch-trigger active-color">
                <div className="badge-colors text-center">
                  <span
                    className={
                      this.props.bgColor === "blue"
                        ? "badge filter badge-blue active"
                        : "badge filter badge-blue"
                    }
                    data-color="orange"
                    onClick={() => {
                      this.props.handleBgColorClick("blue");
                    }}
                  />
                  <span
                    className={
                      this.props.bgColor === "white"
                        ? "badge filter badge-white active"
                        : "badge filter badge-white"
                    }
                    data-color="orange"
                    onClick={() => {
                      this.props.handleBgColorClick("white");
                    }}
                  />
                  <span
                    className={
                      this.props.bgColor === "black"
                        ? "badge filter badge-black active"
                        : "badge filter badge-black"
                    }
                    data-color="orange"
                    onClick={() => {
                      this.props.handleBgColorClick("black");
                    }}
                  />
                </div>
                <div className="clearfix" />
              </a>
            </li>
            <li className="adjustments-line">
              <a className="switch-trigger">
                <p className="switch-label">Sidebar Mini</p>
                <Switch
                  checked={this.props.miniActive}
                  onChange={this.handleChange("miniActive")}
                  value="sidebarMini"
                  classes={{
                    switchBase: classes.switchBase,
                    checked: classes.switchChecked,
                    thumb: classes.switchIcon,
                    track: classes.switchBar
                  }}
                />
                <div className="clearfix" />
              </a>
            </li>
            <li className="adjustments-line">
              <a className="switch-trigger">
                <p className="switch-label">Sidebar Image</p>
                <Switch
                  checked={this.state.showImage}
                  onChange={this.handleChange("image")}
                  value="sidebarMini"
                  classes={{
                    switchBase: classes.switchBase,
                    checked: classes.switchChecked,
                    thumb: classes.switchIcon,
                    track: classes.switchBar
                  }}
                />
                <div className="clearfix" />
              </a>
            </li>
            
            
            
            
            <li className="button-container">
              <div>
                <Button
                  color="warning"
                  href="https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mdpr-fixed-plugin"
                  target="_blank"
                  fullWidth
                >
                  Buy now
                </Button>
              </div>
            </li>
            <li className="button-container">
              <div>
                <NavLink to={"/documentation"} activeClassName="active">
                  <Button color="info" fullWidth>
                    Documentation
                  </Button>
                </NavLink>
              </div>
            </li>
            <li className="header-title" id="sharrreTitle">
              Thank you for sharing!
              <br />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  miniActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  handleBgColorClick: PropTypes.func,
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func,
  classes: PropTypes.object,
  sidebarMinimize: PropTypes.func,
  rtlActive: PropTypes.bool
};

export default withStyles(styles)(FixedPlugin);
