import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import Todolist from './Todolist';
import { Input, Form, Button, DatePicker} from 'antd';
import { addItem, getAllItems, deleteItem, completeItem, updateItem } from './../../redux/main-reducer'
import { getItemsSelector } from '../../redux/main-selectors'


class TodolistContainer extends React.Component {
    
    componentDidMount() {
        this.props.getAllItems();
    }

    componentDidUpdate(prevProps) {
        if(this.props.items.length !== prevProps.items.length && prevProps.items.length !== 0) {
            this.props.getAllItems();
        }
    }
    render() {
        return <div>
            <ItemFormAntd onSubmit={this.onSubmit} addItem={this.props.addItem} />
            <Todolist items={this.props.items} 
            deleteItem={this.props.deleteItem} 
            completeItem={this.props.completeItem}
            updateItem={this.props.updateItem} />
        </div>
    }
}

const ItemFormAntd = (props) => {
    const [form] = Form.useForm();
    const onSubmit = (value) => {
        let date = (value.itemDate).format('DD.MM.YYYY');
        props.addItem(Date.now(), value.name, false, date);
        form.resetFields();
    }
    return <Form form={form} onFinish={onSubmit}>
    <Form.Item 
        name="name"
        rules={[
            {
                required: true, 
                message: "Пожалуйста, введите задание"
            },
        ]}>
        <span>
            <Input placeholder={"Что хотите сделать?"} style={{ width: "30%"}} allowClear autoFocus={true} />
            <Button type="primary" htmlType="submit">+ Добавить</Button>
        </span>
    </Form.Item>
    <Form.Item 
        name="itemDate"
        rules={[
            {
                required: true, 
                message: "Пожалуйста, введите дату"
            },
    ]}>
        <DatePicker placeholder="Выберите дату" />
    </Form.Item>
</Form>
}

const mapStateToProrps = (state) => {
    return {
        items: getItemsSelector(state)
    }
}

export default connect(mapStateToProrps, { addItem, getAllItems, deleteItem, completeItem, updateItem })(TodolistContainer);