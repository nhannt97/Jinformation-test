import debounce from "lodash.debounce";
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, itemType, fetchData, fetchDataPayloadType } from 'store/app/reducer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './App.css';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#195179',
    color: theme.palette.common.white,
    fontWeight: 700
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  search: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 20px',
  },
  inputSearch: {
    width: 'calc(100%)'
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    maxWidth: "100%",
    overflow: "auto",
    maxHeight: "calc(100vh - 100px)"
  }
});
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState('');
  const { data, page }: {
    data: itemType[],
    page: Number
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(fetchData({
      page: 1,
      tags,
      callback: () => {
        setLoading(false);
      }
    }))
  } ,[]);

  const handleSearch = (value: string) => {
    dispatch(fetchData({
      page,
      tags: value,
      callback: () => {
        setLoading(false);
      }
    } as fetchDataPayloadType))
  }

  const debounceSearch = useCallback(debounce((nextValue: string) => handleSearch(nextValue), 200), [])

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTags = e.currentTarget.value?.replace('\g ', '');
    setTags(newTags);
    debounceSearch(newTags);
  }

  return (
    <div className="App">
      <div className={classes.search}>
      <TextField
        placeholder="Search by tags: trump,money"
        label="Search by tags"
        variant="outlined"
        onChange={handleChangeSearch}
        classes={{ root: classes.inputSearch }}
      />
      </div>
      <TableContainer classes={{root: classes.tableContainer}} component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Index</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell>Author</StyledTableCell>
            <StyledTableCell>Tags</StyledTableCell>
            <StyledTableCell>Thumbnail Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <StyledTableRow key={row.image}>
              <StyledTableCell align="center">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                <img width="100" height="100" alt="img" src={row.image}/>
              </StyledTableCell>
              <StyledTableCell>{row.author}</StyledTableCell>
              <StyledTableCell>{row.tags}</StyledTableCell>
              <StyledTableCell><a href={row.thumbnailImage} target="_blank">Thumbnail image</a></StyledTableCell>
            </StyledTableRow>
          ))}
          {loading && "Loading" }
          {!loading && !data.length && "No Data" }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;
