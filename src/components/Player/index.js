import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerActions from '~/store/ducks/player';

import {
  Container,
  CoverBackground,
  SongInfo,
  SongTitle,
  SongAuthor,
  Controls,
  ControlButton,
  ControlIcon,
} from './styles';

const Player = ({
  player, play, pause, next, prev, currentSong,
}) => player.current && (
  <Container>
    <CoverBackground source={{ uri: player.podcast.cover }} />

    <SongInfo>
      <SongTitle>{currentSong.title}</SongTitle>
      <SongAuthor>{currentSong.artist}</SongAuthor>
    </SongInfo>

    <Controls>
      <ControlButton onPress={prev}>
        <ControlIcon name="skip-previous" />
      </ControlButton>
      <ControlButton onPress={player.playing ? pause : play}>
        <ControlIcon name={player.playing ? 'pause-circle-filled' : 'play-circle-filled'} />
      </ControlButton>
      <ControlButton onPress={next}>
        <ControlIcon name="skip-next" />
      </ControlButton>
    </Controls>
  </Container>
);

const mapStateToProps = state => ({
  player: state.player,
  currentSong: state.player.podcast
    ? state.player.podcast.tracks.find(song => song.id === state.player.current)
    : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
