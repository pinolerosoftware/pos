import React, {Component} from 'react';
import axios from 'axios'
import PageLayout from '../../layout/PageLayout';
import Grid from '../../component/Grid';
import { Api, RouterPage,  } from '../../Config';
import { Notification, NotificationType } from '../../component/Notification';

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount(){
        axios.get(Api.product)
        .then(res => {
            this.setState({ data: res.data });            
        })
        .catch(error => {            
            Notification('Error', error.response.data.error.message, NotificationType.Error);
        });
    }    
    render(){
        return(
            <PageLayout>
                <Grid row={this.state.data}>

                </Grid>
            </PageLayout>            
        );
    }
}

export default Product;