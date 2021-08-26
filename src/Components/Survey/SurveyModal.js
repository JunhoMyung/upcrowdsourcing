import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import './Survey.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { db } from '../Firebase'

export default class Greeting extends Component {

    state = {
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null,
    }

    handleQ1 = (e) => {
        this.setState({ q1: e.target.value })
    }
    handleQ2 = (e) => {
        this.setState({ q2: e.target.value })
    }
    handleQ3 = (e) => {
        this.setState({ q3: e.target.value })
    }
    handleQ4 = (e) => {
        this.setState({ q4: e.target.value })
    }
    handleQ5 = (e) => {
        this.setState({ q5: e.target.value })
    }
    handleQ6 = (e) => {
        this.setState({ q6: e.target.value })
    }
    handleQ7 = (e) => {
        this.setState({ q7: e.target.value })
    }
    handleSubmit = () => {
        if (this.state.q1 && this.state.q2 && this.state.q3 && this.state.q4 && this.state.q5 && this.state.q6 && this.state.q7){
            db.ref('/' + this.props.roomName + '/'+ this.props.name +'/survey/').push({q1: this.state.q1, q2: this.state.q2, q3: this.state.q3, q4: this.state.q4, q5: this.state.q5, q6: this.state.q6, q7: this.state.q7})
            this.props.handleNext2()
        }
        else (
            alert("You have to answer all questions")
        )
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.open}
                    onHide={this.props.handleNext1}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                    dialogClassName="border-radius-2"
                >
                    <Modal.Body>
                        <table className = "greetingTable">
                            <tbody>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        The task is over! Thank you for your active participation.
                                        <br/>
                                        <br/>
                                        As a last step, please answer to the short survey which won't take more than 2 minutes.
                                        <br/>
                                        <br/>
                                        After answering the survey, you will be dismissed. Thank you!
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "prevTd">
                                        <div className = "prev-disabled">
                                            PREV
                                        </div>
                                    </td>
                                    <td className = "buffer">

                                    </td>
                                    <td className = "nextTd" onClick = {this.props.handleNext1}>
                                        <div className = "next">
                                            NEXT
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>       
                </Modal>
                <Modal
                    show={this.props.page2}
                    onHide={this.props.handleNext2}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Body>
                    <table className = "greetingTable">
                            <tbody>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyTitle">
                                            Survey
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyQuestion">
                                            Question 1: If I make a mistake in this team, it is held against me.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" value={this.state.q1} onChange={(e) => this.handleQ1(e)}>
                                                <FormControlLabel
                                                value="1"
                                                control={<Radio color="primary" />}
                                                label="Strongly Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="2"
                                                control={<Radio color="primary" />}
                                                label="Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="3"
                                                control={<Radio color="primary" />}
                                                label="Neutral"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="4"
                                                control={<Radio color="primary" />}
                                                label="Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="5"
                                                control={<Radio color="primary" />}
                                                label="Strongly Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyQuestion">
                                            Question 2: Members of this team are able to bring up problems and tough issues.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" value={this.state.q2} onChange={(e) => this.handleQ2(e)}>
                                                <FormControlLabel
                                                value="1"
                                                control={<Radio color="primary" />}
                                                label="Strongly Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="2"
                                                control={<Radio color="primary" />}
                                                label="Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="3"
                                                control={<Radio color="primary" />}
                                                label="Neutral"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="4"
                                                control={<Radio color="primary" />}
                                                label="Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="5"
                                                control={<Radio color="primary" />}
                                                label="Strongly Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyQuestion">
                                            Question 3: People on this team sometimes reject others for being different.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" value={this.state.q3} onChange={(e) => this.handleQ3(e)}>
                                                <FormControlLabel
                                                value="1"
                                                control={<Radio color="primary" />}
                                                label="Strongly Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="2"
                                                control={<Radio color="primary" />}
                                                label="Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="3"
                                                control={<Radio color="primary" />}
                                                label="Neutral"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="4"
                                                control={<Radio color="primary" />}
                                                label="Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="5"
                                                control={<Radio color="primary" />}
                                                label="Strongly Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyQuestion">
                                            Question 4: It is safe to take a risk in this team.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" value={this.state.q4} onChange={(e) => this.handleQ4(e)}>
                                                <FormControlLabel
                                                value="1"
                                                control={<Radio color="primary" />}
                                                label="Strongly Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="2"
                                                control={<Radio color="primary" />}
                                                label="Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="3"
                                                control={<Radio color="primary" />}
                                                label="Neutral"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="4"
                                                control={<Radio color="primary" />}
                                                label="Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="5"
                                                control={<Radio color="primary" />}
                                                label="Strongly Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyQuestion">
                                            Question 5: It is difficult to ask other members of this team for help.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" value={this.state.q5} onChange={(e) => this.handleQ5(e)}>
                                                <FormControlLabel
                                                value="1"
                                                control={<Radio color="primary" />}
                                                label="Strongly Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="2"
                                                control={<Radio color="primary" />}
                                                label="Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="3"
                                                control={<Radio color="primary" />}
                                                label="Neutral"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="4"
                                                control={<Radio color="primary" />}
                                                label="Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="5"
                                                control={<Radio color="primary" />}
                                                label="Strongly Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyQuestion">
                                            Question 6: No one on this team would deliberately act in a way that undermines my efforts.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" value={this.state.q6} onChange={(e) => this.handleQ6(e)}>
                                                <FormControlLabel
                                                value="1"
                                                control={<Radio color="primary" />}
                                                label="Strongly Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="2"
                                                control={<Radio color="primary" />}
                                                label="Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="3"
                                                control={<Radio color="primary" />}
                                                label="Neutral"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="4"
                                                control={<Radio color="primary" />}
                                                label="Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="5"
                                                control={<Radio color="primary" />}
                                                label="Strongly Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <span className = "surveyQuestion">
                                            Question 7: Working with members of this team, my unique skills and talents are valued and utilized.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "greetingBody" colSpan = {3}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" value={this.state.q7} onChange={(e) => this.handleQ7(e)}>
                                                <FormControlLabel
                                                value="1"
                                                control={<Radio color="primary" />}
                                                label="Strongly Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="2"
                                                control={<Radio color="primary" />}
                                                label="Disagree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="3"
                                                control={<Radio color="primary" />}
                                                label="Neutral"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="4"
                                                control={<Radio color="primary" />}
                                                label="Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                                <FormControlLabel
                                                value="5"
                                                control={<Radio color="primary" />}
                                                label="Strongly Agree"
                                                labelPlacement="top"
                                                className = "radioform"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td className = "prevTd">
                                    </td>
                                    <td className = "buffer">
                                        <div className = "next" onClick = {this.handleSubmit}>
                                            SUBMIT
                                        </div>
                                    </td>
                                    <td className = "nextTd">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>       
                </Modal>
            </div>
        )
    }
}
