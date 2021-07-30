import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Bunny from '../Example.png'

export default class Instruction extends Component {

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
                                    <td className = "greetingBody2" colSpan = {3}>
                                        Welcome to the Creative Task session!
                                        <br/>
                                        <br/>
                                        In this session, you will be asked to create a short Google Ads <b className = "blue">together</b> with your group members.
                                        <br/>
                                        <br/>
                                        An example of a Google Ad is shown below:
                                        <br/>
                                        <img className = "google" src={Bunny} alt = ""/>
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
                                        A typical Google Ad consists of a <b className = "blue">title</b> (max 30 characters) and a <b className = "blue">description</b> (max 90 characters)
                                        <br/>
                                        <br/>
                                        Your job in this task is to create a Google Ads for a given product, by discussing with your group members.
                                        <br/>
                                        <br/>
                                        We will give you <b className = "blue">2 minutes</b> to read about the product and another <br/><b className = "blue">7 minutes</b> to create the advertisement.
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
                                            NEXT
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>       
                </Modal>
                <Modal
                    show={this.props.page3}
                    onHide={this.props.handleNext3}
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
                                        When you begin the task, you will see a section called <b className = "blue">"Title"</b> and <b className = "blue">"Description"</b>. Type in your group's answer there. 
                                        <br/>
                                        <br/> 
                                        Once your group is done deciding, please move on to the next step by clicking <b className = "blue">"Confirm"</b> button.
                                        <br/>
                                        <br/>
                                        If you have understood the instructions, please click "PROCEED".
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "prevTd">
                                        <div className = "prev" onClick = {this.props.handlePrev3}>
                                            PREV
                                        </div>
                                    </td>
                                    <td className = "buffer">

                                    </td>
                                    <td className = "nextTd" onClick = {this.props.handleNext3}>
                                        <div className = "next">
                                            PROCEED
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
