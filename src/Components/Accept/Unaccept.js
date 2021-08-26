import React, { Component } from 'react'
export default class Unaccept extends Component {

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
                                            You haven't responded to the message that popped up after the task was ready.
                                            <br/>
                                            <br/>
                                            As informed earlier, we're sorry to say that we cannot pay you in this case.
                                            <br/>
                                            <br/>
                                            Still, thank you for your participation, and have a nice day!
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
