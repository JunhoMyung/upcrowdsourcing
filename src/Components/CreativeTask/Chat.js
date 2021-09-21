import React, { Component } from 'react'
import './Chat.css'
import InputBase from '@material-ui/core/InputBase';
import SendBtn from "../Images/SendBtn.png"
import Bunny from "../Images/Bunny.png"
import Deer from "../Images/Deer.png"
import Owl from "../Images/Owl.png"
import Bear from "../Images/Bear.png"
import Raccoon from "../Images/Raccoon.png"
import Squirrel from "../Images/Squirrel.png"
import Countdown from 'react-countdown';
import ChatRender from '../Chat'
import InstructionModal from './InstructionModal'


export default class Chat extends Component {

    state = {
        title: "",
        description: "",
        greeting: false,
        greeting2: false,
        confirmation: false,
        confirmationName: "",
        answered: false,
        bunny: "null",
        deer: "null",
        owl: "null",
        bear: "null",
        raccoon: "null",
        squirrel: "null",
    }    

    constructor(props) {
        super(props)
        this.sendTitle = this.sendTitle.bind(this)
        this.keyPressTitle = this.keyPressTitle.bind(this)
        this.sendDescription = this.sendDescription.bind(this)
        this.keyPressDescription = this.keyPressDescription.bind(this)
        this.nextGreeting1 = this.nextGreeting1.bind(this)
        this.nextGreeting2 = this.nextGreeting2.bind(this)
        this.prevGreeting2 = this.prevGreeting2.bind(this)
        this.props.socket.on("confirmation", (name) => {
            this.setState({ confirmation: true, confirmationName: name })
        })
        this.props.socket.on("agree", (name) => {
            if (name === "Bunny"){
                this.setState({ bunny: true })
            }
            else if (name === "Deer"){
                this.setState({ deer: true })
            }
            else if (name === "Owl"){
                this.setState({ owl: true })
            }
            else if (name === "Bear"){
                this.setState({ bear: true })
            }
            else if (name === "Raccoon"){
                this.setState({ raccoon: true })
            }
            else {
                this.setState({ squirrel: true })
            }
        })
        this.props.socket.on("disagree", (name) => {
            if (name === "Bunny"){
                this.setState({ bunny: false })
            }
            else if (name === "Deer"){
                this.setState({ deer: false })
            }
            else if (name === "Owl"){
                this.setState({ owl: false })
            }
            else if (name === "Bear"){
                this.setState({ bear: false })
            }
            else if (name === "Raccoon"){
                this.setState({ raccoon: false })
            }
            else {
                this.setState({ squirrel: false })
            }
        })
        this.props.socket.on("nonagreement", () => {
            this.setState({
                confirmation: false,
                confirmationName: "",
                answered: false,
                bunny: "null",
                deer: "null",
                owl: "null",
                bear: "null",
                raccoon: "null",
                squirrel: "null",
            })
        })
    }

    nextGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
    }

    prevGreeting2 = () => {
        this.setState({ greeting: true, greeting2: false })
    }

    nextGreeting2 = () => {
        this.setState({ greeting2: false })
        if(this.state.init){
            this.props.socket.emit("Creative-Instruction")
            this.setState({ init: false })
        }
    }


    sendTitle = () => {
        if (this.state.title !== ""){
            this.props.submitTitle(this.state.title)
        }
        this.setState({ title: "" })
    }

    keyPressTitle(e){
        if(e.keyCode === 13){
            this.sendTitle()
        }
    }

    sendDescription = () => {
        if (this.state.description !== ""){
            this.props.submitDescription(this.state.description)
        }
        this.setState({ description: "" })
    }

    keyPressDescription(e){
        if(e.keyCode === 13){
            this.sendDescription()
        }
    }
    
    participants() {
        var participants = []
        var list = {
            Bunny: Bunny,
            Bear: Bear,
            Raccoon: Raccoon,
            Squirrel: Squirrel,
            Owl: Owl,
            Deer: Deer
        }
        participants.push(
            <tr>
                <td className = "participant_pic">
                    <img className = "myPic" src={list[this.props.name]} alt = ""/>
                </td>
                <td className = "participant_name">
                    {this.props.name} (Me)
                </td>
            </tr>
        )
        for (var i = 0; i < this.props.participantList.length; i++){
            if (this.props.participantList[i] !== this.props.name){
                participants.push(
                    <tr>
                        <td className = "participant_pic">
                            <img className = "myPic" src={list[this.props.participantList[i]]} alt = ""/>
                        </td>
                        <td className = "participant_name">
                            {this.props.participantList[i]}
                        </td>
                    </tr>
                )
            }
        }
        return(participants)
    }

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            console.log("done")
            this.props.socket.emit("agree", this.props.name)
          return (
              <>
              </>
          );
        } else {
            if (seconds >= 10){
                return (
                    <span>
                      {minutes}:{seconds}
                    </span>
                  );
            }
            else {
                return (
                    <span>
                      {minutes}:0{seconds}
                    </span>
                );
            }
        }
      };


    handleSubmit = () => {
        if ((Date.now() - this.props.time) < 360000){
            alert("For the sake of the experiment, you can only submit the answer after 6 minutes have passed. Please discuss more and decide!")
        }
        else if (this.state.confirmation){
            alert("Submission already in progress")
        }
        else{
            this.props.socket.emit("confirmation", this.props.name, this.state.title, this.state.description)
        }
    }

    handleAgreement = () =>{
        this.props.socket.emit("agree", this.props.name)
        this.setState({ answered: true })

    }
    handleDisagreement = () =>{
        this.props.socket.emit("disagree", this.props.name)
        this.setState({ answered: true })
    }

    renderConfirmationParticipant = () => {
        var temp = {
            Bunny: this.state.bunny,
            Deer: this.state.deer,
            Owl: this.state.owl,
            Raccoon: this.state.raccoon,
            Bear: this.state.bear,
            Squirrel: this.state.squirrel
        }
        var msg = []
        for(var i = 0; i < this.props.participantList.length; i++){
            if (temp[this.props.participantList[i]] === "null"){
                msg.push(
                    <td className = "agreeStatus">
                        {this.props.participantList[i]}
                        <br/>
                        <i className="fas fa-ellipsis-h undecided"></i>
                    </td>
                )
            }
            else if (temp[this.props.participantList[i]]){
                msg.push(
                    <td className = "agreeStatus">
                        {this.props.participantList[i]}
                        <br/>
                        <i className="fas fa-check agree"></i>
                    </td>
                )
            }
            else {
                msg.push(
                    <td className = "agreeStatus">
                        {this.props.participantList[i]}
                        <br/>
                        <i className="fas fa-times disagree"></i>
                    </td>
                )
            }
        }
        return(msg)
    }


    renderConfirmation = () => {
        if(this.state.confirmation){
            if(!this.state.answered){
                return(
                    <div className = "confirmation">
                        {this.state.confirmationName} requested for submission.
                        <br/>
                        <br/>
                        Do you agree with current Title and Plot?
                        <br/>
                        <table>
                            <tbody>
                                <tr>
                                    <td className = "check">
                                        <i className="fas fa-check pointer" onClick = {() => {this.handleAgreement()}}></i>
                                    </td>
                                    <td className = "wrong">
                                        <i className="fas fa-times pointer" onClick = {() => {this.handleDisagreement()}}></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
            else{
                return(
                    <div className = "confirmation">
                        Waiting for others to respond ...
                        <br/>
                        <br/>
                        <table>
                            <tbody>
                                <tr>
                                    {this.renderConfirmationParticipant()}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
        else{
            return(
                <></>
            )
        }
    }

    render() {
        if (this.props.process){
            
            return (
                <>
                <InstructionModal
                    open = {this.state.greeting}
                    page2 = {this.state.greeting2}
                    handleNext1 = {this.nextGreeting1}
                    handlePrev2 = {this.prevGreeting2}
                    handleNext2 = {this.nextGreeting2}
                />
                {this.renderConfirmation()}
                <div style = {{ backgroundColor: "#FAFAFA"}}>
                    <div className = "NavBar">
                        <table>
                            <tbody>
                                <tr>
                                    <td className = "Title"> 
                                        {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                        Creating Movie Plot &nbsp;&nbsp;&nbsp;&nbsp; <span className = "keyword">(Keywords: <b className = "blue">Magic, Piano, and Coffee</b>)</span>
                                    </td>
                                    <td className = "Space"></td>
                                    <td className = "Instruction">
                                        <div className = "InstructionBtn" onClick = {() => {this.setState({ greeting: true })}}>Instruction</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className = "ChatMain">
                        <table className = "MainTable">
                            <tbody>
                                <tr>
                                    <td className = "ColumnOne">
                                        <table className = "firstColumn">
                                            <tbody>
                                                <tr>
                                                    <td className = "TimerInt" colSpan = {2}>
                                                        Time Left : <span className = "blue"><Countdown date={this.props.time + 600000} renderer={this.renderer} /></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2} className = "heading2Int">
                                                        Participants
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className = "participantsBox">
                                                            <table>
                                                                <tbody>
                                                                    {this.participants()}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2} className = "heading2Int">
                                                        Title
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2}>
                                                        <div className = "adTitleBox">
                                                            {this.props.title}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2}>
                                                        <span className = "textBoxInt">
                                                            <InputBase
                                                                className = "AnswerInput"
                                                                placeholder="Title Here"
                                                                inputProps={{ 'aria-label': 'naked' }}
                                                                onChange = {event => this.setState({title: event.target.value})}
                                                                onKeyDown={this.keyPressTitle}
                                                                value={this.state.title}
                                                            />
                                                            <img src={SendBtn} alt = "" className='send' onClick = {this.sendTitle}/>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2} className = "heading2Int">
                                                        Plot
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2}>
                                                        <div className = "adDescription">
                                                            {this.props.description}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2}>
                                                        <span className = "textBoxInt">
                                                            <InputBase
                                                                className = "AnswerInput"
                                                                placeholder="Description Here"
                                                                inputProps={{ 'aria-label': 'naked' }}
                                                                onChange = {event => this.setState({description: event.target.value})}
                                                                onKeyDown={this.keyPressDescription}
                                                                value={this.state.description}
                                                            />
                                                            <img src={SendBtn} alt = "" className='send' onClick = {this.sendDescription}/>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2}>
                                                        <div className = "confirm" onClick = {() => this.handleSubmit()} >
                                                            Submit
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <ChatRender
                                        nameList = {this.props.nameList}
                                        msgList = {this.props.msgList}
                                        name = {this.props.name}
                                        timeList = {this.props.timeList}
                                        handler = {this.props.handler}
                                        reaction = {this.props.reaction}
                                        reactionList = {this.props.reactionList}
                                        replyList = {this.props.replyList}
                                        roomName = {this.props.roomName}
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
            )
        }
        else {
            return(
                <>
                </>
            )
        }
    }
}
