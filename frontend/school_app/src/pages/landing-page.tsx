import image1 from "../assets/pexels-vojtech-okenka-127162-392018.jpg"

export default function LandingPage(){
    return (
        <div>
            <div>
                <img src={image1} alt="" className="w-full md:h-[500px] h-[500px] " />
            </div>
        </div>
    );
}