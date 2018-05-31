import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container } from "flux/utils";
import MapPage from "../pages/MapPage";
import WorldHeritageCulturalStore from "../../stores/WorldHeritageCulturalStore";
import WorldHeritageNaturalStore from "../../stores/WorldHeritageNaturalStore";
import WorldHeritageMixedStore from "../../stores/WorldHeritageMixedStore";
import GeoLocationActionCreators from "../../actions/GeoLocationActionCreators";
import ActionTypes from "../../constants/AppConstants";

class MapContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static getStores() {
    return [
      WorldHeritageCulturalStore,
      WorldHeritageNaturalStore,
      WorldHeritageMixedStore
    ];
  }

  static calculateState() {
    return {
      cultural: WorldHeritageCulturalStore.getState(),
      natural: WorldHeritageNaturalStore.getState(),
      mixed: WorldHeritageMixedStore.getState()
    };
  }

  componentWillMount() {
    GeoLocationActionCreators.getLocations({
      type: ActionTypes.GET_WORLD_HERITAGE_CULTURAL_POINTS,
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });

    GeoLocationActionCreators.getLocations({
      type: ActionTypes.GET_WORLD_HERITAGE_NATURAL_POINTS,
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });

    GeoLocationActionCreators.getLocations({
      type: ActionTypes.GET_WORLD_HERITAGE_MIXED_POINTS,
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });
  }

  render() {
    return (
      <MapPage
        context={this.context.router}
        cultural={this.state.cultural}
        natural={this.state.natural}
        mixed={this.state.mixed}
        {...this.props}
      />
    );
  }
}

export default Container.create(MapContainer);
