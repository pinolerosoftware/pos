import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Spin, Input, Button } from 'antd';
import { Api, RouterPage } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';
import HttpClient from '../../services/HttpClient';

class CategoryNew extends Component{
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
        this.state = {
            companyId: Authenticate.getCompanyId(),
            userId: Authenticate.getUserId(),
            loading: false,
            redirectIndex: false
        };
        this.onClickGuardar = this.onClickGuardar.bind(this);
    }
    
    onClickGuardar(e){
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.setState({ loading: true });
                this.save(data);
            }
        });
    }
    async save(data){
        const category = {
            name: data.name,
            companyId: this.state.companyId,
            active: true
        };
        const postHttpClient = this.httpClient;
        const dataCreated = await postHttpClient.post(Api.category, category);
        if(dataCreated){
            this.setState({ loading: false, redirectIndex: true });
            return;
        }
        if(postHttpClient.error){
            Notification('Error', postHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }        
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return this.state.redirectIndex ? <Redirect to={RouterPage.category.index}/> :
        (
            <PageLayout menuKey={RouterPage.category.index} menuOpenKey="catalogo">
                <Spin spinning={this.state.loading}>                    
                    <Form
                        onSubmit={this.onClickGuardar}
                    >
                        <Form.Item
                            label="Nombre"                                                                                                         
                        >
                            {getFieldDecorator('name',{
                                rules: [{ required: true, message: 'El campo nombre es requerido', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Guardar
                            </Button>                                        
                        </Form.Item>
                    </Form>
                </Spin>
            </PageLayout>
        );
    }
}

export default CategoryNew = Form.create()(CategoryNew);

