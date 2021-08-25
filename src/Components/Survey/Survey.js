import React, { Component } from 'react'
import SurveyModal from './SurveyModal'

export default class Survey extends Component {

    state = {
        greeting: true,
        greeting2: false,
    }

    constructor(props) {
        super(props)
        this.nextGreeting1 = this.nextGreeting1.bind(this)
        this.nextGreeting2 = this.nextGreeting2.bind(this)
    }

    nextGreeting1 = () => {
        this.setState({ greeting: false, greeting2: true })
    }

    nextGreeting2 = () => {
        this.setState({ greeting2: false })
        this.props.close()
    }


    render() {
        if (this.props.process){
            return (
                <div>
                    <SurveyModal
                        open = {this.state.greeting}
                        page2 = {this.state.greeting2}
                        handleNext1 = {this.nextGreeting1}
                        handleNext2 = {this.nextGreeting2}
                    />
                    <div style = {{ backgroundColor: "#FAFAFA"}} className = "background">
                        <div className = "NavBar">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className = "Title"> 
                                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                            Survey
                                        </td>
                                        <td className = "Space"></td>
                                        <td className = "Instruction">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className = "Waiting">
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(<></>)
        }
    }
}
