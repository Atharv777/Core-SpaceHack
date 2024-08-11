import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";

export default function PACModal({ PACModalOpen, setPACModalOpen }) {

    return (
        PACModalOpen
            ? <div className='h-screen w-screen bg-black/[0.85] flex justify-center items-center absolute top-0 left-0 z-10' onClick={() => { setPACModalOpen(false) }}>

                <div className='flex flex-row justify-between flex-1 px-20'>
                    <h1 className='text-4xl text-white font-semibold text-center w-full'>Please click Login on your PAC {"(Personal Arm Computer)"} to continue!</h1>
                </div>

            </div>
            : null
    )
}
// font-family: 'Urbanist';