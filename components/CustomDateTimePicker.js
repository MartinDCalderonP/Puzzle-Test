import React, { useState, useEffect } from 'react';
import { Text, TouchableHighlight, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function CustomDateTimePicker({
	textInputStyle,
	mode,
	onSelected,
}) {
	const [date, setDate] = useState(new Date(moment()));
	const [show, setShow] = useState(false);

	const handleTouchableHighlightPress = () => {
		setShow(true);
	};

	const handleDateChange = (e, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	useEffect(() => {
		onSelected(date);
	}, [onSelected, date]);

	return (
		<View>
			<TouchableHighlight onPress={handleTouchableHighlightPress}>
				<View>
					<Text style={textInputStyle}>
						{mode === 'date' && moment(date).format('YYYY-MM-DD')}
						{mode === 'time' && moment(date).format('LT')}
					</Text>
				</View>
			</TouchableHighlight>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={handleDateChange}
				/>
			)}
		</View>
	);
}
