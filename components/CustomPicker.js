import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function CustomPicker({ style, mode, onSelected }) {
  const [selected, setSelected] = useState();

  const handleValueChange = (itemValue, itemIndex) => {
    setSelected(itemValue);
  };

  useEffect(() => {
    onSelected(selected);
  }, [onSelected, selected]);

  const remindMinutes = [];

  for (let i = 0; i <= 60; i++) {
    if (i % 5 == 0) {
      remindMinutes.push(i);
    }
  }

  const repeatTimes = ['Never', 'Daily', 'Weekly', 'After 2 weeks', 'Monthly'];

  return (
    <Picker
      style={style}
      selectedValue={selected}
      onValueChange={handleValueChange}>
      {mode === 'remind' &&
        remindMinutes.map((minutes, index) => (
          <Picker.Item
            key={index}
            label={`${minutes} minutes early`}
            value={minutes}
          />
        ))}
      {mode === 'repeat' &&
        repeatTimes.map((repeatTime, index) => (
          <Picker.Item key={index} label={repeatTime} value={repeatTime} />
        ))}
    </Picker>
  );
}
