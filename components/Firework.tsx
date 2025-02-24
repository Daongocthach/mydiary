import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated'

import { ThemedText } from '@/components/ThemedText'

export function Firework() {
  const rotationAnimation = useSharedValue(0)

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
      5
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>🎊</ThemedText>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 100,
    lineHeight: 120,
    marginTop: -6,
  },
})
