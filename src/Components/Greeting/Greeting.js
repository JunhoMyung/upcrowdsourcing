import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import './Greeting.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Greeting extends Component {

    render() {
        return (
            <div>
                <Modal
                    show={this.props.open}
                    onHide={this.props.handleNext}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Body>
                        <div>
                            <div className = "greeting">
                                Thank you for participating in our task!
                                Page1
                            </div>
                            <Container className = "next_prev">
                                <Row>
                                    <Col md={4}>
                                        <div className = "prev">
                                            PREV
                                        </div>
                                    </Col>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <div className = "next" onClick = {this.props.handleNext}>
                                            NEXT
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Modal.Body>       
                </Modal>
                <Modal
                    show={this.props.page2}
                    onHide={this.props.handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Body dialogClassName="my-modal">
                        <div>
                            <div className = "greeting">
                                Thank you for participating in our task!
                                Page2
                            </div>
                            <Container className = "next_prev">
                                <Row>
                                    <Col md={4}>
                                        <div className = "prev">
                                            PREV
                                        </div>
                                    </Col>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <div className = "next" onClick = {this.props.handleClose}>
                                            NEXT
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Modal.Body>       
                </Modal>
            </div>
        )
    }
}
