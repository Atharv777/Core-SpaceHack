import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

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
            colors: ['#3C50E0', '#bcbcbc'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'donut',
                dropShadow: {
                    enabled: true,
                    color: '#623CEA14',
                    top: 10,
                    blur: 4,
                    left: 0,
                    opacity: 0.1,
                },
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
            colors: ['#3C50E0', '#80CAEE'],
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
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#fff',
                strokeColors: ['#3056D3', '#80CAEE'],
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
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 0,
                max: 14,
            },
        };

        const optionsNDVI = {
            legend: { show: false },
            colors: ['#3C50E0', '#80CAEE'],
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
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#fff',
                strokeColors: ['#3056D3', '#80CAEE'],
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
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: -1,
                max: +1,
            },
        };

        return (
            <>
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit h-[415px] relative">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>Humidity levels - <span className='text-green-500'>Optimal</span></h2>
                    <h2 className='text-3xl font-bold font-["Urbanist"] absolute top-[66%] w-full text-center text-[#292929]'>{humidityLevel.toFixed(1)} %</h2>
                    <ReactApexChart
                        className="scale-[1.35]"
                        options={optionsPieChart}
                        series={[humidityLevel, (100 - humidityLevel)]}
                        type="donut"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit h-[415px] relative">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>Pressure levels - <span className='text-green-500'>Optimal</span></h2>
                    <h2 className='text-3xl font-bold font-["Urbanist"] absolute top-[66%] w-full text-center text-[#292929]'>{pressureLevel.toFixed(1)} psi</h2>
                    <ReactApexChart
                        className="scale-[1.35]"
                        options={optionsPieChart}
                        series={[(pressureLevel * 5), (100 - (pressureLevel * 5))]}
                        type="donut"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>Soil pH levels - <span className='text-green-500'>Optimal</span></h2>
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
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>NDVI levels - <span className='text-green-500'>Optimal</span></h2>
                    <ReactApexChart
                        options={optionsNDVI}
                        series={[
                            {
                                name: 'pH Level',
                                data: [0.6, 0.5, 0.3, 0.28, 0.22, 0, 0.1, 0.4, 0.5, 0.8, 0.7].map((i, _) => { return ({ y: i, x: new Date(1723372872361 + (_ * 1000)).getTime() }) }),
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
            colors: ['#3C50E0', '#80CAEE'],
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
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#fff',
                strokeColors: ['#3056D3', '#80CAEE'],
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
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 75,
                max: 100,
            },
        };
        const optionsHeartRate = {
            legend: { show: false },
            colors: ['#3C50E0', '#80CAEE'],
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
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#fff',
                strokeColors: ['#3056D3', '#80CAEE'],
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
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 50,
                max: 120,
            },
        };
        const optionsGlucose = {
            legend: { show: false },
            colors: ['#3C50E0', '#80CAEE'],
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
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            markers: {
                size: 4,
                colors: '#fff',
                strokeColors: ['#3056D3', '#80CAEE'],
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
                    formatter: (x) => { return new Date(x).toLocaleTimeString({}, { minute: "2-digit", second: "2-digit" }) }
                }
            },
            yaxis: {
                title: { style: { fontSize: '0px' } },
                min: 60,
                max: 200,
            },
        };

        const optionsPieChart = {
            legend: { show: false },
            colors: ['#3C50E0', '#bcbcbc'],
            chart: {
                fontFamily: 'urbanist, sans-serif',
                height: 335,
                width: 500,
                type: 'donut',
                dropShadow: {
                    enabled: true,
                    color: '#623CEA14',
                    top: 10,
                    blur: 4,
                    left: 0,
                    opacity: 0.1,
                },
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
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>SpO2% in blood - <span className='text-green-500'>Optimal</span></h2>
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
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit h-[415px] relative">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>Body Temperature - <span className='text-green-500'>Optimal</span></h2>
                    <h2 className='text-3xl font-bold font-["Urbanist"] absolute top-[66%] w-full text-center text-[#292929]'>{tempLevel.toFixed(1)}  &deg;F</h2>
                    <ReactApexChart
                        className="scale-[1.35]"
                        options={optionsPieChart}
                        series={[(((105 - tempLevel) / 0.15)), (100 - ((105 - tempLevel) / 0.15))]}
                        type="donut"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>{'Heart Rate (BPM)'} - <span className='text-green-500'>Optimal</span></h2>
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
                <div className="rounded-xl border border-black/30 bg-white pr-5 pt-7.5 w-fit">
                    <h2 className='pl-5 pt-5 text-lg font-semibold font-["Urbanist"] w-full'>{'Blood Glucose Level (mg/dL)'} - <span className='text-green-500'>Optimal</span></h2>
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
        <div>

            <div className='w-full mb-10 px-20 py-5 flex justify-between'>
                <img src="Logo.svg" alt="" className='h-[40px]' />
                <button className='flex items-center justify-center py-2 px-10 bg-[#A7C7E7] border border-[#333333] rounded-full font-bold text-[#181818] text-lg hover:scale-105 transition' onClick={handleLogout}>{loading ? <Loading /> : "Logout"}</button>
            </div>

            <div className='w-full flex justify-center gap-3 px-20 mb-10'>
                <p className={`font-bold text-[#181818] text-lg py-2 border-b border-b-[#181818] w-full rounded-t-lg text-center cursor-pointer ${selected === 0 ? "bg-[#A7C7E7]/60" : "bg-[#181818]/5"}`} onClick={() => { setSelected(0) }}>Spacecraft</p>
                <p className={`font-bold text-[#181818] text-lg py-2 border-b border-b-[#181818] w-full rounded-t-lg text-center cursor-pointer ${selected === 1 ? "bg-[#A7C7E7]/60" : "bg-[#181818]/5"}`} onClick={() => { setSelected(1) }}>Astronaut</p>
            </div>

            <div className='flex flex-wrap px-20 gap-10 justify-center'>
                {
                    selected === 0 ? <SpacecraftCards /> : selected === 1 ? <AstronautCards /> : null
                }

            </div>
        </div>
    )
}