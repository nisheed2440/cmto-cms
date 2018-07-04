import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SessionTag.css";

class SessionTag extends Component {
  render() {
    const { color, label } = this.props;
    return (
      <div className="wnin-tag">
        <div className="wnin-tag-flair">
          <span
            className="wnin-tag-circle"
            style={{ backgroundColor: color }}
          />
          <span className="wnin-tag-label">{label}</span>
        </div>
      </div>
    );
  }
}

SessionTag.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string
};

SessionTag.defaultProps = {
  color: "#574ddd",
  label: "#999"
};

export default SessionTag;
