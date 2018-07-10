import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { LoadableHomepage } from "./loadable";
import theme from "./utils/theme";
import store from "./store";
import { Provider } from "react-redux";
import "./App.css";
import { Helmet } from "react-helmet";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.REACT_APP_BASE_PATH}>
          <React.Fragment>
            <Helmet
              title={"CMTOu | What's Next In Now"}
              meta={[
              { property: 'og:title', content: "CMTOu | What's Next In Now" },
              { property: 'og:description', content: "Event for CMTOu - Chief Marketing Technology Officer University"},
              { property: 'twitter:card', content: "CMTOu | What's Next In Now" },
              ]}
            />
            <CssBaseline />
            <MuiThemeProvider theme={theme}>
              <Switch>
                <Route path="/home" component={LoadableHomepage} />
                <Redirect from="/" to="/home" />
              </Switch>
            </MuiThemeProvider>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
