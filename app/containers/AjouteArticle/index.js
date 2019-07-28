/**
 *
 * AjouteArticle
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectAjouteArticle from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class AjouteArticle extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>AjouteArticle</title>
          <meta name="description" content="Description of AjouteArticle" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AjouteArticle.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  ajouteArticle: makeSelectAjouteArticle()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "ajouteArticle", reducer });
const withSaga = injectSaga({ key: "ajouteArticle", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AjouteArticle);
