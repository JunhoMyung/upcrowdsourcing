import React, { Component } from 'react'
export default class Ending extends Component {

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
                                            Thank You for Participating!
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
                                            The task is over! Thank you again for participating.
                                            <br/>
                                            <br/>
                                            The survey code is: <b className = "blue">{this.props.roomName}</b>
                                            <br/>
                                            <br/>
                                            Have a good day!
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
