import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Icon, Popconfirm, Spin } from 'antd';
import { Api, RouterPage  } from '../../Config';
import PageLayout from '../../layout/PageLayout';
import { Notification, NotificationType } from '../../component/Notification';
import Grid from '../../component/Grid';
import Authenticate from '../../services/Authenticate';
import HttpClient from '../../services/HttpClient';

class Product extends Component {
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
                title: 'Descripcion',
                dataIndex: 'description',
                key: 'description'                
            },
            {
                title: 'Categoria',
                dataIndex: 'categoryId',
                key: 'categoryId',
                render: (value, record) => {
                    return value.name;
                }
            },
            {
                title: 'Precio',
                dataIndex: 'price',
                key: 'price'
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
                            <Link style={{padding: 5}} to={`${RouterPage.products.edit}${record._id}`}><Icon type='edit' />Editar</Link>
                            <Popconfirm
                                title="¿Seguro que desea eliminar el producto?"
                                onConfirm={() => this.remove(record._id)}
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

    async remove(id){
        this.setState({ loading: true });
        const removeHttpClient = this.httpClient;
        const url = `${Api.product}${id}`;
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
            <PageLayout menuKey={RouterPage.products.index} menuOpenKey="catalogo">
                <Spin spinning={this.state.loading}>
                <Row>
                    <Col>                                                
                        <Link to={RouterPage.products.new}>
                            <Button type="primary" style={{ marginBottom: 16 }}>
                                Nuevo Producto                            
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Grid 
                        rowKey="_id" 
                        columns={this.state.columns} 
                        url={Api.product} 
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

export default Product;