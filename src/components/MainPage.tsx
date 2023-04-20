import React from 'react'
import "../stylesheets/MainPage.css"
import Modal from "../components/Modal";

import nameIcon from "../assets/nameIcon.png"
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RemoveIcon from '@mui/icons-material/Remove';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockIcon from '@mui/icons-material/Lock';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const listValues = [
    { id: "1", name: "BITCOIN", label: "BTC", value: "0.0025600", currency: "USD", amount: "0.5268" },
    { id: "2", name: "ETHEREUM", label: "ETH", value: "0.0025600", currency: "USD", amount: "0.5268" },
    { id: "3", name: "BINANCE COIN", label: "BNB", value: "0.0025600", currency: "USD", amount: "0.5268" },
    { id: "4", name: "BITCOIN", label: "BTC", value: "0.0025600", currency: "USD", amount: "0.5268" },
    { id: "5", name: "ETHEREUM", label: "ETH", value: "0.0025600", currency: "USD", amount: "0.5268" },
    { id: "6", name: "BITCOIN", label: "BTC", value: "0.0025600", currency: "USD", amount: "0.5268" },
];
const MainPage: React.FC = () => {
    const [list, setList] = React.useState(listValues);
    const [filterValue, setFilterValue] = React.useState('Amount High - Low');

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        let newList = [...list];
        if (value === "Amount High - Low") {
            newList = newList.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
        }
        else if (value === "Amount Low - High") {
            newList = newList.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));

        }
        else if (value === "Arrange A-Z") {
            newList = newList.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (value === "Arrange Z-A") {
            newList = newList.sort((a, b) => b.name.localeCompare(a.name));
        }
        setFilterValue(event.target.value as string);
        setList([...newList]);
    };
    return (
        <div className='mainPage'>
            <div className='topBar'>
                <div className='left'>
                    <img src={nameIcon} />
                </div>
                <div className='right'>
                    <RemoveIcon />
                    <CheckBoxOutlineBlankIcon />
                    <CloseIcon />
                </div>
            </div>
            <div className='mainContent'>
                <div className='left'>
                    <div className='iconText'>
                        <StackedLineChartIcon />
                        <p>Portfolio</p>
                    </div>
                    <div className='iconText wallet'>
                        <div className='goldColor'>
                            <AccountBalanceWalletIcon />
                            <p>Wallets</p>
                        </div>
                        <div className='walletWrapper'>
                            <div className='walletList'>Wallet 1</div>
                            <div className='addWallet'>
                                + add wallet
                            </div>
                        </div>

                    </div>
                    <div className='iconText'>
                        <CompareArrowsIcon />
                        <p>Last Transactions</p>
                    </div>
                    <div className='iconText'>
                        <YouTubeIcon />
                        <p>Tutorials</p>
                    </div>
                    <div className='iconText'>
                        <SettingsIcon />
                        <p>Setting</p>
                    </div>

                    <div className='button'>Support</div>
                </div>
                <div className='right'>
                    <div className='first'>
                        <div className='iconText'>
                            <CheckCircleOutlineIcon />
                            <p>Synchronized</p>
                        </div>
                        <SettingsBrightnessIcon style={{ color: "#ffffff" }} />
                        <LockIcon />
                    </div>
                    <div className='second'>
                        <h2>Wallet 1</h2>
                        <p className='addCoinBtn'>+ Add Coin</p>
                    </div>
                    <div className='third'>
                        <p>Total Coin - 6</p>
                        <div className='filterBtn'>
                            <SwapVertIcon />
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filterValue}
                                        label="filter"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Amount High - Low"}>Amount High - Low</MenuItem>
                                        <MenuItem value={"Amount Low - High"}>Amount Low - High</MenuItem>
                                        <MenuItem value={"Arrange A-Z"}>Arrange A-Z</MenuItem>
                                        <MenuItem value={"Arrange Z-A"}>Arrange Z-A</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='coinListWrapper'>
                        <table>
                            <tbody>
                                {
                                    list.length > 0 && list.map((value, idx) => {
                                        return (
                                            <tr key={value.id}>
                                                <td style={{ transform: "translateX(20px)" }}><div className='iconText'><img src={require(`../assets/${value.name}.svg`)} /><p>{value.name}</p></div></td>
                                                <td>{value.label} {value.value}</td>
                                                <td>{value.currency} {value.amount}</td>
                                                <td>
                                                    <Modal />
                                                    <div className='iconText blueColor'>
                                                        <SouthWestIcon />
                                                        RECEIVE
                                                    </div>
                                                </td>
                                                <td><div className='iconText goldColor'><ArrowOutwardIcon />SEND</div></td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;