import React, { useRef, useState } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions, TextInput, View } from 'react-native';
import { AppImages } from '../../assets';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const MoodDiaryView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const [text, setText] = useState('');

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [window.width, window.width, 0, -window.width],
  });

  const textEndVal = window.width * 2;
  const textAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [textEndVal, textEndVal, 0, -textEndVal],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Animated.Image
        style={[styles.image, { transform: [{ translateX: slideAnim }] }]}
        source={AppImages.mood_dairy_image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your text..."
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={text}
          onChangeText={setText}
        />
      </View>
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
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default MoodDiaryView;
