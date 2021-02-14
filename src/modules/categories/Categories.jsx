import React, {Component} from 'react';
import { Button, Table, Popconfirm, Modal, Spin } from 'antd';
import { Route, Link } from "react-router-dom";
import FormCategory from './FormCategory';

class Categories extends Component {
    constructor(props){
        super(props)
        this.state = {
            createNew : false,
            categories: [],
            loading: true,
        }
        this.onGetData = this.onGetData.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        this.onGetData()
    }

    onGetData() {
        fetch(`${process.env.REACT_APP_PROXY}/categories`)
        .then(res => res.json())
        .then(data => this.setState({categories: data.categories, loading: false}))
    }

    onDelete(Id) {
        fetch(`${process.env.REACT_APP_PROXY}/categories/${Id}`, {
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
            title: 'Categorías',
            content: `${message}`,
            onOk(){
                self.onGetData()
            }
        });
    }

    getColumns(){
        return [{
            title: 'Categoria',
            dataIndex: 'name',
            key: 'name',
            width: 600
        },{
            title: 'Eliminar',
            render: (tag) => (
                <Popconfirm title="Seguro que desea eliminar？" okText="Si" onConfirm={() => this.onDelete(tag._id)} cancelText="No">
                    Delete
                </Popconfirm>
            )
        },{
            title: 'Editar',
            render: (tag) => (
                <Link to={`${this.props.match.url}/edit/${tag._id}`}>
                    Edit
                </Link>
            )
        }]
    }

    getRecords(){
        let {categories} = this.state;
        return categories;
    }

    render(){
        let {loading} = this.state;
        let {match} = this.props;
        return (
            <div>
                <Route path={`${match.path}`} exact render={() =>
                    <section>
                        <Link to={`${match.url}/new`}>
                            <Button type="primary" style={{marginBottom: 15}}>
                                Agregar Categoría
                            </Button>
                        </Link>
                        <Spin spinning={loading} tip="Cargando">
                            <Table rowKey="_id"
                                columns={this.getColumns()}
                                dataSource={this.getRecords()}
                                pagination={false}
                            />
                        </Spin>
                    </section>
                } />
                <Route path={`${match.path}/new`} render={(props) => <FormCategory {...props} title="Nueva Categoría"/> }/>
                <Route path={`${match.path}/edit/:id`} render={(props) => <FormCategory {...props} title="Editar Categoría"/> }/>
            </div>
        )
    }
}

export default Categories;
