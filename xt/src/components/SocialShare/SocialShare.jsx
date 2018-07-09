import React, { Component } from "react";
import PropTypes from "prop-types";
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
    // const shareUrl = window.location.href;
    const shareUrl = "https://wnin.info/home/agenda/323";
    const { title } = this.props;
    return (
      <div className="level-right">
        <span className="level-item">{"Share"}</span>

        <TwitterShareButton url={shareUrl} title={title} className="level-item">
          <TwitterIcon
            size={40}
            iconBgStyle={{ fill: "transparent" }}
            logoFillColor={"#000000"}
          />
        </TwitterShareButton>
        <FacebookShareButton
          url={shareUrl}
          quote={title}
          className="level-item"
        >
          <FacebookIcon
            size={40}
            round={false}
            iconBgStyle={{ fill: "transparent" }}
            logoFillColor={"#000000"}
          />
        </FacebookShareButton>
        <GooglePlusShareButton url={shareUrl} className="level-item">
          <GooglePlusIcon
            size={40}
            iconBgStyle={{ fill: "transparent" }}
            logoFillColor={"#000000"}
          />
        </GooglePlusShareButton>
      </div>
    );
  }
}
SocialShare.propTypes = {
  title: PropTypes.string.isRequired
};
export default SocialShare;
