import React, { Component } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  paperAnchorRight: {
    backgroundColor: "#fff"
  },
  wrapper: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  flex: {
    flex: 1,
    paddingTop: theme.spacing.unit * 2
  },
  close: {},
  toolbar: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  listWrapper: {
    flex: 1,
    padding: theme.spacing.unit * 2
  },
  listSubheader: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
    paddingLeft: 0,
    paddingBottom: theme.spacing.unit * 2
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2,
    alignItems: "center"
  },
  button: {
    width: "80%",
    marginBottom: theme.spacing.unit
  }
});

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

  applyCallback = () => {
    const { applyCallback } = this.props;
    window.sessionStorage.setItem("wnin.appliedFilters", this.state.appliedFilters);
    applyCallback(this.state.appliedFilters);
  };

  handleFiterChange = (event, isChecked) => {
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
  };

  isChecked = filterId => {
    return this.state.appliedFilters.indexOf(filterId.toString()) > -1
      ? true
      : false;
  };

  render() {
    const { classes, sidebarOpen, filters } = this.props;
    return (
      <Drawer
        anchor={"right"}
        open={sidebarOpen}
        onClose={this.closeSidebar}
        classes={{
          paperAnchorRight: classes.paperAnchorRight
        }}
      >
        <div className={classes.wrapper}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.flex}>
              <Typography variant="title" color="inherit" gutterBottom>
                Filters
              </Typography>
            </div>
            <IconButton className={classes.close} onClick={this.closeSidebar}>
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
          <div className={classes.listWrapper}>
            <List
              subheader={
                <ListSubheader
                  component="li"
                  classes={{ root: classes.listSubheader }}
                >
                  <Typography variant="subheading">By Topic</Typography>
                </ListSubheader>
              }
              className={classes.list}
            >
              {filters.map(filter => (
                <ListItem
                  key={filter.id}
                  role={undefined}
                  className={classes.listItem}
                  divider
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">{filter.label}</Typography>
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
          <div className={classes.footer}>
            <Button
              size="small"
              color="primary"
              className={classes.button}
              onClick={this.clearCallback}
            >
              CLEAR ALL
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.applyCallback}
            >
              APPLY
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

FilterSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  clearCallback: PropTypes.func.isRequired,
  applyCallback: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  appliedFilters: PropTypes.array.isRequired
};

export default withStyles(styles)(FilterSidebar);
