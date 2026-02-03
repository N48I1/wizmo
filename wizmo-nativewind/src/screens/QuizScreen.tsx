import React from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Wizmo } from '../components/Wizmo';
import { QuizOption } from '../components/QuizOption';
import { WizmoMood, Question, QuizCategory } from '../types';

interface QuizScreenProps {
    category: QuizCategory;
    questions: Question[];
    currentQIndex: number;
    selectedOption: number | null;
    isAnswered: boolean;
    wizmoMood: WizmoMood;
    wizmoMessage: string;
    onAnswer: (index: number) => void;
    onGoHome: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
    category,
    questions,
    currentQIndex,
    selectedOption,
    isAnswered,
    wizmoMood,
    wizmoMessage,
    onAnswer,
    onGoHome,
}) => {
    const currentQ = questions[currentQIndex];
    const progressPercent = ((currentQIndex + 1) / questions.length) * 100;

    return (
        <LinearGradient
            colors={['#FEF3C7', '#FECACA', '#E9D5FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                <View style={styles.content}>

                    {/* Top Bar with Progress */}
                    <View style={styles.topBar}>
                        <Pressable onPress={onGoHome} style={styles.backButton}>
                            <Text style={styles.backIcon}>←</Text>
                        </Pressable>

                        <View style={styles.progressWrapper}>
                            <View style={styles.progressContainer}>
                                <LinearGradient
                                    colors={['#F472B6', '#A855F7']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.progressBar, { width: `${progressPercent}%` }]}
                                />
                            </View>
                        </View>

                        <View style={styles.counter}>
                            <Text style={styles.counterEmoji}>⭐</Text>
                            <Text style={styles.counterText}>
                                {currentQIndex + 1}/{questions.length}
                            </Text>
                        </View>
                    </View>

                    {/* Main Content Area - Scrollable Question & Options */}
                    <View style={styles.mainContent}>
                        <ScrollView
                            style={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {/* Question Card - Slightly Compact */}
                            <View style={styles.questionCard}>
                                <View style={styles.questionBadge}>
                                    <Text style={styles.questionBadgeText}>Question {currentQIndex + 1}</Text>
                                </View>

                                {currentQ.image && (
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: currentQ.image }}
                                            style={styles.questionImage}
                                            resizeMode="cover"
                                        />
                                    </View>
                                )}
                                {/* Smaller question text */}
                                <Text style={styles.questionText}>{currentQ.question}</Text>
                            </View>

                            {/* Options Grid */}
                            <View style={styles.optionsContainer}>
                                {currentQ.options.map((option, index) => {
                                    const isSelected = selectedOption === index;
                                    const isCorrect = isAnswered && index === currentQ.correctAnswerIndex;
                                    const isWrong = isAnswered && isSelected && index !== currentQ.correctAnswerIndex;

                                    return (
                                        <QuizOption
                                            key={index}
                                            index={index}
                                            text={option}
                                            isDisabled={isAnswered}
                                            isSelected={isSelected}
                                            isCorrect={isCorrect}
                                            isWrong={isWrong}
                                            onSelect={onAnswer}
                                        />
                                    );
                                })}
                            </View>

                            {/* Spacing for Large Wizmo at bottom */}
                            <View style={{ height: 260 }} />
                        </ScrollView>

                        {/* Large Wizmo Fixed at Bottom Center */}
                        <View style={styles.wizmoBottomContainer}>
                            <Wizmo mood={wizmoMood} message={wizmoMessage} size="xl" />
                        </View>
                    </View>

                </View>
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
    content: {
        flex: 1,
        padding: 16,
        paddingBottom: 0,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        zIndex: 10,
    },
    backButton: {
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    backIcon: {
        fontSize: 22,
        color: '#6B21A8',
        fontWeight: 'bold',
    },
    progressWrapper: {
        flex: 1,
        marginHorizontal: 16,
    },
    progressContainer: {
        height: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    progressBar: {
        height: '100%',
        borderRadius: 8,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    counterEmoji: {
        fontSize: 14,
        marginRight: 4,
    },
    counterText: {
        fontWeight: '900',
        color: '#6B21A8',
        fontSize: 13,
    },
    mainContent: {
        flex: 1,
        position: 'relative',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    questionCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 12, // Reduced from 16
        marginBottom: 12,
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#F3E8FF',
    },
    questionBadge: {
        alignSelf: 'center',
        backgroundColor: '#F3E8FF',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
        marginBottom: 8,
    },
    questionBadgeText: {
        color: '#9333EA',
        fontWeight: '800',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    imageContainer: {
        marginBottom: 12,
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#FDE68A',
        height: 150,
    },
    questionImage: {
        width: '100%',
        height: '100%',
    },
    questionText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1E1B4B',
        textAlign: 'center',
        lineHeight: 24,
    },
    optionsContainer: {
        gap: 10,
    },
    wizmoBottomContainer: {
        position: 'absolute',
        bottom: -20, // Push him down a bit
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 300,
        pointerEvents: 'none',
    },
});
