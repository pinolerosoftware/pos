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

class FormLocations extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount(){
        let {match} = this.props
        if (match.params.id) {
            let {id} = match.params
            fetch(`${process.env.REACT_APP_PROXY}/location/${id}`)
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }

    onSave(){
        this.props.form.validateFields((err, data) => {
            if (!err) {
              fetch(`${process.env.REACT_APP_PROXY}/locations`, {
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
            title: 'Ubicaciones',
            content: `${message}`,
            onOk() {
                if(!self.props.buttons)
                    self.props.history.push("/products/locations")
                else
                    self.props.onClose()
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
        let {title, buttons} = this.props;
        return (
            <Form>
                <h2>{title}</h2>
                <Item {...formItemLayout} label="Nombre">
                    {getFieldDecorator('name',{
                        rules: [{ required: true, message: 'El campo nombre es requerido', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item style={{textAlign: "right"}} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                    {!buttons && <Link to="/products/locations">
                        <Button style={{marginRight: 10}}>Cancelar</Button>
                    </Link>}
                    <Button type="primary" onClick={this.onSave}>Guardar</Button>
                </Item>
            </Form>
        )
    }
}

export default FormLocations = Form.create()(FormLocations);