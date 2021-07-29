import React, { Component } from 'react'
import './Chat.css'
import InputBase from '@material-ui/core/InputBase';
import SendBtn from "./SendBtn.png"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Bunny from "./Bunny.png"
import Kitty from "./Kitty.png"
import Puppy from "./Puppy.png"
import Squirrel from "./Squirrel.png"
import Countdown from 'react-countdown';

export default class Chat extends Component {

    state = {
        msg: "",
    }

    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.sendMsg = this.sendMsg.bind(this)
        this.keyPress = this.keyPress.bind(this)
    }
    
    sendMsg = () => {
        if (this.state.msg !== ""){
            this.props.handler(this.props.name, this.state.msg)
        }
        this.setState({ msg: "" })
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

    renderMsg = () => {
        var msg = []
        for (var i = 0; i < this.props.msgList.length; i ++){
            if (this.props.nameList[i] === this.props.nameList[i - 1]) {
                if (this.props.nameList[i] === this.props.name) {
                    msg.push(
                        <tr>
                            <td className = "yourName">
                            </td>
                            <td className = "myMsg">
                                <div className = "myMsgDiv">
                                    {this.props.msgList[i]}
                                </div>
                                        
                            </td>
                            <td className = "myName">
                            </td>
                        </tr>
                    )
                }
                else {
                    msg.push(
                        <tr>
                            <td className = "yourName">
                            </td>
                            <td className = "yourMsg">
                                <div className = "yourMsgDiv">
                                    {this.props.msgList[i]}
                                </div>
                                        
                            </td>
                            <td className = "myName">
                            </td>
                        </tr>
                    )
                }
            }
            else if (this.props.nameList[i] === this.props.name){
                if (this.props.name === "Kitty"){
                    msg.push(
                        <tr>
                            <td className = "yourName">
                            </td>
                            <td className = "myMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameMe" colSpan = {2}>
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td/>
                                            <td className = "myMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName">
                                <img className = "myPic" src={Kitty} alt = ""/>
                            </td>
                        </tr>
                    )
                }
                else if (this.props.name === "Bunny"){
                    msg.push(
                        <tr>
                            <td className = "yourName">
                            </td>
                            <td className = "myMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameMe">
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "myMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName">
                                <img className = "myPic" src={Bunny} alt = ""/>
                            </td>
                        </tr>
                    )
                }
                else if (this.props.name === "Puppy"){
                    msg.push(
                        <tr>
                            <td className = "yourName"></td>
                            <td className = "myMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameMe">
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "myMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName">
                                <img className = "myPic" src={Puppy} alt = ""/>
                            </td>
                        </tr>
                    )
                }
                else {
                    msg.push(
                        <tr>
                            <td className = "yourName">
                            </td>
                            <td className = "myMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameMe">
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "myMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName">
                                <img className = "myPic" src={Squirrel} alt = ""/>
                            </td>
                        </tr>
                    )
                }
            }
            else {
                if (this.props.nameList[i] === "Kitty"){
                    msg.push(
                        <tr>
                            <td className = "yourName">
                                <img className = "myPic" src={Kitty} alt = ""/>
                            </td>
                            <td className = "yourMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameYou">
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "yourMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName"></td>
                        </tr>
                    )
                }
                else if (this.props.nameList[i] === "Bunny"){
                    msg.push(
                        <tr>
                            <td className = "yourName">
                                <img className = "myPic" src={Bunny} alt = ""/>
                            </td>
                            <td className = "yourMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameYou">
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "yourMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName"></td>
                        </tr>
                    )
                }
                else if (this.props.nameList[i] === "Puppy"){
                    msg.push(
                        <tr>
                            <td className = "yourName">
                                <img className = "myPic" src={Puppy} alt = ""/>
                            </td>
                            <td className = "yourMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameYou">
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "yourMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName"></td>
                        </tr>
                    )
                }
                else {
                    msg.push(
                        <tr>
                            <td className = "yourName">
                                <img className = "myPic" src={Squirrel} alt = ""/>
                            </td>
                            <td className = "yourMsg">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className = "nameYou">
                                                {this.props.nameList[i]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "yourMsgDiv">
                                                {this.props.msgList[i]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className = "myName"></td>
                        </tr>
                    )
                }
            }
        }
        return(msg)
    }

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
                                        Round 1: Creating Google Ads
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
                                                        Time Left : <span className = "blue"><Countdown date={Date.now() + 420000} renderer={this.renderer} /></span>
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
                                    <td>
                                        <div className = "heading1">
                                            Chat
                                        </div>
                                        <div className = "ChatRecord" id = "ChatRecord">
                                            <table className = "chatTable">
                                                <tbody>
                                                    {this.renderMsg()}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className = "ChatBox">
                                            <span className = "TextBox">
                                                <InputBase
                                                    className = "TextInput"
                                                    placeholder=""
                                                    inputProps={{ 'aria-label': 'naked' }}
                                                    onChange = {event => this.setState({msg: event.target.value})}
                                                    onKeyDown={this.keyPress}
                                                    autoFocus
                                                    value={this.state.msg}
                                                />
                                                <InsertEmoticonIcon color="action" style={{ fontSize: 27 }} className = "emoji"/>
                                                <img src={SendBtn} alt = "" className='send' onClick = {this.sendMsg}/>
                                            </span>
                                        </div>
                                    </td>
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
