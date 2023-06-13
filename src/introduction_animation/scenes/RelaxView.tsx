import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions, View, TextInput } from 'react-native';
import { AppImages } from '../../assets';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const IMAGE_WIDTH = 428;
const IMAGE_HEIGHT = 962;

const RelaxView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const relaxRef = useRef<Text | null>(null);

  const relaxAnimation = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.8],
    outputRange: [-(26 * 2), 0, 0],
  });
  const textAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, -window.width * 2, 0, 0],
  });
  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, -IMAGE_WIDTH * 4, 0, 0],
  });
  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.8],
    outputRange: [0, 0, -window.width, -window.width],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <View style={styles.imageContainer}>
        <Animated.Image
          style={[styles.image, { transform: [{ translateX: imageAnim }] }]}
          source={AppImages.relax_image}
        />
      </View>

      <Animated.View
        style={[styles.contentContainer, { transform: [{ translateY: relaxAnimation }] }]}
      >
      

        <TextInput
          style={styles.input}

          placeholderTextColor="white"
        />

        <TextInput
          style={styles.input}

          placeholderTextColor="white"
          secureTextEntry
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -200,
  },
  title: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
  input: {
    width: 250,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderRadius: 8,
    color: 'black',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});

export default RelaxView;