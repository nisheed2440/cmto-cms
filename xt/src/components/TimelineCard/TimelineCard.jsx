import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import SessionTag from "../SessionTag/SessionTag";
import { Link } from "react-router-dom";
import "./TimelineCard.css";

class TimelineCard extends Component {
  state = {
    expanded: false
  };
  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };
  updateFavs = () => {
    const { favCallback, session, favorites } = this.props;
    const tempArr = [...favorites];
    const id = session.id.toString();
    const index = tempArr.indexOf(id);
    if (index > -1) {
      tempArr.splice(index, 1);
    } else {
      tempArr.push(id);
    }
    window.sessionStorage.setItem("wnin.favorites", tempArr);
    favCallback(tempArr);
  };
  favIcon = type => {
    if (this.isFavourite()) {
      if (type !== "break" && type !== "keynote") {
        return (
          <div className="wnin-tile-isfav has-text-centered has-text-warning">
            <Icon>star</Icon>
          </div>
        );
      }
    }
    return;
  };
  isFavourite = () => {
    const { session, favorites } = this.props;
    const id = session.id.toString();
    return favorites.indexOf(id) > -1;
  };
  isBreak = () => {
    const { session } = this.props;
    return session.meta.type.toLowerCase() === "break";
  };
  isKeynote = () => {
    const { session } = this.props;
    return session.meta.type.toLowerCase() === "keynote";
  };
  showFavoriteIcon = type => {
    if (!this.isBreak() && !this.isKeynote()) {
      return (
        <Button
          size="small"
          color="secondary"
          className="wnin-tile-like-btn"
          onClick={this.updateFavs}
        >
          <Icon className="wnin-tile-like-btn-icon">
            {this.isFavourite() ? "star" : "star_border"}
          </Icon>
          {this.isFavourite() ? "Liked" : "Like"}
        </Button>
      );
    }
  };
  render() {
    const { session, baseRoute } = this.props;
    return (
      <Card
        className={`wnin-tile-root ${session.meta.type}`}
        elevation={this.isBreak() ? 0 : 3}
      >
        <CardHeader
          className="wnin-tile-header"
          classes={{
            title: "wnin-tile-title",
            action: "wnin-tile-header-actions"
          }}
          title={session.title}
          subheader={
            <Fragment>
              <span className="wnin-tile-subtitle">
                {session.meta.duration} | {session.meta.venue}
              </span>
              {!this.isBreak() ? (
                <span className="wnin-tile-tags">
                  {session.topics.map(tag => (
                    <SessionTag
                      key={tag.id}
                      label={tag.label}
                      color={tag.color || ""}
                    />
                  ))}
                </span>
              ) : (
                ""
              )}
            </Fragment>
          }
          action={
            !this.isBreak() ? (
              <Fragment>
                <IconButton
                  onClick={this.toggleExpanded}
                  className={`wnin-tile-expand ${
                    this.state.expanded ? "wnin-tile-expand-open" : ""
                  }`}
                >
                  <Icon>expand_more</Icon>
                </IconButton>
                {this.favIcon(session.meta.type)}
              </Fragment>
            ) : (
              ""
            )
          }
        />
        {!this.isBreak() ? (
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent className="wnin-tile-collapsed-content">
              {session.speakers.map(speaker => (
                <div className="wnin-tile-speaker" key={speaker.id}>
                  <span className="wnin-tile-speaker-name">{speaker.name}</span>
                  <span className="wnin-tile-speaker-designation">
                    {speaker.designation}
                  </span>
                </div>
              ))}
              <div className="wnin-tile-session-excerpt">
                <p>{session.excerpt}</p>
              </div>
            </CardContent>
            <CardActions className="wnin-tile-collapsed-footer">
              {this.showFavoriteIcon(session.meta.type)}
              <Button
                variant="contained"
                size="small"
                color="secondary"
                component={Link}
                to={`${baseRoute}${session.id}`}
              >
                Show More
              </Button>
            </CardActions>
          </Collapse>
        ) : (
          ""
        )}
      </Card>
    );
  }
}

TimelineCard.propTypes = {
  session: PropTypes.object.isRequired,
  moreCallback: PropTypes.func,
  favCallback: PropTypes.func,
  favorites: PropTypes.array.isRequired,
  baseRoute: PropTypes.string.isRequired
};

TimelineCard.defaultProps = {
  session: { meta: {}, speakers: [], topics: [] },
  favorites: [],
  baseRoute: "/home/agenda/"
};

export default TimelineCard;