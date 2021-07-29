import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Checkbox } from 'react-native-material-ui';
import { useStateValue } from '../context/Context';
import { actionTypes, initialState } from '../context/Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [{ tasks }, dispatch] = useStateValue();

  useEffect(() => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('tasks', jsonValue);
      } catch (e) {
        console.log(e);
      }
    };

    if (tasks !== initialState) {
      storeData(tasks);
    }
  }, [tasks]);

  const updateTasks = (taskIndex, completed) => {
    let tasksList = tasks;

    tasksList[taskIndex] = { ...tasksList[taskIndex], completed: completed };

    dispatch({
      type: actionTypes.UPDATE_TASKS,
      tasks: tasksList,
    });
  };

  const handleUncheckTask = (taskIndex) => {
    updateTasks(taskIndex, false);
  };

  const handleCheckTask = (taskIndex) => {
    updateTasks(taskIndex, true);
  };

  return (
    <>
      <View style={styles.completedTasks}>
        <Text style={styles.title}>Completed Tasks</Text>
        {tasks?.length > 0 ? (
          tasks?.map((task, index) => (
            <>
              {task.completed == true && (
                <Checkbox
                  key={index}
                  label={task.title}
                  value="agree"
                  checked={true}
                  onCheck={() => handleUncheckTask(index)}
                />
              )}
            </>
          ))
        ) : (
          <Text>There is no completed tasks yet.</Text>
        )}
      </View>
      <View style={styles.pendingTasks}>
        <Text style={styles.title}>Pending Tasks</Text>
        {tasks?.length > 0 ? (
          tasks?.map((task, index) => (
            <>
              {task.completed == false && (
                <Checkbox
                  key={index}
                  label={task.title}
                  value="agree"
                  checked={false}
                  onCheck={() => handleCheckTask(index)}
                />
              )}
            </>
          ))
        ) : (
          <Text>There is no pending tasks yet.</Text>
        )}
      </View>
      <View>
        <Button
          raised
          primary
          text="Add a task"
          upperCase={false}
          onPress={() => navigation.navigate('Add task')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  completedTasks: {
    paddingTop: 20,
    backgroundColor: '#fff',
    flex: 0.45,
  },
  pendingTasks: {
    paddingTop: 20,
    backgroundColor: '#fff',
    flex: 0.55,
  },
});
