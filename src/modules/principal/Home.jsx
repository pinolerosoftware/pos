import React, {Component} from 'react'
import { Layout, Row, Col, Affix, Icon } from 'antd';
import "../../styles/Home.css"

const { Header, Content } = Layout;

class Home extends Component {
    render(){
        return(
            <Layout>
                <Affix offsetTop={0} className="fixed">
                    <Header className="header">
                            <Row gutter={8}>
                                <Col span={1}><h4 className="logo">POS</h4></Col>
                                <Col lg={16} sm={13}></Col>
                                <Col lg={3} sm={4}><h4 className="item-menu">Iniciar Sesion</h4></Col>
                                <Col lg={2} sm={4}><h4 className="item-menu">Cuenta</h4></Col>
                                <Col lg={2} sm={2}><h4 className="item-menu">Contactenos</h4></Col>
                            </Row>
                    </Header>
                </Affix>
                <Content> 
                    <section  className="baner">
                        <div className="baner-flex">
                            <div className="baner-article">
                                <h1><b>POS</b> el asistente de control de inventario mas poderoso del mercado</h1>
                                <p >Registrate de forma gratuita y empeza a controlar tu negocio.</p>
                            </div>
                            <div className="baner-logo">
                                <Icon type="hdd" className="icon"/>
                            </div>
                        </div>
                    </section>
                    <section className="section-flex">
                        <article>
                            <h2>Todo lo que necesitas en un solo lugar</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vel laudantium commodi rem, nostrum fugiat delectus, molestiae accusantium voluptatibus earum exercitationem iusto itaque, cupiditate fugit. Unde tempora qui rem ea!</p>
                        </article>
                        <figure>
                            <img src="https://picsum.photos/300/300/?image=10" alt="img"/>
                        </figure>
                    </section>
                    <section className="section-flex">
                        <figure>
                            <img src="https://picsum.photos/300/300/?image=12" alt="img"/>
                        </figure>
                        <article>
                            <h2>Todo lo que necesitas en un solo lugar</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vel laudantium commodi rem, nostrum fugiat delectus, molestiae accusantium voluptatibus earum exercitationem iusto itaque, cupiditate fugit. Unde tempora qui rem ea!</p>
                        </article>
                    </section>
                    <section className="section-flex">
                        <article>
                            <h2>Todo lo que necesitas en un solo lugar</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vel laudantium commodi rem, nostrum fugiat delectus, molestiae accusantium voluptatibus earum exercitationem iusto itaque, cupiditate fugit. Unde tempora qui rem ea!</p>
                        </article>
                        <figure style={{width:"50%", textAlign: "center"}}>
                            <img src="https://picsum.photos/300/300/?image=14" alt="img"/>
                        </figure>
                    </section>
                </Content>
            </Layout>
        )
    }
}

export default Home