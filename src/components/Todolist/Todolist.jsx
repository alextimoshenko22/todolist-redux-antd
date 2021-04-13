import React from 'react';
import Item from './Item'
import 'antd/dist/antd.css';
import { List } from 'antd';

const Todolist = ({ items, ...props }) => {
    return <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(i) => (<List.Item style={{ width: "100%" }}>
            <Item key={i.itemId}
                itemId={i.itemId}
                name={i.name}
                date={i.date}
                completed={i.completed}
                deleteItem={props.deleteItem}
                completeItem={props.completeItem}
                updateItem={props.updateItem} />
        </List.Item>)}>
    </List>
}

export default Todolist;