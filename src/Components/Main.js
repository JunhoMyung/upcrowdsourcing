import React, { Component } from 'react'
import Greeting from './Greeting/Greeting'
import { io } from "socket.io-client"

export default class main extends Component {

    state = {
        greeting: true,
        greeting2: false,
    }

    constructor(props) {
        super(props)
        this.closeGreeting1 = this.closeGreeting1.bind(this)
        this.closeGreeting2 = this.closeGreeting2.bind(this)
        this.handleClink = this.handleClink.bind(this)
        this.socket = io("https://ec2-3-35-132-164.ap-northeast-2.compute.amazonaws.com");
    }

    closeGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
    }

    closeGreeting2 = () => {
        this.setState({ greeting2: false })
    }

    handleClink() {
        this.socket.emit("try", this.state.playerName, this.state.roomName);
    }

    render() {
        return (
            <div>
                <button onClick = {this.handleClink}>try</button>
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
