import React, { Component } from 'react'
import Greeting from '../Greeting/Greeting'
import './Lobby.css'

export default class Lobby extends Component {

    state = {
        greeting: true,
        greeting2: false
    }

    constructor(props) {
        super(props)
        this.closeGreeting1 = this.closeGreeting1.bind(this)
        this.closeGreeting2 = this.closeGreeting2.bind(this)
    }

    closeGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
    }

    closeGreeting2 = () => {
        this.props.socket.emit("newMember")
        this.setState({ greeting2: false })
    }

    render() {
        if (this.props.process){
            return (
                <>
                    <Greeting
                        open = {this.state.greeting}
                        page2 = {this.state.greeting2}
                        handleNext = {this.closeGreeting1}
                        handleClose = {this.closeGreeting2}
                    />
                    <div style = {{ backgroundColor: "#FAFAFA"}} className = "background">
                        <div className = "NavBar">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className = "Title"> 
                                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                            Welcome!
                                        </td>
                                        <td className = "Space"></td>
                                        <td className = "Instruction">
                                            <div className = "InstructionBtn">Instruction</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className = "Waiting">
                            <div className = "waitingTitle">
                                Waiting for other participants...
                            </div>
                            <div className = "waitingNumber">
                                {this.props.playerList.length}/4
                            </div>
                        </div>
                    </div>
                </>
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
