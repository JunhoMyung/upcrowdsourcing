import React, { Component } from 'react'
import CreativeTask from './CreativeTask/Chat'
import CreativeInstruction from './CreativeTask/Instruction'
import { io } from "socket.io-client"
import Lobby from './Lobby/Lobby'
import Survey from './Survey/Survey'
import Ending from './Ending/Ending'
import Pay from './Lobby/Pay'
import Unaccept from './Accept/Unaccept'
import icon from "./Images/icon.png"
import Leave from './CreativeTask/Leave'
import WebNotification from 'react-web-notifications'
import { db } from './Firebase'

export default class main extends Component {

    state = {
        lobby: true,
        creativeTask: false,
        creativeInstruction: false,
        ending: false,
        end_waiting: false,
        unaccept: false,
        ready_notification: false,
        ask_permission: false,
        reading_notification: false,
        end_notification: false,
        terminate: false,
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
        chattime: "",
        waittime: "",
        accepttime: "",
        readingtime: "",
        Reading: false,
        title: "",
        description: "",
        entertime: null,
        waitingendtime: null,
        MTurkID: "",
    }

    constructor(props) {
        super(props)
        this.socket = io("https://www.up-kixlabserver.us", {
            closeOnBeforeunload: false // defaults to true
          });
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
        this.socket.on("terminate", () => {
            this.setState({ 
                creativeTask: false,
                creativeInstruction: false,
                ending: false, 
                survey: false,
                terminate: true,
            })
        })
        this.socket.on("allAccept", () => {
            this.setState({ lobby: false, ready_notification: false, survey: true, waitingendtime: Date.now() })
            db.ref('/' + this.state.roomName + '/participants/').push({MTurkID: this.state.MTurkID, character: this.state.playerName})
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
            this.handleReadingTime()
        })
        this.socket.on("adtitle", (title) => {
            this.setState({ title: title })
        })
        this.socket.on("addescription", (description) => {
            this.setState({ description: description })
        })
        this.socket.on("finish", () => {
            if(this.state.playerName === "Bunny"){
                db.ref('/' + this.state.roomName + '/reaction/').push(this.state.reactionList)
                db.ref('/' + this.state.roomName + '/answer/').push({title: this.state.title, description: this.state.description})
            }
            this.setState({ survey: true, creativeTask: false })
        })
        this.handleReading = this.handleReading.bind(this)
        this.handleSurvey = this.handleSurvey.bind(this)
        this.handleFinishWaiting = this.handleFinishWaiting.bind(this)
        this.handleUnaccept = this.handleUnaccept.bind(this)
        this.handlePermission = this.handlePermission.bind(this)
        this.handleMturk = this.handleMturk.bind(this)
    }

    componentDidMount = () => {
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = ' ';
        });
        window.addEventListener('unload', function (e) {
        });
    }

    handleMturk = (id) => {
        this.setState({ MTurkID: id })
    }

    handleReading = () => {
        this.setState({ Reading: false, creativeInstruction: false, creativeTask:true, reading_notification: true })
        this.setState({ chattime: Date.now() })
    }

    handleFinishWaiting = () => {
        this.setState({ lobby: false, end_waiting: true, end_notification: true })
        this.socket.emit("end-waiting")
    }

    handleUnaccept = () => {
        this.setState({ lobby: false, unaccept: true })
    }

    handleSurvey = () => {
        this.setState({ survey: false, ending: true })
    }

    handleWaitTime = () => {
        this.setState({ waittime: Date.now(), entertime: Date.now() })
    }

    handleAcceptTime = () => {
        this.setState({ accepttime: Date.now(), ready_notification: true })
    }

    handleReadingTime = () => {
        this.setState({ readingtime: Date.now() })
    }

    handlePermission = () => {
        if (this.state.ask_permission){
            this.setState({ ask_permission: false})
        }
        else {
            this.setState({ ask_permission: true})
        }
    }

    render() {

        return (
            <div>
                {this.state.ask_permission ? <WebNotification
                    title="Thank you for participating!" // the title prop is required
                    icon = {icon}
                    body="We will notify you when task is ready!"
                    timeout={9000}
                /> : <></>}
                {this.state.ready_notification ? <WebNotification
                    title="The Task is Ready!" // the title prop is required
                    icon = {icon}
                    body="Please come back to the website to proceed."
                    timeout={9000}
                /> : <></>}
                {this.state.reading_notification ? <WebNotification
                    title="Reading Time is Over!" // the title prop is required
                    icon = {icon}
                    body="Please come back to the website to proceed."
                    timeout={9000}
                /> : <></>}
                {this.state.end_notification ? <WebNotification
                    title="20 Minutes Have Passed" // the title prop is required
                    icon = {icon}
                    body="Please come back to the website to proceed."
                    timeout={9000}
                /> : <></>}
                <Lobby
                    process = {this.state.lobby}
                    socket = {this.socket}
                    playerList = {this.state.playerList}
                    name = {this.state.playerName}
                    accept = {this.state.accept}
                    handleEndWaiting = {this.handleFinishWaiting}
                    handleUnaccept = {this.handleUnaccept}
                    handleWaitTime = {this.handleWaitTime}
                    waittime = {this.state.waittime}
                    accepttime = {this.state.accepttime}
                    handleAcceptTime = {this.handleAcceptTime}
                    handlePermission = {this.handlePermission}
                    handleMturk = {this.handleMturk}
                    roomName = {this.state.roomName}
                    MTurkID = {this.state.MTurkID}
                />
                <CreativeInstruction 
                    process = {this.state.creativeInstruction}
                    socket = {this.socket}
                    playerList = {this.state.Creative_Instruction}
                    reading = {this.state.Reading}
                    handleReading = {this.handleReading}
                    readingtime = {this.state.readingtime}
                />
                <CreativeTask
                    process = {this.state.creativeTask}
                    handler = {(Name, Msg, Time, Reply) => {
                        this.socket.emit("send", Name, Msg, Time, Reply)
                    }}
                    msgList = {this.state.msgList}
                    nameList = {this.state.nameList}
                    name = {this.state.playerName}
                    roomName = {this.state.roomName}
                    MTurkID = {this.state.MTurkID}
                    reactionList = {this.state.reactionList}
                    time = {this.state.chattime}
                    socket = {this.socket}
                    replyList = {this.state.replyList}
                    submitTitle = {(title) => {this.socket.emit("submitTitle", title)}}
                    submitDescription = {(title) => {this.socket.emit("submitDescription", title)}}
                    title = {this.state.title}
                    description = {this.state.description}
                    finish = {(title, description) => {this.socket.emit("finish", title, description)}}
                    timeList = {this.state.timeList}
                    reaction = {(Name, msg, i) => {
                        this.socket.emit("reaction", Name, msg, i)
                    }}
                />
                <Survey 
                    process = {this.state.survey}
                    close = {this.handleSurvey}
                    name = {this.state.playerName}
                    roomName = {this.state.roomName}
                />
                <Ending
                    process = {this.state.ending}
                    roomName = {this.state.roomName}
                />
                <Pay
                    process = {this.state.end_waiting}
                    roomName = {this.state.roomName}
                    MTurkID = {this.state.MTurkID}
                />
                <Unaccept
                    process = {this.state.unaccept}
                />
                <Leave 
                    process = {this.state.terminate}
                    roomName = {this.state.roomName}
                />
            </div>
        )
    }
}
