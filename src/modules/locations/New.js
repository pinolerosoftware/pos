import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Spin, Input, Button } from 'antd';
import axios from 'axios'
import { Api, RouterPage } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';

class LocationNew extends Component {
    constructor(props){
        super(props);
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
    save(data){
        const location = {
            name: data.name,
            companyId: this.state.companyId,
            active: true
        };        
        axios.post(Api.location, location)
        .then(res => {            
            this.setState({ loading: false, redirectIndex: true });
        })
        .catch(error => {            
            Notification('Error', error.response.data.error.message, NotificationType.Error);
            this.setState({ loading: false });
        });
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

export default LocationNew = Form.create()(LocationNew);