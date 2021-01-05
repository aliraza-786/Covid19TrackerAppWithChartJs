import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Chart from './Chart';
import Paggination from './TablePagination';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        // minWidth: 'auto',//700
        width: '',
    },
});


export default function GetData() {
    const classes = useStyles();

    const [allData, setallData] = useState([]);
    const [date, setDate] = useState('');
    const [search, setSearch] = useState('');
    const [globalData, setGlobalData] = useState({ TotalConfirmed: "", TotalDeaths: "", TotalRecovered: "" });
    const [searchGraph, setSearchGraph] = useState({ TotalConfirmed: "", TotalDeaths: "", TotalRecovered: "" });

    useEffect(() => {
        const url = `https://api.covid19api.com/summary`;
        async function fetchData() {
            await fetch(url)
                .then((data) => data.json())
                .then((res) => {
                    setallData(res.Countries);
                    setDate(res.Date);
                    console.log("fetch api data response in GetData.js", res)
                    setGlobalData(preState => {
                        return { TotalConfirmed: res.Global.TotalConfirmed, TotalDeaths: res.Global.TotalDeaths, TotalRecovered: res.Global.TotalRecovered }
                    });
                }

                )
                .catch((err) => {
                    console.log("Error ", err);
                })
        }
        fetchData();
    }, []);
    let count = 1;

    const filteredCountries = allData.filter(country => {
        return country.Country.toLowerCase().includes(search.toLowerCase())
    })

    // setSearchGraph(preState => {
    //     return { TotalConfirmed: filteredCountries.TotalConfirmed, TotalDeaths: filteredCountries.TotalDeaths, TotalRecovered: filteredCountries.TotalRecovered }
    // });

    const tableStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        backgroundColor: '#ECF0F1',
        width: '49.99%',
        height: '500px',
        float:'left',
    }
    const chartStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        backgroundColor: '#ECF0F1',
        width: '49.99%',
        height: '500px',
        float:'right',
    }
    const inputFiled = {
        padding: ' 10px',
    }
    return (
        <>
            <h1>COVID19 DATA</h1>
            <h3>Date : {date}</h3>
            <div style={inputFiled}>
                <TextField id="Search Country" label="Search Country..." variant="outlined"
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
            {/* <Paggination allData={allData}/> */}
                <TableContainer component={Paper} style={tableStyles}>
                    <Table className={classes.table} aria-label="customized table" stickyHeader>
                        <TableHead style={{ width: '100%' }}>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Country</StyledTableCell>
                                <StyledTableCell>NewConfirmed</StyledTableCell>
                                <StyledTableCell>TotalRecovered</StyledTableCell>
                                <StyledTableCell>NewDeaths</StyledTableCell>
                                <StyledTableCell>TotalDeaths</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allData.length > 0 ?
                                <>
                                    {
                                        filteredCountries.map(country => {
                                            return (
                                                <StyledTableRow key={count}>
                                                    <StyledTableCell>{count++}</StyledTableCell>
                                                    <StyledTableCell>{country.Country}</StyledTableCell>
                                                    <StyledTableCell>{country.NewConfirmed}</StyledTableCell>
                                                    <StyledTableCell>{country.TotalRecovered}</StyledTableCell>
                                                    <StyledTableCell>{country.NewDeaths}</StyledTableCell>
                                                    <StyledTableCell>{country.TotalDeaths}</StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })
                                    }
                                </>
                                :
                                <>
                                    <CircularProgress />
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={chartStyles}>
                    <Chart GData={globalData}/>
                </div>
        </>
    );
}
