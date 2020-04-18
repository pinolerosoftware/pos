import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import HttpClient from '../../services/HttpClient';
import { Form, Input, Button, Row, Col, Card, Spin } from 'antd';
import { Api, RouterPage } from '../../Config';
import Authenticate from '../../services/Authenticate';
import { Notification, NotificationType } from '../../component/Notification';

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
        this.httpClient = new HttpClient();
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

    async login(data){
        const user = {
            email: data.email,
            password: data.password
        };
        const loginHttpClient = this.httpClient;
        const dataToken = await loginHttpClient.post(Api.login, user);
        if(dataToken){
            Authenticate.signIn(dataToken);
            if(Authenticate.isAuth())
                await this.loadDataCompany();
            this.setState({ redirectMenu: true, loading: false });
            return;
        }
        if(loginHttpClient.error){
            Notification('Error', loginHttpClient.error, NotificationType.Error);          
            this.setState({ loading: false });
        }
    }

    async loadDataCompany(){
        const companyHttpClient = this.httpClient;
        const url = `${Api.company}${Authenticate.getCompanyId()}`
        const data = await companyHttpClient.get(url);
        if(data){
            Authenticate.setCompanyData(data);
            return;
        }
        if(companyHttpClient.error){
            Notification('Error', companyHttpClient.error, NotificationType.Error);
        }
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
