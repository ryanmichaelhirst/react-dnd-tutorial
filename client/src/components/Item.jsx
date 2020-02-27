import React, { Fragment, useState, useRef } from "react";
import Modal from "react-modal";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPE from "../data/types";

Modal.setAppElement("#app");
const Item = ({ item, index, moveItem }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE, ...item, index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });
    const [show, setShow] = useState(false);
    drag(drop(ref));

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    return (
        <Fragment>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
                onClick={onOpen}
            >
                <p>{item.content}</p>
                <p>{item.icon}</p>
            </div>
            <Modal
                isOpen={show}
                onRequestClose={onClose}
                className={"modal"}
                overlayClassName={"overlay"}
            >
                <div className={"close-btn-ctn"}>
                    <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div>
                    <h2>Description</h2>
                    <p>{item.content}</p>
                    <h2>Status</h2>
                    <p>{item.icon} {item.status}</p>
                </div>
            </Modal>
        </Fragment>
    );
};

export default Item;