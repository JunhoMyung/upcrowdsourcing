import React, { Component } from 'react'
import Greeting from './Greeting/Greeting'
import Chat from './Chat/Chat'
import { io } from "socket.io-client"

export default class main extends Component {

    state = {
        greeting: true,
        greeting2: false,
        msgList: [],
        // timestampList: [],
        clientList: []
    }

    constructor(props) {
        super(props)
        this.closeGreeting1 = this.closeGreeting1.bind(this)
        this.closeGreeting2 = this.closeGreeting2.bind(this)
        this.socket = io("ec2-3-36-126-54.ap-northeast-2.compute.amazonaws.com:8080");
        this.socket.on("receiveMsg", (Name, Msg /*TIMESTAMP*/) => {
            var temp1 = [...this.state.msgList]
            temp1.push(Msg)
            this.setState({ msgList: temp1})
            console.log(this.state.msgList)
        })
    }

    closeGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
    }

    closeGreeting2 = () => {
        this.setState({ greeting2: false })
    }

    render() {
        return (
            <div>
                <Chat
                    handler = {(Name, Msg) => {
                        this.socket.emit("send", Name, Msg)
                    }}
                    msgList = {this.state.msgList}
                />
                <Greeting
                    open = {this.state.greeting}
                    page2 = {this.state.greeting2}
                    handleNext = {this.closeGreeting1}
                    handleClose = {this.closeGreeting2}
                />
            </div>
        )
    }
}
