import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';

const {Item} = Form;

class FormClients extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
        this.onChange = this.onChange.bind(this);
    }

    onSave(){

    }

    onChange(field, value){
        let {data} = this.state;
        data[field] = value;
        this.setState(data);
        console.log(data);
    }

    render(){
        let {data} = this.state;
        return (
            <Form>
                <h2>Nuevo Clientes</h2>
                <Item label="Nombre" validateStatus={(data.name) ? "success" : "error"} labelCol={{span: 4}} wrapperCol={{span: 16}}>
                    <Input value={data.name} onChange={(e) => this.onChange('name', e.target.value)}/>
                </Item>
                <Item label="Apellido" validateStatus={(data.lastName) ? "success" : "error"} labelCol={{span: 4}} wrapperCol={{span: 16}}>
                    <Input value={data.lastName} onChange={(e) => this.onChange('lastName', e.target.value)}/>
                </Item>
                <Item label="Correo Electrónico" validateStatus={(data.email) ? "success" : "error"} labelCol={{span: 4}} wrapperCol={{span: 16}}>
                    <Input value={data.email} onChange={(e) => this.onChange('email', e.target.value)}/>
                </Item>
                <Item label="Teléfono" validateStatus={(data.phone) ? "success" : "error"} labelCol={{span: 4}} wrapperCol={{span: 16}}>
                    <Input value={data.phone} onChange={(e) => this.onChange('phone', e.target.value)}/>
                </Item>
                <Item style={{textAlign: "right"}} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                    <Button style={{marginRight: 10}} onClick={this.props.onCancel}>Cancelar</Button>
                    <Button onClick={this.props.onCancel}>Guardar</Button>
                </Item>
            </Form>
        )
    }
}


export default FormClients = Form.create()(FormClients);