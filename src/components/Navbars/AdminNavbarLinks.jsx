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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
// import { Manager, Target, Popper } from "react-popper";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import adminNavbarLinksStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.jsx";
import classNames from "classnames";
import Button from "components/CustomButtons/Button.jsx";
import { setAccountCode } from 'modules/accounts/account/AccountActions.js';
import { setMenuser } from "modules/accounts/user/UserActions.js";
import PropTypes from "prop-types";
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { routes } from "routes/dashboard";



class HeaderLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openNotification: false,
      openProfile: false,
      accounts: [],
      currentAccount: "",
      Admin: false,
      history: props.history,
    };
  }


  componentDidMount = () => {
    let accountsSession = sessionStorage["accounts"];

    let accountName = sessionStorage["accountName"];
    let accounts = JSON.parse(accountsSession !== undefined ? accountsSession : "[]");
    var currentAccount = accountName;
    this.setState({ accounts, currentAccount });
  }

  componentWillReceiveProps = (nextProps) => {
    let accountsSession = sessionStorage["accounts"];

    let accountName = sessionStorage["accountName"];
    let accounts = JSON.parse(accountsSession !== undefined ? accountsSession : "[]");
    var currentAccount = accountName;

    this.setState({ accounts, currentAccount });
  }

  handleClickNotification = () => {
    this.setState({ openNotification: !this.state.openNotification });
  }

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  }

  handleClickProfile = () => {
    this.setState({ openProfile: !this.state.openProfile });
  }

  handleCloseProfile = () => {
    this.setState({ openProfile: false });
  }

  handleClose = (item, localProps) => {
    try {
      if (item.code !== undefined) {
        sessionStorage["accountId"] = item.id;
        sessionStorage["accountCode"] = item.code;
        sessionStorage["accountName"] = item.name;
        sessionStorage["userAccountId"] = item.userAccountId;
        sessionStorage["userAccountProfileId"] = item.userAccountProfileId;
        sessionStorage["userAccountProfileName"] = item.userAccountProfileName;

        this.setState({ openProfile: false, currentAccount: item.name }, () => {
          this.props.setAccountCode(item.code);
        });

      } else {
        let accountName = sessionStorage["accountName"];
        this.setState({ openProfile: false, currentAccount: accountName });
      }
      this.props.setMenuser(routes(), (success) => {

      });

    } catch (excep) { } finally {

    }
  }
  renderListAccounts = (classes, accountsMenuItem) => {
    return (
      <></>
    );
  }

  render() {
    const { classes, rtlActive } = this.props;
    const { openNotification, openProfile } = this.state;
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });

    const { accounts } = this.state;
    var accountsMenuItem = []
    if (sessionStorage["byToken"] === 'false') {
      accountsMenuItem = accounts
        .map(object => {
          return (<MenuItem key={object.code}
            onClick={(event) => {
              this.handleClose(object, this.props);
            }}
            className={dropdownItem}>
            {object.name}{` (${object.userAccountProfileName})`}
          </MenuItem>);
        });
    }
    var lastPath = "";
    if (this.state.Admin === true) {

      try {
        lastPath = this.props.history.location.pathname;
      } catch (Except) {
        lastPath = "";
      }
    }

    return (
      <>
        <div className={wrapper}>

          {accounts.length > 0 &&
            <div className={managerClasses}>
              <Button
                color="transparent"
                aria-label="Notifications"

                aria-owns={openNotification ? "profile-menu-list" : null}
                aria-haspopup="true"
                onClick={this.handleClickProfile}
                className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
                muiClasses={{
                  label: rtlActive ? classes.labelRTL : ""
                }}
                buttonRef={node => {
                  this.anchorProfile = node;
                }}
              >
                {this.state.currentAccount}
                <SupervisorAccount
                  className={
                    classes.headerLinksSvg +
                    " " +
                    (rtlActive
                      ? classes.links + " " + classes.linksRTL
                      : classes.links)
                  }
                  style={{ marginLeft: 4 }}
                />
              </Button>
              {(sessionStorage["byToken"] === 'false') &&
                <Popper
                  open={openProfile}
                  anchorEl={this.anchorProfile}
                  transition
                  disablePortal
                  placement="bottom"
                  className={classNames({
                    [classes.popperClose]: !openProfile,
                    [classes.popperResponsive]: true,
                    [classes.popperNav]: true
                  })}
                >
                  {({ TransitionProps }) => (
                    <Grow
                      {...TransitionProps}
                      id="profile-menu-list"
                      style={{ transformOrigin: "0 0 0" }}
                    >
                      <Paper className={classes.dropdown} style={{ maxHeight: 300, overflow: 'auto' }}>
                        <ClickAwayListener onClickAway={this.handleCloseProfile}>
                          <List
                            role="menu"
                            onClick={() => {
                              this.setState({ Admin: true }, () => {
                                this.setState({ Admin: false });
                              });
                            }}>
                            {accountsMenuItem}
                          </List>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              }
            </div>
          }
        </div>
        {
          this.state.Admin &&
          <Redirect to={'/admin/admin-change?lastURL=' + lastPath} />
        }
      </>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    accountState: state.accountState,
    userState: state.userState,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setAccountCode: (accountCode) => dispatch(setAccountCode(accountCode)),
    setMenuser: (menuContent, onSuccess) => dispatch(setMenuser(menuContent, onSuccess)),
  };
}

export default withStyles(adminNavbarLinksStyle)(connect(mapStateToProps, mapDispatchToProps)(HeaderLinks));
