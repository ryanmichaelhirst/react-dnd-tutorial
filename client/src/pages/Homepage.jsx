import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data, statusIcons } from "../data";

const Homepage = () => {
    const [items, setItems] = useState(data);

    const onDrop = (item, monitor, status) => {
        const mapping = statusIcons.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [ ...newItems ];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

    return (
        <div className={"row"}>
            {["open", "in progress", "in review", "done"].map(status => {
                return (
                    <div key={status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={status}>
                            <Col>
                                {items
                                    .filter(i => i.status === status)
                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} />)
                                }
                            </Col>
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
    );
};

export default Homepage;