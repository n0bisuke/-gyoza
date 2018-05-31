describe('WorldHeritageCulturalStore', () => {

  let Store;
  beforeEach(() => {
    Store = require('../../app/stores/WorldHeritageCulturalStore').default;
  });

  it('should data is empty in the initial state.', () => {
    const expectedData = {
      data: [],
    };

    expect(Store.getState()).toEqual(expectedData);
  });
});
