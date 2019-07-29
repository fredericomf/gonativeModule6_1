import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  background: #111;
  height: ${74 + getBottomSpace()}px;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px ${getBottomSpace()}px;
`;

export const CoverBackground = styled.Image.attrs({
  blurRadius: 5,
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
`;

export const SongInfo = styled.View``;

export const SongTitle = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const SongAuthor = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 3px;
`;

export const Controls = styled.View`
  flex-direction: row;
`;

export const ControlButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  },
})`
  margin-left: 10px;
`;

export const ControlIcon = styled(Icon).attrs({
  color: '#FFF',
  size: 32,
})``;
