import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../data/types";
import { statusIcons } from "../data";

const DropWrapper = ({ onDrop, children, name }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statusIcons.findIndex(si => si.status === item.status);
            const statusIndex = statusIcons.findIndex(si => si.status === name);
            return itemIndex === statusIndex ||
                statusIndex === itemIndex + 1 ||
                statusIndex === itemIndex - 1;
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, name);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver, canDrop })}
        </div>
    )
};

export default DropWrapper;