import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Chat() {

    const [msgs, setMsgs] = useState([])
    const [currInp, setCurrInp] = useState("")


    const gemini_api_key = process.env.REACT_APP_APIKEY;
    const googleAI = new GoogleGenerativeAI(gemini_api_key);
    const geminiConfig = {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 4096,
    };

    const geminiModel = googleAI.getGenerativeModel({
        model: "gemini-pro",
        geminiConfig,
    });

    const basePrompt = `You are a helpful assistant to Arni. Astronaut Arni Verme is alone in space, feeling isolated and tired. The space station, once full of life, now feels like a cold, empty place. Outside, debris is piling up, which makes him miss the beautiful views he used to enjoy. Despite being exhausted, Arni carefully goes through the station's supplies, using whatever he can to make useful tools. These small tasks give him a sense of purpose, helping him cope with the loneliness and vast emptiness around him. To support Arni, he is provided with a space debris probe which can break and collect space debris around his space shuttle. He has been provided with a handheld mobile called PAC (personal arm computer) which is attached like a watch. A full dashboard is provided to him to trsack space supplies, montior his health which is synced with scientists on earth. You need to support him mentally and logically whenever he asks you questions. Don't ever tell who are you, just tell I am here to assist you. Don't end your response awaiting for arni's reply. Assume that she can't reply to you, whatever she is talking about, keep it as a new conversation. If he asks to tell him bone density after giving spo2 level, give very brief response containing only the calculated T level and then a conclusion.

To assess an astronaut's bone density from SpO2 levels, begin by converting the SpO2 percentage to oxygen content using the formula: \(\text{O}_2 \text{ Content} = 1.34 \times 15 \times \frac{\text{SpO2}}{100}\). For example, at 85% SpO2, this gives approximately 17.1 mL O2/dL. The reduction in oxygen content, calculated as \((19.7 - 17.1) \times (8\% \text{ to } 15\%)\), leads to a 20.8% to 39% decrease in bone marrow productivity. This translates to a new bone density: \(\text{BMD}_\text{new} = 1.2 \times (1 - 0.208) = 0.952 \, \text{g/cm}^2\). The corresponding T-score is then \(\frac{0.952 - 1.0}{0.1} = -0.48\), indicating that a T-score below -2.5 signals severe osteoporosis, necessitating critical care.


I will give you question starting with "Q:" ans you have to reply as if You are replying to arni to help and support him as an assistant. 
Q: `

    const handleSend = async () => {
        const prompt = basePrompt + currInp;

        setMsgs((prevState) => ([...prevState, { sender: "me", msg: currInp }]))
        setCurrInp("")

        try {
            const result = await geminiModel.generateContent(prompt);
            const response = result.response;
            console.log(response.text());

            setMsgs((prevState) => ([...prevState, { sender: "ai", msg: response.text() }]))

        } catch (error) {
            console.log("response error", error);
        }
    };

    return (
        <div className='flex flex-col h-[calc(100vh-135px)] text-white mx-10 justify-between'>
            <div className='flex flex-col flex-1 gap-5'>
                {
                    msgs.length === 0
                        ? <p className='text-white/90 text-xl text-center m-auto'>Start conversing with SpaceBoom AI</p>
                        : msgs.map((msg, _) => {
                            return (
                                <div className={`w-[45%] bg-white/[0.07] border border-white/10 px-3 py-2 rounded-lg ${msg.sender === "me" ? "self-end" : ""}`}>
                                    {msg.sender === "me" ? null : <h2 className='text-base text-[#FC7841] font-medium mb-3'>SpaceBoom AI</h2>}
                                    <p className='text-white/80 text-sm'>{msg.msg}</p>
                                </div>
                            )
                        })
                }
            </div>
            <div className='w-full flex gap-2.5'>
                <input type="text" placeholder='Enter a message for SpaceBoom AI' className=' bg-white/[0.07] border border-white/20 text-white rounded-lg focus:outline-none w-full px-3 py-2 placeholder:text-white/20' value={currInp} onChange={(e) => { setCurrInp(e.target.value) }} />
                <button onClick={handleSend} className={`box-border border w-[45px] h-[45px] rounded-md flex justify-center items-center text-white/50 hover:brightness-75 transition bg-white/[0.07] text-white border-white/20`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z" /><path d="M6 12h16" /></svg>
                </button>
            </div>
        </div>
    )
}
