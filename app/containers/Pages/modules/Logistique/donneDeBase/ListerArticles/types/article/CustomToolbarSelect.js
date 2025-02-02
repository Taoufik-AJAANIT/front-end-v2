import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ModifierUtilisateur from "./ModifierUtilisateur";

import PropTypes from "prop-types";

import { FloatingPanel, Notification } from "enl-components";

import { injectIntl, intlShape } from "react-intl";

import { closeNotifAction, deleteArticle } from "../../reducers/crudTbActions";

const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: "24px"
  },
  inverseIcon: {
    transform: "rotate(90deg)"
  }
};

class CustomToolbarSelect extends React.Component {
  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce(
      (nextSelectedRows, _, index) => {
        if (
          !this.props.selectedRows.data.find(
            selectedRow => selectedRow.index === index
          )
        ) {
          nextSelectedRows.push(index);
        }

        return nextSelectedRows;
      },
      []
    );

    this.props.setSelectedRows(nextSelectedRows);
  };

  delete = () => {
    this.props.selectedRows.data.map(row => {
      const code = this.props.displayData[row.index].data[0];
      this.props.deleteArticle(code);
    });
  };

  render() {
    const { classes, closeNotif, notifMsg, intl } = this.props;

    return (
      <div className={classes.iconContainer}>
        <Tooltip title="Supprimer">
          <IconButton className={classes.iconButton} onClick={this.delete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

CustomToolbarSelect.propTypes = {
  closeNotif: PropTypes.func.isRequired,
  notifMsg: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

const reducer = "crudTbArticlesReducer";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  deleteArticle: bindActionCreators(deleteArticle, dispatch),
  closeNotif: () => dispatch(closeNotifAction)
});

const CustomToolbarSelectMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomToolbarSelect);

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelectMapped);
