import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Card, Tabs, Checkbox, notification, Spin } from 'antd';
import { Api, RouterPage } from '../../Config';
import axios from 'axios'
const { TabPane } = Tabs;

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            serviceCompany: false,
            productCompany: false,
            tabActual: "1",
            redirectLogin: false,
            loading: false
        };
        this.onChangeServiceCompany = this.onChangeServiceCompany.bind(this);
        this.onChangeProductCompany = this.onChangeProductCompany.bind(this);
        this.onClickBtnSiguiente = this.onClickBtnSiguiente.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    onChangeServiceCompany(e) {        
        this.setState({serviceCompany: e.target.checked});
    }

    onChangeProductCompany(e) {        
        this.setState({productCompany: e.target.checked});
    }

    onClickBtnSiguiente(){        
        this.setState({ tabActual: "2"});
    }

    onChangeTab(key){
        this.setState({ tabActual: key});
    }

    onClickSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, data) => {            
            if (!err) {
                this.setState({ loading: true });
                this.registrarUser(data);
            }
        });
    }

    registrarUser(data){
        let newUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            userName: data.userName,
            name: data.name,
            businessName: data.businessName,
            address: data.address,
            rut: data.rut,
            phoneNumber: data.phoneNumber,
            serviceCompany: this.state.serviceCompany,
            productCompany: this.state.productCompany,
            active: true
        };        
        axios.post(Api.register, newUser)
        .then(res => {
            this.setState({ redirectLogin: true, loading: false });
        })
        .catch(error => {            
            notification.error({
                message: 'Error',
                description: error.response.data.message
            });            
            this.setState({ loading: false });
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return this.state.redirectLogin ? <Redirect to={RouterPage.account.login}/> :
        (
            <Spin spinning={this.state.loading}>
                <Form
                    onSubmit={this.onClickSubmit}
                >
                    <Tabs defaultActiveKey = "2" activeKey={this.state.tabActual} onChange={this.onChangeTab}>
                        <TabPane tab="Usuario" key="1">
                            <Card title="Datos de usuario">                            
                                <Form.Item label='Nombres'>
                                    {getFieldDecorator('firstName',{
                                        rules: [{ required: true, message: 'El campo nombres es requerido', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label='Apellidos'>
                                    {getFieldDecorator('lastName',{
                                        rules: [{ required: true, message: 'El campo apellidos es requerido', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>                            
                                <Form.Item label='Correo'>
                                    {getFieldDecorator('email',{
                                        rules: [{ required: true, message: 'El campo correo es requerido', whitespace: true, type: 'email' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item
                                        label="Password"                                                                               
                                    >
                                        {getFieldDecorator('password',{
                                            rules: [{ required: true, message: 'El campo constraseña es requerido', whitespace: true }],
                                        })(
                                            <Input.Password />
                                        )}                                        
                                    </Form.Item>
                                <Form.Item label='Nombre de usuario'>
                                    {getFieldDecorator('userName',{
                                        rules: [{ required: true, message: 'El campo Nombre de usuario es requerido', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>  
                                <Form.Item>
                                    <Button type="primary" htmlType="button" onClick={this.onClickBtnSiguiente}>Siguiente</Button>
                                </Form.Item>
                            </Card> 
                        </TabPane>
                        <TabPane tab="Negocio" key="2">
                            <Card title="Datos del negocio">                        
                                <Form.Item label='Nombre del negocio'>
                                    {getFieldDecorator('name',{
                                        rules: [{ required: true, message: 'El campo nombre del negocio es requerido', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label='Rason social'>
                                    {getFieldDecorator('businessName',{
                                        rules: [{message: 'El campo apellidos es requerido'}],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>                            
                                <Form.Item label='Dirección'>
                                    {getFieldDecorator('address',{
                                        rules: [{ message: 'El campo correo es requerido' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label='Teléfono'>
                                    {getFieldDecorator('phoneNumber',{
                                        rules: [{ message: 'El campo teléfono es requerido' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item> 
                                <Form.Item label='Rut'>
                                    {getFieldDecorator('rut',{
                                        rules: [{ message: 'El campo RUT es requerido' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>  
                                <Form.Item>
                                    <Checkbox                                    
                                        onChange={this.onChangeServiceCompany}
                                        checked={this.state.serviceCompany}
                                    >
                                        Compañia de servicio
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox                                    
                                        onChange={this.onChangeProductCompany}
                                        checked={this.state.productCompany}
                                    >
                                        Compañia de productos
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Registrar</Button>
                                </Form.Item>
                            </Card>
                        </TabPane>
                    </Tabs>
                </Form>
            </Spin>
        );
    }
}

export default Register = Form.create()(Register);