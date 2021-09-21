import React, { Component } from 'react'
export default class Leave extends Component {

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
                                            Apologies
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
                                        <td className = "bodyLobby terminate">
                                            <br/>
                                            <br/>
                                            All of your group members have left the session, and hence we will end the session here.
                                            <br/>
                                            <br/>
                                            We will still grant you money for your participation.
                                            <br/>
                                            <br/>
                                            The survey code is: <b className = "blue">TerminatedRoom</b>
                                            <br/>
                                            <br/>
                                            Thank you, and have a nice day!
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
