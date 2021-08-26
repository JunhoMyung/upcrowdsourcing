import React, { Component } from 'react'
import './Chat.css'
import InputBase from '@material-ui/core/InputBase';
import SendBtn from "../Images/SendBtn.png"
import Bunny from "../Images/Bunny.png"
import Kitty from "../Images/Kitty.png"
import Puppy from "../Images/Puppy.png"
import Squirrel from "../Images/Squirrel.png"
import Countdown from 'react-countdown';
import ChatRender from '../Chat'
import InstructionModalBtn from './InstructionModalBtn'


export default class Chat extends Component {

    state = {
        title: "",
        description: "",
        btn: false,
        btn1: false,
        btn2: false,
        btn3: false,
        confirmation: false,
        confirmationName: "",
        answered: false,
        bunny: "null",
        kitty: "null",
        puppy: "null",
        squirrel: "null",
    }    

    constructor(props) {
        super(props)
        this.sendTitle = this.sendTitle.bind(this)
        this.keyPressTitle = this.keyPressTitle.bind(this)
        this.sendDescription = this.sendDescription.bind(this)
        this.keyPressDescription = this.keyPressDescription.bind(this)
        this.nextBtn1 = this.nextBtn1.bind(this)
        this.nextBtn2 = this.nextBtn2.bind(this)
        this.prevBtn2 = this.prevBtn2.bind(this)
        this.nextBtn3 = this.nextBtn3.bind(this)
        this.prevBtn3 = this.prevBtn3.bind(this)
        this.nextBtn4 = this.nextBtn4.bind(this)
        this.prevBtn4 = this.prevBtn4.bind(this)
        this.closeBtn1 = this.closeBtn2.bind(this)
        this.closeBtn2 = this.closeBtn3.bind(this)
        this.closeBtn3 = this.closeBtn3.bind(this)
        this.closeBtn4 = this.closeBtn4.bind(this)
        this.props.socket.on("confirmation", (name) => {
            this.setState({ confirmation: true, confirmationName: name })
        })
        this.props.socket.on("agree", (name) => {
            if (name === "Bunny"){
                this.setState({ bunny: true })
            }
            else if (name === "Kitty"){
                this.setState({ kitty: true })
            }
            else if (name === "Puppy"){
                this.setState({ puppy: true })
            }
            else {
                this.setState({ squirrel: true })
            }
        })
        this.props.socket.on("disagree", (name) => {
            if (name === "Bunny"){
                this.setState({ bunny: false })
            }
            else if (name === "Kitty"){
                this.setState({ kitty: false })
            }
            else if (name === "Puppy"){
                this.setState({ puppy: false })
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
                kitty: "null",
                puppy: "null",
                squirrel: "null",
            })
        })
    }

    nextBtn1 = () => {
        this.setState({ btn: false, btn2: true })
    }

    prevBtn2 = () => {
        this.setState({ btn: true, btn2: false })
    }

    nextBtn2 = () => {
        this.setState({ btn2: false, btn3: true })
    }

    prevBtn3 = () => {
        this.setState({ btn2: true, btn3: false })
    }

    nextBtn3 = () => {
        this.setState({ btn3: false, btn4: true })
        
    }
    prevBtn4 = () => {
        this.setState({ btn3: true, btn4: false })
    }
    nextBtn4 = () => {
        this.setState({ btn4: false })
    }

    closeBtn1 = () => {
        this.setState({ btn: false })
    }
    closeBtn2 = () => {
        this.setState({ btn2: false })
    }
    closeBtn3 = () => {
        this.setState({ btn3: false })
    }
    closeBtn4 = () => {
        this.setState({ btn4: false })
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
        var list = {Bunny: Bunny, Kitty: Kitty, Puppy: Puppy, Squirrel: Squirrel}
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
        for (var i = 0; i < 4; i++){
            if (Object.keys(list)[i] !== this.props.name){
                participants.push(
                    <tr>
                        <td className = "participant_pic">
                            <img className = "myPic" src={list[Object.keys(list)[i]]} alt = ""/>
                        </td>
                        <td className = "participant_name">
                            {Object.keys(list)[i]}
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
        if ((Date.now() - this.props.time) < 240000){
            alert("For the sake of the experiment, you can only submit the answer after 4 minutes have passed. Please discuss more and decide!")
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

    kittyAgree = () => {
        if(this.state.kitty === "null"){
            return(<i className="fas fa-ellipsis-h undecided"></i>)
        }
        else if (this.state.kitty === true){
            return(<i className="fas fa-check agree"></i>)
        }
        else{
            return(<i className="fas fa-times disagree"></i>)
        }
    }
    puppyAgree = () => {
        if(this.state.puppy === "null"){
            return(<i className="fas fa-ellipsis-h undecided"></i>)
        }
        else if (this.state.puppy === true){
            return(<i className="fas fa-check agree"></i>)
        }
        else{
            return(<i className="fas fa-times disagree"></i>)
        }
    }
    squirrelAgree = () => {
        if(this.state.squirrel === "null"){
            return(<i className="fas fa-ellipsis-h undecided"></i>)
        }
        else if (this.state.squirrel === true){
            return(<i className="fas fa-check agree"></i>)
        }
        else{
            return(<i className="fas fa-times disagree"></i>)
        }
    }
    bunnyAgree = () => {
        if(this.state.bunny === "null"){
            return(<i className="fas fa-ellipsis-h undecided"></i>)
        }
        else if (this.state.bunny === true){
            return(<i className="fas fa-check agree"></i>)
        }
        else{
            return(<i className="fas fa-times disagree"></i>)
        }
    }

    renderConfirmation = () => {
        if(this.state.confirmation){
            if(!this.state.answered){
                return(
                    <div className = "confirmation">
                        {this.state.confirmationName} requested for submission.
                        <br/>
                        <br/>
                        Do you agree with current Title and Description?
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
                                    <td className = "agreeStatus">
                                        Puppy
                                        <br/>
                                        {this.puppyAgree()}
                                    </td>
                                    <td className = "agreeStatus">
                                        Kitty
                                        <br/>
                                        {this.kittyAgree()}
                                    </td>
                                    <td className = "agreeStatus">
                                        Bunny
                                        <br/>
                                        {this.bunnyAgree()}
                                    </td>
                                    <td className = "agreeStatus">
                                        Squirrel
                                        <br/>
                                        {this.squirrelAgree()}
                                    </td>
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
                <InstructionModalBtn
                    open = {this.state.btn}
                    page2 = {this.state.btn2}
                    page3 = {this.state.btn3}
                    page4 = {this.state.btn4}
                    handleNext1 = {this.nextBtn1}
                    handlePrev2 = {this.prevBtn2}
                    handleNext2 = {this.nextBtn2}
                    handleNext3 = {this.nextBtn3}
                    handlePrev3 = {this.prevBtn3}
                    handleNext4 = {this.nextBtn4}
                    handlePrev4 = {this.prevBtn4}
                    handleClose1 = {this.closeBtn1}
                    handleClose2 = {this.closeBtn2}
                    handleClose3 = {this.closeBtn3}
                    handleClose4 = {this.closeBtn4}
                />
                {this.renderConfirmation()}
                <div style = {{ backgroundColor: "#FAFAFA"}}>
                    <div className = "NavBar">
                        <table>
                            <tbody>
                                <tr>
                                    <td className = "Title"> 
                                        {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                        Creating Google Ads
                                    </td>
                                    <td className = "Space"></td>
                                    <td className = "Instruction">
                                        <div className = "InstructionBtn" onClick = {() => {this.setState({ btn: true })}}>Instruction</div>
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
                                                        Time Left : <span className = "blue"><Countdown date={this.props.time + 420000} renderer={this.renderer} /></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2} className = "heading2Int">
                                                        Participants
                                                    </td>
                                                </tr>
                                                {this.participants()}
                                                <tr>
                                                    <td colSpan = {2} className = "heading2Int">
                                                        Title
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2}>
                                                        <div className = "adtitle">
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
                                                        Description
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
