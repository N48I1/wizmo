import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { WizmoMood } from '../types';

// Import Wizmo Full Body Images
const wizmoBodyImages = {
    idle: require('../../assets/wizmo-idle.png'),
    happy: require('../../assets/wizmo-happy.png'),
    sad: require('../../assets/wizmo-sad.png'),
    thinking: require('../../assets/wizmo-thinking.png'),
};

// Import Wizmo Face Images
const wizmoFaceImages = {
    idle: require('../../assets/wizmo-face-idle.jpg'),
    happy: require('../../assets/wizmo-face-happy.png'),
    sad: require('../../assets/wizmo-face-sad.png'),
    thinking: require('../../assets/wizmo-face-thinking.png'),
};

interface WizmoProps {
    mood: WizmoMood;
    message?: string;
    size?: 'small' | 'medium' | 'large' | 'xl';
    variant?: 'body' | 'face';
}

export const Wizmo: React.FC<WizmoProps> = ({
    mood,
    message,
    size = 'medium',
    variant = 'body'
}) => {
    // Built-in Animated Values
    const scale = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const rotation = useRef(new Animated.Value(0)).current;

    const sizeMap = {
        small: variant === 'face' ? 80 : 120,
        medium: variant === 'face' ? 120 : 180,
        large: variant === 'face' ? 160 : 240,
        xl: variant === 'face' ? 200 : 300,
    };

    const imageSize = sizeMap[size];
    const borderRadius = variant === 'face' ? imageSize / 2 : 0;

    const getWizmoImage = () => {
        const images = variant === 'face' ? wizmoFaceImages : wizmoBodyImages;
        switch (mood) {
            case WizmoMood.HAPPY: return images.happy;
            case WizmoMood.EXCITED: return images.happy;
            case WizmoMood.SAD: return images.sad;
            case WizmoMood.THINKING: return images.thinking;
            case WizmoMood.IDLE: default: return images.idle;
        }
    };

    useEffect(() => {
        // Reset animations
        scale.setValue(1);
        translateY.setValue(0);
        rotation.setValue(0);

        switch (mood) {
            case WizmoMood.IDLE:
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(translateY, { toValue: -5, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                        Animated.timing(translateY, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                    ])
                ).start();
                break;

            case WizmoMood.HAPPY:
            case WizmoMood.EXCITED:
                Animated.parallel([
                    Animated.spring(scale, { toValue: 1.05, friction: 3, useNativeDriver: true }),
                    Animated.spring(translateY, { toValue: -8, friction: 3, useNativeDriver: true }),
                    Animated.sequence([
                        Animated.timing(rotation, { toValue: -3, duration: 150, useNativeDriver: true }),
                        Animated.timing(rotation, { toValue: 3, duration: 150, useNativeDriver: true }),
                        Animated.timing(rotation, { toValue: 0, duration: 150, useNativeDriver: true }),
                    ])
                ]).start();
                break;

            case WizmoMood.SAD:
                Animated.parallel([
                    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }),
                    Animated.spring(translateY, { toValue: 5, useNativeDriver: true }),
                ]).start();
                break;

            case WizmoMood.THINKING:
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(rotation, { toValue: -2, duration: 800, useNativeDriver: true }),
                        Animated.timing(rotation, { toValue: 2, duration: 800, useNativeDriver: true }),
                    ])
                ).start();
                break;
        }
    }, [mood]);

    const spin = rotation.interpolate({
        inputRange: [-10, 10],
        outputRange: ['-10deg', '10deg']
    });

    return (
        <View style={styles.container}>
            {message && (
                <View style={[styles.speechBubble, variant === 'body' && styles.speechBubbleBody]}>
                    <Text style={styles.speechText}>{message}</Text>
                    <View style={styles.speechArrow} />
                </View>
            )}

            <Animated.View style={[styles.imageWrapper, {
                transform: [{ translateY }, { scale }, { rotate: spin }]
            }]}>
                <View style={[
                    variant === 'face' && styles.faceContainer,
                    { width: imageSize, height: imageSize, borderRadius: borderRadius }
                ]}>
                    <Image
                        source={getWizmoImage()}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </View>

                {(mood === WizmoMood.HAPPY || mood === WizmoMood.EXCITED) && (
                    <>
                        <Text style={styles.sparkle1}>✨</Text>
                        <Text style={styles.sparkle2}>⭐</Text>
                    </>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    faceContainer: {
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#FFFFFF',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        backgroundColor: '#F3E8FF',
    },
    speechBubble: {
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        maxWidth: 220,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        minWidth: 100,
        alignItems: 'center',
        zIndex: 10,
    },
    speechBubbleBody: {
        marginBottom: -20,
    },
    speechArrow: {
        position: 'absolute',
        bottom: -8,
        left: '50%',
        marginLeft: -8,
        width: 16,
        height: 16,
        backgroundColor: '#FFFFFF',
        transform: [{ rotate: '45deg' }],
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#E2E8F0',
    },
    speechText: {
        color: '#1E293B',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 20,
    },
    sparkle1: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 24,
        zIndex: 10,
    },
    sparkle2: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        fontSize: 20,
        zIndex: 10,
    },
});
