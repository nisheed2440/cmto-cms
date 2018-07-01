import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  dialogRoot: {
    backgroundColor: "#ffffff"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ShowMore extends Component {
  state = {
    redirect: false
  };
  onClose = () => {
    this.setState({
      redirect: true
    });
  };
  render() {
    const { classes, session } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/home/agenda/" />;
    }
    return (
      <Dialog
        fullScreen
        open={true}
        onClose={this.onClose}
        TransitionComponent={Transition}
        classes={{ paper: classes.dialogRoot }}
      >
        <div className={"wnin-filter-wrapper"}>
          <div className={"wnin-filter-container container is-fluid"}>
            <div className={"wnin-filter-button-wrapper"}>
              <IconButton
                aria-label="close"
                className={"wnin-filter-button"}
                onClick={this.onClose}
              >
                <Icon className={"wnin-filter-button-icon"}>close</Icon>
              </IconButton>
            </div>
          </div>
        </div>
        <div className={"section"}>
          <div className={"container"}>
            <code>{JSON.stringify(session)}</code>
          </div>
        </div>
      </Dialog>
    );
  }
}

ShowMore.propTypes = {
  classes: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

export default withStyles(styles)(ShowMore);
