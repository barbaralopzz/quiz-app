import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './components/Question';
import Summary from './components/Summary';

const Stack = createStackNavigator();

const exampleData = [
  {
    prompt: "Is the sky blue?",
    type: "true-false",
    choices: ["False", "True"],
    correct: 1,
  },
  {
    prompt: "Pick the correct numbers.",
    type: "multiple-answer",
    choices: ["One", "Two", "Three", "Four"],
    correct: [0, 2],
  },
  {
    prompt: "What's 2 + 2?",
    type: "multiple-choice",
    choices: ["3", "4", "5", "6"],
    correct: 1,
  },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ data: exampleData, index: 0, userAnswers: [] }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;