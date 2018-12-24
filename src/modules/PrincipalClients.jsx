import React, {Component} from 'react';
import { Menu, Layout} from 'antd';
import Clients from './clients/Clients';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Sider, Content } = Layout;

class PrincipalClients extends Component {
    render(){
        let {match} = this.props;
        return (
            <Router>
                <Layout>
                    <Sider theme="light">
                        <Menu style={{ width: 200, height: 510 }} defaultSelectedKeys={['1']}
                            mode="inline">
                            <Menu.Item key="1">
                                <Link to={`${match.url}/principal`}>Clientes</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{background: '#fff', padding: 15}}>
                        <Route path={`${match.path}`} exact component={Clients} />
                    </Content>
                </Layout>
            </Router>
        )
    }
}

export default PrincipalClients;