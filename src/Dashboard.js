import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';

export default function Dashboard({ auth, setAuth, Loading }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/login")
        }
    }, [auth])

    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(0)

    const handleLogout = () => {
        setLoading(true)

        setTimeout(() => {
            localStorage.setItem("loggedIn", "false")
            setLoading(false)
            setAuth(false)
        }, 800);
    }

    const SpacecraftCards = () => {

        const [humidityLevel, setHumidityLevel] = useState(55)
        const [pressureLevel, setPressureLevel] = useState(14.5)

        useEffect(() => {
            const tm = setInterval(() => {
                setHumidityLevel(Math.random() * (60 - 55) + 55)
            }, 5200);
            return () => {
                clearTimeout(tm)
            }
        }, [])

        useEffect(() => {
            const tm = setInterval(() => {
                setPressureLevel(Math.random() * (15 - 14) + 14)
            }, 5200);
            return () => {
                clearTimeout(tm)
            }
        }, [])


        const optionsPieChart = {
            legend: { show: false },
            colors: ['#FC7841', '#ffffff10'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'donut',
                toolbar: { show: false },
                animations: {
                    enabled: true,
                }

            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 100
                },
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: { enabled: false },
        };


        const optionsPh = {
            legend: { show: false },
            colors: ['#FC7841'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'area',
                toolbar: { show: false },
            },
            stroke: {
                width: [2, 2],
                curve: 'smooth',
            },
            grid: {
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                borderColor: "#ffffff10"
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#0d0d0f',
                strokeColors: ['#FC7841'],
                strokeWidth: 3,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                hover: {
                    size: undefined,
                    sizeOffset: 5,
                },
            },
            xaxis: {
                type: 'datetime',
                axisBorder: { show: false, },
                axisTicks: { show: false, },
                labels: {
                    style: { colors: '#ffffff50' },
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 0,
                max: 14,
                labels: { style: { colors: '#ffffff50' }, }
            },
        };

        const optionsNDVI = {
            legend: { show: false },
            colors: ['#FC7841'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'area',
                toolbar: { show: false },
            },
            stroke: {
                width: [2, 2],
                curve: 'smooth',
            },
            grid: {
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                borderColor: "#ffffff10"
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#0d0d0f',
                strokeColors: ['#FC7841'],
                strokeWidth: 3,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                hover: {
                    size: undefined,
                    sizeOffset: 5,
                },
            },
            xaxis: {
                type: 'datetime',
                axisBorder: { show: false, },
                axisTicks: { show: false, },
                labels: {
                    style: { colors: '#ffffff50' },
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: -1,
                max: +1,
                labels: { style: { colors: '#ffffff50' }, }
            },
        };

        return (
            <>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit h-[415px] relative">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>Humidity levels - <span className='text-green-500'>Optimal</span></h2>
                    <h2 className='text-3xl font-bold font-["Urbanist"] absolute top-[66%] w-full text-center text-white/50'>{humidityLevel.toFixed(1)} %</h2>
                    <ReactApexChart
                        className="scale-[1.35]"
                        options={optionsPieChart}
                        series={[humidityLevel, (100 - humidityLevel)]}
                        type="donut"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit h-[415px] relative">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>Pressure levels - <span className='text-green-500'>Optimal</span></h2>
                    <h2 className='text-3xl font-bold font-["Urbanist"] absolute top-[66%] w-full text-center text-white/50'>{pressureLevel.toFixed(1)} psi</h2>
                    <ReactApexChart
                        className="scale-[1.35]"
                        options={optionsPieChart}
                        series={[(pressureLevel * 5), (100 - (pressureLevel * 5))]}
                        type="donut"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>Soil pH levels - <span className='text-green-500'>Optimal</span></h2>
                    <ReactApexChart
                        options={optionsPh}
                        series={[
                            {
                                name: 'pH Level',
                                data: [5.5, 5.8, 7, 7.1, 6, 5, 4, 5.5, 5.2, 5.3].map((i, _) => { return ({ y: i, x: new Date(1723372872361 + (_ * 1000)).getTime() }) }),
                            }
                        ]}
                        type="area"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>NDVI levels - <span className='text-green-500'>Optimal</span></h2>
                    <ReactApexChart
                        options={optionsNDVI}
                        series={[
                            {
                                name: 'pH Level',
                                data: [0.6, 0.3, 0.18, -0.1, -0.4, 0.2, 0.4, 0.5, 0.8, 0.7].map((i, _) => { return ({ y: i, x: new Date(1723372872361 + (_ * 1000)).getTime() }) }),
                            }
                        ]}
                        type="area"
                        height={350}
                        width={500}
                    />
                </div>
            </>
        )
    }
    const AstronautCards = () => {

        const [tempLevel, setTempLevel] = useState(98);


        useEffect(() => {
            const tm = setInterval(() => {
                setTempLevel(Math.random() * (98.5 - 97.2) + 97.2)
            }, 5200);
            return () => {
                clearTimeout(tm)
            }
        }, [])


        const optionsSpO2 = {
            legend: { show: false },
            colors: ['#FC7841'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'area',
                dropShadow: {
                    enabled: true,
                    color: '#623CEA14',
                    top: 10,
                    blur: 4,
                    left: 0,
                    opacity: 0.1,
                },
                toolbar: { show: false },
            },
            stroke: {
                width: [2, 2],
                curve: 'smooth',
            },
            grid: {
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                borderColor: "#ffffff10"
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#0d0d0f',
                strokeColors: ['#FC7841'],
                strokeWidth: 3,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                hover: {
                    size: undefined,
                    sizeOffset: 5,
                },
            },
            xaxis: {
                type: 'datetime',
                axisBorder: { show: false, },
                axisTicks: { show: false, },
                labels: {
                    style: { colors: '#ffffff50' },
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 80,
                max: 100,
                labels: { style: { colors: '#ffffff50' }, }
            },
        };
        const optionsHeartRate = {
            legend: { show: false },
            colors: ['#FC7841'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'area',
                dropShadow: {
                    enabled: true,
                    color: '#623CEA14',
                    top: 10,
                    blur: 4,
                    left: 0,
                    opacity: 0.1,
                },
                toolbar: { show: false },
            },
            stroke: {
                width: [2, 2],
                curve: 'smooth',
            },
            grid: {
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                borderColor: "#ffffff10"
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#0d0d0f',
                strokeColors: ['#FC7841'],
                strokeWidth: 3,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                hover: {
                    size: undefined,
                    sizeOffset: 5,
                },
            },
            xaxis: {
                type: 'datetime',
                axisBorder: { show: false, },
                axisTicks: { show: false, },
                labels: {
                    style: { colors: '#ffffff50' },
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 50,
                max: 120,
                labels: { style: { colors: '#ffffff50' }, }
            },
        };
        const optionsGlucose = {
            legend: { show: false },
            colors: ['#FC7841'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'area',
                toolbar: { show: false },
            },
            stroke: {
                width: [2, 2],
                curve: 'smooth',
            },
            grid: {
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                borderColor: "#ffffff10"
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#0d0d0f',
                strokeColors: ['#FC7841'],
                strokeWidth: 3,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                hover: {
                    size: undefined,
                    sizeOffset: 5,
                },
            },
            xaxis: {
                type: 'datetime',
                axisBorder: { show: false, },
                axisTicks: { show: false, },
                labels: {
                    style: { colors: '#ffffff50' },
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 60,
                max: 200,
                labels: { style: { colors: '#ffffff50' }, }
            },
        };

        const optionsPieChart = {
            legend: { show: false },
            colors: ['#FC7841', '#ffffff10'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'donut',
                toolbar: { show: false },
                animations: {
                    enabled: true,
                }

            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 100
                },
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: { enabled: false },
        };



        return (
            <>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>SpO2% in blood - <span className='text-green-500'>Optimal</span></h2>
                    <ReactApexChart
                        options={optionsSpO2}
                        series={[
                            {
                                name: 'SpO2 Level',
                                data: [95, 92, 90, 87, 91, 92, 97, 99, 95, 100].map((i, _) => { return ({ y: i, x: new Date(1723372872361 + (_ * 1000)).getTime() }) }),
                            }
                        ]}
                        type="area"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit h-[415px] relative">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>Body Temperature - <span className='text-green-500'>Optimal</span></h2>
                    <h2 className='text-3xl font-bold font-["Urbanist"] absolute top-[66%] w-full text-center text-white/50'>{tempLevel.toFixed(1)}  &deg;F</h2>
                    <ReactApexChart
                        className="scale-[1.35]"
                        options={optionsPieChart}
                        series={[(((105 - tempLevel) / 0.15)), (100 - ((105 - tempLevel) / 0.15))]}
                        type="donut"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>{'Heart Rate (BPM)'} - <span className='text-green-500'>Optimal</span></h2>
                    <ReactApexChart
                        options={optionsHeartRate}
                        series={[
                            {
                                name: 'Heart Rate',
                                data: [80, 75, 74, 73, 65, 67, 68, 70, 80, 82].map((i, _) => { return ({ y: i, x: new Date(1723372872361 + (_ * 1000)).getTime() }) }),
                            }
                        ]}
                        type="area"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full text-white/80'>{'Blood Glucose Level (mg/dL)'} - <span className='text-green-500'>Optimal</span></h2>
                    <ReactApexChart
                        options={optionsGlucose}
                        series={[
                            {
                                name: 'Blood Glucose Level',
                                data: [120, 110, 95, 80, 90, 85, 115, 125, 140, 150].map((i, _) => { return ({ y: i, x: new Date(1723372872361 + (_ * 1000)).getTime() }) }),
                            }
                        ]}
                        type="area"
                        height={350}
                        width={500}
                    />
                </div>
            </>
        )
    }

    return (

        <>
            <div className='w-full mb-10 px-10 py-5 flex justify-between bg-[#0d0d0f] relative z-[11]'>
                <img src="Logo.svg" alt="" className='h-[40px]' />
                <button className='flex items-center justify-center py-2 px-10 bg-[#FC7841] rounded-full font-bold text-[#181818] text-lg hover:scale-105 transition' onClick={handleLogout}>{loading ? <Loading /> : "Logout"}</button>
            </div>

            <div className='w-full h-full relative'>
                <div className='absolute left-0 top-[-40px] pt-[40px] bg-transparent z-[10] overflow-hidden h-[calc(100%_+_40px)] max-w-[65px] min-w-[65px] w-[65px] border-r border-white/10 text-white flex flex-col items-center gap-6 px-2'>
                    <div className={`box-border border w-[45px] h-[45px] rounded-md flex justify-center items-center text-white/50 hover:brightness-75 transition ${selected === 0 ? "bg-[#FC7841] text-black border-transparent" : "bg-white/[0.07] text-white border-white/10"}`} onClick={() => { setSelected(0) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                    </div>
                    <div className={`box-border border w-[45px] h-[45px] rounded-md flex justify-center items-center text-white/50 hover:brightness-75 transition ${selected === 1 ? "bg-[#FC7841] text-black border-transparent" : "bg-white/[0.07] text-white border-white/10"}`} onClick={() => { setSelected(1) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <div className={`box-border border w-[45px] h-[45px] rounded-md flex justify-center items-center text-white/50 hover:brightness-75 transition ${selected === 2 ? "bg-[#FC7841] text-black border-transparent" : "bg-white/[0.07] text-white border-white/10"}`} onClick={() => { setSelected(2) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></svg>
                    </div>
                    {/* <div className={`box-border border w-[45px] h-[45px] rounded-md flex justify-center items-center text-white/50 hover:brightness-75 transition ${selected === 3 ? "bg-[#FC7841] text-black border-transparent" : "bg-white/[0.07] text-white border-white/10"}`} onClick={() => { setSelected(3) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M9.5 8h5" /><path d="M9.5 12H16" /><path d="M9.5 16H14" /></svg>
                    </div> */}
                </div>

                <div className='ml-[65px]'>
                    {
                        selected === 0
                            ? <div className='flex flex-wrap px-20 gap-10 justify-center'><SpacecraftCards /></div>
                            : selected === 1
                                ? <div className='flex flex-wrap px-20 gap-10 justify-center'><AstronautCards /></div>
                                : selected === 2
                                    ? <Chat />
                                    : null
                    }
                </div>
            </div>
        </>
    )
}