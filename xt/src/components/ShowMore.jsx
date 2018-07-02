import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Img from "react-image";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SocialShare from "./SocialShare";

const styles = theme => ({
  dialogRoot: {
    backgroundColor: "#ffffff"
  },
  speakerBg: {
    backgroundColor: "#e1e1e1"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600"
  },
  title: {
    fontSize: "16px",
    fontWeight: "600"
  },
  textMargin: {
    marginBottom: "15px"
  },
  speakerContainer: {
    marginTop: "15px",
    marginBottom: "15px"
  },
  socialShare: {
    float: "right"
  },
  ratingSection: {
    marginTop: "25px"
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
            <div className={"session-title"}>
            <Typography variant="body2" className={classes.heading}>
              {session.title}
            </Typography>
            <Typography gutterBottom variant="caption">
              {session.meta.duration} | {session.meta.venue}
            </Typography>
            </div>
            <div className={classes.speakerBg}>
            
                {session.speakers.map(speaker => {
                  return (
                    <Grid container className={classes.speakerContainer} key={speaker.id} spacing={0} justify="center">
                      <Grid item xs={12} sm={4}>
                        <Img
                          src={'../assets/speaker1.jpg'}
                          decode={true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <div key={session.id} className="speaker-item is-primary">
                          <div className="speaker-content">
                            <Typography variant="body2" className={classes.heading}>
                              {speaker.name}
                            </Typography>
                            <Typography variant="caption" className={classes.textMargin +" has-text-grey"}>
                              {"Director of Technology, Experience Technology"}
                            </Typography>
                            <Typography variant="body2" className="">
                              {speaker.description}
                            </Typography>
                          </div>
                        </div>
                        </Grid>
                      </Grid> 
                  );
                })}
            </div>
            <div className={"session-desc"}>
              <Typography variant="body2" className={"heading"}>
                {session.content}
              </Typography>
            </div>
            <Grid container className={classes.ratingSection}>
              <Grid item xs={12} sm={8}>
                <div>
                  <Typography variant="body2" className={classes.title}>
                    {"Rate this session"}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={classes.socialShare}>
                  <Typography variant="body2">
                    <SocialShare/>
                  </Typography>
                </div>
              </Grid>
            </Grid>
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
