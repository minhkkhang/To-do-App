import PushNotification from 'react-native-push-notification'

export const setNotification=(id,title,message,date) => {
    PushNotification.localNotificationSchedule({
        id: id, 
        title: 'Today task: '+title, 
        message: message,
        userInfo: {id:id},
        date: date,
        bigText: message,
        subText: "This is a subText",
        ...notificationTemplate
      });
}
export const cancelNotification=(id)=>{
    PushNotification.localNotificationSchedule({
        id: id, 
        title: '', 
        message: '',
        userInfo: {id:id},
        date: new Date('3000-01-01'),
        bigText: '',
        subText: "This is a subText",
        vibrate: false,
        ...notificationTemplate
      });
}


  
const notificationTemplate={
    channelId: "taskChannel",
    autoCancel: false,
    visibility: "private",
    invokeApp: true
}