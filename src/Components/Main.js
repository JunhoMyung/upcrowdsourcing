import React, { Component } from 'react'
import CreativeTask from './CreativeTask/Chat'
import CreativeInstruction from './CreativeTask/Instruction'
import { io } from "socket.io-client"
import Lobby from './Lobby/Lobby'
import Survey from './Survey/Survey'
import Ending from './Ending/Ending'

export default class main extends Component {

    state = {
        lobby: true,
        creativeTask: false,
        creativeInstruction: false,
        ending: false,
        Creative_Instruction: 0,
        survey: false,
        accept: 0,
        msgList: [],
        nameList: [],
        timeList: [],
        replyList: [],
        reactionList:{},
        playerName: "",
        playerList: 0,
        roomName: "",
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
            var temp3 = [...this.state.timeList]
            var temp4 = [...this.state.replyList]
            temp1.push(Msg["msg"])
            temp2.push(Msg["name"])
            temp3.push(Msg["time"])
            temp4.push(Msg["reply"])
            this.setState({ msgList: temp1, nameList: temp2, timeList: temp3, replyList: temp4 })
        })
        this.socket.on("name", (name, room) => {
            this.setState({ playerName: name, roomName: room })
        })
        this.socket.on("newMember", (num) => {
            this.setState({ playerList: num })
        })
        this.socket.on("accept", (num) => {
            this.setState({ accept: num })
        })
        this.socket.on("allAccept", () => {
            this.setState({ lobby: false, creativeInstruction: true })
        })
        this.socket.on("reaction", (emoji, name, i) => {
            var temp = this.state.reactionList
            console.log(emoji)
            var keylist = Object.keys(temp)
            if (keylist.includes(i.toString())){
                var emojiList = temp[i.toString()]
                if(Object.keys(emojiList).includes(emoji)){
                    var nameList = emojiList[emoji]
                    if(nameList.includes(name)){
                        for( var j = 0; j < nameList.length; j++){ 
                            if ( nameList[j] === name) { 
                                nameList.splice(j, 1); 
                            }
                        }
                    }
                    else{
                        nameList.push(name)
                    }
                    temp[i.toString()][emoji] = nameList
                }
                else {
                    emojiList[emoji] = [name]
                    temp[i.toString()] = emojiList
                }
            }
            else{
                var object = {}
                object[emoji] = [name]
                temp[i.toString()] = object
            }
            this.setState({ reactionList: temp })
        })
        this.socket.on("Creative-Instruction", (num) => {
            this.setState({ Creative_Instruction: num })
        })
        this.socket.on("Creative-Instruction-Done", () =>{
            this.setState({ Reading: true })
        })
        this.socket.on("adtitle", (title) => {
            this.setState({ title: title })
        })
        this.socket.on("addescription", (description) => {
            this.setState({ description: description })
        })
        this.socket.on("finish", () => {
            this.setState({ survey: true, creativeTask: false })
        })
        this.handleReading = this.handleReading.bind(this)
        this.handleFinishCre = this.handleFinishCre.bind(this)
        this.handleSurvey = this.handleSurvey.bind(this)
    }

    // componentDidMount = () => {
    //     window.addEventListener('beforeunload', function (e) {
    //         e.preventDefault();
    //         e.returnValue = ' ';
    //     });
    //     window.addEventListener('unload', function (e) {
    //         this.socket.emit('actual_disconnect');
    //     });
    // }

    handleReading = () => {
        this.setState({ Reading: false, creativeInstruction: false, creativeTask:true })
        this.setState({ time: Date.now() })
    }

    handleFinishCre = () => {
        this.setState({ survey: true, creativeTask: false })
    }

    handleSurvey = () => {
        this.setState({ survey: false, ending: true })
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
                    socket = {this.socket}
                    playerList = {this.state.Creative_Instruction}
                    reading = {this.state.Reading}
                    handleReading = {this.handleReading}
                />
                <CreativeTask
                    process = {this.state.creativeTask}
                    handler = {(Name, Msg, Time, Reply) => {
                        this.socket.emit("send", Name, Msg, Time, Reply)
                    }}
                    msgList = {this.state.msgList}
                    nameList = {this.state.nameList}
                    name = {this.state.playerName}
                    reactionList = {this.state.reactionList}
                    time = {this.state.time}
                    replyList = {this.state.replyList}
                    submitTitle = {(title) => {this.socket.emit("submitTitle", title)}}
                    submitDescription = {(title) => {this.socket.emit("submitDescription", title)}}
                    title = {this.state.title}
                    description = {this.state.description}
                    finish = {this.handleFinishCre}
                    timeList = {this.state.timeList}
                    reaction = {(Name, msg, i) => {
                        this.socket.emit("reaction", Name, msg, i)
                    }}
                    confirm = {() => this.socket.emit("finish")}
                />
                <Survey 
                    process = {this.state.survey}
                    close = {this.handleSurvey}
                />
                <Ending
                    process = {this.state.ending}
                    roomName = {this.state.roomName}
                />
            </div>
        )
    }
}
