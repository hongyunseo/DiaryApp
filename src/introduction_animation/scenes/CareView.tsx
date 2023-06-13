import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions, TouchableOpacity, View } from 'react-native';
import { AppImages } from '../../assets';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const CareView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const careRef = useRef<Text | null>(null);

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [window.width, window.width, 0, -window.width, -window.width],
  });

  const careEndVal = 26 * 2; // 26 being text's height (font size)
  const careAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [careEndVal, careEndVal, 0, -careEndVal, -careEndVal],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Animated.Image
        style={[styles.image, { transform: [{ translateX: slideAnim }] }]}
        source={AppImages.care_image}
        resizeMode="cover"  // to make the image cover the full screen
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
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
  buttonContainer: {
    position: 'absolute', 
    bottom: 0, 
    alignItems: 'center', 
    width: '100%',
    padding: 16,
  },
  button: {
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CareView;