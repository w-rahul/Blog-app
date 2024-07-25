import { useNavigate } from "react-router-dom";
import { useCustomTitle } from "../hooks/hook";

export const LandingPage = () => {

    useCustomTitle('ECHOINK')

    return (
        <div className="bg-black w-screen h-screen overflow-hidden pt-6">
            <TopBar />
            <div className="flex items-center justify-center h-full ">
                <div>
                    <Card />
                </div>
            </div>
        </div>
    );
};

const TopBar = () =>{
    return <div className="text-white flex justify-between px-16 py-4 ">
        <div className="text-2xl flex flex-cols justify-center">
            ECHOINK
        </div>
        <div className="flex flex-cols justify-center">
            <div className="pr-10 text-lg">
            Teams
            </div>
        <div className="text-lg">
            Careers
        </div>
    </div>
</div>
}

const Card = () =>{
    return <div className="text-white  max-w-5xl text-center">
        <div className="text-7xl">
            Discover the Latest Trends
        </div>
        <div className="text-2xl px-10 py-7">
        Our blog covers a wide range of topics, from technology and design to lifestyle and culture. Stay up-to-date with the latest insights and trends.
        </div>
        <div className="mb-40">
            <ExplorBTN />
        </div>
    </div>
}

const ExplorBTN = () =>{

    const navigate = useNavigate()
    
    return <>
   <button onClick={()=>{
    navigate("/blogs")
   }} type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
        Explore Blog
    </button>
    </>
}