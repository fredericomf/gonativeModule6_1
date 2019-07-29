import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerActions from '~/store/ducks/player';

import {
  Container,
  Song,
  Title,
  Author,
  Background,
  PlayListDetails,
  PlaylistTitle,
  SongList,
  Cover,
  PlayButton,
  PlayButtonText,
} from './styles';

class Playlist extends Component {
  handlePlay = (podcastId, songId) => {
    const { setPodcast, navigation } = this.props;
    const podcast = navigation.getParam('podcast');

    setPodcast(podcast, songId);
  };

  render() {
    const { navigation, currentSong } = this.props;
    const podcast = navigation.getParam('podcast');

    return (
      <Container>
        <SongList
          ListHeaderComponent={() => (
            <PlayListDetails>
              <Background source={{ uri: podcast.cover }} blurRadius={5} />
              <Cover source={{ uri: podcast.cover }} />

              <PlaylistTitle>{podcast.title}</PlaylistTitle>

              <PlayButton onPress={() => this.handlePlay()}>
                <PlayButtonText>REPRODUZIR</PlayButtonText>
              </PlayButton>
            </PlayListDetails>
          )}
          data={podcast.tracks}
          keyExtractor={song => String(song.id)}
          renderItem={(
            { item: song }, // STUDY_NOTE: Renaming item to song
          ) => (
            <Song onPress={() => this.handlePlay(podcast.id, song.id)}>
              <Title active={currentSong && currentSong.id === song.id}>{song.title}</Title>
              <Author>{song.artist}</Author>
            </Song>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentSong: state.player.podcast
    ? state.player.podcast.tracks.find(song => song.id === state.player.current)
    : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlist);
