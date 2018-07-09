import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,  
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";
import "./SpeakerSocialShare.css";

class SpeakerSocialShare extends Component {
  render() {
    const { title, social } = this.props;
    return (
      <Grid container className="wnin-ss-social-container">
        <Grid item xs={12} sm={10}>
          <div className="wnin-ss-icon">
            <TwitterShareButton
              url={social.twitter ? social.twitter : ''}
              title={title}
              className="wnin-ss-button"
            >
              <TwitterIcon
                size={40}
                iconBgStyle={{ fill: "transparent" }}
                logoFillColor={"#000000"}
              />
            </TwitterShareButton>
          </div>
          <div className="wnin-ss-icon">
            <FacebookShareButton
              url={social.facebook ? social.facebook : ''}
              quote={title}
              className="wnin-ss-button"
            >
              <FacebookIcon
                size={40}
                round={false}
                iconBgStyle={{ fill: "transparent" }}
                logoFillColor={"#000000"}
              />
            </FacebookShareButton>
          </div>
          <div className="wnin-ss-icon">
            <LinkedinShareButton
              url={social.linkedin ? social.linkedin : ''}
              className="wnin-ss-button"
            >
              <LinkedinIcon
                size={40}
                iconBgStyle={{ fill: "transparent" }}
                logoFillColor={"#000000"}
              />
            </LinkedinShareButton>
          </div>
        </Grid>
      </Grid>
    );
  }
}
SpeakerSocialShare.propTypes = {
  title: PropTypes.string.isRequired,
  social: PropTypes.object.isRequired
};
export default SpeakerSocialShare;