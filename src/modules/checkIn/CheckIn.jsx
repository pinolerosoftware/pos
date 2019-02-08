import React, {Component} from 'react'
import { Layout, Card, Input, Steps, Form, Button, Row, Col, Icon, Badge } from 'antd';
import "../../styles/CheckIn.scss";

const { Header, Content } = Layout;
const {Item} = Form;
const { Meta } = Card;

const logo = {
    width: "120px",
    height: "31px",
    background: "rgba(255,255,255,.2)",
    margin: "15px auto"
}

const style = {
    stepsContent: {
        //border: "1px dashed #e9e9e9",
        borderRadius: 6,
        //backgroundColor: "#fafafa",
        minHeight: 250,
        padding: 15
    }
}

const Step = Steps.Step;

const steps = [{
        title: 'Inicio',
        description: "Datos iniciales para el registro"
    }, {
        title: 'Caracteristicas',
        description: "Selecciona las caract. que necesitas"
    }, {
        title: 'Fin',
        description: "Completa tu registro"
}];

class CheckIn extends Component {
    constructor(props){
        super(props)
        this.state={
            current: 1,
            selectProducto: false,
            selectServicio: false
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    next() {
        if(this.state.current < 2){
            const current = this.state.current + 1;
            this.setState({ current });
        }
    }
    
    prev() {
        if(this.state.current > 0){
            const current = this.state.current - 1;
            this.setState({ current });
        }
    }
    render() {
        const { current } = this.state;
        return (
            <Layout>
                <Header>
                    <div style={logo} />
                </Header>
                <Content style={{ padding: '15px' }}>
                    <div style={{ background: '#fff', padding: 15, minHeight: 500 }}>
                        {/*<article style={{textAlign: "center"}}> 
                            <h1>Registrate de forma gratuita</h1>
                            <Item>
                                <Input size="large"/>
                            </Item>
                        </article>*/}
                        <br />
                        <Steps progressDot current={current} style={{marginBottom: 10}}>
                            {steps.map(item => 
                                <Step key={item.title} title={item.title} description={item.description} />
                            )}
                        </Steps>
                        <div style={style.stepsContent}>
                            {
                                (steps[current].title === 'Inicio') ?
                                    <Form layout="horizontal" style={{display: "flex", flexDirection: "column"}}>
                                        <h2 style={{textAlign: "center"}}>Datos de la empresa</h2>
                                        <Row gutter={12}>
                                            <Col span={10} offset={1}>
                                                <Item label="Correo Electronico">
                                                    <Input />
                                                </Item>
                                                <Item label="Contraseña">
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={10} offset={1}>
                                                <Item label="Confirmar Correo">
                                                    <Input />
                                                </Item>
                                                <Item label="Confirmar Contraseña">
                                                    <Input />
                                                </Item>
                                            </Col>
                                        </Row>
                                        <br />
                                    </Form>
                                :
                                (steps[current].title === 'Caracteristicas') ?
                                    <Form style={{display: "flex", flexDirection: "column"}}>
                                        <h2 style={{textAlign: "center"}}>¿Qué Tipo de empresa tienes?</h2>
                                        <br />
                                        <section style={{display: "flex", justifyContent: "space-evenly"}}>
                                            <Badge dot={this.state.selectProducto} style={{height: 12, width: 12, background: "#52c41a"}}>
                                                <Card hoverable style={{ height: 250, width: 300, padding: 10 }} cover={
                                                    <Icon type="shop" style={{fontSize: "7em", marginTop: 5}} />
                                                }>
                                                    <Meta title="Empresa de producto" description="Pequeña o mediana empresa dedicada a la venta y distribucion de productos"/>
                                                </Card>
                                            </Badge>
                                            <Badge dot={this.state.selectServicio} style={{height: 12, width: 12, background: "#52c41a"}}>
                                                <Card hoverable style={{ height: 250, width: 300, padding: 10 }} cover={
                                                    <Icon type="team" style={{fontSize: "7em", marginTop: 5}}/>
                                                }>
                                                    <Meta title="Empresa de servicio" description="Empresa orientada a servicios diversos"/>
                                                </Card>
                                            </Badge>
                                        </section>
                                    </Form>
                                :
                                    <Form style={{display: "flex", flexDirection: "column"}}>
                                        <h2 style={{textAlign: "center"}}>Finaliza tu registro</h2>
                                        <Row gutter={12}>
                                            <Col span={8}>
                                                <Item label="Nombre">
                                                    <Input />
                                                </Item>
                                                <Item label="Numero de telefono">
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={8}>
                                                <Item label="Nombre Legal">
                                                    <Input />
                                                </Item>
                                                <Item label="RUT">
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={8}>
                                                <Item label="Dirección">
                                                    <Input />
                                                </Item>
                                            </Col>
                                        </Row>
                                        <br />
                                    </Form>
                            }
                        </div>
                        <div className="footer" style={{position: "absolute", bottom: 10}}>
                            <Button onClick={() => this.prev()}>Anterior</Button>
                            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => this.next()}>Siguiente</Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}



export default CheckIn