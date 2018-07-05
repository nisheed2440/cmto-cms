import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import SocialShare from "../SocialShare/SocialShare";
import SpeakerSocialShare from "../SpeakerSocialShare/SpeakerSocialShare";
import "./ShowMore.css";

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
    const { session, baseRoute } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={baseRoute} />;
    }
    return (
      <Dialog
        fullScreen
        open={true}
        onClose={this.onClose}
        TransitionComponent={Transition}
        classes={{ paper: "wnin-modal-container" }}
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
        <div className={"wnin-modal-section"}>
          <div className={"container"}>
            <div className={"session-title"}>
            <Typography variant="body2" className="wnin-modal-heading">
              {session.title}
            </Typography>
            <Typography gutterBottom variant="caption">
              {session.meta.duration} | {session.meta.venue}
            </Typography>
            </div>
            <div className="wnin-modal-sp-section">
            
                {session.speakers.map(speaker => {
                  return (
                    <Grid container className="wnin-modal-sp-container" key={speaker.id} spacing={0} justify="center">
                      <Grid item xs={12} sm={4}>
                        {/* Should add banner component */}
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <div key={session.id} className="wnin-modal-speaker-item is-primary">
                          <div className="wnin-modal-speaker-content">
                            <Typography variant="body2" className="wnin-modal-heading">
                              {speaker.name}
                            </Typography>
                            <Typography variant="caption" className="wnin-modal-text-margin has-text-grey">
                              {"Director of Technology, Experience Technology"}
                            </Typography>
                            <Typography variant="body2" className="">
                              {speaker.description}
                            </Typography>
                            <SpeakerSocialShare title={session.title} social={speaker.social}/>
                          </div>
                        </div>
                        </Grid>
                      </Grid> 
                  );
                })}
            </div>
            <div className={"session-desc"}>
              <Typography variant="body2" className="wnin-modal-heading">
                {session.content}
              </Typography>
            </div>
            <Grid container className="wnin-modal-rating-section">
              {/* <Grid item xs={12} sm={8}>
                <div>
                  <Typography variant="body2" className="wnin-modal-rating-title">
                    {"Rate this session"}
                  </Typography>
                </div>
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <div className="wnin-modal-social-share">
                  <Typography variant="body2">
                    <SocialShare title={session.title}/>
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
  session: PropTypes.object.isRequired,
  baseRoute: PropTypes.string.isRequired,
};

ShowMore.defaultProps = {
  baseRoute: '/home/agenda/'
};

export default ShowMore;
