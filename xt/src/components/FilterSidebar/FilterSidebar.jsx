import React, { Component } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import "./FilterSidebase.css";

class FilterSidebar extends Component {
  state = {
    appliedFilters: this.props.appliedFilters
  };

  closeSidebar = () => {
    const { toggleSidebar, sidebarOpen } = this.props;
    toggleSidebar(!sidebarOpen);
  };

  clearCallback = () => {
    const { clearCallback } = this.props;
    window.sessionStorage.setItem("wnin.appliedFilters", []);
    this.setState({
      appliedFilters: []
    });
    clearCallback();
  };

  handleFiterChange = event => {
    const { applyCallback } = this.props;
    let tempArr = [...this.state.appliedFilters];
    let index = tempArr.indexOf(event.target.value);
    if (index > -1) {
      tempArr.splice(index, 1);
    } else {
      tempArr.push(event.target.value);
    }
    this.setState({
      appliedFilters: tempArr
    });
    window.sessionStorage.setItem("wnin.appliedFilters", tempArr);
    applyCallback(tempArr);
  };

  isChecked = filterId => {
    return this.state.appliedFilters.indexOf(filterId.toString()) > -1
      ? true
      : false;
  };

  render() {
    const { sidebarOpen, filters } = this.props;
    return (
      <Drawer
        anchor={"right"}
        open={sidebarOpen}
        onClose={this.closeSidebar}
        classes={{
          paperAnchorRight: "wnin-fs-anchor-right"
        }}
      >
        <div className="wnin-fs-wrapper">
          <Toolbar className="wnin-fs-toolbar">
            <div className="wnin-fs-title-wrapper">
              <h2 className="wnin-fs-title">Filters</h2>
            </div>
            <IconButton className="wnin-fs-close" onClick={this.closeSidebar}>
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
          <div className="wnin-fs-list-wrapper">
            <List
              subheader={
                <ListSubheader
                  component="li"
                  classes={{ root: "wnin-fs-subtitle-wrapper" }}
                >
                  <h3 className="wnin-fs-subtitle">By Topic</h3>
                </ListSubheader>
              }
              className="wnin-fs-list"
            >
              {filters.map(filter => (
                <ListItem
                  key={filter.id}
                  role={undefined}
                  className="wnin-fs-list-item"
                  divider
                >
                  <ListItemText
                    primary={
                      <span className="wnin-fs-list-item-label">
                        {filter.label}
                      </span>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      value={filter.id.toString()}
                      checked={this.isChecked(filter.id)}
                      style={{ color: filter.color || "#ccc" }}
                      onChange={this.handleFiterChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
          <div className="wnin-fs-footer">
            <Button
              size="small"
              color="primary"
              className="wnin-fs-clear"
              onClick={this.clearCallback}
            >
              CLEAR ALL
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

FilterSidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  clearCallback: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  appliedFilters: PropTypes.array.isRequired
};

export default FilterSidebar;
