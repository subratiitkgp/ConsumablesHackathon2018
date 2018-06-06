import { AppRegistry } from 'react-native';
import { AppWrapper } from './AppWrapper';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('ConsumablesHackathon2018App', () => AppWrapper);
