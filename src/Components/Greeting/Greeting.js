import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import './Greeting.css'
import InputBase from '@material-ui/core/InputBase';
import Bunny from "../Bunny.png"
import Kitty from "../Kitty.png"
import Puppy from "../Puppy.png"
import Squirrel from "../Squirrel.png"
import Notification from "../notification.png"


export default class Greeting extends Component {

    state = {
        Mturk: "",
        participants: {
            Bunny: Bunny,
            Kitty: Kitty,
            Puppy: Puppy,
            Squirrel: Squirrel
        }
    }

    handleNext1 = () => {
        if (this.state.Mturk === ""){
            alert('You must enter your MTurk ID to proceed')
        }
        else {
            this.props.handleNext1()
        }
    }

    renderParticipants = () => {
        var temp = []
        for (var i = 0; i < 4; i ++){
            var tempName = Object.keys(this.state.participants)[i]
            if(tempName !== this.props.name){
                if (temp.length === 2){
                    temp.push(
                        <span>
                            and "{tempName}" <img className = "myPic" src={this.state.participants[tempName]} alt = ""/> &nbsp;
                        </span>
                    )
                }
                else {
                    temp.push(
                        <span>
                            "{tempName}" <img className = "myPic" src={this.state.participants[tempName]} alt = ""/> &nbsp;
                        </span>
                    )
                }
                
            }
        }
        return(temp)
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
                                        Thank you for participating in our task!
                                        <br/>
                                        <br/>
                                        To begin with, please enter your MTurk ID below.
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
                                        In this task, you will be placed in a group with three other participants. Together, you will solve two rounds of simple group tasks.
                                        <br/>
                                        <br/>
                                        During the task, you will be called "{this.props.name}" <img className = "myPic" src={this.state.participants[this.props.name]} alt = ""/>
                                        <br/>
                                        <br/>
                                        Your group members are: {this.renderParticipants()}
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
                                        The task will begin as soon as <b className = "blue">four members</b> join the room. 
                                        <br/>
                                        <br/>
                                        We will notify you when the task is ready, so please 
                                        <br/>
                                        <b className = "blue">allow notification</b> <img className = "notification" src={Notification} alt = ""/> for this website.
                                        <br/>
                                        <br/>
                                        Detailed instruction of the tasks will be given at the later stage.
                                        <br/>
                                        Thank you again, and good luck!
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
                                            BEGIN
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
