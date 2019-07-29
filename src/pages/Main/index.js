import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PodcastsActions from '~/store/ducks/podcasts';

import {
  Container,
  PageTitle,
  PodcastList,
  Podcast,
  Thumbnail,
  Info,
  Title,
  Count,
} from './styles';

class Main extends Component {
  async componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest(); // Come from mapDispatchToProps
  }

  handlePodcastNavigation = (podcast) => {
    const { navigation } = this.props;

    navigation.navigate('Playlist', { podcast });
  };

  render() {
    const { podcasts } = this.props;

    return (
      <Container>
        <PodcastList
          ListHeaderComponent={() => <PageTitle>Podcasts</PageTitle>}
          data={podcasts.data}
          keyExtractor={podcast => String(podcast.id)}
          renderItem={({ item: podcast }) => (
            <Podcast onPress={() => this.handlePodcastNavigation(podcast)}>
              <Thumbnail source={{ uri: podcast.cover }} />
              <Info>
                <Title>{podcast.title}</Title>
                <Count>{`${podcast.tracks.length} episódios`}</Count>
              </Info>
            </Podcast>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  podcasts: state.podcasts, // Here is what I wanna to listen from REDUX
});

const mapDispatchToProps = dispatch => bindActionCreators(PodcastsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
