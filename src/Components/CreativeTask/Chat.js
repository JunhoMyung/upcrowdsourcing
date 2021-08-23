import React, { Component } from 'react'
import './Chat.css'
import InputBase from '@material-ui/core/InputBase';
import SendBtn from "../SendBtn.png"
import Bunny from "../Bunny.png"
import Kitty from "../Kitty.png"
import Puppy from "../Puppy.png"
import Squirrel from "../Squirrel.png"
import Countdown from 'react-countdown';
import ChatRender from '../Chat'

export default class Chat extends Component {

    state = {
        title: "",
        description: "",
    }    

    constructor(props) {
        super(props)
        this.sendTitle = this.sendTitle.bind(this)
        this.keyPressTitle = this.keyPressTitle.bind(this)
        this.sendDescription = this.sendDescription.bind(this)
        this.keyPressDescription = this.keyPressDescription.bind(this)
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
            this.props.finish()
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

    render() {
        if (this.props.process){
            
            return (
                <div style = {{ backgroundColor: "#FAFAFA"}}>
                    <div className = "NavBar">
                        <table>
                            <tbody>
                                <tr>
                                    <td className = "Title"> 
                                        {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                        Round {this.props.round}: Creative Task
                                    </td>
                                    <td className = "Space"></td>
                                    <td className = "Instruction">
                                        <div className = "InstructionBtn">Instruction</div>
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
                                                        <div className = "confirm" onClick = {() => this.props.confirm()} >
                                                            Confirm
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
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
