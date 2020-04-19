import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Icon, Popconfirm, Spin } from 'antd';
import { Api, RouterPage  } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Grid from '../../component/Grid';
import Authenticate from '../../services/Authenticate';
import HttpClient from '../../services/HttpClient';

class Location extends Component {
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
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
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Activa',
                dataIndex: 'active',
                key: 'active',
                render: (value, record) => {
                    return value ? 'Si' : 'No';
                }
            },
            {
                title: 'Acción',
                key: 'accion',                
                render: (value, record) => {
                    return( 
                        <div>
                            <Link style={{padding: 5}} to={`${RouterPage.locations.edit}${record._id}`}><Icon type='edit' />Editar</Link>
                            <Popconfirm
                                title="¿Seguro que desea eliminar la bodega?"
                                onConfirm={() => this.removeLocation(record._id)}
                                okText="Si"
                                cancelText="No"
                                key={record._id}
                            >      
                                <Link to="">
                                    <Icon type='delete' /> Eliminar
                                </Link>                                
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];
    }    

    async removeLocation(id){
        this.setState({ loading: true });
        const removeHttpClient = this.httpClient;
        const url = `${Api.location}${id}`;
        const data = await removeHttpClient.remove(url);
        if(data){
            this.setState({ loading: false});
            this.grid.load();
            return;
        }
        if(removeHttpClient.error){
            Notification('Error', removeHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }
    }

    render(){        
        return(
            <PageLayout menuKey={RouterPage.locations.index} menuOpenKey="catalogo">
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
                        <Grid 
                            rowKey="_id" 
                            columns={this.state.columns} 
                            url={Api.location} 
                            companyId={this.state.companyId} 
                            ref={grid => {this.grid = grid}}
                        >
                        </Grid>
                    </Row>
                </Spin>
            </PageLayout>
        );
    }
}

export default Location;