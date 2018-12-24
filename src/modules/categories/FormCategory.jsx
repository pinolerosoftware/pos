import React, {Component} from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { Link } from "react-router-dom";

const {Item} = Form;
const formItemLayout = {
    labelCol: {
        span: 4 ,
    },
    wrapperCol: {
        span: 16 ,
    },
};

class FormCategory extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount(){
        let {match} = this.props
        if (match.params.id) {
            let {id} = match.params
            fetch(`/categories/${id}`)
            .then(res => res.json())
            .then(data => this.setState({data: data.category}, () =>{
                this.props.form.setFieldsValue({name: data.category.name})
            }))
        }
    }

    onSave() {
        this.props.form.validateFields((err, data) => {
            if (!err) {
                if (!this.props.match.params.id) {
                    fetch("/categories", {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => this.showModal(data.message))
                }else{
                    fetch(`/categories/${this.props.match.params.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(data),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => this.showModal(data.message))
                }
            }
        });
    }

    showModal(message) {
        let self = this;
        Modal.success({
            title: 'Productos',
            content: `${message}`,
            onOk() {
                self.props.history.push("/products/categories");
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
        let {title} = this.props;
        return (
            <Form>
                <h2>{title}</h2>
                <Item {...formItemLayout} label="Nombre">
                    {getFieldDecorator('name',{
                        rules: [{ required: true, message: 'El campo nombre es requerido', whitespace: true }],
                    })(
                        <Input onChange={e => this.onChange('name', e.target.value)}/>
                    )}
                </Item>
                <Item style={{textAlign: "right"}} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                    <Link to="/products/categories">
                        <Button style={{marginRight: 10}}>Cancelar</Button>
                    </Link>
                    <Button onClick={this.onSave}>Guardar</Button>
                </Item>
            </Form>
        )
    }
}

export default FormCategory = Form.create()(FormCategory);