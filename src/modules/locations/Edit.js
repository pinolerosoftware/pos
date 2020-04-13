import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Spin, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import { Api, RouterPage } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';

class LocationEdit extends Component {
    constructor(props){
        super(props);
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
    componentDidMount(){
        this.setState({ loading: true });
        const { form } = this.props;
        const url = `${Api.location}${this.props.match.params.id}`;
        axios.get(url,{
            params: {
                companyId: this.state.companyId
            }
        })
        .then(res => {              
            form.setFieldsValue(res.data);            
            this.setState({ loading: false, checkActive: res.data.active });
        })
        .catch(error => {            
            Notification('Error', error.response.data.error.message, NotificationType.Error);
            this.setState({ loading: false });
        });
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
    save(data){
        const url = `${Api.location}${this.props.match.params.id}`
        const location = {            
            name: data.name,            
            active: this.state.checkActive
        };        
        axios.put(url, location)
        .then(res => {            
            this.setState({ loading: false, redirectIndex: true });
        })
        .catch(error => {            
            Notification('Error', error.response.data.error.message, NotificationType.Error);
            this.setState({ loading: false });
        });
    }
    onChangeActive(e){
        this.setState({ checkActive: e.target.checked });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return this.state.redirectIndex ? <Redirect to={RouterPage.locations.index}/> :
        (
            <PageLayout>
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

export default LocationEdit = Form.create()(LocationEdit);