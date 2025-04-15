import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CONFETTI_DENSITY = 80; // Increased density for more confetti
const CONFETTI_COLORS = ['#E8833B', '#1c1b23', '#33A1DE', '#76D7C4', '#F7DC6F', '#F9A5D0', '#AED6F1', '#A9DFBF'];

interface ConfettiProps {
  colors?: string[];
  running?: boolean;
}

interface ConfettiPiece {
  color: string;
  x: Animated.Value;
  y: Animated.Value;
  scale: Animated.Value;
  rotation: Animated.Value;
  opacity: Animated.Value;
  size: number;
  initialX: number; // Store initial X position
}

const ConfettiEffect: React.FC<ConfettiProps> = ({
  colors = CONFETTI_COLORS,
  running = true,
}) => {
  const confettiRefs = useRef<ConfettiPiece[]>([]);

  // Generate confetti pieces on component mount
  const confetti = useMemo(() => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < CONFETTI_DENSITY; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const size = 6 + Math.random() * 8; // More varied sizes
      const initialX = Math.random() * width * 1.2 - width * 0.1; // Store initial X position
      // Distribute confetti more evenly across the screen
      pieces.push({
        color: randomColor,
        x: new Animated.Value(initialX), // Wider distribution
        y: new Animated.Value(-100 - Math.random() * 200), // Start from above screen
        scale: new Animated.Value(0.3 + Math.random() * 0.7),
        rotation: new Animated.Value(0),
        opacity: new Animated.Value(0.8),
        size, // Store the size
        initialX, // Store initial X position for reference
      });
    }
    confettiRefs.current = pieces;
    return pieces;
  }, [colors]);

  useEffect(() => {
    if (!running) return;

    // Animate each confetti piece
    const animations = confetti.map((piece, index) => {
      const duration = 3000 + Math.random() * 4000; // Slower fall for some pieces
      const fallSpeed = 600 + Math.random() * 1200; // More varied fall speeds
      
      return Animated.parallel([
        // Y position (falling down)
        Animated.timing(piece.y, {
          toValue: height + 100,
          duration: fallSpeed,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // X position (swaying side to side)
        Animated.sequence([
          Animated.timing(piece.x, {
            toValue: piece.initialX + (-60 + Math.random() * 120), // Use initialX instead
            duration: duration / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(piece.x, {
            toValue: piece.initialX + (-60 + Math.random() * 120), // Use initialX instead
            duration: duration / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(piece.x, {
            toValue: piece.initialX + (-60 + Math.random() * 120), // Use initialX instead
            duration: duration / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        // Rotation
        Animated.timing(piece.rotation, {
          toValue: 360 * (1 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1), // More rotation
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Opacity (fade out toward the end)
        Animated.sequence([
          Animated.timing(piece.opacity, {
            toValue: 0.8,
            duration: duration * 0.7,
            useNativeDriver: true,
          }),
          Animated.timing(piece.opacity, {
            toValue: 0,
            duration: duration * 0.3,
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    // Start the animation
    const animationGroup = Animated.stagger(10, animations); // Faster stagger for more natural feel
    animationGroup.start();

    // Cleanup
    return () => {
      animationGroup.stop();
    };
  }, [confetti, running]);

  return (
    <View style={styles.container} pointerEvents="none">
      {confetti.map((piece, index) => (
        <Animated.View
          key={index}
          style={[
            styles.confetti,
            {
              backgroundColor: piece.color,
              width: piece.size,
              height: piece.size,
              borderRadius: piece.size / 5, // Slightly rounded corners
              transform: [
                { translateX: piece.x },
                { translateY: piece.y },
                { scale: piece.scale },
                {
                  rotate: piece.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
              opacity: piece.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    pointerEvents: 'none',
  },
  confetti: {
    position: 'absolute',
    // width and height are set dynamically in the component
    borderRadius: 2,
  },
});

export default ConfettiEffect; 