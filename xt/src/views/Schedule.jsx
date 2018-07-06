import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import TimelineCard from "../components/TimelineCard/TimelineCard";
import ShowMore from "../components/ShowMore/ShowMore";
import { actionUpdateTab, actionUpdateFavorites } from "../store/actions";
const styles = theme => ({
  spinner: {
    margin: theme.spacing.unit * 2
  }
});

class Schedule extends Component {
  componentWillMount() {
    const { updateTab } = this.props;
    updateTab("agenda");
  }
  containsFilters = (sessionTopics, appliedFilters) => {
    for (var i = 0, len = sessionTopics.length; i < len; i++) {
      if (appliedFilters.indexOf(sessionTopics[i].id.toString()) > -1)
        return true;
    }
    return false;
  };
  getFilteredSessions = (sessions, appliedFilters) => {
    let filteredSessions = [];
    sessions.forEach(session => {
      if (appliedFilters.length) {
        if (this.containsFilters(session.topics, appliedFilters)) {
          filteredSessions.push(session);
        } else {
          if (session.meta.type === "break") {
            filteredSessions.push(session);
          }
        }
      } else {
        filteredSessions.push(session);
      }
    });
    return this.getSessions(filteredSessions);
  };

  groupBy = (sessionArr, propName) => {
    let sessionGroups = {};
    sessionArr.forEach(o => {
      let group = JSON.stringify(propName(o));
      sessionGroups[group] = sessionGroups[group] || [];
      sessionGroups[group].push(o);
    });
    return Object.keys(sessionGroups).map(group => {
      if (sessionGroups[group].length > 1) {
        return sessionGroups[group];
      } else {
        return sessionGroups[group][0];
      }
    });
  };

  displayTimeGroup = sessionArr => {
    const { updateFavorites, favorites } = this.props;
    return sessionArr.map(session => {
      return (
        <TimelineCard
          key={session.id}
          session={session}
          favCallback={updateFavorites}
          favorites={favorites}
        />
      );
    });
  };

  displaySessionsByGroup = groupedSessions => {
    const { updateFavorites, favorites } = this.props;
    return groupedSessions.map((sessionGroup, idx) => {
      if (sessionGroup.length) {
        return (
          <div
            key={sessionGroup[0].id + idx}
            className="timeline-item is-primary"
          >
            <div className="timeline-marker" />
            <div className="timeline-content">
              <span className="heading has-text-grey">
                {sessionGroup[0].meta.time}
              </span>
              {this.displayTimeGroup(sessionGroup)}
            </div>
          </div>
        );
      } else {
        return (
          <div key={sessionGroup.id} className="timeline-item is-primary">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <span className="heading has-text-grey">
                {sessionGroup.meta.time}
              </span>
              <TimelineCard
                key={sessionGroup.id}
                session={sessionGroup}
                favCallback={updateFavorites}
                favorites={favorites}
              />
            </div>
          </div>
        );
      }
    });
  };

  getSessions = sessions => {
    // displays sessions based on order
    sessions.sort(function(obj1, obj2) {
      return obj1.meta.order - obj2.meta.order;
    });

    let result = this.groupBy(sessions, function(item) {
      return [item.meta.time];
    });

    return (
      <div className="timeline">
        <header className="timeline-header">
          <span className="tag is-medium is-primary has-text-white">Start</span>
        </header>
        {this.displaySessionsByGroup(result)}
        <header className="timeline-header">
          <span className="tag is-medium is-primary has-text-white">End</span>
        </header>
      </div>
    );
  };
  createSessionList = sessions => {
    const { appliedFilters } = this.props;
    return (
      <Fragment>
        {appliedFilters.length
          ? this.getFilteredSessions(sessions, appliedFilters)
          : this.getSessions(sessions)}
      </Fragment>
    );
  };
  showSpinner = () => {
    const { classes } = this.props;
    return (
      <Grid container spacing={0} justify="center">
        <CircularProgress className={classes.spinner} />
      </Grid>
    );
  };
  createSubRoute = sessions => {
    return (
      <Route
        path={"/home/agenda/:sessionId"}
        render={({ match }) => {
          const selectedSession = sessions.filter(
            session => session.id.toString() === match.params.sessionId
          );
          if (selectedSession.length) {
            const { favorites, updateFavorites } = this.props;
            return (
              <ShowMore
                session={selectedSession[0]}
                favCallback={updateFavorites}
                favorites={favorites}
              />
            );
          }
          return <Redirect to="/home/agenda" />;
        }}
      />
    );
  };
  render() {
    const { sessions } = this.props;
    return (
      <Fragment>
        {sessions.length ? (
          <Fragment>
            {this.createSessionList(sessions)}
            {this.createSubRoute(sessions)}
          </Fragment>
        ) : (
          this.showSpinner()
        )}
      </Fragment>
    );
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
  sessions: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  appliedFilters: PropTypes.array.isRequired,
  updateTab: PropTypes.func.isRequired,
  updateFavorites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sessions: state.sessions.data,
  appliedFilters: state.sessions.appliedFilters,
  favorites: state.sessions.favorites
});

const mapDispatchToProps = dispatch => ({
  updateTab: data => {
    dispatch(actionUpdateTab(data));
  },
  updateFavorites: data => {
    dispatch(actionUpdateFavorites(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Schedule));
