import React, { Component } from 'react'
import InstructionModal from './InstructionModal'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import Modal from 'react-bootstrap/Modal'
import Countdown from 'react-countdown';
import InstructionModalBtn from './InstructionModalBtn'

export default class Instruction extends Component {

    state = {
        greeting: true,
        greeting2: false,
        greeting3: false,
        greeting4: false,
        btn: false,
        btn2: false,
        btn3: false,
        btn4: false,
    }

    constructor(props) {
        super(props)
        this.nextGreeting1 = this.nextGreeting1.bind(this)
        this.nextGreeting2 = this.nextGreeting2.bind(this)
        this.prevGreeting2 = this.prevGreeting2.bind(this)
        this.nextGreeting3 = this.nextGreeting3.bind(this)
        this.prevGreeting3 = this.prevGreeting3.bind(this)
        this.nextGreeting4 = this.nextGreeting4.bind(this)
        this.prevGreeting4 = this.prevGreeting4.bind(this)
        this.nextBtn1 = this.nextBtn1.bind(this)
        this.nextBtn2 = this.nextBtn2.bind(this)
        this.prevBtn2 = this.prevBtn2.bind(this)
        this.nextBtn3 = this.nextBtn3.bind(this)
        this.prevBtn3 = this.prevBtn3.bind(this)
        this.nextBtn4 = this.nextBtn4.bind(this)
        this.prevBtn4 = this.prevBtn4.bind(this)
        this.closeBtn1 = this.closeBtn2.bind(this)
        this.closeBtn2 = this.closeBtn3.bind(this)
        this.closeBtn3 = this.closeBtn3.bind(this)
        this.closeBtn4 = this.closeBtn4.bind(this)
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
        this.setState({ greeting3: false, greeting4: true })
        
    }
    prevGreeting4 = () => {
        this.setState({ greeting3: true, greeting4: false })
    }
    nextGreeting4 = () => {
        this.setState({ greeting4: false })
        this.props.socket.emit("Creative-Instruction")
    }

    nextBtn1 = () => {
        this.setState({ btn: false, btn2: true })
    }

    prevBtn2 = () => {
        this.setState({ btn: true, btn2: false })
    }

    nextBtn2 = () => {
        this.setState({ btn2: false, btn3: true })
    }

    prevBtn3 = () => {
        this.setState({ btn2: true, btn3: false })
    }

    nextBtn3 = () => {
        this.setState({ btn3: false, btn4: true })
        
    }
    prevBtn4 = () => {
        this.setState({ btn3: true, btn4: false })
    }
    nextBtn4 = () => {
        this.setState({ btn4: false })
    }

    closeBtn1 = () => {
        this.setState({ btn: false })
    }
    closeBtn2 = () => {
        this.setState({ btn2: false })
    }
    closeBtn3 = () => {
        this.setState({ btn3: false })
    }
    closeBtn4 = () => {
        this.setState({ btn4: false })
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

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            this.props.handleReading()
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
                    <InstructionModal
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
                    />
                    <InstructionModalBtn
                        open = {this.state.btn}
                        page2 = {this.state.btn2}
                        page3 = {this.state.btn3}
                        page4 = {this.state.btn4}
                        handleNext1 = {this.nextBtn1}
                        handlePrev2 = {this.prevBtn2}
                        handleNext2 = {this.nextBtn2}
                        handleNext3 = {this.nextBtn3}
                        handlePrev3 = {this.prevBtn3}
                        handleNext4 = {this.nextBtn4}
                        handlePrev4 = {this.prevBtn4}
                        handleClose1 = {this.closeBtn1}
                        handleClose2 = {this.closeBtn2}
                        handleClose3 = {this.closeBtn3}
                        handleClose4 = {this.closeBtn4}
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
                                        <td>
                                            <div className="timerReading">
                                                <Countdown date={this.props.readingtime + 120000} renderer={this.renderer}/>
                                            </div>
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
                                            Creating Google Ads
                                        </td>
                                        <td className = "Space"></td>
                                        <td className = "Instruction">
                                            <div className = "InstructionBtn" onClick = {() => this.setState({ btn: true })}>Instruction</div>
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
