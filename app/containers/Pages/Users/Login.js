import React from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { LoginForm, SelectLanguage } from "enl-components";
import logo from "enl-images/logo.svg";
import ArrowBack from "@material-ui/icons/ArrowBack";
import styles from "enl-components/Forms/user-jss";
import { FormattedMessage } from "react-intl";
import { login } from "enl-redux/actions/authActions";
import messages from "./messages";

class Login extends React.Component {
  state = {
    valueForm: []
  };

  submitForm(values) {
    const { valueForm } = this.state;
    setTimeout(() => {
      this.setState({ valueForm: values });
      this.props.handleLogin({
        username: this.state.valueForm.get("username"),
        password: this.state.valueForm.get("password")
      }); // eslint-disable-line
    }, 50); // simulate server latency
  }

  render() {
    const title = brand.name + " - Login";
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.containerSide}>
          <Hidden smDown>
            <div className={classes.opening}>
              <div className={classes.openingWrap}>
                <div className={classes.openingHead}>
                  <NavLink to="/" className={classes.brand}>
                    <img src={logo} alt={brand.name} />
                    {brand.name}
                  </NavLink>
                </div>
                <Typography variant="h3" component="h1" gutterBottom>
                  <FormattedMessage {...messages.welcomeTitle} />
                  &nbsp;
                  {brand.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  className={classes.subpening}
                >
                  <FormattedMessage {...messages.welcomeSubtitle} />
                </Typography>
              </div>
              {/* <div className={classes.openingFooter}>
                <div className={classes.lang}>
                  <SelectLanguage />
                </div>
              </div> */}
            </div>
          </Hidden>
          <div className={classes.sideFormWrap}>
            <LoginForm onSubmit={values => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
};

const reducer = "authReducer";
const mapStateToProps = state => ({
  state: state.get(reducer)
});

const mapDispatchToProps = dispatch => ({
  handleLogin: bindActionCreators(login, dispatch)
});

const LoginMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default withStyles(styles)(LoginMapped);
