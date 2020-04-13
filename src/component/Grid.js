import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios'
import { Notification, NotificationType } from '../component/Notification';

class Grid extends Component {
    constructor(props){
        super(props);        
        this.state = {
            columns: props.columns,
            row: props.row,
            url: props.url,
            companyId: props.companyId,
            loading: false
        };
    }
    componentDidMount(){
        this.setState({ loading: true });
        axios.get(
            this.state.url,
            { 
                params: { 
                    companyId: this.state.companyId 
                }
            })
        .then(res => {            
            this.setState({ row: res.data, loading: false });            
        })
        .catch(error => {
            Notification('Error', error.response.data.error.message, NotificationType.Error);
            this.setState({ loading: false });
        });
    }    
    render(){
        return(
            <Table
                loading={this.state.loading}
                columns={this.state.columns}
                dataSource={this.state.row}
            >
            </Table>
        );
    }
}

export default Grid;