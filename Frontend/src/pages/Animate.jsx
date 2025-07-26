import React, { useState } from 'react'
import SearchInput from '../components/animation/SearchInput';
import CubicGallery from '../components/animation/CubicGallery';
import '../components/animation/CubicGallery.css'
const Animate = () => {

    const [data, setData] = useState({ imageData: [] });

    const setImageData = (data) => {
        setData({ imageData: data });
    };
    return (



        <>
            <div className="w-screen h-[120vh] p-2 flex flex-col items-center overflow-hidden">
                <h1 className="text-center font-bold text-2xl m-2">Here We Serve</h1>
                <SearchInput setImageData={setImageData} />
                <CubicGallery imageData={data.imageData} />
            </div>

        </>
    )
}

export default Animate