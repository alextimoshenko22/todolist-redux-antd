import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './Item.module.css';
import cn from 'classnames';
import { Checkbox, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Todolist = (props) => {

    let [name, setName] = useState(props.name);
    let [completed, setCompleted] = useState(props.completed);
    let [editMode, setEditMode] = useState(false);

    const deleteItem = () => {
        props.deleteItem(props.itemId);
    }
    
    const completeItem = (e) => {
        setCompleted(e.target.checked);
        props.completeItem(props.itemId);
    }

    let onNameChange = (e) => {
        setName(e.currentTarget.value);
    }

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateItem(props.itemId, name);
    }

    return <div>
        <Checkbox onChange={completeItem} checked={completed} className={cn({ [styles.completed]: completed }, styles.name)}>
            <span>{props.date}    </span>
            {
                !editMode &&
                <span>{props.name}</span>
            }
            {
                editMode &&
                <Input style={{ width: "500px", fontSize: "large"}} onBlur={deactivateEditMode} autoFocus={true} value={name} onChange={onNameChange} />
            }
        </Checkbox>
        <EditOutlined onClick={activateEditMode} style={{ color: '#40a9ff', marginRight: '6px' }} />
        <DeleteOutlined onClick={deleteItem} style={{ color: '#ff4d4f' }} />
    </div>
}

export default Todolist;