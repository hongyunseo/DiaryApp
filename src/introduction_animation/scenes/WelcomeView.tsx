import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions } from 'react-native';
import { AppImages } from '../../assets';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const WelcomeView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();
  const careRef = useRef<Text | null>(null);

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [window.width, window.width, 0],
  });

  const textEndVal = 26 * 2; // 26 being text's height (font size)
  const welcomeTextAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [textEndVal, textEndVal, 0],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Animated.Image
        style={[styles.image]}
        source={AppImages.welcome}
        resizeMode="cover"  
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
});

export default WelcomeView;