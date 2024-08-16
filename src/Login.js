import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import PACModal from './PACModal';
import { useNavigate } from 'react-router-dom';

export default function Login({ auth, setAuth, Loading }) {

    const [PACModalOpen, setPACModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleLogin = () => {
        setLoading(true)

        setTimeout(() => {
            localStorage.setItem("loggedIn", "true")
            setLoading(false)
            setAuth(true)
        }, 800);
    }

    useEffect(() => {
        if (auth) {
            navigate("/")
        }
    }, [auth])


    return (
        <div className='min-h-screen bg-[#0d0d0f] flex'>

            <div className='flex flex-row justify-between flex-1'>

                <div className='flex flex-col gap-10 w-full max-w-[500px] justify-center mx-auto'>
                    <div className='flex flex-col gap-2 items-center'>
                        <p className='text-[#FC7841] font-light text-base font-["Urbanist"] tracking-[1.08em]'>ASTROBOOM</p>
                        <h2 className='text-white/90 font-semibold text-6xl font-["Urbanist"]'>Sign In</h2>
                    </div>

                    <div className='flex flex-col gap-4 w-full'>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-white/50 font-medium text-base font-["Urbanist"]'>Full Name</p>
                            <input type="text" className=' bg-white/[0.07] border border-white/20 text-white rounded-lg focus:outline-none w-full px-3 py-2' />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-white/50 font-medium text-base font-["Urbanist"]'>SpaceShip ID</p>
                            <input type="email" className=' bg-white/[0.07] border border-white/20 text-white rounded-lg focus:outline-none w-full px-3 py-2' />
                        </div>

                        <div className='flex flex-col gap-2 w-nh'>
                            <p className='text-white/50 font-medium text-base font-["Urbanist"]'>Password</p>
                            <input type="password" className=' bg-white/[0.07] border border-white/20 text-white rounded-lg focus:outline-none w-full px-3 py-2' />
                        </div>

                        <p className='text-white/40 font-semibold text-base font-["Urbanist"] w-full text-center'>OR</p>

                        <p className='text-[#FC7841] text-lg font-["Urbanist"] w-full text-center cursor-pointer' onClick={() => { setPACModalOpen(true) }}>Login with PAC</p>

                        <button className='flex items-center justify-center py-2 px-10 bg-[#FC7841] border border-[#333333] rounded-full font-bold text-[#181818] text-lg hover:scale-105 transition' onClick={handleLogin}>{loading ? <Loading /> : "Login"}</button>
                    </div>
                </div>

                <img src="illus.svg" alt="" />
            </div>

            <PACModal PACModalOpen={PACModalOpen} setPACModalOpen={setPACModalOpen} />

        </div>
    )
}