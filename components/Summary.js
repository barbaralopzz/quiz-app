import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Summary = ({ route, navigation }) => {
  const { data, userAnswers } = route.params;

  // Normalize single values into arrays for consistent comparison
  const normalize = (value) =>
    Array.isArray(value) ? [...value].sort() : [value];

  const totalScore = userAnswers.reduce((score, ans) => {
    const isCorrect =
      JSON.stringify(normalize(ans.selected)) ===
      JSON.stringify(normalize(ans.correct));
    return score + (isCorrect ? 1 : 0);
  }, 0);

  const handleRestart = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Question',
          params: {
            data,
            index: 0,
            userAnswers: [],
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Text testID="total" style={styles.total}>
        Total Score: {totalScore} / {data.length}
      </Text>

      {data.map((q, i) => {
        const ans = userAnswers[i];

        const isCorrect =
          JSON.stringify(normalize(ans.selected)) ===
          JSON.stringify(normalize(ans.correct));

        return (
          <View key={i} style={styles.questionBlock}>
            <Text style={styles.prompt}>{q.prompt}</Text>
            {q.choices.map((choice, idx) => {
              const selected = normalize(ans.selected).includes(idx);
              const correct = normalize(ans.correct).includes(idx);

              let style = styles.defaultChoice;
              if (selected && correct) style = styles.correct;
              else if (selected && !correct) style = styles.incorrect;

              return (
                <Text key={idx} style={style}>
                  - {choice}
                </Text>
              );
            })}
            <Text style={isCorrect ? styles.correct : styles.incorrect}>
              {isCorrect ? '✅ Correct' : '❌ Incorrect'}
            </Text>
          </View>
        );
      })}

      <Button title="Start Over" onPress={handleRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  questionBlock: { marginTop: 20 },
  prompt: { fontWeight: '600', marginBottom: 5 },
  defaultChoice: { marginLeft: 10 },
  correct: { fontWeight: 'bold', color: 'green', marginLeft: 10 },
  incorrect: {
    textDecorationLine: 'line-through',
    color: 'red',
    marginLeft: 10,
  },
});

export default Summary;
