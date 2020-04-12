import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Card, notification, Spin } from 'antd';
import { Api, RouterPage } from '../../Config';
import Authenticate from '../../services/Authenticate';
import axios from 'axios'

const tailLayout = {
    wrapperCol: { offset: 10, span: 8 },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            redirectMenu: Authenticate.isAuth(),            
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.setState({ loading: true });
                this.login(data);
            }
        });
    }

    login(data){
        const user = {
            email: data.email,
            password: data.password
        };
        axios.post(Api.login, user)
        .then(res => {
            Authenticate.signIn(res.data);
            this.setState({ redirectMenu: true, loading: false });
        })
        .catch(error => {            
            notification.error({
                message: 'Error',
                description: error.response.data.message
            });            
            this.setState({ loading: false });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return this.state.redirectMenu ?  <Redirect to={RouterPage.home} /> :
        (
            <Spin spinning={this.state.loading}>
                <Row>
                    <Col span={8} offset={8}>
                        <Card title="Inicio de sesión">
                            <Form   
                                onSubmit = {this.onSubmit}                                             
                            >
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Email"  
                                            name="email"                                                                           
                                        >
                                            {getFieldDecorator('email',{
                                                rules: [{ required: true, message: 'El campo email es requerido', whitespace: true }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Password"
                                            name="password"                                        
                                        >
                                            {getFieldDecorator('password',{
                                                rules: [{ required: true, message: 'El campo constraseña es requerido', whitespace: true }],
                                            })(
                                                <Input.Password />
                                            )}                                        
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit">
                                            Submit
                                            </Button>                                        
                                        </Form.Item>
                                    </Col>
                                </Row>    
                                <Row>
                                    <Col span={24}>
                                        <Form.Item {...tailLayout}>                                        
                                            <Link to={RouterPage.account.register}> Registrarse</Link>
                                        </Form.Item>
                                    </Col>
                                </Row>           
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        );
    }
}

export default Login = Form.create()(Login);
