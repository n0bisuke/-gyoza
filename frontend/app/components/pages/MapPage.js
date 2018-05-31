import PropTypes from "prop-types";
import React, { Component } from "react";
import MediaQuery from "react-responsive"; // @see https://www.npmjs.com/package/react-responsive
import { AppBar, Drawer } from "material-ui";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import MapsPlace from "material-ui/svg-icons/maps/place";
import {
  purple300,
  cyan500,
  orange500,
  lightBlack,
  faintBlack
} from "material-ui/styles/colors";
import { BaseLayout } from "material-ui-fj/layouts";
import { VerticalLayout } from "material-ui-fj/sublayouts";
import { OneRowHeader } from "material-ui-fj/Header";
import { SectionWrapper001 } from "material-ui-fj/SectionWrapper";
import { MapPin001 } from "material-ui-fj/MapPin"; // Selectable: MapPin, MapPin001, MapPin002
import { Footer003 } from "material-ui-fj/Footer";
import GoogleMap from "google-map-react"; // @see https://github.com/istarkov/google-map-react
import config from "../../config";

export default class MapPage extends Component {
  static contextTypes = {
    muiFjTheme: PropTypes.object.isRequired
  };

  static propTypes = {
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    cultural: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          lng: PropTypes.number.isRequired,
          lat: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired,
    natural: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          lng: PropTypes.number.isRequired,
          lat: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired,
    mixed: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          lng: PropTypes.number.isRequired,
          lat: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired,
    center: PropTypes.shape({
      lng: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired
    }),

    zoom: PropTypes.number.isRequired
  };

  static defaultProps = {
    style: {},
    center: {
      lng: 139.0,
      lat: 35.0
    },

    zoom: 3
  };

  static pointHeight = 8;
  static pointWidth = 8;
  static pointStyles = {
    position: "absolute",
    width: MapPage.pointWidth,
    left: -MapPage.pointWidth / 2,
    height: MapPage.pointHeight,
    top: -MapPage.pointHeight / 2,
    border: `1px solid ${lightBlack}`,
    borderRadius: 4,
    boxSizing: "border-box"
  };

  static getStyles(context, state) {
    const { serviceBrand } = context.muiFjTheme;
    const styles = {
      root: {},
      cultural: {
        color: state.visibles.indexOf(0) >= 0 ? cyan500 : faintBlack
      },

      natural: {
        color: state.visibles.indexOf(1) >= 0 ? orange500 : faintBlack
      },

      mixed: {
        color: state.visibles.indexOf(2) >= 0 ? purple300 : faintBlack
      },

      title: {
        fontFamily: serviceBrand.fontFamily,
        fontSize: 16,
        fontWeight: serviceBrand.fontWeight ? serviceBrand.fontWeight : 300
      },

      drawerContainer: {
        display: "flex"
      },

      drawer: {
        display: "flex",
        flex: "1 1 auto"
      }
    };

    return styles;
  }

  state = {
    visibles: [],
    openDrawer: false
  };

  handleClick = (event, menuItem, index) => {
    const visibles = this.state.visibles;
    const nextVisibles = visibles.includes(index)
      ? visibles.filter(visible => visible !== index)
      : visibles.concat([index]);
    this.setState({ visibles: nextVisibles });
  };

  renderPoints = ({ points, style }) => {
    const pointStyle = Object.assign({}, MapPage.pointStyles, style);
    return points.map(point => (
      <MapPin001
        key={`${point.name}-${point.lng}-${point.lat}`}
        style={pointStyle}
        lng={point.lng}
        lat={point.lat}
        title={point.name}
      />
    ));
  };

  render() {
    const { style, cultural, natural, mixed } = this.props;

    const styles = MapPage.getStyles(this.context, this.state);
    const mergedRootStyle = Object.assign({}, styles.root, style);
    const culturalStyles = styles.cultural;
    const naturalStyles = styles.natural;
    const mixedStyles = styles.mixed;

    const marker = [
      { points: cultural.data, style: { backgroundColor: cyan500 } },
      { points: natural.data, style: { backgroundColor: orange500 } },
      { points: mixed.data, style: { backgroundColor: purple300 } }
    ]
      .filter((category, index) => this.state.visibles.includes(index))
      .map(category => this.renderPoints(category))
      .reduce((prev, curr) => prev.concat(curr), []);
    const title = "Playground Application";

    const top = <OneRowHeader title={title} />;

    const left = (
      <SectionWrapper001>
        <VerticalLayout expandable>
          <Menu
            onItemTouchTap={this.handleClick}
            autoWidth={false}
            listStyle={{ display: "static", width: "100%" }}
          >
            <MenuItem
              primaryText="Cultural"
              leftIcon={<MapsPlace color={culturalStyles.color} />}
            />

            <MenuItem
              primaryText="Natural"
              leftIcon={<MapsPlace color={naturalStyles.color} />}
            />

            <MenuItem
              primaryText="Mixed"
              leftIcon={<MapsPlace color={mixedStyles.color} />}
            />
          </Menu>
        </VerticalLayout>
      </SectionWrapper001>
    );

    const center = (
      <GoogleMap
        bootstrapURLKeys={config.bootstrapURLKeys}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {marker}
      </GoogleMap>
    );

    const bottom = <Footer003 />;

    const appBar = (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.title}
          onLeftIconButtonTouchTap={() =>
            this.setState({ openDrawer: !this.state.openDrawer })}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={open => this.setState({ openDrawer: open })}
          containerStyle={styles.drawerContainer}
          style={styles.drawer}
        >
          {left}
        </Drawer>
      </div>
    );

    return (
      <div>
        <MediaQuery minWidth={700}>
          <BaseLayout
            top={top}
            center={center}
            left={left}
            leftStyle={{ width: 200 }}
            bottom={bottom}
            style={mergedRootStyle}
            fixed
          />
        </MediaQuery>
        <MediaQuery maxWidth={699}>
          <BaseLayout
            top={appBar}
            center={center}
            bottom={bottom}
            style={mergedRootStyle}
            fixed
          />
        </MediaQuery>
      </div>
    );
  }
}
