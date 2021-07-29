import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-material-ui';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import CustomPicker from '../components/CustomPicker';
import { useStateValue } from '../context/Context';
import { actionTypes } from '../context/Reducer';

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [remind, setRemind] = useState(null);
  const [repeat, setRepeat] = useState(null);
  const [{ tasks }, dispatch] = useStateValue();

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleSelectedDeadline = (selectedDeadline) => {
    setDeadline(selectedDeadline);
  };

  const handleSelectedStartTime = (selectedStartTime) => {
    setStartTime(selectedStartTime);
  };

  const handleSelectedEndTime = (selectedEndTime) => {
    setEndTime(selectedEndTime);
  };

  const handleSelectedRemind = (selectedRemind) => {
    setRemind(selectedRemind);
  };

  const handleSelectedRepeat = (selectedRepeat) => {
    setRepeat(selectedRepeat);
  };

  const handleCreateTaskButtonPress = () => {
    if (title !== '') {
      const newTask = {
        title: title,
        deadline: deadline,
        startTime: startTime,
        endTime: endTime,
        remind: remind,
        repeat: repeat,
        completed: false,
      };

      dispatch({
        type: actionTypes.UPDATE_TASKS,
        tasks: [...tasks, newTask],
      });
    }

    navigation.goBack();
  };

  return (
    <>
      <View style={styles.formContainer}>
        <Text>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={handleTitleChange}
          value={title}
        />
        <Text>Deadline</Text>
        <CustomDateTimePicker
          textInputStyle={styles.textInput}
          mode="date"
          onSelected={handleSelectedDeadline}
        />
        <View style={styles.timesContainer}>
          <View>
            <Text>Start time</Text>
            <CustomDateTimePicker
              textInputStyle={styles.timeInput}
              mode="time"
              onSelected={handleSelectedStartTime}
            />
          </View>
          <View>
            <Text>End time</Text>
            <CustomDateTimePicker
              textInputStyle={styles.timeInput}
              mode="time"
              onSelected={handleSelectedEndTime}
            />
          </View>
        </View>
        <Text>Remind</Text>
        <CustomPicker
          style={styles.textInput}
          mode="remind"
          onSelected={handleSelectedRemind}
        />
        <Text>Repeat</Text>
        <CustomPicker
          style={styles.textInput}
          mode="repeat"
          onSelected={handleSelectedRepeat}
        />
        <Button
          raised
          primary
          text="Create a task"
          upperCase={false}
          onPress={handleCreateTaskButtonPress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    height: 40,
    marginBottom: 20,
    borderRadius: 3,
    padding: 5,
  },
  timesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    backgroundColor: '#f9f9f9',
    height: 40,
    marginBottom: 20,
    borderRadius: 3,
    padding: 5,
    width: 150,
  },
});
