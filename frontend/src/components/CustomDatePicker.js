import React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import customDatePickerStyles from '../styles/CustomDatePickerStyles';

const CustomDatePicker = ({ label, date, onDateChange }) => {
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <View style={customDatePickerStyles.container}>
      <Text style={customDatePickerStyles.label}>{label}</Text>
      {Platform.OS === 'web' ? (
        <DatePicker
          selected={date}
          onChange={onDateChange}
          showTimeSelect
          dateFormat="Pp"
          className="custom-datepicker"
          placeholderText={`Select ${label}`}
        />
      ) : (
        <>
          <TouchableOpacity
            style={customDatePickerStyles.pickerButton}
            onPress={() => setShowPicker(true)}>
            <Text>{date.toLocaleString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) onDateChange(selectedDate);
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default CustomDatePicker;
