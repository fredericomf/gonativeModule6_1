import { combineReducers } from 'redux';

import { reducer as player } from './player';
import { reducer as podcasts } from './podcasts';

export default combineReducers({
  podcasts,
  player,
});
