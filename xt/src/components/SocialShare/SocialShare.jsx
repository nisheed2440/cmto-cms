import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {
  TwitterShareButton,
  FacebookShareButton,
  GooglePlusShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon
} from "react-share";
import "./SocialShare.css";

class SocialShare extends Component {
  render() {
    const shareUrl = window.location.href;
    const { title } = this.props;
    return (
      <Grid container className="wnin-ss-social-container">
        <Grid item xs={12} sm={10}>
          <div className="wnin-ss-title">
            <span>{"Share"}</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={10}>
          <div className="wnin-ss-icon">
            <TwitterShareButton
              url={shareUrl}
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
              url={shareUrl}
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
            <GooglePlusShareButton
              url={shareUrl}
              className="wnin-ss-button"
            >
              <GooglePlusIcon
                size={40}
                iconBgStyle={{ fill: "transparent" }}
                logoFillColor={"#000000"}
              />
            </GooglePlusShareButton>
          </div>
        </Grid>
      </Grid>
    );
  }
}
SocialShare.propTypes = {
  title: PropTypes.string.isRequired
};
export default SocialShare;
