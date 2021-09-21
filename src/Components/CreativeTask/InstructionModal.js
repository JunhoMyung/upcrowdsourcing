import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Description from "../Images/Description.png"
import Submit from "../Images/Submit.png"

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
                                    <td className = "greetingBody" colSpan = {3}>
                                        Thank you everyone for participating in our task.
                                        <br/>
                                        <br/>
                                        When you begin the task, you will see a section called <b className = "blue">"Title"</b> and <b className = "blue">"Plot"</b> on the left. Type in your group's discussion result there. 
                                        <br/>
                                        <br/> 
                                        <img className = "descriptionImg" src={Description} alt = ""/>
                                        <br/>
                                        <br/> 
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
                                        Once your group is done deciding, please move on to the next step by clicking <b className = "blue">"Submit"</b> button.
                                        <br/>
                                        <br/>
                                        <img className = "descriptionImg" src={Submit} alt = ""/>
                                        <br/>
                                        <br/> 
                                        When button is clicked, a confirmation message will pop up. When majority confirms, you will proceed to a short survey to finish the task.
                                        <br/>
                                        <br/>
                                        If you have understood the instructions, please click "PROCEED".
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
