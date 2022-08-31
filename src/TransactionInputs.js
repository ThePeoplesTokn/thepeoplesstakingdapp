import React, { Component } from 'react';

/**
 * Provides a UI for deposit requests
 */
export class DepositInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            transactionValue: ''
        };
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    UNSAFE_componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    UNSAFE_componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Clear error message on click outside component
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ msg: ''});
        }
    }

    /**
     * Call one of the App transaction methods passed in props, passing valid input as argument
     */
    handleClick = () => {
        const value = this.state.transactionValue;
        if (value === '' || value === 0) {
            this.setState({ msg: 'Please enter an amount'});
        } else if (value) {
            this.setState({ msg: ''});
            const success = this.props.onClick(value);
            // Remove number from input field if transaction is successful
            if (success) {
                this.setState({ transactionValue: '' });
            }
        }
    }

    /**
     * Check for valid numerical input, numbers are limited to two decimal places.
     * @param {*} e - input change event
     */
    handleChange = (e) => {
        const regCheck = /^\d+(\.\d{0,2})?$/;
        const value = e.target.value;
        if (value === '' || regCheck.test(value)) {
            this.setState({ transactionValue: e.target.value })
        } 
    }

    render() {
        return (
        <div className="transaction-input" ref={this.wrapperRef}>
            <p className="transaction-description">How much do you what to deposit?</p>
            <p className="transaction-description">(min. amount is <span className="numeric-field">0.01</span>)</p>
            <input className="transaction-input-field" onChange={this.handleChange} type="text" value={this.state.transactionValue} placeholder="amount..."></input>
            <button className="transaction-button" onClick={this.handleClick}>Confirm</button>
            <p className="error-message">{this.state.msg}</p>
        </div>
        );
    }
}


/**
 * Provides a UI for withdraw requests
 */
export class WithdrawInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            option: false,
            msg: ''
        };
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    UNSAFE_componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    UNSAFE_componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Clear error message on click outside component
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ msg: ''});
        }
    }

    /**
     * Call the withdraw method with option passed in props.
     */
    handleClick = () => {
        if (this.props.balance === 0) {
            this.setState({ msg: 'Insuffient funds' });
        } else {
            this.props.onClick(this.state.option);
            this.setState({ msg: '' });
        }
    }

    /**
     * Changes the radio buttons's checked status
     */
    handleChange = () => {
        if (this.state.option) this.setState({ option: false });
        else this.setState({ option: true });
    }

    /**
     * Handles onClick for the radio button
     */
    deselect = () => {
        if (this.state.option) this.handleChange();
    }

    render() {
        return (
            <div className="transaction-input" ref={this.wrapperRef}>
                <p className="transaction-description">Withdraw all funds from your account?</p>
                <input type="radio" id="add-token" onClick={this.deselect} onChange={this.handleChange} checked={this.state.option} value="receive token interest"/>
                <label htmlFor="add-token">&nbsp; add interest </label>
                <button className="transaction-button" onClick={this.handleClick}>Confirm</button>
                <div className="error-message">{this.state.msg}</div>
            </div>
        );
    }
}