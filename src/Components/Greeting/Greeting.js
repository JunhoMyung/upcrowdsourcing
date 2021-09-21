import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import './Greeting.css'
import InputBase from '@material-ui/core/InputBase';
import Bunny from "../Images/Bunny.png"
import Deer from "../Images/Deer.png"
import Owl from "../Images/Owl.png"
import Bear from "../Images/Bear.png"
import Raccoon from "../Images/Raccoon.png"
import Squirrel from "../Images/Squirrel.png"
import Notification from "../Images/notification.png"


export default class Greeting extends Component {

    state = {
        Mturk: "",
        participants: {
            Bunny: Bunny,
            Bear: Bear,
            Raccoon: Raccoon,
            Squirrel: Squirrel,
            Owl: Owl,
            Deer: Deer,
        }
    }

    handleNext1 = () => {
        if (this.state.Mturk === ""){
            alert('You must enter your MTurk ID to proceed')
        }
        else {
            this.props.handleNext1()
            this.props.handleMturk(this.state.Mturk)
        }
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
                                        Thank you for participating in our task!!
                                        <br/>
                                        <br/>
                                        To begin with, please enter your <b className = "blue">MTurk ID</b> below.
                                        <br/>
                                        <br/>
                                        <InputBase
                                            className = "MTurkID"
                                            placeholder="Enter Your MTurk ID Here"
                                            inputProps={{ 'aria-label': 'naked', style: { textAlign: 'center', fontSize: '19px' } }}
                                            onChange = {event => this.setState({Mturk: event.target.value})}
                                            autoFocus
                                            value={this.state.Mturk}
                                        />
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
                                    <td className = "nextTd" onClick = {this.handleNext1}>
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
                                        In this task, you will be discussing with five other participants in a group chat to create <b className = "blue">a simple movie plot with a title.</b>
                                        <br/>
                                        <br/>
                                        Some keywords you <b><u>must</u></b> include in the plot are:
                                        <br/>
                                        <b className = "blue">Magic, Piano, and Coffee</b>
                                        <br/>
                                        <br/>                                        
                                        During the task, you will be called <b className = "blue">"{this.props.name}"</b> <img className = "myPic" src={this.state.participants[this.props.name]} alt = ""/>
                                        <br/>
                                        Please remember your nickname!
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
                                        The task will begin as soon as all the members join the room. 
                                        <br/>
                                        <br/>
                                        We will notify you when the task is ready, so please <br/><b className = "blue">allow notification</b> <img className = "notification" src={Notification} alt = ""/> for this website.
                                        <br/>
                                        <br/>
                                        A message will pop up when the task is ready.<br/> <b>You <b className = "blue">MUST</b> respond to that message in <b className = "blue">90 seconds</b> to proceed.</b>
                                        <br/>
                                        <br/>
                                        If you miss the message, you will not be able to proceed, and we wouldn't be able to pay you. Please be aware of this.
                                        <br/>
                                        <br/>
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
                                            NEXT
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>       
                </Modal>
                <Modal
                    show={this.props.page4}
                    onHide={this.props.handleNext4}
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
                                        You will have <b className = "blue">10 minutes</b> to discuss with your team and <br/>submit the result.
                                        <br/>
                                        <br/>
                                        You may be <b className = "blue">rejected or rewarded</b> depending on your participation. 
                                        <br/>
                                        <br/>
                                        For instance, if you fail to communicate (do not leave any chat or type in random chat messages), we will reject your HIT.
                                        <br/>
                                        <br/>
                                        If you understood the instructions, please click PROCEED.
                                        <br/>
                                        <br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "prevTd">
                                        <div className = "prev" onClick = {this.props.handlePrev4}>
                                            PREV
                                        </div>
                                    </td>
                                    <td className = "buffer">

                                    </td>
                                    <td className = "nextTd" onClick = {this.props.handleNext4}>
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
