import React, { Component } from 'react'
import Bunny from "./Bunny.png"
import Kitty from "./Kitty.png"
import Puppy from "./Puppy.png"
import Squirrel from "./Squirrel.png"
import Countdown from 'react-countdown'
import Chat from "./Chat"

export default class ChitChat extends Component {

    state = {
        msg: "",
        emoji: false,
        temp: true,
    }

    constructor(props) {
        super(props)
        this.keyPress = this.keyPress.bind(this)
    }

    keyPress(e){
        if(e.keyCode === 13){
            this.sendMsg()
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
            this.props.close()
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
                                        Breaktime: Have a free chitchat with each other!
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
                                                    <td className = "Timer" colSpan = {2}>
                                                        Time Left : <span className = "blue"><Countdown date={this.props.time + 420000} renderer={this.renderer} /></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2} className = "heading2">
                                                        <br/>
                                                        Participants
                                                    </td>
                                                </tr>
                                                {this.participants()}
                                            </tbody>
                                        </table>
                                    </td>
                                    <Chat 
                                        nameList = {this.props.nameList}
                                        msgList = {this.props.msgList}
                                        reactionList = {this.props.reactionList}
                                        name = {this.props.name}
                                        timeList = {this.props.timeList}
                                        handler = {this.props.handler}
                                        reaction = {this.props.reaction}
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
