import React, { Component } from 'react'
import Greeting from '../Greeting/Greeting'
import './Lobby.css'
import Accept from '../Accept/Accept'
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';

export default class Lobby extends Component {

    state = {
        greeting: true,
        greeting2: false,
        greeting3: false,
        accept: false,
        countdown: false,
    }

    constructor(props) {
        super(props)
        this.nextGreeting1 = this.nextGreeting1.bind(this)
        this.nextGreeting2 = this.nextGreeting2.bind(this)
        this.prevGreeting2 = this.prevGreeting2.bind(this)
        this.nextGreeting3 = this.nextGreeting3.bind(this)
        this.prevGreeting3 = this.prevGreeting3.bind(this)
        this.closeAccept1 = this.closeAccept1.bind(this)
        this.props.socket.on("full", () => {
            this.setState({ accept: true })
        })
    }

    nextGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
        if (this.props.name === ""){
            this.props.socket.emit("newMember")
        }
    }

    prevGreeting2 = () => {
        this.setState({ greeting: true, greeting2: false })
    }

    nextGreeting2 = () => {
        this.setState({ greeting2: false, greeting3: true })
    }

    prevGreeting3 = () => {
        this.setState({ greeting2: true, greeting3: false })
    }

    nextGreeting3 = () => {
        this.setState({ greeting3: false, countdown: true })
        this.props.socket.emit("ready")
    }

    closeAccept1 = () => {
        this.props.socket.emit("accept")
    }

    renderTime = (time) => {
        if(time > 60){
            return(
                <div className="time-wrapper">
                    <div className="time">{Math.floor(time/60)}</div>
                    <div>minutes</div>
                </div>
            )
        }
        else{
            return(
                <div className="time-wrapper">
                    <div className="time">{time}</div>
                    <div>seconds</div>
                </div>
            )
        }
    }

    renderParticipant = () => {
        if(this.props.playerList === 1){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.playerList === 2){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.playerList === 3){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.playerList === 4){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                </>
            )
        }
    }

    render() {
        if (this.props.process){
            return (
                <>
                    <Greeting
                        name = {this.props.name}
                        open = {this.state.greeting}
                        page2 = {this.state.greeting2}
                        page3 = {this.state.greeting3}
                        handleNext1 = {this.nextGreeting1}
                        handlePrev2 = {this.prevGreeting2}
                        handleNext2 = {this.nextGreeting2}
                        handleNext3 = {this.nextGreeting3}
                        handlePrev3 = {this.prevGreeting3}
                    />
                    <Accept
                        open = {this.state.accept}
                        handleNext = {this.closeAccept1}
                        accept = {this.props.accept}
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
                            <table className = "lobbyTable">
                                <tbody>
                                    <tr>
                                        <td className = "centerLobby">
                                            <CountdownCircleTimer
                                                isPlaying = {this.state.countdown}
                                                duration={600}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => this.renderTime(remainingTime)}
                                            </CountdownCircleTimer>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className = "bodyLobby">
                                            <br/>
                                            Waiting for other participants...
                                            <br/>
                                            <br/>
                                            {this.renderParticipant()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
