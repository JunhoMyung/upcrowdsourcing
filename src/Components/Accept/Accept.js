import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import "./Accept.css"
import Countdown from 'react-countdown';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';

export default class Accept extends Component {

    state = {
        accepted: false,
    }

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            this.setState({ accepted: false })
            if(this.state.accepted){
                this.props.handleNoAccept();
            }
            else{
                this.props.refuse();
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
        if(this.props.open) {
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
                                        <td>
                                            <div className = "timerTitle">
                                                Remaining Time
                                            </div>
                                            <div className="timer">
                                                <Countdown date={this.props.accepttime + 90000} renderer={this.renderer} />
                                            </div>
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
        else{
            return(
                <></>
            )
        }
    }
}
