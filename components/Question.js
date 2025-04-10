import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const Question = ({ route, navigation }) => {
  const { data, index, userAnswers } = route.params;
  const question = data[index];
  const [selectedIndex, setSelectedIndex] = useState([]);

  useEffect(() => {
    setSelectedIndex([]);
  }, [index]);

  const handlePress = (i) => {
    if (question.type === 'multiple-answer') {
      setSelectedIndex((prev) =>
        prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
      );
    } else {
      setSelectedIndex([i]);
    }
  };

  const handleNext = () => {
    let isCorrect = false;

    if (question.type === 'multiple-answer') {
      isCorrect =
        JSON.stringify([...selectedIndex].sort()) ===
        JSON.stringify([...question.correct].sort());
    } else {
      isCorrect = selectedIndex[0] === question.correct;
    }

    const newAnswers = [
      ...userAnswers,
      { selected: selectedIndex, correct: question.correct, type: question.type },
    ];

    if (index + 1 < data.length) {
      navigation.navigate('Question', {
        data,
        index: index + 1,
        userAnswers: newAnswers,
      });
    } else {
      navigation.navigate('Summary', { data, userAnswers: newAnswers });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>
        {question.type === 'true-false' ? 'True or false: ' : ''}
        {question.prompt}
      </Text>

      <ButtonGroup
        testID="choices"
        vertical
        buttons={question.choices}
        onPress={handlePress}
        selectedIndexes={
          question.type === 'multiple-answer'
            ? selectedIndex
            : selectedIndex.length > 0
            ? [selectedIndex[0]]
            : []
        }
        containerStyle={styles.buttonGroup}
        buttonStyle={styles.choiceButton}
        selectedButtonStyle={styles.selectedButton}
      />

      <Pressable
        style={[
          styles.nextButton,
          selectedIndex.length === 0 && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={selectedIndex.length === 0}
        testID="next-question"
      >
        <Text style={styles.nextButtonText}>Next Question</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  prompt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    marginBottom: 20,
  },
  choiceButton: {
    borderRadius: 5,
    paddingVertical: 10,
  },
  selectedButton: {
    backgroundColor: '#d0e8ff',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  nextButtonDisabled: {
    backgroundColor: '#90caf9',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Question;
