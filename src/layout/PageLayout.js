import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Typography, Tooltip, Button, Row, Col, Breadcrumb, Drawer } from 'antd';
import { RouterPage, Api } from '../Config';
import { SettingOutlined } from '@ant-design/icons';
import Authenticate from '../services/Authenticate';
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const contentStyle = { background: '#fff', padding: 50, minHeight: '60vh' }

class PageLayout extends Component{
	constructor(props){
		super(props);
		this.state = {
			visibleSettings: false,
			redirectHome: false
		};
		this.onOpenSetting = this.onOpenSetting.bind(this);
		this.onCloseSetting = this.onCloseSetting.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	onOpenSetting(){
		this.setState({ visibleSettings: true });
	}

	onCloseSetting(){
		this.setState({ visibleSettings: false });
	}

	logOut(){
		Authenticate.logOut();
		this.setState({ rederictLogin: true, visibleSettings: false });
	}

    render(){
		if(this.state.redirectHome)
			return <Redirect to={Api.home} />
        return(
            <Layout>
				<Drawer
					title="Configuración"					
					onClose={this.onCloseSetting}
					visible={this.state.visibleSettings}
					bodyStyle={{ paddingBottom: 80 }}
					footer={
						<div
						  style={{
							textAlign: 'right',
						  }}
						>						  
						  
						</div>
					  }
					>	
					<Button type="primary" onClick={this.logOut}>
						Cerrar Sesión
					</Button>				
				</Drawer>
				<Header>
					<Row>
						<Col span={12}>
							<Title style={{color: "white"}}>Nombre del negocio</Title>
						</Col>
						<Col span={12} push={10}>
							<Tooltip title="Perfil">
								<Button type="primary" shape="circle" onClick={this.onOpenSetting}>
									<SettingOutlined />
								</Button>
							</Tooltip>
						</Col>
					</Row>
				</Header>                
                <Layout>                 
					<Sider 
						width={200} 
						style={{background: "#fff"}}
					>
						<Menu
							theme='dark'
							mode="inline"
							style={{ height: '100%', borderRight: 0 }}
						>
							<Menu.Item key={RouterPage.home}>
								<Icon type='dashboard' />
								<span>Dashboard</span>
								<Link to={RouterPage.home} />
							</Menu.Item>
							<SubMenu
								title={
									<span>Catalogo</span>
								}
							>
								<Menu.Item key={RouterPage.products.index}>								
									<Icon type="appstore" />
									<span>Productos</span>
									<Link to={RouterPage.products.index} />
								</Menu.Item>
								<Menu.Item key={RouterPage.category.index}>
									<Icon type="appstore" />
									<span>Categoria</span>
									<Link to={RouterPage.category.index} />
								</Menu.Item>
								<Menu.Item key={RouterPage.locations.index}>
									<Icon type="appstore" />
									<span>Bodegas</span>
									<Link to={RouterPage.locations.index} />
								</Menu.Item>
							</SubMenu>							
						</Menu>
					</Sider>
					<Layout
						style={{ padding: '0 24px 24px' }}
					>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>							
						</Breadcrumb>
						<Content 							
							style={{
								background: "#fff",
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>							
							<div style={contentStyle}>
								{this.props.children}
							</div>
						</Content>
					</Layout>					
                </Layout>				
            </Layout>
        );
    }
}

export default PageLayout;