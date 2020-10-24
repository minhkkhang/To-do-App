import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, ImageBackground,View} from 'react-native';
import MyListViewItem from './MyListViewItem';




const MyListview = ({source,category,onPress,width,date}) => {
    //const dispatch = useDispatch()
    const [height,setHeight]=useState(category==='startAt'||category==='endAt'?150:undefined)
    const [isLoading,setIsLoading]=useState(category==='startAt'||category==='endAt'?true:false)
    const list =useSelector(state => state.todo.list)
    const itemList=[];
    switch(category){
        case 'all':{
            for(i=0;i<list.length;i++){
                itemList.push(list[i]);
            }
            break;
        }
        case 'startAt':{
            for(i=0;i<list.length;i++){
                if(list[i].startDate===date){
                    itemList.push(list[i]);
                }
            }
            break;
        }
        case 'endAt':{
            for(i=0;i<list.length;i++){
                if(list[i].endDate===date){
                    itemList.push(list[i]);
                }
            }
            break;
        }
        default:{
            for(i=0;i<list.length;i++){
                if(list[i].status===category)itemList.push(list[i]);
            }
            break;
        }
    }
    useEffect(()=>{
        if(!isLoading)setIsLoading(true)
        setHeight(itemList.length*55)
        setIsLoading(false)
    },[itemList.length])
    

    return (
    <ImageBackground source={source} style={{flex:1,paddingHorizontal:20, paddingVertical:5}}>
        {isLoading?(
            <View />
        ):(
            <FlatList
                height={height}
                data={itemList}
                renderItem={({ item }) => (<MyListViewItem
                    title={item.taskName}
                    status={item.status}
                    id={item.id}
                    onPress={onPress}
                    width={width-40}
                />)}
                keyExtractor={(item) => item.id.toString()}
            />
        )}
    </ImageBackground>
    )
};

export default MyListview;