import React, {Component} from 'react';
import { Form, Input, Button, Select, InputNumber, Modal, Drawer } from 'antd';
import { Link } from "react-router-dom";
import FormCategory from '../categories/FormCategory';
import FormLocations from '../locations/FormLocations';

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
            categories: [],
            visibleFormCategory: false,
            visibleFormLocation: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onLoadLocations = this.onLoadLocations.bind(this);
        this.onLoadCategories = this.onLoadCategories.bind(this);
        this.onCloseCategory = this.onCloseCategory.bind(this);
        this.onCloseLocation = this.onCloseLocation.bind(this);
    }

    componentDidMount(){
        this.onLoadLocations()
        this.onLoadCategories()
    }
    
    onLoadCategories() {
        fetch("/categories")
        .then(res => res.json())
        .then(data => this.setState({categories: data.categories}));
    }
    
    onLoadLocations() {
        fetch("/locations")
        .then(res => res.json())
        .then(data => this.setState({locations: data.locations}));
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
        if(String(field) === "category" && Number(value) === 0)
            this.setState({visibleFormCategory: true})
        if(String(field) === "location" && Number(value) === 0)
            this.setState({visibleFormLocation: true})
    }

    onCloseCategory() {
        let {categories} = this.state
        console.log(categories)
        this.props.form.setFieldsValue({name: categories[categories.length - 1].name})
        this.setState({visibleFormCategory: false})
    }

    onCloseLocation() {
        //let {locations} = this.state
        this.setState({visibleFormLocation: false})
        this.onLoadLocations()
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        let { locations, categories, visibleFormCategory, visibleFormLocation } = this.state;
        return (
            <div>
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
                            <Select onChange={(e) => this.onChange('category', e)}>
                                {categories.map((item, i) => <Option key={`${i}-${item.name}`}>{item.name}</Option>)}
                                <Option key={0} style={{color: "#1890ff"}}>Agregar Categoría</Option>
                            </Select>
                        )}
                    </Item>
                    <Item {...formItemLayout} label="Ubicación">
                        {getFieldDecorator('location',{
                            rules: [{ required: true, message: 'El campo ubicación es requerido', whitespace: true }],
                        })(
                            <Select onChange={(e) => this.onChange('location', e)}>
                                {locations.map((item, i) => <Option key={`${i}-${item.name}`}>{item.name}</Option>)}
                                <Option key={0} style={{color: "#1890ff"}}>Ageregar Ubicación</Option>
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
                <Drawer title="Nueva Categoría" width={460} placement="right" closable={true} onClose={() => {this.setState({visibleFormCategory: false}); this.onCloseCategory()}} visible={visibleFormCategory}>
                    <FormCategory buttons={true} match={this.props.match} onClose={()=> {this.onLoadCategories(); this.onCloseCategory()}}/>
                </Drawer>
                <Drawer title="Nueva Ubicación" width={460} placement="right" closable={true} onClose={() => this.setState({visibleFormLocation: false})} visible={visibleFormLocation}>
                    <FormLocations buttons={true} match={this.props.match} onClose={this.onCloseLocation}/>
                </Drawer>
            </div>
        )
    }
}


export default FormProducts = Form.create()(FormProducts);