import {
  call, take, put, select,
} from 'redux-saga/effects';

import { eventChannel } from 'redux-saga'; // STUDY_NOTE: eventChannel is a way to listen event listeners inside saga
import TrackPlayer from 'react-native-track-player';

import PlayerActions from '~/store/ducks/player';

function* trackChanged() {
  const channel = eventChannel((emitter) => {
    // This "emitter" will be called each time that event listener is called
    const onTrackChange = TrackPlayer.addEventListener('playback-track-changed', emitter);

    return () => onTrackChange.remove(); // Removed listener to avoid unecessary listen
  });

  try {
    while (true) {
      const { nextTrack } = yield take(channel);

      yield put(PlayerActions.setCurrent(nextTrack));
    }
  } finally {
    channel.close();
  }
}

// This function will be triggered with the application initialization
export function* init() {
  yield call(TrackPlayer.setupPlayer);

  TrackPlayer.updateOptions({
    capabilities: [
      // STUDY_NODE: This is for IOS. Here we can configure what options grant to user access.
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    notificationCapabilities: [
      // STUDY_NODE: This is for ANDROID. Here we can configure what options grant to user access.
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  });

  TrackPlayer.addEventListener('playback-state', (data) => {
    console.tron.log('STATE', data);
  });
}

// STUDY_NOTE: This function will be used by the Saga Listener implemented at "./index.js" and called when the respective redux action is triggered
export function* setPodcast({ podcast, songId }) {
  const currentPodcast = yield select(state => state.player.podcast);

  if (!currentPodcast || podcast.id !== currentPodcast.id) {
    yield call(TrackPlayer.stop);
    yield call(TrackPlayer.reset);

    yield call(TrackPlayer.add, [...podcast.tracks]); // STUDY_NOTE: A new array of tracks is created to avoid reference error over a immutable array

    yield put(PlayerActions.setPodcastSuccess(podcast));
  }

  if (songId) {
    yield call(TrackPlayer.skip, songId);
    yield put(PlayerActions.setCurrent(songId));
  }

  yield put(PlayerActions.play()); // Here is triggered the redux-action "play" to enter in play saga listener flux (see index.js), calling the method "play()" implementer on this file.
  yield call(trackChanged);
}

export function* play() {
  yield call(TrackPlayer.play);
}

export function* pause() {
  yield call(TrackPlayer.pause);
}

export function* next() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(song => song.id === player.current);

  if (player.podcast.tracks[currentIndex + 1]) {
    yield call(TrackPlayer.skipToNext);
    yield put(PlayerActions.play());
  }
}

export function* prev() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(song => song.id === player.current);

  if (player.podcast.tracks[currentIndex - 1]) {
    yield call(TrackPlayer.skipToPrevious);
    yield put(PlayerActions.play());
  }
}

export function* reset() {
  yield call(TrackPlayer.stop);
  yield call(TrackPlayer.reset);
}
