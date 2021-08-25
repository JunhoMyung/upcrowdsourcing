import React, { Component } from 'react'
import InstructionModal from './InstructionModal'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import Modal from 'react-bootstrap/Modal'
import { CountdownCircleTimer } from "react-countdown-circle-timer"

export default class Instruction extends Component {

    state = {
        greeting: true,
        greeting2: false,
        greeting3: false,
    }

    constructor(props) {
        super(props)
        this.nextGreeting1 = this.nextGreeting1.bind(this)
        this.nextGreeting2 = this.nextGreeting2.bind(this)
        this.prevGreeting2 = this.prevGreeting2.bind(this)
        this.nextGreeting3 = this.nextGreeting3.bind(this)
        this.prevGreeting3 = this.prevGreeting3.bind(this)
    }

    nextGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
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
        this.setState({ greeting3: false })
        this.props.socket.emit("Creative-Instruction")
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

    renderTime = (time) => {
        if (time > 60){
            return (
                <div className="time-wrapper">
                  <div className="time">{Math.round(time/60)}</div>
                  <div>minutes</div>
                </div>
              );
        }
        else if (time === 0){
            this.props.handleReading()
            return(<></>)
        }
        return (
          <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>seconds</div>
          </div>
        );
    };


    render() {
        if (this.props.process){
            return (
                <>
                    <InstructionModal
                        open = {this.state.greeting}
                        page2 = {this.state.greeting2}
                        page3 = {this.state.greeting3}
                        handleNext1 = {this.nextGreeting1}
                        handlePrev2 = {this.prevGreeting2}
                        handleNext2 = {this.nextGreeting2}
                        handleNext3 = {this.nextGreeting3}
                        handlePrev3 = {this.prevGreeting3}
                    />
                    <Modal
                        show={this.props.reading}
                        onHide={this.props.handleReading}
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="lg"
                    >
                        <Modal.Body>
                            <table className = "acceptTable">
                                <tbody>
                                    <tr>
                                        <td className = "readingTitle">
                                            Reading Time
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className = "acceptTimer">
                                            <CountdownCircleTimer
                                                isPlaying
                                                duration={130}
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
                                        <td className = "readingSubtitle">
                                            Now, you have 2 minutes to read about the product your group is going to advertise.
                                            <br/>
                                            <br/>
                                            <a href="https://www.kickstarter.com/projects/takween/takween?ref=section-design-tech-projectcollection-6-staff-picks-newest" target="_blank" rel="noreferrer">
                                                Click here 
                                            </a>
                                            &nbsp;and learn about the special features of this product!
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Modal.Body>       
                    </Modal>
                    <div style = {{ backgroundColor: "#FAFAFA"}} className = "background">
                        <div className = "NavBar">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className = "Title"> 
                                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                            {/* Round {this.props.round}: Creative Task */}
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
        else{
            return(
                <></>
            )
        }
    }
}
