import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import "./Accept.css"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';

export default class Accept extends Component {

    state = {
        accepted: false
    }

    renderTime = (time) => {
        return (
          <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>seconds</div>
          </div>
        );
    };

    handleClick = () => {
        this.setState({ accepted: true })
        this.props.handleNext()
        console.log(this.state.accepted)
    }

    renderContent = () => {
        var temp = []
        if (this.state.accepted) {
            temp.push(
                <>
                    <tr>
                        <td className = "acceptBody">
                            Waiting for others...
                        </td>
                    </tr>
                    <td className = "centerBtn">
                        {this.renderParticipant()}
                    </td>
                </>
            )
        }
        else {
            temp.push(
                <>
                    <tr>
                        <td className = "acceptBody">
                            All members have joined!
                            <br/>
                            Are you ready?
                        </td>
                    </tr>
                    <tr>
                        <td className = "centerBtn">
                            <div className = "acceptBtn" onClick = {this.handleClick}>
                                Yes I'm Ready!
                            </div>
                        </td>
                    </tr>
                </>
            )
        }
        return(temp)
    }

    renderParticipant = () => {
        if(this.props.accept === 1){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.accept === 2){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.accept === 3){
            return(
                <>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonIcon fontSize="large"/>
                    <PersonOutlineIcon fontSize="large"/>
                </>
            )
        }
        else if(this.props.accept === 4){
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
              
        return (
            <div>
                <Modal
                    show={this.props.open}
                    onHide={this.props.handleClick}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                    // dialogClassName="border-radius-2"
                >
                    <Modal.Body>
                        <table className = "acceptTable">
                            <tbody>
                                <tr>
                                    <td className = "acceptTimer">
                                        <CountdownCircleTimer
                                            isPlaying={true}
                                            duration={90}
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
                                {this.renderContent()}
                            </tbody>
                        </table>     
                    </Modal.Body>       
                </Modal>
            </div>
        )
    }
}
