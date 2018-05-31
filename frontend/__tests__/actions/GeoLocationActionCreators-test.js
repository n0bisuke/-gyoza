describe('GeoLocationActionCreators', () => {

  let GeoLocationActionCreators;
  beforeEach(() => {
    GeoLocationActionCreators = require('../../app/actions/GeoLocationActionCreators').default;
  });

  it('should have getLocations function.', () => {
    expect(GeoLocationActionCreators.getLocations).toBeTruthy();
  });

});
