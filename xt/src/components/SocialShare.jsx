import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TwitterShareButton,
         FacebookShareButton,
         GooglePlusShareButton,
         FacebookIcon,
         TwitterIcon,
         GooglePlusIcon    } from 'react-share';

const styles = theme => ({
    socialContainer: {
        display: '-webkit-box'
    },
    socialShareTitle: {
        marginRight: '20px',
        marginTop: '8px'
    },
    socialShareIcon: {
        verticalAlign: 'top',
        display: 'inline-block',
        textAlign: 'center'
    },
    shareCount: {
        marginTop: '3px',
        fontSize: '12px'
    },
    shareButton: {
        cursor: 'pointer',
        outline: '0'
    }
});

class SocialShare extends Component {
    render() {
        const shareUrl = 'http://wnin.info';
        const title = 'CMTO';
        const { classes } = this.props;
        return(
            <Grid container className={classes.socialContainer}>
                <Grid item xs={12} sm={10}>
                <div className={classes.socialShareTitle}>
                  <Typography variant="body2">
                    {"Share"}
                  </Typography>
                </div>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <div className={classes.socialShareIcon}>
                        <TwitterShareButton
                            url={shareUrl}
                            title={title}
                            className={classes.shareButton}>
                            <TwitterIcon
                            size={40}
                            iconBgStyle={{fill:"#ffffff"}}
                            logoFillColor={"#000000"}  />
                        </TwitterShareButton>

                        <div className={classes.shareCount}>
                            &nbsp;
                        </div>
                    </div>
                    <div className={classes.socialShareIcon}>
                        <FacebookShareButton
                            url={shareUrl}
                            quote={title}
                            className={classes.shareButton}>
                            <FacebookIcon
                                size={40}
                                round={false}
                                iconBgStyle={{fill:"#ffffff"}}
                                logoFillColor={"#000000"} />
                        </FacebookShareButton>
                    </div>
                    <div className={classes.socialShareIcon}>
                        <GooglePlusShareButton
                            url={shareUrl}
                            className={classes.shareButton}>
                            <GooglePlusIcon
                            size={40}
                            iconBgStyle={{fill:"#ffffff"}}
                            logoFillColor={"#000000"}  />
                        </GooglePlusShareButton>
                    </div>
                </Grid>
            </Grid>
        );
    } 
}

SocialShare.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SocialShare);
