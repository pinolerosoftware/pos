import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Spin, Input, Button, InputNumber, Select } from 'antd';
import { Api, RouterPage } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';
import HttpClient from '../../services/HttpClient';
const { Option } = Select;

class ProductNew extends Component {
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
        this.state = {
            companyId: Authenticate.getCompanyId(),
            userId: Authenticate.getUserId(),
            loading: false,
            redirectIndex: false,
            loadingCategory: false,
            dataCategory: []
        };
        this.onClickGuardar = this.onClickGuardar.bind(this);
    }

    componentDidMount(){
        this.loadComboBox();
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
        const product = {
            name:  data.name,
            categoryId: data.categoryId,            
            description: data.description,
            price: data.price,
            active: true            
        };
        const postHttpClient = this.httpClient;
        const dataCreated = await postHttpClient.post(Api.product, product);
        if(dataCreated){
            this.setState({ loading: false, redirectIndex: true });
            return;
        }
        if(postHttpClient.error){
            Notification('Error', postHttpClient.error, NotificationType.Error);
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

export default ProductNew = Form.create()(ProductNew);