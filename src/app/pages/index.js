"use client"
import React ,{useState, useEffect, useContext} from 'react';
//internl Imports 
import Table from '../Components/Table';
import Form from '../Components/Form';
import Services from '../Components/Services';
import Profile from '../Components/Profile';
import CompleteShipment from '../Components/CompleteShipment';
import GetShipment from '../Components/GetShipment';
import StartShipment from '../Components/StartShipment';
import { TrackingContext } from '../Context/Tracking';

const index =()=>{
    const {
        currentUser,
        createShipment,
        getAllShipments,
        completeShipment,
        getShipment,
        startShipment,
        getShipmnetsCount
    } = useContext(TrackingContext)

    //State Variables
    const [createShipmentModel,setCreateShipmentModel] =useState(false)
    const[openProfile,setOpenProfile] =useState(false)
    const [startModal,setStartModal] = useState(false)
    const [completeModal,setCompleteModal] = useState(false)
    const [getModel,setGetModel] = useState(false)
    //Data State Variables
    const [allShipmentData,setAllShipmentData] = useState()
     useEffect(()=>{
       const getCompaignsData = getAllShipments()
       return async()=>{
        const allData = await getCompaignsData;
        setAllShipmentData(allData);
       }
     },[])
     return(<>
             <Services
                 setOpenProfile={setOpenProfile}
                 setCompleteModal={setCompleteModal}
                 setGetModel={setGetModel}
                 setStartModal={setStartModal}
                 openProfile={openProfile}
              />
              <Table
                 setCreateShipmentModel={setCreateShipmentModel}
                 allShipmentData={allShipmentData} 
                 />
                 <Form
                 createShipmentModel={createShipmentModel}
                 createShipment={createShipment}
                 setCreateShipmentModel={setCreateShipmentModel}
                 />
                 <Profile
                 openProfile={openProfile}
                 setOpenProfile={setOpenProfile}
                 currentUser={currentUser}
                 getShipmnetsCount={getShipmnetsCount}
                 />
                 <CompleteShipment
                 completeModal={completeModal}
                 setCompleteModal={setCompleteModal}
                 completeShipment={completeShipment}
                 />
                 <GetShipment
                 getModel={getModel}
                 setGetModel={setGetModel}
                 getShipment={getShipment}
                 />
                 <StartShipment
                 startModal={startModal}
                 setStartModal={setStartModal}
                 startShipment={startShipment}
                 />
     </>

     )
}
export default index;