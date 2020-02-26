import React from "react";
import { useDrop } from "react-dnd";

const DropWrapper = ({ onDrop, children, name }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "Item",
        drop: (item, monitor) => onDrop(item, monitor, name),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver, canDrop })}
        </div>
    )
};

export default DropWrapper;