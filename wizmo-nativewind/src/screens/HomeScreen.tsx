import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Platform, StatusBar as RNStatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wizmo } from '../components/Wizmo';
import { CategoryCard } from '../components/CategoryCard';
import { QUIZ_DATA } from '../services/quizData';
import { WizmoMood, QuizCategory, UserProgress } from '../types';

interface HomeScreenProps {
    progress: UserProgress;
    wizmoMood: WizmoMood;
    wizmoMessage: string;
    onStartQuiz: (category: QuizCategory) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
    progress,
    wizmoMood,
    wizmoMessage,
    onStartQuiz,
}) => {
    return (
        <LinearGradient
            colors={['#FEF3C7', '#FECACA', '#E9D5FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <LinearGradient
                                colors={['#F472B6', '#A855F7']}
                                style={styles.trophyContainer}
                            >
                                <Text style={styles.trophy}>🏆</Text>
                            </LinearGradient>
                            <View>
                                <Text style={styles.title}>Wizmo Quiz</Text>
                                <Text style={styles.subtitle}>Learn & Play! 🎮</Text>
                            </View>
                        </View>

                        {/* Stars Counter */}
                        <Pressable style={styles.starsContainer}>
                            <Text style={styles.starIcon}>⭐</Text>
                            <Text style={styles.starsCount}>{progress.stars}</Text>
                        </Pressable>
                    </View>

                    {/* Wizmo Face Character - Less Space */}
                    <View style={styles.wizmoContainer}>
                        <Wizmo
                            mood={wizmoMood}
                            message={wizmoMessage}
                            size="medium"
                            variant="face"
                        />
                    </View>

                    {/* Section Title */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>🎯 Choose a Quiz!</Text>
                    </View>

                    {/* Categories Grid */}
                    <View style={styles.categoriesGrid}>
                        {QUIZ_DATA.map((category) => (
                            <View key={category.id} style={styles.categoryWrapper}>
                                <CategoryCard
                                    category={category}
                                    highScore={progress.highScores[category.id]}
                                    onPress={onStartQuiz}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
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
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 16,
        borderRadius: 24,
        marginBottom: 24,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    trophyContainer: {
        padding: 12,
        borderRadius: 16,
    },
    trophy: {
        fontSize: 28,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#6B21A8',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9333EA',
        marginTop: 2,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 3,
        borderColor: '#FCD34D',
    },
    starIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    starsCount: {
        fontSize: 22,
        fontWeight: '900',
        color: '#B45309',
    },
    wizmoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    sectionHeader: {
        marginBottom: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#6B21A8',
        textAlign: 'center',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    categoryWrapper: {
        width: '47%',
    },
});
