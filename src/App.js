import React from 'react';
import ReactApexChart from "react-apexcharts";

export default function App() {
    return (
        <div className='min-h-screen bg-[#F9F4EF]'>
            <div className='flex flex-row justify-betweem'>
            <div className='flex flex-col gap-10 max-w-[50 items-center0px] mx-auto'>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='text-[#333333] font-light text-base font-["Urbanist"] tracking-[1.08em]'>ASTROBOOM</p>
                    <h2 className='text-[#333333] font-semibold text-6xl font-["Urbanist"]'>Sign In</h2>
                </div>
            
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col gap-2 w-full'>
                        <p className='text-[#333333] font-semibold text-base font-["Urbanist"]'>Full Name</p>
                        <input type="text" className=' bg-[#fff0f0] border border-[#3333337f] rounded-lg focus:outline-none w-full px-3 py-2' />
                    </div>
                
                    <div className='flex flex-col gap-2 w-full'>
                        <p className='text-[#333333] font-semibold text-base font-["Urbanist"]'>SpaceShip ID</p>
                        <input type="email" className=' bg-[#fff0f0] border border-[#3333337f] rounded-lg focus:outline-none w-full px-3 py-2' />
                    </div>
                
                    <div className='flex flex-col gap-2 w-nh'>
                        <p className='text-[#333333] font-semibold text-base font-["Urbanist"]'>Password</p>
                        <input type="password" className=' bg-[#fff0f0] border border-[#3333337f] rounded-lg focus:outline-none w-full px-3 py-2' />
                    </div>
        
                </div>
            </div>
                <img src="illus.svg" alt="" />
            </div>


            {/* <ReactApexChart options={{
              chart: {
                height: 350,
                type: 'radar',
              },
              dataLabels: {
                enabled: true
              },
              plotOptions: {
                radar: {
                  size: 140,
                  polygons: {
                    strokeColors: '#cbcbcb',
                    fill: {
                      colors: ['#ebebeb', '#fbfbfb']
                    }
                  }
                }
              },
              colors: ['#FC7841'],
              markers: {
                size: 2,
                colors: ['#fff'],
                strokeColor: '#FC7841',
                strokeWidth: 1,
              },
              tooltip: {
                y: {
                  formatter: function(val) {
                    return val
                  }
                }
              },
              xaxis: {
                categories: ['Debri 1', 'Debri 2', 'Debri 3', 'Debri 4', 'Debri 5', 'Debri 6']
              },
              yaxis: {
                labels: {
                  formatter: function(val, i) {
                    return ""
                  }
                }
              }
            }} 
            series={[{
              name: 'Series 1',
              data: [20, 90, 40, 5, 50, 30],
            }]} 
            type="radar" 
            height={350} /> */}





        </div>
    )
}
// font-family: 'Urbanist';