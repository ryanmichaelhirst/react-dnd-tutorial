import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import { useDrag } from "react-dnd";

const type = "Item";

Modal.setAppElement("#app");

const Item = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type, ...item },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });
    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    return (
        <Fragment>
            <div
                ref={drag}
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