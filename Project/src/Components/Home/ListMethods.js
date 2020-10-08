
export default getList = () =>{
  if(getList.list==undefined){
    getList.list=[
      {
        id: 1,
        taskName: 'Hoc react native',
        status:'doing',
        startDate:'01/10/2020',
        endDate:'Unknown',
        detail:'Hoc Hook, props, navigation, redux'
      },
      {
        id: 2,
        taskName: 'Chuan bi giay to',
        status:'not started',
        startDate:'Unknown',
        endDate:'Unknown',
        detail:`1: 4 ban photo CMND \n 2:3 anh the \n 3:Giay xac nhan o truong.`
      },
      {
        id: 3,
        taskName: 'Di phong van thuc tap',
        status:'done',
        startDate:'18/09/2020',
        endDate:'18/09/2020',
        detail:'Di phong van thuc tap tai MeU Solutions'
      },
      {
        id: 4,
        taskName: 'Deadline do an mon Kien Truc Phan Mem',
        status:'doing',
        startDate:'06/10/2020',
        endDate:'Unknown',
        detail:'Lop Kien Truc Phan Mem 17_32'
      },
      {
        id: 5,
        taskName: 'Task 5',
        status:'done',
        startDate:'01/09/2020',
        endDate:'20/09/2020',
        detail:'This is task 5'
      },
      {
        id: 6,
        taskName: 'Task 6',
        status:'not started',
        startDate:'20/10/2020',
        endDate:'Unknown',
        detail:'This is task 6'
      }
    ];
    return getList.list;
  }
  else return getList.list;
}

  

