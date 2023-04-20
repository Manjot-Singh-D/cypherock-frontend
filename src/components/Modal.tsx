import * as React from 'react';
import "../stylesheets/Modal.css"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EastIcon from '@mui/icons-material/East';

import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import CircularProgress from '@mui/material/CircularProgress';

const steps = [
    'Device',
    'Verification',
    'Receive',
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    const [pageNo, setPageNo] = React.useState(0);
    const [progressCounter, setProgressCounter] = React.useState([
        ["running", "running", "running"],
        ["running"]
    ]);
    const [enableButton, setEnableButton] = React.useState(false);
    const [copyText, setCopyText] = React.useState("Copy");
    const textRef = React.useRef<HTMLHeadingElement>(null);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setProgressCounter([
            ["running", "running", "running"],
            ["running"]
        ]);
        setPageNo(0);
    };
    const handleNextPage = () => {
        setPageNo((pageNo) => pageNo + 1);
    }
    const reVerify = () => {
        setPageNo(1);
        setProgressCounter((progressCounter) => {
            let newProgressCounter = [...progressCounter];
            newProgressCounter[1][0] = "running";

            return newProgressCounter;
        });
    }
    const handleCopyClick = async () => {
        try {
            if (textRef.current) {
                await navigator.clipboard.writeText(textRef.current.innerText);
                setCopyText("Copied!");
                const timer = setTimeout(() => {
                    setCopyText("Copy");
                }, 1000);

                return () => clearTimeout(timer);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    React.useEffect(() => {
        setEnableButton(false);
        if (open) {
            let timer: any;
            for (let idx = 0; idx < progressCounter[pageNo]?.length; idx++) {
                timer = setTimeout(() => {
                    setProgressCounter((progressCounter) => {
                        let newProgressCounter = [...progressCounter];
                        newProgressCounter[pageNo][idx] = "completed";
                        return newProgressCounter;
                    })
                    if (idx === progressCounter[pageNo].length - 1) {
                        setEnableButton(true);
                    }
                }, 2000 * (idx + 1));
            }
            return () => clearTimeout(timer);
        }
    }, [pageNo]);
    React.useEffect(() => {
        if (open) {
            let timer: any;
            for (let idx = 0; idx < progressCounter[pageNo]?.length; idx++) {
                timer = setTimeout(() => {
                    setProgressCounter((progressCounter) => {
                        let newProgressCounter = [...progressCounter];
                        newProgressCounter[pageNo][idx] = "completed";
                        return newProgressCounter;
                    })
                    if (idx === progressCounter[pageNo].length - 1) {
                        setEnableButton(true);
                    }
                }, 2000 * (idx + 1));
            }
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <div className='modalContainer'>
            <Button onClick={handleClickOpen} className='modalBtn'>
                {/* Open dialog */}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className='modalDialog'
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Receive
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={pageNo} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    {
                        pageNo === 0 && (
                            <div className='dialogContent'>
                                <h2 className='contentHeader' style={{ color: "#B0B1B0" }}>Follow the instruction on the device</h2>
                                <div className='dialogMainContent'>
                                    <div className='iconTextContainer'>
                                        <div className='iconText'>
                                            <EastIcon className='rightArrow' />
                                            <p className={`${progressCounter[pageNo][0] === "completed" ? "activeText" : ""}`}>Select the Wallet on Device</p>
                                        </div>
                                        {progressCounter[pageNo][0] === "running" ?
                                            <CircularProgress className='tickIcon' /> : <CheckIcon className='tickIcon' />}
                                    </div>
                                    <div className='iconTextContainer'>
                                        <div className='iconText'>
                                            <EastIcon className='rightArrow' />
                                            <p className={`${progressCounter[pageNo][1] === "completed" ? "activeText" : ""}`}>Select the Coin on Device</p>
                                        </div>
                                        {progressCounter[pageNo][1] === "running" ?
                                            <CircularProgress className='tickIcon' /> : <CheckIcon className='tickIcon' />}
                                    </div>
                                    <div className='iconTextContainer'>
                                        <div className='iconText'>
                                            <EastIcon className='rightArrow' />
                                            <p className={`${progressCounter[pageNo][2] === "completed" ? "activeText" : ""}`}>Tap 1 card of any 4 cards</p>
                                        </div>
                                        {progressCounter[pageNo][2] === "running" ?
                                            <CircularProgress className='tickIcon' /> : <CheckIcon className='tickIcon' />}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        pageNo === 1 && (
                            <div className='dialogContent'>
                                <div className='dialogMainContent'>
                                    <div className='keyContainer'>
                                        <h2>25BKJNKNLJL58fjkdhfk26dnfds15</h2>
                                    </div>
                                    <p style={{ color: "#B0B1B0" }}>Verify address on device</p>
                                    <div className='iconTextContainer'>
                                        <div className='iconText'>
                                            <EastIcon className='rightArrow' />
                                            <p className={`${progressCounter[pageNo][0] === "completed" ? "activeText" : ""}`}>Please match the address to be shown in the Card X1</p>
                                        </div>
                                        {progressCounter[pageNo][0] === "running" ?
                                            <CircularProgress className='tickIcon' /> : <CheckIcon className='tickIcon' />}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        pageNo === 2 && (
                            <div className='dialogContent'>
                                <p style={{ color: "#B0B1B0" }}>Coin Address</p>
                                <div className='dialogMainContent'>
                                    <div className='keyContainer' style={{ marginTop: "0rem", position: "relative", justifyContent: "flex-start" }}>
                                        <h2 ref={textRef}>25BKJNKNLJL58fjkdhfk26dnfds15</h2>
                                        <p style={{ cursor: "pointer", position: "absolute", right: "20px" }} onClick={handleCopyClick}>{copyText}</p>
                                    </div>
                                    <div className='iconText blueColor'>
                                        <InfoIcon />
                                        <p>Address Verified</p>
                                    </div>
                                    <div className='verifyBtn blueColor' onClick={() => reVerify()}>
                                        Re-Verify
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </DialogContent>
                {pageNo !== 2 &&
                    <DialogActions className='modalActionBtn'>
                        <Button autoFocus onClick={() => enableButton ? handleNextPage() : () => { }} className={`${enableButton ? "activeBtn" : "inactiveBtn"}`}>
                            Continue
                        </Button>
                    </DialogActions>}
            </BootstrapDialog>
        </div>
    );
}