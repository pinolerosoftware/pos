import React, {Component} from 'react';
import { Form, Input, Button, Select, InputNumber, Modal } from 'antd';
import { Link } from "react-router-dom";

const {Item} = Form;
const { TextArea } = Input;
const {Option} = Select;

const formItemLayout = {
    labelCol: {
      span: 4 ,
    },
    wrapperCol: {
      span: 16 ,
    },
  };

class FormProducts extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            locations: [],
            categories: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.showModal = this.showModal.bind(this);
    }
    
    componentDidMount(){
        fetch("/locations")
        .then(res => res.json())
        .then(data => this.setState({locations: data.locations}));

        fetch("/categories")
        .then(res => res.json())
        .then(data => this.setState({categories: data.categories}));
    }

    onSave() {
        this.props.form.validateFields((err, data) => {
            if (!err) {
              fetch("/products", {
                  method: 'POST',
                  body: JSON.stringify(data),
                  headers:{
                    'Content-Type': 'application/json'
                  }
              })
              .then(res => res.json())
              .then(data => this.showModal(data.message))
            }
        });
    }

    showModal(message) {
        let self = this;
        Modal.success({
            title: 'Productos',
            content: `${message}`,
            onOk() {
                self.props.history.push("/products");
            }
        });
    }

    onChange(field, value){
        let {data} = this.state;
        data[field] = value;
        this.setState(data);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        let {locations, categories} = this.state;
        return (
            <Form>
                <h2>Nuevo Producto</h2>
                <Item {...formItemLayout} label="Nombre">
                    {getFieldDecorator('name',{
                        rules: [{ required: true, message: 'El campo nombre es requerido', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item {...formItemLayout} label="Categoría">
                    {getFieldDecorator('category',{
                        rules: [{ required: true, message: 'El campo categoría es requerido', whitespace: true }],
                    })(
                        <Select>
                            <Option key={0}>Add +</Option>
                            {categories.map((item, i) => <Option key={`${i}-${item.name}`} value={item.name}>{item.name}</Option>)}
                        </Select>
                    )}
                </Item>
                <Item {...formItemLayout} label="Ubicación">
                    {getFieldDecorator('location',{
                        rules: [{ required: true, message: 'El campo ubicación es requerido', whitespace: true }],
                    })(
                        <Select>
                            <Option key={0}>Add +</Option>
                            {locations.map((item, i) => <Option key={`${i}-${item.name}`} value={item.name}>{item.name}</Option>)}
                        </Select>
                    )}
                </Item>
                <Item {...formItemLayout} label="Descripción">
                    {getFieldDecorator('description',{
                        rules: [],
                    })(
                        <TextArea rows={3} />
                    )}
                </Item>
                <Item {...formItemLayout} label="Precio">
                    {getFieldDecorator('price',{
                        rules: [{ required: true, message: 'El campo categoría es requerido'}],
                    })(
                        <InputNumber />
                    )}
                </Item>
                <Item style={{textAlign: "right"}} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                    <Link to="/products">
                        <Button style={{marginRight: 10}}>Cancelar</Button>
                    </Link>
                    <Button onClick={this.onSave}>Guardar</Button>
                </Item>
            </Form>
        )
    }
}


export default FormProducts = Form.create()(FormProducts);