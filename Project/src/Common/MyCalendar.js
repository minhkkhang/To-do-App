import React,{useEffect, useState} from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import {View} from 'react-native';
import { useSelector} from 'react-redux'

const MyCalendar = (props)=>{
    const [markedDates,setMarkDates]=props.selectedDate!='Unknown'?useState({[props.selectedDate]:Selected}):
    useState({})
    const [selectedDate,setSelectedDate]=useState(props.selectedDate)
    const [onMountAlert, setOnMountAlert]=useState(0)

    const statelist =useSelector(state => state.todo.list)
    const todoStatus = useSelector(state => state.todo.flag)

    const handleMarkedDateChange = async(id,value,mode) => {
        if(mode==='select'){
            if(id===selectedDate){
                setMarkDates(prevState => ({
                    ...prevState,
                    [id]: value
                }));
                return
            }
            switch(markedDates[selectedDate].name){
                case 'selected':
                    setMarkDates(prevState => ({
                        ...prevState,
                        [selectedDate]: undefined
                    }))
                    break
                case 'doingselected':
                    setMarkDates(prevState => ({
                        ...prevState,
                        [selectedDate]: MarkedDoing
                    }))
                    break
                case 'doneselected':
                    setMarkDates(prevState => ({
                        ...prevState,
                        [selectedDate]: MarkedDone
                    }))
                    break
                case 'doingdoneselected':
                    setMarkDates(prevState => ({
                        ...prevState,
                        [selectedDate]: MarkedDoingDone
                    }))
                    break
            }
            setMarkDates(prevState => ({
                ...prevState,
                [id]: value
            }));
            setSelectedDate(id)
        }
        else{
            setMarkDates(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    useEffect(()=>{
        if(todoStatus==='IDLE' && onMountAlert>0){
            if(props.mode!=null){
                setMarkDates({})
                putMarksOnCalendar()
            }
        }
    },[todoStatus,onMountAlert])
    useEffect(()=>{
        setOnMountAlert(1)
    },[])

    const putMarksOnCalendar =async()=>{
        const list =statelist
        const hash={[selectedDate]:'selected'}
        for(i=0;i<list.length;i++){
            const startDate=list[i].startDate
            const endDate=list[i].endDate
            await mark(startDate,hash,'markDoing')
            await mark(endDate,hash,'markDone')
        }
        Object.entries(hash).forEach(async([key, value]) => {
            switch(value){
                case 'selected':{
                    await handleMarkedDateChange(key,Selected,'select')
                    break
                }
                case 'doing':{
                    await handleMarkedDateChange(key,MarkedDoing,'mark')
                    break
                }
                case 'done':{
                    await handleMarkedDateChange(key,MarkedDone,'mark')
                    break
                }
                case 'doingdone':{
                    await handleMarkedDateChange(key,MarkedDoingDone,'mark')
                    break
                }
                case 'doingselected':{
                    await handleMarkedDateChange(key,MarkedDoingAndSelected,'select')
                    break
                }
                case 'doneselected':{
                    await handleMarkedDateChange(key,MarkedDoneAndSelected,'select')
                    break
                }
                case 'doingdoneselected':{
                    await handleMarkedDateChange(key,MarkedDoingDoneAndSelected,'select')
                    break
                }
            }
        });
    }
    const mark=async(date,hash,mode)=>{
        if(date==='Unknown')return
        switch(hash[date]){
            case undefined:{
                if(mode==='markDoing')hash[date]='doing'
                else hash[date]='done'
                break
            }
            case 'selected':{
                if(mode==='markDoing')hash[date]='doingselected'
                else hash[date]='doneselected'
                break
            }
            case 'doing':{
                if(mode==='markDone')hash[date]='doingdone'
                break
            }
            case 'done':{
                if(mode==='markDoing')hash[date]='doingdone'
                break
            }
            case 'doingdone':{
                break
            }
            case 'doingselected':{
                if(mode==='markDone')hash[date]='doingdoneselected'
                break
            }
            case 'doneselected':{
                if(mode==='markDoing')hash[date]='doingdoneselected'
                break
            }
            case 'doingdoneselected':{
                break
            }
        }
    }

    return(
        <View style={{flex:1}}>
            <Calendar hideExtraDays={true}
                style={{borderTopLeftRadius:50,borderTopRightRadius:50}}
                markingType='multi-dot'
                minDate={props.minDate || undefined}
                maxDate={props.maxDate||undefined}
                current={props.current || Date()}
                onDayPress={(day) => {
                    if(day.dateString===selectedDate){
                        props.onDayPress(day.dateString)
                        return
                    }
                    if(props.mode!=null){
                        switch(markedDates[day.dateString]){
                            case undefined:
                                handleMarkedDateChange(day.dateString,Selected,'select')
                                break
                            default:{
                                switch(markedDates[day.dateString].name){
                                    case 'doing':
                                        handleMarkedDateChange(day.dateString,MarkedDoingAndSelected,'select')
                                        break
                                    case 'done':
                                        handleMarkedDateChange(day.dateString,MarkedDoneAndSelected,'select')
                                        break
                                    case 'doingdone':
                                        handleMarkedDateChange(day.dateString,MarkedDoingDoneAndSelected,'select')
                                        break
                                }
                                break
                            }
                        }
                    }
                    else handleMarkedDateChange(day.dateString,Selected)
                    props.onDayPress(day.dateString)
                }}
                monthFormat={'yyyy MM'}
                firstDay={1}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                enableSwipeMonths={true}
                markedDates={markedDates}
              />
            
        </View>
    )
}
const hasdoing = {key:'hasdoing', color: 'red'}
const hasdone = {key:'hasdone', color: 'green'}
const MarkedDoing={dots: [hasdoing],name:'doing'}
const MarkedDone={dots: [hasdone],name:'done'}
const MarkedDoingDone={dots: [hasdoing,hasdone],name:'doingdone'}
const MarkedDoingAndSelected={dots: [hasdoing],selected:true,color:'#70d7c7',textColor:'white',name:'doingselected'}
const MarkedDoneAndSelected={dots: [hasdone],selected:true,color:'#70d7c7',textColor:'white',name:'doneselected'}
const MarkedDoingDoneAndSelected={dots: [hasdoing,hasdone],selected:true,color:'#70d7c7',textColor:'white',name:'doingdoneselected'}
const Selected={color:'#70d7c7',selected: true,textColor:'white',name:'selected'}


export default MyCalendar