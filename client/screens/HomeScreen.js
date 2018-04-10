import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
} from 'react-native';
// import { WebBrowser } from 'expo';

// import { MonoText } from '../components/StyledText';

const TIME_TO_WAIT_FOR_INACTIVITY_MS = 3000;
const INACTIVITY_CHECK_INTERVAL_MS = 1000;

export default class HomeScreen extends React.Component {
  state = {};
  _lastInteraction = new Date();
  _panResponder = {};

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._setIsActive,
      onMoveShouldSetPanResponder: this._setIsActive,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    });
    this._startWatchingForInactivity();
  }

  _startWatchingForInactivity = () => {
    if (this._inactivityTimer) return;

    this._inactivityTimer = setInterval(() => {
      if ( new Date() - this._lastInteraction >= TIME_TO_WAIT_FOR_INACTIVITY_MS) this._setIsInactive();
    }, INACTIVITY_CHECK_INTERVAL_MS);
  };

  _setIsActive = () => {
    this._lastInteraction = new Date();
    if (this.state.inactive) this.setState({ inactive: false });
    this._startWatchingForInactivity();
    return false;
  };

  _setIsInactive = () => {
    this.setState({ inactive: true });
    clearInterval(this._inactivityTimer);
    this._inactivityTimer = null;
  };

  render() {
    return (
      <View
        style={styles.container}
        {...this._panResponder.panHandlers}>
        <View style={ styles.nameContainer}>
          <Text style={ this.state.inactive ? styles.visibleName : styles.invisibleName }>
            Raymond Zheng
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    height: "100%",
    width: "100%",
  },
  visibleName: {
    opacity: 1,
  },
  invisibleName: {
    opacity: 0.2,
  }

});

//
// _maybeRenderDevelopmentModeWarning() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );
//
//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled, your app will be slower but you can use useful development
//         tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode, your app will run at full speed.
//       </Text>
//     );
//   }
// }
//
// _handleLearnMorePress = () => {
//   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
// };
//
// _handleHelpPress = () => {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });



  // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  //   <View style={styles.floatingName}></View>
  //   <View style={styles.welcomeContainer}>
  //     <Image
  //       source={
  //         __DEV__
  //           ? require('../assets/images/robot-dev.png')
  //           : require('../assets/images/robot-prod.png')
  //       }
  //       style={styles.welcomeImage}
  //     />
  //   </View>
  //
  //   <View style={styles.getStartedContainer}>
  //     {this._maybeRenderDevelopmentModeWarning()}
  //
  //     <Text style={styles.getStartedText}>Get started by opening</Text>
  //
  //     <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
  //       <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
  //     </View>
  //
  //     <Text> hello world my name is raymond</Text>
  //
  //     <Text style={styles.getStartedText}>
  //       asdf
  //     </Text>
  //   </View>
  //
  //   <View style={styles.helpContainer}>
  //     <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
  //       <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
  //     </TouchableOpacity>
  //   </View>
  // </ScrollView>
  //
  // <View style={styles.tabBarInfoContainer}>
  //   <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
  //
  //   <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
  //     <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
  //   </View>
  // </View>
