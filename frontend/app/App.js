import PropTypes from "prop-types";
import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import MuiFjThemeProvider from "material-ui-fj/styles/MuiFjThemeProvider";
import getMuiFjTheme from "material-ui-fj/styles/getMuiFjTheme";
import { Dark07 } from "material-ui-fj/styles/baseThemes";
import injectTapEventPlugin from "react-tap-event-plugin";
import MapContainer from "./components/containers/MapContainer";
import setFontFamily from "material-ui-fj/styles/setFontFamily";
const theme = setFontFamily(Dark07, "Roboto", "Roboto");
theme.serviceBrand.fontWeight = 400;

const muiFjTheme = getMuiFjTheme(theme);

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static defaultProps = {};

  static getStores() {
    return [];
  }

  static calculateState() {
    return {};
  }

  render() {
    return (
      <MuiFjThemeProvider muiFjTheme={muiFjTheme}>
        {this.props.children}
      </MuiFjThemeProvider>
    );
  }
}

injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MapContainer} />
      <Route path="/map" component={MapContainer} />
    </Route>
  </Router>,
  document.getElementById("root")
);
