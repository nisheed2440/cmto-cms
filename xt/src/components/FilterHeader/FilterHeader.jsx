import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Badge from "@material-ui/core/Badge";
import "./FilterHeader.css";

class FilterHeader extends Component {
  getButton() {
    const { disabled, buttonClick } = this.props;
    return (
      <IconButton
        aria-label="filter"
        className="wnin-filter-button"
        disabled={disabled}
        onClick={buttonClick}
      >
        <Icon className="wnin-filter-button-icon">filter_list</Icon>
      </IconButton>
    );
  }
  getButtonWithBadge() {
    const { disabled, count, buttonClick } = this.props;
    return (
      <Badge
        color="primary"
        classes={{ badge: "wnin-filter-badge" }}
        badgeContent={count || 0}
        className=""
      >
        <IconButton
          aria-label="filter"
          className="wnin-filter-button"
          disabled={disabled}
          onClick={buttonClick}
        >
          <Icon className="wnin-filter-button-icon">filter_list</Icon>
        </IconButton>
      </Badge>
    );
  }
  render() {
    const { count, title } = this.props;
    return (
      <div className="wnin-filter-wrapper">
        <div className="wnin-filter-container container">
          <h1 className="wnin-filter-title">{title}</h1>
          <div className="wnin-filter-button-wrapper">
            {count ? this.getButtonWithBadge() : this.getButton()}
          </div>
        </div>
      </div>
    );
  }
}

FilterHeader.propTypes = {
  disabled: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired
};

FilterHeader.defaultProps = {
  disabled: false,
  count: 0,
  title: "Filter Header",
  buttonClick: () => {}
};

export default FilterHeader;
