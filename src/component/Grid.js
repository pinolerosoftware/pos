import React, { Component } from 'react';
import { Table } from 'antd';
import { Notification, NotificationType } from '../component/Notification';
import HttpClient from '../services/HttpClient';

class Grid extends Component {
    constructor(props){
        super(props);        
        this.httpClient = new HttpClient();
        this.state = {
            columns: props.columns,
            row: props.row,
            url: props.url,
            companyId: props.companyId,
            loading: false
        };
    }
    
    componentDidMount(){
        this.load();
    }  

    async load(){
        this.setState({ loading: true });
        const getHttpClient = this.httpClient;
        const data = await getHttpClient.get(this.state.url);
        if(data){
            this.setState({ row: data, loading: false });
            return;     
        }
        if(getHttpClient.error){
            Notification('Error', getHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }
    }
    render(){
        return(
            <Table
                loading={this.state.loading}
                columns={this.state.columns}
                dataSource={this.state.row}
                rowKey={this.props.rowKey}
            >
            </Table>
        );
    }
}

export default Grid;