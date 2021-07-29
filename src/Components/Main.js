import React, { Component } from 'react'
import Chat from './Chat/Chat'
import { io } from "socket.io-client"
import Lobby from './Lobby/Lobby'

export default class main extends Component {

    state = {
        progress: {
            lobby: true,
            accept: false,
            chat: false,
        },
        msgList: [],
        nameList: [],
        playerName: "",
        playerList: [],
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
        this.socket.on("changeMember", (participantList) => {
            this.setState({ playerList: participantList })
        })
        this.socket.on("full", () => {
            this.setState({ progress: {lobby: false, chat: true} })
        })
    }
    render() {
        return (
            <div>
                <Lobby
                    process = {this.state.progress["lobby"]}
                    socket = {this.socket}
                    playerList = {this.state.playerList}
                    progress = {this.state.progress}
                />
                <Chat
                    process = {this.state.progress["chat"]}
                    handler = {(Name, Msg) => {
                        this.socket.emit("send", Name, Msg)
                    }}
                    msgList = {this.state.msgList}
                    nameList = {this.state.nameList}
                    name = {this.state.playerName}
                />
            </div>
        )
    }
}
