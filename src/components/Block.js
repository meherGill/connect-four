import React , {useEffect, useRef, useState} from "react";

const duration = 150

const Block = ({address, onClickHandler, curr_val, flipTheBlock, id}) => {
    const blockRef = useRef()

    const onClickInner = () => {
        onClickHandler(address);
    } 

    return (
        <div id={id} className="h-full w-full bg-gray-100 border-2 border-black rounded-md transition duration-50"
        ref={blockRef}
        onClick={onClickInner}>

        </div>
    )
}

export default Block