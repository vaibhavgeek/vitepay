import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faShareSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import styles from "./../styles.module.css"

const ProgressBarComponent = ({state}) => {
    return(
    <div className={styles.progressWrapper}>
        <div className={styles.statusIcon}>
            <FontAwesomeIcon className={styles.statusIcon} size="x" color="white" icon={faShareSquare} />
            <FontAwesomeIcon className={styles.statusIcon} size="x" color={state >= 1 ? "orange" : "grey"} icon={faCheckSquare} />
            {state !== 3 && (
                <FontAwesomeIcon className={styles.statusIcon} size="x" color={state === 2 ? "green" : "grey"} icon={faCheckSquare} />
            )}
            {state === 3 && (
                <FontAwesomeIcon className={styles.statusIcon} size="x" color="red" icon={faTimesCircle} />
            )}
        </div>
        <ProgressBar filledBackground="#007aff" className={styles.progressBar} percent={state * 50}>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? styles.accomplished : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? styles.accomplished : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? styles.accomplished : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
        </ProgressBar> </div>
        )}

export default ProgressBarComponent;