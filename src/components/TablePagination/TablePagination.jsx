import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import PropTypes from 'prop-types';
import React from 'react';
import regularFormsStyle from "../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import Pagination from "../Pagination/Pagination.jsx";




class TablePagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
            , rowsPerPage: 5
        };
        
    }

    handleClickPage = page => {
        var currentPage = this.state.currentPage;
        if (page === "ANT" && currentPage > 1) {
            this.props.onChangePage(currentPage - 1);
            currentPage = currentPage - 1;
        } else if (page === "SIG" && currentPage < this.props.pages) {
            this.props.onChangePage(currentPage + 1);
            currentPage = currentPage + 1;
        } else if (page !== "SIG" && page !== "ANT" && page !== currentPage) {
            this.props.onChangePage(page);
            currentPage = page;
        }
        this.setState({ currentPage });
    }

    handleChange = event => {
        let rowsPerPage = event.target.value;
        this.setState({ rowsPerPage });
        this.props.onChangeRowsPerPage(rowsPerPage);
    }

    render() {
        const { classes } = this.props;
        const { pages, page, rowsPerPageOptions } = this.props;
        var pageList = [{ text: "ANT", onClick: () => this.handleClickPage("ANT") }];

        for (var i = 1; i <= pages; i++) {
            let currentPage = i;
            if (i !== page) {
                pageList.push({ text: i, onClick: () => this.handleClickPage(currentPage) });
            } else {
                pageList.push({ active: true, text: i, onClick: () => this.handleClickPage(currentPage) });
            }
        }
        pageList.push({ text: "SIG", onClick: () => this.handleClickPage("SIG") });

        const rowsPerPageMenuItem = rowsPerPageOptions
            .map(object => {
                return (
                    <MenuItem
                        key={object}
                        classes={{
                            root: classes.selectMenuItem
                        }}
                        value={object}>
                        {object}
                    </MenuItem>
                );
            });

        return (<div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>

            <Select
                value={this.state.rowsPerPage}
                onChange={this.handleChange}
                inputProps={{
                    name: 'rows',
                    id: 'rows',
                }}
            >
                {rowsPerPageMenuItem}
            </Select>

            <Pagination
                pages={pageList}
                color="primary"
            />
        </div>
        );
    }
}

TablePagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25, 50, 100],
};

/*TablePagination.propTypes = {
    rowsPerPageOptions: PropTypes.array,
    pages: PropTypes.number,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func,
};*/

export default withStyles(regularFormsStyle)(TablePagination);