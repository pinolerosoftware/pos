import React, {Component} from 'react';
import { Spin, Form, Input, InputNumber, Button } from 'antd';
import { Api, RouterPage } from '../../Config';
import HttpClient from '../../services/HttpClient';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';

class Setting extends Component {
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
        this.state = {
            companyId: Authenticate.getCompanyId(),
            userId: Authenticate.getUserId(),
            loading: false,
            readOnly: true,
            setting: {}
        };
        this.onClickGuardar = this.onClickGuardar.bind(this);
        this.onClickEditar = this.onClickEditar.bind(this);
    }

    async componentDidMount(){
        this.setState({ loading: true });
        const { form } = this.props;
        const url = `${Api.setting}${this.state.companyId}`;
        const getHttpClient = this.httpClient;        
        const data = await getHttpClient.get(url);        
        if(data){            
            form.setFieldsValue(data);            
            this.setState({ loading: false, setting: data });
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
        const url = `${Api.setting}${this.state.setting._id}`;        
        const setting = {            
            _id: this.state.setting._id,
            companyId: this.state.companyId,
            monedaName: data.monedaName,
            monedaSymbolo: data.monedaSymbolo,
            monedaCantidadDecimal: data.monedaCantidadDecimal,
            taxPorcentage: data.taxPorcentage
        };        
        const putHttpClient = this.httpClient;
        const dataUpdated = await putHttpClient.put(url, setting);        
        if(dataUpdated){
            this.setState({ loading: false, readOnly: true });
            return;
        }        
        if(putHttpClient.error){
            Notification('Error', putHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }
    }

    onClickEditar(){
        this.setState({ readOnly: !this.state.readOnly });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <PageLayout menuKey={RouterPage.company.setting}>
                <Spin spinning={this.state.loading}>
                    <Form
                        onSubmit={this.onClickGuardar}  
                    >
                        <Form.Item
                            label="Moneda"
                        >
                            {getFieldDecorator('monedaName',{
                                rules: [{ required: true, message: 'El campo moneda es requerido', whitespace: true }],
                            })(
                                <Input readOnly={this.state.readOnly} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Simbolo"
                        >
                            {getFieldDecorator('monedaSymbolo',{
                                rules: [{ required: true, message: 'El campo simbolo es requerido', whitespace: true }],
                            })(
                                <Input readOnly={this.state.readOnly} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Decimal"
                        >
                            {getFieldDecorator('monedaCantidadDecimal',{
                                rules: [{ required: true, message: 'El campo decimal es requerido' }],
                            })(
                                <InputNumber
                                    min={0}
                                    max={15}
                                    readOnly={this.state.readOnly}
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Porcentaje Iva"
                        >
                            {getFieldDecorator('taxPorcentage',{
                                rules: [{ required: true, message: 'El campo porcentaje es requerido' }],
                            })(
                                <InputNumber 
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    readOnly={this.state.readOnly}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ margin: '5px' }}>
                                Guardar
                            </Button>
                            <Button type="primary" onClick={this.onClickEditar} style={{ margin: '5px' }}>
                                {this.state.readOnly ? "Editar" : "Cancelar"}
                            </Button>                                        
                        </Form.Item>
                    </Form>
                </Spin>
            </PageLayout>
        );
    }
}

export default Setting = Form.create()(Setting);