import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import SocialShare from "../SocialShare/SocialShare";
import SessionTag from "../SessionTag/SessionTag";
import { Helmet } from "react-helmet";
// import SpeakerSocialShare from "../SpeakerSocialShare/SpeakerSocialShare";
import "./ShowMore.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ShowMore extends Component {
  state = {
    redirect: false
  };
  onClose = () => {
    this.setState({
      redirect: true
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
  isFavourite = () => {
    const { session, favorites } = this.props;
    const id = session.id.toString();
    return favorites.indexOf(id) > -1;
  };
  showFavoriteIcon = type => {
    if (type.toLowerCase() !== "break" && type.toLowerCase() !== "keynote") {
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
  getSpeakerTile(speaker, session) {
    return (
      <section key={speaker.id} className="media wnin-modal-speaker">
        <figure className="media-left">
          <p className="image wnin-modal-speaker-image">
            <img
              src={
                speaker.image ? speaker.image : "//via.placeholder.com/96x96"
              }
              alt={speaker.name}
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <div>
              <span className="wnin-modal-speaker-title">{speaker.name}</span>
              <br />
              <span className="wnin-modal-speaker-designation">
                {speaker.designation}
              </span>
              <br />
              <p>{speaker.description}</p>
            </div>
          </div>
          {/* <SpeakerSocialShare title={session.title} social={speaker.social} /> */}
        </div>
      </section>
    );
  }
  render() {
    const { session, baseRoute } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={baseRoute} />;
    }
    return (
      <Dialog
        fullScreen
        open={true}
        onClose={this.onClose}
        TransitionComponent={Transition}
        classes={{ paper: "wnin-modal-container" }}
      >
      <Helmet
        title={session.title}
        meta={[
        { property: 'og:title', content: session.title },
        { property: 'og:description', content: session.excerpt },
        { property: 'twitter:card', content: session.title },
        ]}
        />
        <div className="wnin-filter-wrapper">
          <div className="wnin-filter-container container is-fluid">
            <div className="wnin-filter-button-wrapper">
              <IconButton
                aria-label="close"
                className="wnin-filter-button"
                onClick={this.onClose}
              >
                <Icon className="wnin-filter-button-icon">close</Icon>
              </IconButton>
            </div>
          </div>
        </div>
        <div className="section wnin-modal-section">
          <div className="container">
            <div className="wnin-modal-header-section" style={{borderLeftColor: session.meta.venueColor}}>
              <h1 className="wnin-modal-title">{session.title}</h1>
              <h3 className="wnin-modal-subtitle">
                {session.meta.duration} | {session.meta.venue}
              </h3>
              <span className="wnin-modal-tags">
                  {session.topics.map(tag => (
                    <SessionTag
                      key={tag.id}
                      label={tag.label}
                      color={tag.color || ""}
                    />
                  ))}
                </span>
            </div>
            {session.speakers.map(speaker => {
              return this.getSpeakerTile(speaker, session);
            })}
            <div
              className="wnin-modal-desc"
              dangerouslySetInnerHTML={{ __html: session.content }}
            />
            <div className="wnin-modal-social-share">
              <nav className="level is-mobile">
                <div className="level-left">
                  {this.showFavoriteIcon(session.meta.type)}
                </div>
                <SocialShare title={session.title} />
              </nav>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

ShowMore.propTypes = {
  session: PropTypes.object.isRequired,
  baseRoute: PropTypes.string.isRequired,
  favCallback: PropTypes.func,
  favorites: PropTypes.array.isRequired
};

ShowMore.defaultProps = {
  session: { meta: {}, speakers: [], topics: [] },
  favorites: [],
  baseRoute: "/home/agenda/"
};

export default ShowMore;
