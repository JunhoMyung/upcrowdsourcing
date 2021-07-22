import React, { Component } from 'react'
import './Chat.css'
import InputBase from '@material-ui/core/InputBase';
import SendBtn from "./SendBtn.png"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

export default class Chat extends Component {

    state = {
        msg: "",
    }

    constructor(props) {
        super(props)
        this.sendMsg = this.sendMsg.bind(this)
        this.keyPress = this.keyPress.bind(this)
    }

    sendMsg = () => {
        if (this.state.msg !== ""){
            this.props.handler("squirrel", this.state.msg)
        }
        this.setState({ msg: "" })
    }

    keyPress(e){
        if(e.keyCode === 13){
            this.sendMsg()
        }
    }

    render() {
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
                                    
                                </td>
                                <td>
                                    <div className = "heading1">
                                        Chat
                                    </div>
                                    <div className = "ChatRecord">
                                        {this.props.msgList}
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
}
