import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Wizmo } from '../components/Wizmo';
import { WizmoMood, QuizCategory } from '../types';

interface ResultScreenProps {
    score: number;
    category: QuizCategory;
    onRetry: () => void;
    onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
    score,
    category,
    onRetry,
    onGoHome,
}) => {
    const starsEarned = Math.floor(score / 10);

    // Animated Values
    // Animated Values
    const cardScale = useRef(new Animated.Value(1)).current; // Start visible
    const cardOpacity = useRef(new Animated.Value(1)).current; // Start visible
    const star1Scale = useRef(new Animated.Value(0)).current;
    const star2Scale = useRef(new Animated.Value(0)).current;
    const star3Scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animated.parallel([
        //     Animated.spring(cardScale, { toValue: 1, friction: 6, useNativeDriver: true }),
        //     Animated.timing(cardOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        // ]).start();

        Animated.sequence([
            Animated.delay(400),
            Animated.spring(star1Scale, { toValue: starsEarned >= 1 ? 1.2 : 0.5, friction: 4, useNativeDriver: true }),
            Animated.spring(star2Scale, { toValue: starsEarned >= 3 ? 1.2 : 0.5, friction: 4, useNativeDriver: true }),
            Animated.spring(star3Scale, { toValue: starsEarned >= 5 ? 1.2 : 0.5, friction: 4, useNativeDriver: true }),
        ]).start();
    }, []);

    const getResultMessage = () => {
        if (score >= 50) return "🎉 PERFECT! 🎉";
        if (score >= 40) return "Amazing! 🌟";
        if (score >= 30) return "Great Job! 👏";
        if (score >= 20) return "Good Try! 💪";
        return "Keep Learning! 📚";
    };

    return (
        <LinearGradient
            colors={['#FEF3C7', '#FECACA', '#E9D5FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
                {/* Wizmo */}
                <Wizmo
                    mood={score >= 30 ? WizmoMood.EXCITED : WizmoMood.HAPPY}
                    message={getResultMessage()}
                    size="medium"
                    variant="face"
                />

                {/* Result Card */}
                <Animated.View style={[styles.resultCard, {
                    opacity: cardOpacity,
                    transform: [{ scale: cardScale }]
                }]}>
                    <LinearGradient
                        colors={['#FFFFFF', '#F3E8FF']}
                        style={styles.cardGradient}
                    >
                        <Text style={styles.completeTitle}>Quiz Complete!</Text>
                        <Text style={styles.categoryName}>{category.icon} {category.title}</Text>

                        {/* Stars */}
                        <View style={styles.starsRow}>
                            <Animated.View style={{ transform: [{ scale: star1Scale }], opacity: starsEarned >= 1 ? 1 : 0.3 }}>
                                <Text style={styles.starEmoji}>⭐</Text>
                            </Animated.View>
                            <Animated.View style={{ transform: [{ scale: star2Scale }], opacity: starsEarned >= 3 ? 1 : 0.3 }}>
                                <Text style={styles.starEmoji}>⭐</Text>
                            </Animated.View>
                            <Animated.View style={{ transform: [{ scale: star3Scale }], opacity: starsEarned >= 5 ? 1 : 0.3 }}>
                                <Text style={styles.starEmoji}>⭐</Text>
                            </Animated.View>
                        </View>

                        {/* Score */}
                        <View style={styles.scoreBox}>
                            <Text style={styles.scoreLabel}>YOUR SCORE</Text>
                            <View style={styles.scoreRow}>
                                <Text style={styles.scoreValue}>{score}</Text>
                                <Text style={styles.scoreMax}>/50</Text>
                            </View>
                        </View>

                        {/* Buttons */}
                        <View style={styles.buttonsRow}>
                            <Pressable onPress={onRetry} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                                <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.buttonGradient}>
                                    <Text style={styles.buttonEmoji}>🔄</Text>
                                    <Text style={styles.buttonText}>Retry</Text>
                                </LinearGradient>
                            </Pressable>

                            <Pressable onPress={onGoHome} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                                <LinearGradient colors={['#10B981', '#059669']} style={styles.buttonGradient}>
                                    <Text style={styles.buttonEmoji}>🏠</Text>
                                    <Text style={styles.buttonText}>Home</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    resultCard: {
        width: '100%',
        maxWidth: 400,
        marginTop: 24,
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.3,
        shadowRadius: 32,
        elevation: 12,
    },
    cardGradient: {
        padding: 32,
        borderRadius: 32,
        borderWidth: 4,
        borderColor: '#E9D5FF',
    },
    completeTitle: {
        fontSize: 32,
        fontWeight: '900',
        textAlign: 'center',
        color: '#6B21A8',
        marginBottom: 4,
    },
    categoryName: {
        fontSize: 18,
        color: '#9333EA',
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 24,
    },
    starsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
    },
    starEmoji: {
        fontSize: 52,
    },
    scoreBox: {
        backgroundColor: '#F3E8FF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#DDD6FE',
    },
    scoreLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#9333EA',
        letterSpacing: 2,
        marginBottom: 8,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    scoreValue: {
        fontSize: 64,
        fontWeight: '900',
        color: '#6B21A8',
    },
    scoreMax: {
        fontSize: 28,
        fontWeight: '700',
        color: '#A855F7',
        marginLeft: 4,
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    button: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 20,
        gap: 8,
    },
    buttonEmoji: {
        fontSize: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
    },
});
