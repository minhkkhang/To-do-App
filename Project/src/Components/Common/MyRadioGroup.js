import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import React from 'react';
import {
    View,
  } from 'react-native';
 
const MyRadioGroup = (props)=>{
    return (
        <View>
        <RadioForm
          radio_props={props.options}
          value={props.value}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#2196f3'}
          animation={true}
          onPress={(value) => {props.onPress(value);}}
        />
        </View>
    )
}

export default MyRadioGroup;
