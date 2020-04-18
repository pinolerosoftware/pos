import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Spin, Input, Button, Checkbox } from 'antd';
import HttpClient from '../../services/HttpClient';
import { Api, RouterPage } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';

class CategoryEdit extends Component {
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
        this.state = {            
            companyId: Authenticate.getCompanyId(),
            userId: Authenticate.getUserId(),
            loading: false,
            redirectIndex: false,
            checkActive: false
        };
        this.onClickGuardar = this.onClickGuardar.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
    }

    async componentDidMount(){        
        this.setState({ loading: true });
        const { form } = this.props;
        const url = `${Api.category}${this.props.match.params.id}`;        
        const getHttpClient = this.httpClient;
        const data = await getHttpClient.get(url);
        if(data){
            form.setFieldsValue(data);            
            this.setState({ loading: false, checkActive: data.active });
            return;
        }        
        if(getHttpClient.error){
            Notification('Error', getHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }        
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
        const url = `${Api.category}${this.props.match.params.id}`
        const category = {            
            _id: this.props.match.params.id,
            name: data.name,         
            companyId: this.state.companyId,   
            active: this.state.checkActive
        };        
        const putHttpClient = this.httpClient;
        const dataUpdated = await putHttpClient.put(url, category);
        console.log(dataUpdated);
        if(dataUpdated){
            this.setState({ loading: false, redirectIndex: true });
            return;
        }        
        if(putHttpClient.error){
            Notification('Error', putHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }
    }
    onChangeActive(e){
        this.setState({ checkActive: e.target.checked });
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
                            <Checkbox 
                                onChange={this.onChangeActive}
                                checked={this.state.checkActive}
                            >
                                Activa
                            </Checkbox>
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

export default CategoryEdit = Form.create()(CategoryEdit);