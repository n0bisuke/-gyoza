import { ReduceStore } from 'flux/utils';
import ActionTypes from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class WorldHeritageMixedStore extends ReduceStore {
  getInitialState() {
    return {
      data: [],
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.GET_WORLD_HERITAGE_MIXED_POINTS: {
        return {
          data: action.data,
        };
      }
      default: {
        return state;
      }
    }
  }
}

export default new WorldHeritageMixedStore(AppDispatcher);
