import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyPressable from '../../components/MyPressable';
import { AppImages } from '../../assets';

interface Props {
  onNextClick: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const SplashView: React.FC<Props> = ({ onNextClick, animationController }) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const splashTranslateY = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.8],
    outputRange: [0, -window.height, -window.height],
  });

  const introImageData = Image.resolveAssetSource(AppImages.introduction_image);

  return (
    <Animated.View
      style={{ flex: 1, transform: [{ translateY: splashTranslateY }] }}
    >
      <ScrollView style={{ flexGrow: 0 }} alwaysBounceVertical={false}>
        <View>
          <Image
            style={{
              width: window.width,
              height: undefined,
              aspectRatio: introImageData
                ? introImageData.width / introImageData.height
                : 357 / 470,
            }}
            source={AppImages.introduction_image}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: 8 + insets.bottom }]}>
        <View style={styles.buttonContainer}>
          <MyPressable
            style={styles.button}
            android_ripple={{ color: 'powderblue' }}
            touchOpacity={0.6}
            onPress={() => onNextClick()}
          >
            
          </MyPressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({

  footer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 8,
    backgroundColor: 'transparent',
    position: 'relative', // 상대적인 위치 설정
  },
  buttonContainer: {
    alignSelf: 'center',
    position: 'absolute', // 절대적인 위치 설정
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    height: 58,
    paddingVertical: 16,
    paddingHorizontal: 56,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // 투명한 배경색 설정
  },
});

export default SplashView;
