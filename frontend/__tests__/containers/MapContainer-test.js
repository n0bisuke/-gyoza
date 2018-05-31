jest.autoMockOff();

// @TODO Please remove this mock after implementing your application and proper tests.
jest.mock(
  '../../app/components/pages/MapPage',
  ()=> 'MapPage'
);

import React from 'react';
import renderer from 'react-test-renderer';

import { Dark07 } from 'material-ui-fj/styles/baseThemes';
import { getMuiFjTheme, MuiFjThemeProvider } from 'material-ui-fj/styles';

import AppDispatcher from '../../app/dispatcher/AppDispatcher';
import MapContainer from '../../app/components/containers/MapContainer';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const RouterContextWrapper = React.createClass({
  childContextTypes: { router: React.PropTypes.object },
  getChildContext: () => ({ router: {} }),
  render: function() {
    return (<div>{this.props.children}</div>);
  }
});

describe('MapContainer', () => {

  beforeEach(() => {});
  afterEach(() => {});

  it('snapshot test', () => {
    const muiFjTheme = getMuiFjTheme(Dark07);
    const mapContainerSnapshot = renderer.create(
      <MuiFjThemeProvider muiFjTheme={muiFjTheme}>
        <RouterContextWrapper>
          <MapContainer />
        </RouterContextWrapper>
      </MuiFjThemeProvider>
    );

    expect(mapContainerSnapshot.toJSON()).toMatchSnapshot();
  });
});
