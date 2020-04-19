import React, {Component} from 'react'
import { Input, Card, Icon, Row, Col, List, Button, Spin } from 'antd';
import PageLayout from '../../layout/PageLayout';
import { Api, RouterPage  } from '../../Config';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';
import HttpClient from '../../services/HttpClient';

class Sales extends Component {
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
        this.state = {
            companyId: Authenticate.getCompanyId(),
            userId: Authenticate.getUserId(),
            products: [],
            salesDetails: [],
            loading: false
        }        
    }

    componentDidMount(){
        this.loadProducts();
    }

    async loadProducts(){
        this.setState({ loading: true });
        const getHttpClient = this.httpClient;
        const data = await getHttpClient.get(Api.product);
        if(data){
            this.setState({ products: data, loading: false });
            return;     
        }
        if(getHttpClient.error){
            Notification('Error', getHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }
    }

    render(){
        return(
            <PageLayout menuKey={RouterPage.sales.new}>
                <Spin spinning={this.state.loading}>
                    <Row>
                        <Col span={12}>
                            <List
                                dataSource={this.state.products}
                                renderItem={item => (
                                    <List.Item key={item._id}>
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.description}
                                        >                                        
                                        </List.Item.Meta>
                                        <div>
                                            {item.price}
                                        </div>
                                    </List.Item>
                                )}
                            >
                                
                            </List>
                        </Col>
                    </Row>
                </Spin>
            </PageLayout>
        );
    }
}

export default Sales;