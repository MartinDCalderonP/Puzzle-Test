import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import reducer, { initialState } from './context/Reducer';
import { ContextProvider } from './context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './views/Home';
import AddTask from './views/AddTask';

export default function App() {
  const Stack = createStackNavigator();

  const [loading, setLoading] = useState(true);
  const [storagedTasks, setStoragedTasks] = useState(initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tasks');
        if (jsonValue !== null) {
          const value = JSON.parse(jsonValue);
          setStoragedTasks({ tasks: value });
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>"Loading..."</Text>
      </View>
    );
  }

  return (
    <ContextProvider initialState={storagedTasks} reducer={reducer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="To-Do App" component={Home} />
          <Stack.Screen name="Add task" component={AddTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
