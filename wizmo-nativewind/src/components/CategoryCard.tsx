import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizCategory } from '../types';

interface CategoryCardProps {
    category: QuizCategory;
    highScore?: number;
    onPress: (category: QuizCategory) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
    category,
    highScore = 0,
    onPress,
}) => {
    return (
        <Pressable
            onPress={() => onPress(category)}
            style={({ pressed }) => [
                styles.pressable,
                pressed && styles.pressed,
            ]}
        >
            <LinearGradient
                colors={category.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* Icon */}
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{category.icon}</Text>
                </View>

                {/* Title */}
                <Text style={styles.title}>{category.title}</Text>

                {/* High Score */}
                {highScore > 0 && (
                    <View style={styles.scoreContainer}>
                        <Text style={styles.star}>⭐</Text>
                        <Text style={styles.scoreText}>Best: {highScore}</Text>
                    </View>
                )}
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    pressed: {
        transform: [{ scale: 0.95 }],
        opacity: 0.9,
    },
    gradient: {
        borderRadius: 20,
        padding: 14,
        minHeight: 120, // Reduced from 150
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    iconContainer: {
        width: 48, // Reduced from 56
        height: 48, // Reduced from 56
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    icon: {
        fontSize: 24, // Reduced from 28
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18, // Reduced from 20 (and 22 from previous edit that failed or was overwritten)
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    star: {
        fontSize: 16,
        marginRight: 4,
    },
    scoreText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '700',
        fontSize: 14,
    },
});
