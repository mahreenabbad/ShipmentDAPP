'use client'
// import Link from 'next/link';
import "./globals.css";
import Image from "next/image";
import { TrackingProvider } from "./Context/Tracking.js";

import  Navbar  from "./Components/Navbar.jsx";
import  Footer  from "./Components/Footer.jsx";
import Services from "./Components/Services.jsx";
import Table from "./Components/Table.jsx";
import Form from "./Components/Form.jsx";
import Profile from "./Components/Profile.jsx";
import CompleteShipment from "./Components/CompleteShipment.jsx";
import GetShipment from "./Components/GetShipment.jsx";
import StartShipment from "./Components/StartShipment.jsx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <TrackingProvider>
       <Navbar />
       <Services/>
       <Table/>
       <Form/>
       <Profile/>
       <CompleteShipment/>
       <GetShipment/>
       <StartShipment/>
     </TrackingProvider>
     <Footer />
    </main>
  );
}
