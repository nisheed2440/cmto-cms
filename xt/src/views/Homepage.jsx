import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import NavTabs from "../components/NavTabs/NavTabs";
import HeroBanner from "../components/HeroBanner";
import BannerImage from "../assets/images/bg9.png";
import WninLogo from "../assets/images/CMTOu_white.png";
import Schedule from "./Schedule";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import FilterHeader from "../components/FilterHeader/FilterHeader";
import Favourites from "./Favourites";
import { connect } from "react-redux";
import {
  actionUpdateScheduleInfo,
  actionUpdateFilterTags,
  actionUpdateLoader,
  actionToggleSidebar,
  actionApplyFilters,
  actionClearFilters
} from "../store/actions";
import MainLoader from "../components/MainLoader/MainLoader";

const styles = theme => ({});

const routeMapping = {
  favourites: <Favourites />,
  agenda: <Schedule />
};

class Homepage extends Component {
  handleChange = (event, value) => {
    const { history } = this.props;
    history.push(`/home/${value}`);
  };

  fetchSessions = () => {
    return axios.get(`${window.CMTOu.wnin.urls.api}/sessions`).catch(err => {
      console.log(err);
    });
  };

  fetchFilters = () => {
    return axios.get(`${window.CMTOu.wnin.urls.api}/topics`).catch(err => {
      console.log(err);
    });
  };

  toggleSidebar = () => {
    const { toggleSidebar, sidebarOpen } = this.props;
    toggleSidebar(!sidebarOpen);
  };

  clearFilters = () => {
    const { clearFilters } = this.props;
    clearFilters();
  };

  applyFilters = data => {
    const { applyFilters } = this.props;
    applyFilters(data);
  };

  componentWillMount() {
    const { updateLoader } = this.props;
    updateLoader(true);
  }

  componentDidMount() {
    const { updateData, updateFilters, updateLoader } = this.props;
    Promise.all([this.fetchSessions(), this.fetchFilters()]).then(modules => {
      updateData(modules[0].data);
      updateFilters(modules[1].data);
      updateLoader(false);
    });
  }

  render() {
    const { sidebarOpen, isVisible, tab, filters, appliedFilters } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <HeroBanner imageSrc={BannerImage}>
            <LazyLoad height={260}>
              <img src={WninLogo} alt="Logo" />
            </LazyLoad>
          </HeroBanner>
        </div>
        <Paper elevation={1}>
          <NavTabs tab={tab} tabClickHandler={this.handleChange} />
        </Paper>
        <FilterHeader
          count={appliedFilters.length}
          title={tab}
          disabled={!filters.length}
          buttonClick={this.toggleSidebar}
        />
        <main className="section">
          <div className="container">
            <Switch>
              <Route
                path="/home/:tab"
                render={({ match }) => {
                  const tab = match.params.tab;
                  if (routeMapping[tab]) {
                    return routeMapping[tab];
                  } else {
                    return <Redirect to="/home/agenda" />;
                  }
                }}
              />
              <Redirect exact from="/home" to="/home/agenda" />
              <Redirect exact from="/" to="/home" />
            </Switch>
          </div>
        </main>
        <FilterSidebar
          sidebarOpen={sidebarOpen}
          filters={filters}
          appliedFilters={appliedFilters}
          clearCallback={this.clearFilters}
          applyCallback={this.applyFilters}
          toggleSidebar={this.toggleSidebar}
        />
        <MainLoader isVisible={isVisible} />
      </React.Fragment>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired,
  appliedFilters: PropTypes.array.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  updateData: PropTypes.func.isRequired,
  updateFilters: PropTypes.func.isRequired,
  updateLoader: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sidebarOpen: state.sidebar.isOpen,
  isVisible: state.loader.isVisible,
  tab: state.tab.value,
  filters: state.sessions.filters,
  appliedFilters: state.sessions.appliedFilters
});

const mapDispatchToProps = dispatch => ({
  updateData: data => {
    dispatch(actionUpdateScheduleInfo(data));
  },
  updateFilters: data => {
    dispatch(actionUpdateFilterTags(data));
  },
  updateLoader: data => {
    dispatch(actionUpdateLoader(data));
  },
  toggleSidebar: isOpen => {
    dispatch(actionToggleSidebar(isOpen));
  },
  applyFilters: data => {
    dispatch(actionApplyFilters(data));
  },
  clearFilters: () => {
    dispatch(actionClearFilters());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Homepage)));
