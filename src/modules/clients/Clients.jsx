import React, {Component} from 'react';
import { Button, Table } from 'antd';
import FormClients from './FormClients';


class Clients extends Component {
    constructor(props){
        super(props)
        this.state = {
            createNew : false,
            clients : []
        }
        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    getColumns(){
        return [{
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Correo Electrónico',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: 'Última compra',
            dataIndex: 'lastPurchase',
            key: 'lastPurchase',
        }]
    }

    getRecords(){
        let {clients} = this.state;
        return clients;
    }

    onCreate(){
        this.setState({createNew : true})
    }

    onCancel(){
        this.setState({createNew : false})
    }

    render(){
        let {createNew} = this.state;
        return (
            <div>
                {!createNew && 
                <section>
                    <Button style={{marginBottom: 15}} onClick={() => this.onCreate()}>
                        Agregar Cliente
                    </Button>
                    <Table rowKey="id"
                        columns={this.getColumns()}
                        dataSource={this.getRecords()}
                        pagination={false}
                    />
                </section>}
                {createNew && <FormClients onCancel={this.onCancel}/>}
            </div>
        )
    }
}

export default Clients;