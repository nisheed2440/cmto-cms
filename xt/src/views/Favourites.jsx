import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TimelineCard from "../components/TimelineCard/TimelineCard";
import { actionUpdateTab, actionUpdateFavorites } from "../store/actions";

const styles = theme => ({});

class Favourites extends Component {
  containsFilters = (sessionTopics, appliedFilters) => {
    for (var i = 0, len = sessionTopics.length; i < len; i++) {
      if (appliedFilters.indexOf(sessionTopics[i].id.toString()) > -1)
        return true;
    }
    return false;
  };

  componentWillMount() {
    const { updateTab } = this.props;
    updateTab("favourites");
  }
  getFavSessions = (sessions, favorites, appliedFilters) => {
    let favSessions = [];
    sessions.forEach(session => {
      if (favorites.indexOf(session.id.toString()) > -1) {
        if (appliedFilters.length) {
          if (this.containsFilters(session.topics, appliedFilters)) {
            favSessions.push(session);
          }
        } else {
          favSessions.push(session);
        }
      }
    });
    return favSessions;
  };
  getTimelineCard = session => {
    const { updateFavorites, favorites } = this.props;
    return (
      <div key={session.id} className="timeline-item is-primary">
        <div className="timeline-marker" />
        <div className="timeline-content">
          <span className="heading has-text-grey">{session.meta.time}</span>
          <TimelineCard
            key={session.id}
            session={session}
            favCallback={updateFavorites}
            favorites={favorites}
          />
        </div>
      </div>
    );
  };

  getFavSessionsCards = (sessions, favorites, appliedFilters) => {
    const favSessions = this.getFavSessions(
      sessions,
      favorites,
      appliedFilters
    );
    // displays sessions based on order
    let sortedFavSessions = favSessions.sort(function(obj1, obj2) {
      return obj1.meta.order - obj2.meta.order;
    });
    if (favSessions.length) {
      return favSessions.map(session => {
        return this.getTimelineCard(session);
      });
    } else {
      return this.getFavPlaceHolder(
        "No sessions found for the applied filters!"
      );
    }
  };
  getFavPlaceHolder = (title = "No sessions found!") => {
    return (
      <span className="wnin-favorite-placeholder has-text-grey has-text-centered">
        {title}
      </span>
    );
  };

  render() {
    const { sessions, favorites, appliedFilters } = this.props;
    return (
      <Fragment>
        {favorites.length
          ? this.getFavSessionsCards(sessions, favorites, appliedFilters)
          : this.getFavPlaceHolder()}
      </Fragment>
    );
  }
}

Favourites.propTypes = {
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
)(withStyles(styles)(Favourites));
