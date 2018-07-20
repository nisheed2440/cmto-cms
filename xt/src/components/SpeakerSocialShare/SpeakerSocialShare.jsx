import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {
  LinkedinIcon
} from "react-share";
import "./SpeakerSocialShare.css";

class SpeakerSocialShare extends Component {
  render() {
    const { social } = this.props;
    return (
      <Grid container className="wnin-ss-social-container">
        <Grid item xs={12} sm={10}>
          <div className="wnin-ss-icon">
          <a href={social.linkedin} target="_blank">
            <LinkedinIcon
                  size={40}
                  iconBgStyle={{ fill: "transparent" }}
                  logoFillColor={"#000000"}
                />
           </a>
          </div>
        </Grid>
      </Grid>
    );
  }
}
SpeakerSocialShare.propTypes = {
  social: PropTypes.object.isRequired
};
export default SpeakerSocialShare;
