import React, {Component} from 'react';
import { Button, Table, Icon, Popconfirm, Modal, Spin } from 'antd';
import { Route, Link } from "react-router-dom";
import FormLocations from './FormLocations';


class Locations extends Component {
    constructor(props){
        super(props)
        this.state = {
            locations: [],
            loading: true
        }

        this.onGetData = this.onGetData.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        this.onGetData()
    }
    
    onGetData(){
        fetch("/locations")
        .then(res => res.json())
        .then(data => this.setState({locations: data.locations, loading: false}))
    }

    onDelete(Id) {
        fetch(`/locations/${Id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.showModal(data.message))
    }

    showModal(message) {
        let self = this;
        Modal.success({
            title: 'Ubicaciones',
            content: `${message}`,
            onOk(){
                self.onGetData()
            }
        });
    }

    getColumns(){
        return [{
            title: 'Ubicación',
            dataIndex: 'name',
            key: 'name',
            width: 600
        },{
            title: 'Eliminar',
            render: (tag) => (   
                <Popconfirm title="Seguro que desea eliminar？" okText="Si" onConfirm={() => this.onDelete(tag._id)} cancelText="No">
                    <Icon type="delete" style={{color: "#3179d2c4", fontSize: "1.4em", cursor: "pointer"}} />
                </Popconfirm>
            )
        },{
            title: 'Editar',
            render: (tag) => (   
                <Link to={`${this.props.match.url}/edit/${tag._id}`}>
                    <Icon type="edit" style={{color: "#3179d2c4", fontSize: "1.4em", cursor: "pointer"}}/>
                </Link>
            )
        }]
    }

    getRecords(){
        let {locations} = this.state;
        return locations;
    }

    render(){
        let {loading} = this.state;
        let {match} = this.props;
        return (
            <div>
                <Route path={`${match.path}`} exact component={() =>
                    <section>
                        <Link to={`${match.url}/new`}>
                            <Button style={{marginBottom: 15}}>
                                Agregar Ubicación
                            </Button>
                        </Link>
                        <Spin spinning={loading} tip="Cargando" 
                        indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                            <Table rowKey="_id"
                                columns={this.getColumns()}
                                dataSource={this.getRecords()}
                                pagination={false}
                            />
                        </Spin>
                    </section>
                } />
                <Route path={`${match.path}/new`} render={(props) => <FormLocations {...props} title="Nueva Ubicación"/> }/>
                <Route path={`${match.path}/edit/:id`} render={(props) => <FormLocations {...props} title="Editar Ubicación"/> }/>
            </div>
        )
    }
}

export default Locations;