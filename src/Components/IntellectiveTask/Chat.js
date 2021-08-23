import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SendBtn from "../SendBtn.png"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Bunny from "../Bunny.png"
import Kitty from "../Kitty.png"
import Puppy from "../Puppy.png"
import Squirrel from "../Squirrel.png"
import Countdown from 'react-countdown';
import './Intellective.css'
import ChatRender from '../Chat'

export default class Chat extends Component {

    state = {
        answer: "",
        initialTime: "",
    }

    constructor(props) {
        super(props)
        this.sendAns = this.sendAns.bind(this)
        this.keyPressAns = this.keyPressAns.bind(this)
    }

    prevAns = () => {
        var temp = []
        var ans = [85, 13, 21, 277, 121]
        if (this.props.prevAns.length !== 0){
            temp.push(
                <tr>
                    <td></td>
                    <td>Your Answer</td>
                    <td>Correct Answer</td>
                </tr>
            )
        }
        for (var i = 0; i < this.props.prevAns.length; i ++){
            temp.push(
                <tr>
                    <td>
                        Q{i + 1}: 
                    </td>
                    <td>
                        {this.props.prevAns[i]}
                    </td>
                    <td>
                        {ans[i]}
                    </td>
                </tr>
                
            )
        }
        if(this.props.prevAns.length === 5){
            this.props.finish()
        }
        return (temp)
    }

    keyPressAns(e){
        if(e.keyCode === 13){
            this.sendAns()
        }
    }
    sendAns = () => {
        if (this.state.answer !== ""){
            this.props.submit(this.state.answer)
        }
        this.setState({ answer: "" })
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

    renderQuestion = () => {
        const questions = ["Question 1: What percentage of the U.S. population has access to the Internet?", "Question 2: Estimate the number of states that border Canada.", "Question 3: What percentage of the U.S. population is illiterate?", "Question 4: How long is the Grand Canyon in miles?", "Question 5: How many medals have U.S. won in the Rio 2016 Summer Olympics?"]
        return (
            questions[this.props.questionNo]
        )
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
                                        Round {this.props.round}: Intellective Task
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
                                    <td className = "question" colSpan = {2}>
                                        {this.renderQuestion()}
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "ColumnOne">
                                        <table className = "firstColumnInt">
                                            <tbody>
                                                <tr>
                                                    <td className = "TimerInt" colSpan = {2}>
                                                        Time Left : <span className = "blue"><Countdown date={this.props.time + 300000} renderer={this.renderer} /></span>
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
                                                        Previous Answers
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2} className = "prevAnswer">
                                                        <table className = "prevAnsTable">
                                                            <tbody>
                                                                {this.prevAns()}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2} className = "heading2Int">
                                                        Submit Answer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan = {2}>
                                                        <span className = "textBoxInt">
                                                            <InputBase
                                                                className = "AnswerInput"
                                                                placeholder="Answer Here"
                                                                inputProps={{ 'aria-label': 'naked' }}
                                                                onChange = {event => this.setState({answer: event.target.value})}
                                                                onKeyDown={this.keyPressAns}
                                                                value={this.state.answer}
                                                            />
                                                            <img src={SendBtn} alt = "" className='send' onClick = {this.sendAns}/>
                                                        </span>
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
