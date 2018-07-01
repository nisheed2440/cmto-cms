import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import "./FilterHeader.css";

const styles = theme => ({
  badge: {
    top: -8,
    right: -8
  }
});

class FilterHeader extends Component {
  getButton() {
    const { disabled, buttonClick } = this.props;
    return (
      <IconButton
        aria-label="filter"
        className={"wnin-filter-button"}
        disabled={disabled}
        onClick={buttonClick}
      >
        <Icon className={"wnin-filter-button-icon"}>filter_list</Icon>
      </IconButton>
    );
  }
  getButtonWithBadge() {
    const { disabled, count, buttonClick, classes } = this.props;
    return (
      <Badge
        color="primary"
        classes={{ badge: classes.badge }}
        badgeContent={count || 0}
        className={""}
      >
        <IconButton
          aria-label="filter"
          className={"wnin-filter-button"}
          disabled={disabled}
          onClick={buttonClick}
        >
          <Icon className={"wnin-filter-button-icon"}>filter_list</Icon>
        </IconButton>
      </Badge>
    );
  }
  render() {
    const { count, title } = this.props;
    return (
      <div className={"wnin-filter-wrapper"}>
        <div className={"wnin-filter-container container"}>
          <Typography variant={"headline"} className={"wnin-filter-title"}>
            {title}
          </Typography>
          <div className={"wnin-filter-button-wrapper"}>
            {count ? this.getButtonWithBadge() : this.getButton()}
          </div>
        </div>
      </div>
    );
  }
}

FilterHeader.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(FilterHeader);
