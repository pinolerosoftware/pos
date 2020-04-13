import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Button, Icon, Popconfirm, Spin } from 'antd';
import { Api, RouterPage  } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Grid from '../../component/Grid';
import Authenticate from '../../services/Authenticate';

class Location extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyId: Authenticate.getCompanyId(),
            userId: Authenticate.getUserId(),
            columns: this.getColumns(),
            data: [],
            loading: false
        };        
    }
    getColumns(){
        return [
            {
                title: 'Nombre',
                dataIndex: 'name'                
            },
            {
                title: 'Activa',
                dataIndex: 'active',                
                render: (value, record) => {
                    return value ? 'Si' : 'No';
                }
            },
            {
                title: 'Acción',                
                render: (value, record) => {
                    return( 
                        <div>
                            <Link style={{padding: 5}} to={`${RouterPage.locations.edit}${record._id}`}><Icon type='edit' />Editar</Link>
                            <Popconfirm
                                title="¿Seguro que desea eliminar la bodega?"
                                onConfirm={() => this.removeLocation(record._id)}
                                okText="Si"
                                cancelText="No"
                            >       
                                <Link><Icon type='delete' /> Eliminar</Link>        
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];
    }
    onClickRemove(id){
        return(
            <Popconfirm
                title="¿Seguro que desea eliminar la bodega?"
                onConfirm={() => this.removeLocation(id)}
                okText="Si"
                cancelText="No"
            >            
            </Popconfirm>
        );
    }
    removeLocation(id){
        this.setState({ loading: true });
        const url = `${Api.location}${id}`;
        axios.delete(url)
        .then(res => {                                   
            this.setState({ loading: false });
        })
        .catch(error => {            
            Notification('Error', error.response.data.error.message, NotificationType.Error);
            this.setState({ loading: false });
        });
    }
    render(){        
        return(
            <PageLayout>
                <Spin spinning={this.state.loading}>
                    <Row>
                        <Col>                                                
                            <Link to={RouterPage.locations.new}>
                                <Button type="primary" style={{ marginBottom: 16 }}>
                                    Nueva Bodega                            
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Grid columns={this.state.columns} url={Api.location} companyId={this.state.companyId}>

                        </Grid>
                    </Row>
                </Spin>
            </PageLayout>
        );
    }
}

export default Location;