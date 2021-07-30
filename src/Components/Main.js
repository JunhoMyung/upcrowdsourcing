import React, { Component } from 'react'
import CreativeTask from './CreativeTask/Chat'
import CreativeInstruction from './CreativeTask/Instruction'
import IntellectiveTask from './IntellectiveTask/Chat'
import IntellectiveInstruction from './IntellectiveTask/Instruction'
import { io } from "socket.io-client"
import Lobby from './Lobby/Lobby'
import Survey from './Survey/Survey'
import ChitChat from './ChitChat'

export default class main extends Component {

    state = {
        lobby: true,
        creativeTask: false,
        creativeInstruction: false,
        Creative_Instruction: 0,
        intellectiveInstruction: false,
        intellectiveTask: false,
        Intel_Instruction: 0, 
        survey: false,
        chitchat: false,
        ending: false,
        round: 1,
        prev: 0,
        accept: 0,
        msgList: [],
        nameList: [],
        playerName: "",
        questionNo: 0,
        prevAns: [],
        playerList: 0,
        time: "",
        Reading: false,
        title: "",
        description: "",
    }

    constructor(props) {
        super(props)
        this.socket = io("ec2-3-36-126-54.ap-northeast-2.compute.amazonaws.com:8080");
        this.socket.on("receiveMsg", (Msg) => {
            var temp1 = [...this.state.msgList]
            var temp2 = [...this.state.nameList]
            temp1.push(Msg["msg"])
            temp2.push(Msg["name"])
            this.setState({ msgList: temp1, nameList: temp2 })
        })
        this.socket.on("name", (name) => {
            this.setState({ playerName: name })
        })
        this.socket.on("newMember", (num) => {
            this.setState({ playerList: num })
        })
        this.socket.on("accept", (num) => {
            this.setState({ accept: num })
        })
        this.socket.on("allAccept", (task) => {
            if (task === 0){
                this.setState({ lobby: false, intellectiveInstruction: true, prev: 0 })
            }
            else {  
                this.setState({ lobby: false, creativeInstruction: true, prev: 1 })
            }
        })
        this.socket.on("Intel-Instruction", (num) => {
            this.setState({ Intel_Instruction: num })
        })
        this.socket.on("Intel-Instruction-Done", () =>{
            this.setState({ intellectiveInstruction: false, intellectiveTask: true })
            this.setState({ time: Date.now() })
        })
        this.socket.on("Creative-Instruction", (num) => {
            this.setState({ Creative_Instruction: num })
        })
        this.socket.on("Creative-Instruction-Done", () =>{
            this.setState({ Reading: true })
        })
        this.socket.on("AnswerInt", (ans) => {
            var temp = [...this.state.prevAns]
            var temp2 = this.state.questionNo
            temp.push(ans)
            this.setState({ prevAns: temp, questionNo: temp2+1 })
        })
        this.socket.on("adtitle", (title) => {
            this.setState({ title: title })
        })
        this.socket.on("addescription", (description) => {
            this.setState({ description: description })
        })
        this.socket.on("finish", () => {
            this.setState({ survey: true, creativeTask: false, time: Date.now() })
        })
        this.handleReading = this.handleReading.bind(this)
        this.handleFinishCre = this.handleFinishCre.bind(this)
        this.handleFinishInt = this.handleFinishInt.bind(this)
        this.handleSurvey = this.handleSurvey.bind(this)
        this.handleChitChat = this.handleChitChat.bind(this)
    }

    handleReading = () => {
        this.setState({ Reading: false, creativeInstruction: false, creativeTask:true })
        this.setState({ time: Date.now() })
    }

    handleFinishInt = () => {
        this.setState({ survey: true, intellectiveTask: false, time: Date.now()})
    }

    handleFinishCre = () => {
        this.setState({ survey: true, creativeTask: false, time: Date.now() })
    }

    handleSurvey = () => {
        if(this.state.round === 1){
            this.setState({ survey: false, chitchat: true })
        }
        else {
            this.setState({ survey: false })
        }
    }

    handleChitChat = () => {
        if(this.state.prev === 0){
            this.setState({ chitchat: false, creativeInstruction: true, round: 2 })
        }
        else{
            this.setState({ chitchat: false, intellectiveInstruction: true, round: 2 })
        }
    }

    render() {

        return (
            <div>
                <Lobby
                    process = {this.state.lobby}
                    socket = {this.socket}
                    playerList = {this.state.playerList}
                    name = {this.state.playerName}
                    accept = {this.state.accept}
                />
                <CreativeInstruction 
                    process = {this.state.creativeInstruction}
                    round = {this.state.round}
                    socket = {this.socket}
                    playerList = {this.state.Creative_Instruction}
                    reading = {this.state.Reading}
                    handleReading = {this.handleReading}
                />
                <CreativeTask
                    process = {this.state.creativeTask}
                    handler = {(Name, Msg) => {
                        this.socket.emit("send", Name, Msg)
                    }}
                    msgList = {this.state.msgList}
                    nameList = {this.state.nameList}
                    name = {this.state.playerName}
                    round = {this.state.round}
                    time = {this.state.time}
                    submitTitle = {(title) => {this.socket.emit("submitTitle", title)}}
                    submitDescription = {(title) => {this.socket.emit("submitDescription", title)}}
                    title = {this.state.title}
                    description = {this.state.description}
                    finish = {this.handleFinishCre}
                    // confirm = {this.socket.emit("finish")}
                />
                <IntellectiveInstruction 
                    process = {this.state.intellectiveInstruction}
                    round = {this.state.round}
                    socket = {this.socket}
                    playerList = {this.state.Intel_Instruction}
                />
                <IntellectiveTask
                    process = {this.state.intellectiveTask}
                    handler = {(Name, Msg) => {
                        this.socket.emit("send", Name, Msg)
                    }}
                    msgList = {this.state.msgList}
                    nameList = {this.state.nameList}
                    name = {this.state.playerName}
                    round = {this.state.round}
                    submit = {(ans) => {this.socket.emit("AnswerInt", ans)}}
                    prevAns = {this.state.prevAns}
                    questionNo = {this.state.questionNo}
                    time = {this.state.time}
                    finish = {this.handleFinishInt}
                />
                <Survey 
                    process = {this.state.survey}
                    close = {this.handleSurvey}
                    round = {this.state.round}
                />
                <ChitChat 
                    process = {this.state.chitchat}
                    close = {this.handleChitChat}
                    time = {this.state.time}
                    name = {this.state.playerName}
                    msgList = {this.state.msgList}
                    nameList = {this.state.nameList}
                    handler = {(Name, Msg) => {
                        this.socket.emit("send", Name, Msg)
                    }}
                />
            </div>
        )
    }
}
