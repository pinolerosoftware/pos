import React, {Component} from 'react';
import { Menu, Layout} from 'antd';
import Products from './products/Products'
import Categories from './categories/Categories'
import Locations from './locations/Locations'
import FormProducts from './products/FormProducts';
import { Route, Link } from "react-router-dom";

const { Sider, Content } = Layout;

const ListMenu = [{
        to: "",
        text: "Productos"
    },{
        to: "/categories",
        text: "Categorías"
    },{
        to: "/locations",
        text: "Ubicaciones"
    }
]

class PrincipalProducts extends Component {
    render(){
        let {match} = this.props;
        return (
            <Layout>
                <Sider theme="light">
                    <Menu style={{ width: 200, height: 510 }} defaultSelectedKeys={[window.location.pathname]} mode="inline">
                        {ListMenu.map(item => {
                            return <Menu.Item key={`/products${item.to}`}>
                                    <Link to={`${match.url}${item.to}`}>{item.text}</Link>
                                </Menu.Item>
                        })}
                    </Menu>
                </Sider>
                <Content style={{background: '#fff', padding: 15}}>
                    <Route path={`${match.path}`} exact component={Products} />
                    <Route path={`${match.path}/new`} exact component={FormProducts} />
                    <Route path={`${match.path}/categories`} component={Categories} />
                    <Route path={`${match.path}/locations`} component={Locations} />
                </Content>
            </Layout>
        )
    }
}


export default PrincipalProducts;