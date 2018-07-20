import React, { PureComponent } from "react";
import Loadable from "react-loadable";
class Loading extends PureComponent {
  render() {
    return (
      <div className="wnin-loader">
        <div className="wnin-loader-logo-wrapper">
          <div
            className="wnin-loader-logo"
            style={{"backgroundImage": window.wninLogo}}
          />
        </div>
      </div>
    );
  }
}

export const LoadableHomepage = Loadable({
  loader: () => import("../views/Homepage"),
  loading() {
    return (<Loading/>);
  }
});

export const LoadableLoader = Loadable({
  loader: () => import("../components/MainLoader/MainLoader"),
  loading() {
    return (<Loading/>);
  }
});
