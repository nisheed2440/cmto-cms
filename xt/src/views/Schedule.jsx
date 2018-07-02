import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import TimelineCard from "../components/TimelineCard/TimelineCard";
import ShowMore from "../components/ShowMore";
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
  createSessionList = sessions => {
    const { updateFavorites, favorites } = this.props;
    return (
      <div className="timeline">
        <header className="timeline-header">
          <span className="tag is-medium is-primary">
            <Typography
              variant="body1"
              className={"has-text-white"}
              component={"span"}
            >
              Start
            </Typography>
          </span>
        </header>
        {sessions.map(session => {
          return (
            <div key={session.id} className="timeline-item is-primary">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <Typography variant="body2" className="heading has-text-grey">
                  {session.meta.time}
                </Typography>
                <TimelineCard
                  key={session.id}
                  session={session}
                  favCallback={updateFavorites}
                  favorites={favorites}
                />
              </div>
            </div>
          );
        })}
        <header className="timeline-header">
          <span className="tag is-medium is-primary">
            <Typography
              variant="body1"
              className={"has-text-white"}
              component={"span"}
            >
              End
            </Typography>
          </span>
        </header>
      </div>
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
            return <ShowMore session={selectedSession[0]} />;
          }
          return <Redirect to="/home/agenda/" />;
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
