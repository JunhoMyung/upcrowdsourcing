import React, { Component } from 'react'
import Greeting from '../Greeting/Greeting'
import './Lobby.css'
import Accept from '../Accept/Accept'
import Countdown from 'react-countdown';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';

export default class Lobby extends Component {

    state = {
        greeting: true,
        greeting2: false,
        greeting3: false,
        greeting4: false,
        accept: false,
        permission: false,
        init: true,
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
            this.props.handleAcceptTime()
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
        if(!this.state.permission){
            this.setState({ permission: true })
            this.props.handlePermission()
        }
    }

    prevGreeting3 = () => {
        this.setState({ greeting2: true, greeting3: false })
    }

    nextGreeting3 = () => {
        this.setState({ greeting3: false, greeting4: true })
    }

    prevGreeting4 = () => {
        this.setState({ greeting3: true, greeting4: false })
    }

    nextGreeting4 = () => {
        this.setState({ greeting4: false })
        if (this.state.init){
            this.props.socket.emit("ready")
            this.props.handleWaitTime()
            this.setState({ init: false })
        }
    }

    closeAccept1 = () => {
        this.props.socket.emit("accept")
    }

    noAccept = () => {
        this.setState({ accept: false })
        this.props.socket.emit("acceptfail")
    }

    refuse = () => {
        this.props.socket.emit("refuse")
        this.props.handleUnaccept()
    }

    renderParticipant = () => {
        if(this.props.playerList === 1){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
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
                    <PersonOutlineIcon fontSize="large"/>
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
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.playerList === 5){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.playerList === 6){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                </>
            )
        }
    }
    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if(!this.state.accept){
                this.props.handleEndWaiting()
            }
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

    render() {
        if (this.props.process){
            return (
                <>
                    <Greeting
                        name = {this.props.name}
                        open = {this.state.greeting}
                        page2 = {this.state.greeting2}
                        page3 = {this.state.greeting3}
                        page4 = {this.state.greeting4}
                        handleNext1 = {this.nextGreeting1}
                        handlePrev2 = {this.prevGreeting2}
                        handleNext2 = {this.nextGreeting2}
                        handleNext3 = {this.nextGreeting3}
                        handlePrev3 = {this.prevGreeting3}
                        handleNext4 = {this.nextGreeting4}
                        handlePrev4 = {this.prevGreeting4}
                        handleMturk = {this.props.handleMturk}
                    />
                    <Accept
                        open = {this.state.accept}
                        handleNext = {this.closeAccept1}
                        accept = {this.props.accept}
                        handleNoAccept = {this.noAccept}
                        refuse = {this.refuse}
                        accepttime = {this.props.accepttime}
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
                                            <div className = "InstructionBtn" onClick = {() => this.setState({ greeting: true })}>Instruction</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className = "Waiting">
                            <table className = "lobbyTable">
                                <tbody>
                                    <tr>
                                        <td className = "TimerDiv">
                                            Remaining Time
                                            <br/>
                                            <div className="timer">
                                                <Countdown date={this.props.waittime + 1800000} renderer={this.renderer}/>
                                            </div>
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
