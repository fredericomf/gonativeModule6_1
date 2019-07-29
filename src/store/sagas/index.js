import { all, takeLatest } from 'redux-saga/effects';

import { PlayerTypes } from '~/store/ducks/player';
import { PodcastsTypes } from '~/store/ducks/podcasts';

import {
  init, setPodcast, play, pause, next, prev, reset,
} from './player';

import { load } from './podcasts';

export default function* rootSaga() {
  return yield all([
    init(),

    // Here are implemented the listeners for triggered actions(redux) and intercepted by saga(second parameter)

    // STUDY_NOTE: When the action (redux) SET_PODCAST is called we'll call the "setPodcast" saga method (implemented in ./player.js)
    takeLatest(PlayerTypes.SET_PODCAST, setPodcast),
    
    
    takeLatest(PlayerTypes.RESET, reset),
    takeLatest(PlayerTypes.PLAY, play),
    takeLatest(PlayerTypes.PAUSE, pause),
    takeLatest(PlayerTypes.NEXT, next),
    takeLatest(PlayerTypes.PREV, prev),

    takeLatest(PodcastsTypes.LOAD_REQUEST, load),
  ]);
}
