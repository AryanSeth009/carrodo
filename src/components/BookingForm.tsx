"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingForm() {
    return (
        <div style={{ background: "rgba(38, 38, 38, 0.75)" }}
            className=" backdrop-blur-md rounded-xl p-4 flex flex-col md:flex-row gap-10 w-[1018px] h-[94px] items-end max-w-5xl mx-auto">
            <div className="flex-1 !max-w-[200px]">
                <label style={{
                    background: "linear-gradient(90deg, #A47A1E 0%, #D3A84C 16%, #D3A84C 31.5%, #E6BE69 50%, #FFD87C 66.5%, #B58F3E 82.5%, #956D13 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}

                    className="flex  text-[16px] font-semibold  items-center gap-2 text-[#C4A052] text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    Departure
                </label>
                <input
                
                    type="text"
                    placeholder="From address, airport, hotel"
                    className="w-full border text-center p-2 rounded-[15px] text-[12px] bg-transparent border-b border-[#555555] placeholder:text-[#555555] pb-2 focus:outline-none focus:border-[#C4A052] transition-colors"
                />
            </div>

            <div className="flex-1 !max-w-[200px]">
                <label style={{
                    background: "linear-gradient(90deg, #A47A1E 0%, #D3A84C 16%, #D3A84C 31.5%, #E6BE69 50%, #FFD87C 66.5%, #B58F3E 82.5%, #956D13 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
                    className="flex text-[16px] font-semibold  items-center gap-2 text-[#C4A052] text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    Drop off address
                </label>
                <input
                    type="text"
                    placeholder="From address, airport, hotel"
                    className="w-full  text-center p-2 bg-transparent border text-[12px] border-b rounded-[15px] border-[#555555] placeholder:text-[#555555] pb-2 focus:outline-none focus:border-[#C4A052] transition-colors"
                />
            </div>

            <div className="w-auto md:w-[150px]">
                <label style={{
                    background: "linear-gradient(90deg, #A47A1E 0%, #D3A84C 16%, #D3A84C 31.5%, #E6BE69 50%, #FFD87C 66.5%, #B58F3E 82.5%, #956D13 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
                    className="flex text-[16px] font-semibold  text-center justify-center items-center gap-2 text-[#C4A052] text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    Pick up Date
                </label>
                <input
                    type="date"
                    className="w-full bg-transparent p-2 text-center border text-[12px] border-b rounded-[15px] border-[#555555] placeholder:text-[#555555] pb-2 focus:outline-none focus:border-[#C4A052] transition-colors"
                />
            </div>

            <div className="w-auto md:w-[150px]">
                <label style={{
                    background: "linear-gradient(90deg, #A47A1E 0%, #D3A84C 16%, #D3A84C 31.5%, #E6BE69 50%, #FFD87C 66.5%, #B58F3E 82.5%, #956D13 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
                    className="flex text-[16px] font-semibold  justify-center  items-center gap-2 text-[#C4A052] text-sm mb-2">
                    <Clock className="w-4 h-4 " />
                    Pick up Time
                </label>
                <input
                    type="time"
                    className="w-full bg-transparent p-2 text-center text-[12px] border border-b rounded-[15px] border-[#555555] placeholder:text-[#555555] pb-2 focus:outline-none focus:border-[#C4A052] transition-colors"
                />
            </div>

            <Button
                style={{
                    background: "linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg, #A47A1E 0%, #D3A84C 16%, #D3A84C 31.5%, #E6BE69 50%, #FFD87C 66.5%, #B58F3E 82.5%, #956D13 100%)"
                }}
                className="w-full md:w-auto bg-gradient-to-r h-[66px] from-[#A47A1E] to-[#C4A052] text-black hover:opacity-90 rounded-[15px] px-8">
                Book Now
            </Button>
        </div>
    )
}

