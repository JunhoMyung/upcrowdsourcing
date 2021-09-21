import React, { Component } from 'react'
import InstructionModal from './InstructionModal'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';


export default class Instruction extends Component {

    state = {
        greeting: true,
        greeting2: false,
        init: true
    }

    constructor(props) {
        super(props)
        this.nextGreeting1 = this.nextGreeting1.bind(this)
        this.nextGreeting2 = this.nextGreeting2.bind(this)
        this.prevGreeting2 = this.prevGreeting2.bind(this)
    }

    nextGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
    }

    prevGreeting2 = () => {
        this.setState({ greeting: true, greeting2: false })
    }

    nextGreeting2 = () => {
        this.setState({ greeting2: false })
        if(this.state.init){
            this.props.socket.emit("Creative-Instruction")
            this.setState({ init: false })
        }
    }


    renderParticipant = () => {
        var participantPrint = []
        for (var i = 0; i < this.props.playerList; i++){
            participantPrint.push(
                <PersonIcon fontSize="large"/>
            )
        }
        for (var j = 0; j < (this.props.participantList.length - this.props.playerList); j++){
            participantPrint.push(
                <PersonOutlineIcon fontSize="large"/>
            )
        }
        return(participantPrint)
    }

    render() {
        if (this.props.process){
            return (
                <>
                    <InstructionModal
                        open = {this.state.greeting}
                        page2 = {this.state.greeting2}
                        handleNext1 = {this.nextGreeting1}
                        handlePrev2 = {this.prevGreeting2}
                        handleNext2 = {this.nextGreeting2}
                    />
                    <div style = {{ backgroundColor: "#FAFAFA"}} className = "background">
                        <div className = "NavBar">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className = "Title"> 
                                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                            Creating Movie Plot
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
