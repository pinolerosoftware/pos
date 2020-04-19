import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Spin, Input, Button, Checkbox, InputNumber, Select } from 'antd';
import HttpClient from '../../services/HttpClient';
import { Api, RouterPage } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';
const { Option } = Select;

class ProductEdit extends Component {
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
        this.state = {            
            companyId: Authenticate.getCompanyId(),
            userId: Authenticate.getUserId(),
            loading: false,
            redirectIndex: false,
            checkActive: false,
            loadingCategory: false,
            dataCategory: []
        };
        this.onClickGuardar = this.onClickGuardar.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
    }

    async componentDidMount(){        
        this.setState({ loading: true });
        const { form } = this.props;
        const url = `${Api.product}${this.props.match.params.id}`;
        const getHttpClient = this.httpClient;
        await this.loadComboBox();
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

    async loadComboBox(){
        this.setState({ loadingCategory: true });
        const getHttpClient = this.httpClient;
        const data = await getHttpClient.get(Api.category);
        if(data){
            this.setState({ dataCategory: data, loadingCategory: false });
            return;
        }
        if(getHttpClient.error){
            Notification('Error', getHttpClient.error, NotificationType.Error);
            this.setState({ loadingCategory: false });
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
        const url = `${Api.product}${this.props.match.params.id}`
        const product = {            
            _id: this.props.match.params.id,
            name: data.name,
            description: data.description,
            categoryId: data.categoryId,
            price: data.proce,
            companyId: this.state.companyId,
            active: this.state.checkActive
        };        
        const putHttpClient = this.httpClient;
        const dataUpdated = await putHttpClient.put(url, product);        
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
        return this.state.redirectIndex ? <Redirect to={RouterPage.products.index}/> :
        (
            <PageLayout menuKey={RouterPage.products.index} menuOpenKey="catalogo">
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
                        <Form.Item
                            label="Descripción"
                        >
                            {getFieldDecorator('description',{
                                rules: [{ }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Categoria"
                        >
                            {getFieldDecorator('categoryId',{
                                rules: [{ }],
                            })(
                                <Select 
                                    placeholder="Seleccione una categoria"
                                    allowClear={true}
                                    loading={this.state.loadingCategory}
                                >
                                    {
                                        this.state.dataCategory.map((item, index) => <Option key={index} value={item._id}>{item.name}</Option>)
                                    }
                                </Select>                 
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Precio"
                        >
                            {getFieldDecorator('price',{
                                rules: [{ required: true, message: 'El campo precio es requerido' }],
                            })(
                                <InputNumber />
                            )}
                        </Form.Item>    
                        <Form.Item>
                            <Checkbox 
                                onChange={this.onChangeActive}
                                checked={this.state.checkActive}
                            >
                                Activo
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

export default ProductEdit = Form.create()(ProductEdit);