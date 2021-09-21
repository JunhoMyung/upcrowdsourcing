import React, { Component } from 'react'
import {db} from "../Firebase"

export default class Pay extends Component {

    state = {
        db: false
    }

    componentDidUpdate = () => {
        if (this.props.process && !this.state.db){
            db.ref('/finishwaiting/').push({MTurkID: this.props.MTurkID, roomName: this.props.roomName});
            this.setState({ db: true })
        }
    }

    render() {
        if (this.props.process){
            return (
                <>
                    <div style = {{ backgroundColor: "#FAFAFA"}} className = "background">
                        <div className = "NavBar">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className = "Title"> 
                                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                            Thank You
                                        </td>
                                        <td className = "Space"></td>
                                        <td className = "Instruction">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className = "Waiting">
                            <table className = "lobbyTable">
                                <tbody>
                                    <tr>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className = "bodyLobby">
                                            <br/>
                                            <br/>
                                            We're sorry to say that 4 members didn't join the room in 20 minutes.
                                            <br/>
                                            <br/>
                                            We would still pay you for the waiting time ($2), so please note down the survey code below.
                                            <br/>
                                            <br/>
                                            The survey code is: <b className = "blue">FinishedWaiting</b>
                                            <br/>
                                            <br/>
                                            Thank you for your participation, and have a good day!
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
