"use client"
import React,{ useState,useEffect } from "react";

const ethers = require("ethers")
// import Web3modal from "@web3modal/ethers/react";
// import { Web3Wallet } from "@walletconnect/web3wallet";

import tracking from "./Tracking.json"

const ContractAddress = " 0x5FbDB2315678afecb367f032d93F642f64180aa3"
const ContractABI = tracking.abi;

// FETCHING SMART CONTTRACT
const fetchContract= (signerOrprovider)=>{
    new ethers.Contract(ContractAddress,ContractABI,signerOrprovider);
}

export const TrackingContext = React.createContext();
export const TrackingProvider = ({children})=>{
    //State Variables
    const DAPPName = "Product Tracking DAPP";
    const[ currentUser,setCurrentUser] =useState("");

    const createShipment =async(items)=>{
        console.log(items);
        const { receiver,pickupTime,distance, price } = items;
       try {
        // const web3modal = new Web3modal();
        // const connection = await web3modal.connect()
        const connection =  window.ethereum;
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const createItem = await contract.createShipment(
            receiver,
            new Date(pickupTime).getTime(),//convert time to seconds
            distance,
            ethers.utils.parseUnits(price,18),{value:ethers.utils.parseUnits(price,18),}
        );
        await createItem.wait()
        console.log(createItem)
       } catch (error) {
        console.log("Some went wrong", error);
       }
    }

    const getAllShipments =async()=>{
        try {
            // const provider = new ethers.BrowserProvider(window.ethereum);
            const provider= new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider);
            const shipments = await contract.getAllTransactions();
            const allShipmnets = shipments.map((shipment)=>({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price:ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status
            }))
            return allShipmnets;
        } catch (error) {
            console.log("Failed to get shipments")
        }
    };

    const getShipmnetsCount = async()=>{
        try {
            if(!window.ethereum) return "Install MetaMask"
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            })
            const provider= new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentsCount(accounts[0])
            return shipmentCount.toNumber();
        } catch (error) {
            console.log("Failed to get shipment count")
        }
    }

    const completeShipment = async(completeShip)=>{
      console.log(completeShip)
      const {receiver,index} = completeShip;
      try {
        if(!window.ethereum)  return "Install MetaMASk"
        const accounts = await window.ethereum.request({
            method: 'eth_accounts',
      })
    //   const web3modal= new Web3modal()
      const connection = await  window.ethereum;
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {gasLimit:300000}
      );
      transaction.wait();
      console.log(transaction)
      } catch (error) {
        console.log("wrong with complete shipment " + error);
      }

    }

    const getShipment = async(index)=>{
        console.log(index*1)
        try {
            if(!window.ethereum) return "Install MetaMAsk"
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            })
            const provider = new ethers.provider.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index*1);
            const singleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7]
            }
            return singleShipment;
        } catch (error) {
            console.log("Failed to getShipment");
        }
    }

    const startShipment = async(getProduct)=>{
        const {receiver,index} =getProduct;
        try {
            if(!window.ethereum) return "Install MetaMAsk"
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            })
            // const web3modal= new Web3modal()
            const connection = await  window.ethereum;
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index*1
            );
           shipment.wait();
            
        } catch (error) {
            console.log("No shipments",error);
        }
    }
    //check wallet connection
    const checkIfWalletConnected = async()=>{
        try {
            if(!window.ethereum) return "Install MetaMAsk"
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if(accounts.length){
                setCurrentUser(accounts[0])
            }else {
                "No Account"
            }
        } catch (error) {
            return "Not Connected"      
         }
    }
    //Connect Wallet Function
    const connectWallet = async()=>{
        try {
           if(!window.ethereum) return "Install MetaMask"
           const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
           }) 
           setCurrentUser(accounts[0])
        } catch (error) {
            return "Something went wrong"
        }
    }
    useEffect(()=>{
     checkIfWalletConnected();
    },[])

    return(
        <TrackingContext.Provider value={{
            connectWallet,
            createShipment,
            getAllShipments,
            completeShipment,
            getShipment,
            startShipment,
            getShipmnetsCount,
            DAPPName,
            currentUser
        }} >{children}</TrackingContext.Provider>
    )

}
