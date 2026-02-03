import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

interface QuizOptionProps {
    index: number;
    text: string;
    isDisabled: boolean;
    isSelected: boolean;
    isCorrect: boolean;
    isWrong: boolean;
    onSelect: (index: number) => void;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];
const OPTION_COLORS = [
    ['#FF6B6B', '#E63946'],  // Red
    ['#4ECDC4', '#1DB9AA'],  // Teal
    ['#45B7D1', '#2196F3'],  // Blue
    ['#96CEB4', '#52B788'],  // Green
];

export const QuizOption: React.FC<QuizOptionProps> = ({
    index,
    text,
    isDisabled,
    isSelected,
    isCorrect,
    isWrong,
    onSelect,
}) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (!isDisabled) {
            Animated.spring(scale, {
                toValue: 0.95,
                useNativeDriver: true,
            }).start();
        }
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const getBackgroundColor = () => {
        if (isCorrect) return '#22C55E';
        if (isWrong) return '#EF4444';
        return '#FFFFFF';
    };

    const getBorderColor = () => {
        if (isCorrect) return '#16A34A';
        if (isWrong) return '#DC2626';
        if (isSelected) return '#A855F7';
        return '#E5E7EB';
    };

    const getTextColor = () => {
        if (isCorrect || isWrong) return '#FFFFFF';
        return '#1E1B4B';
    };

    return (
        <Pressable
            onPress={() => !isDisabled && onSelect(index)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isDisabled}
        >
            <Animated.View style={[
                styles.container,
                {
                    transform: [{ scale }],
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: isSelected ? 4 : 3,
                },
            ]}>
                {/* Letter Label */}
                <View style={[
                    styles.label,
                    { backgroundColor: OPTION_COLORS[index][0] }
                ]}>
                    <Text style={styles.labelText}>
                        {OPTION_LABELS[index]}
                    </Text>
                </View>

                {/* Answer Text */}
                <Text style={[styles.answerText, { color: getTextColor() }]}>
                    {text}
                </Text>

                {/* Result Icon */}
                {isCorrect && (
                    <View style={styles.resultIcon}>
                        <Text style={styles.resultEmoji}>✅</Text>
                    </View>
                )}
                {isWrong && (
                    <View style={styles.resultIcon}>
                        <Text style={styles.resultEmoji}>❌</Text>
                    </View>
                )}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    label: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    labelText: {
        fontWeight: '900',
        fontSize: 18,
        color: '#FFFFFF',
    },
    answerText: {
        flex: 1,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
    },
    resultIcon: {
        marginLeft: 8,
    },
    resultEmoji: {
        fontSize: 20,
    },
});
