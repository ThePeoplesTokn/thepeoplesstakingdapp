import React, { useState } from 'react';

const StakeModal = props => {
  const {
    onClose,
    stakingLength,
    stakingPercent,
    setAmount,
    stakeEther,
  } = props

  

/**
 * Check for valid numerical input, numbers are limited to two decimal places.
 * @param {*} e - input change event
 */


  return (
    <>
      <div className="modal-class" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-body">
            <h2 className="titleHeader">Stake BNB</h2>

            <div className="row">
              <div className="col-md-9 fieldContainer">
                <input
                  className="inputField"
                  placeholder="0.0"
                  onChange={e => props.setAmount(e.target.value)}
                />
              </div>
              <div className="col-md-3 inputFieldUnitsContainer">
                <span>BNB</span>
              </div>
            </div>

            <div className="row">
              <h6 className="titleHeader stakingTerms">{stakingLength} days @ {stakingPercent} APY</h6>
            </div>
            <div className="row">
              <div
                
                onClick={() => stakeEther()}
                className="orangeButton"
              >
                Stake
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default StakeModal