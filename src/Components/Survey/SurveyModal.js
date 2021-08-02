import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'

export default class Greeting extends Component {

    state = {
        
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.open}
                    onHide={this.props.handleNext1}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                    dialogClassName="border-radius-2"
                >
                    <Modal.Body>
                        <table className = "greetingTable">
                            <tbody>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        Round {this.props.round} is done!
                                        <br/>
                                        <br/>
                                        Before moving on to the next step, we will take a very simple survey, which won't take more than 2 minutes.
                                        <br/>
                                        <br/>
                                        After answering the survey, you will be given some time to freely talk and get know each other.
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "prevTd">
                                        <div className = "prev-disabled">
                                            PREV
                                        </div>
                                    </td>
                                    <td className = "buffer">

                                    </td>
                                    <td className = "nextTd" onClick = {this.props.handleNext1}>
                                        <div className = "next">
                                            NEXT
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>       
                </Modal>
                <Modal
                    show={this.props.page2}
                    onHide={this.props.handleNext2}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                    dialogClassName="border-radius-2"
                >
                    <Modal.Body>
                    <table className = "greetingTable">
                            <tbody>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        
                                        <br/>
                                        <br/>
                                        
                                        <br/>
                                        <br/>

                                    </td>
                                </tr>
                                <tr>
                                    <td className = "prevTd">
                                        <div className = "prev" onClick = {this.props.handlePrev2}>
                                            PREV
                                        </div>
                                    </td>
                                    <td className = "buffer">

                                    </td>
                                    <td className = "nextTd" onClick = {this.props.handleNext2}>
                                        <div className = "next">
                                            SUBMIT
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>       
                </Modal>
            </div>
        )
    }
}
