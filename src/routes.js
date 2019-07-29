import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from '~/pages/Main';
import Playlist from '~/pages/Playlist';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Playlist,
    },
    {
      defaultNavigationOptions: {
        header: null,
      },
    },
  ),
);

export default Routes;
