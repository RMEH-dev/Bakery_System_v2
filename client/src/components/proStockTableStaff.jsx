import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import Axios
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "proStockName",
    numeric: false,
    disablePadding: false,
    label: "Pro Stock Name",
  },
  {
    id: "proStockBatchID",
    numeric: false,
    disablePadding: false,
    label: "Batch No.",
  },
  {
    id: "branchName",
    numeric: false,
    disablePadding: false,
    label: "Branch Name",
  },
  { id: "category", numeric: false, disablePadding: false, label: "Category" },
  {
    id: "subCategory",
    numeric: false,
    disablePadding: false,
    label: "Sub Category",
  },
  {
    id: "pricePerItem",
    numeric: false,
    disablePadding: false,
    label: "PP Item (Rs.)",
  },
  {
    id: "manuDate",
    numeric: false,
    disablePadding: false,
    label: "Manu Date",
  },
  {
    id: "expDate",
    numeric: false,
    disablePadding: false,
    label: "Exp Date",
  },
  {
    id: "expAlerts",
    numeric: false,
    disablePadding: false,
    label: "Exp Alerts",
  },
  {
    id: "availableFrom",
    numeric: false,
    disablePadding: false,
    label: "Available From",
  },
  {
    id: "availableTill",
    numeric: false,
    disablePadding: false,
    label: "Available Till",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "thresholdQuantity",
    numeric: true,
    disablePadding: false,
    label: "Threshold Quantity",
  },
  {
    id: "alerts", 
    numeric: false,
    disablePadding: false,
    label: "Quantity Alerts",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-c2">
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h6" fontWeight="bold">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleDelete, handleEdit } = props;

  return (
    <Toolbar
      className="bg-deep-orange-100 text-c1 text-xl rounded-2xl font-semibold font-[Montserrat]"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          fontWeight="bold"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          id="tableTitle"
          variant="h6"
          fontWeight="bold"
          className="font-black text-c1 font-[Montserrat] text-xl"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <div className="flex grid-cols gap-5">
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default function ProStockTable() {
  const [rows, setRows] = useState([]); // State to hold fetched data
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axiosInstance
      .get("/proStock/") // Assuming your backend endpoint is /api/stocks
      .then((response) => {
        setRows(response.data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Run only once after component is mounted

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDelete = () => {
    const newRows = rows.filter((row) => !selected.includes(row.proStockBatchID));
    setRows(newRows);
    setSelected([]);
  };

  const handleEdit = () => {
    const selectedRow = rows.find((row) => selected.includes(row.proStockBatchID));
    if (selectedRow) {
      navigate(`/editProInventoryStaff/${selectedRow.proStockBatchID}`);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const filteredRows = rows.filter((row) => row.quantity > 0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box
      sx={{ width: "100%" }}
      className="bg-white ml-5 text-c1 rounded-2xl font-bold font-[Montserrat] p-5"
    >
      <div
        sx={{ width: "100%", mb: 2 }}
        className="bg-c5 text-c1 rounded-2xl font-bold font-[Montserrat] pb-5"
      >
        <EnhancedTableToolbar
          className="text-c1 font-bold font-[Montserrat]"
          numSelected={selected.length}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <TableContainer className="rounded-t-2xl text-c1 font-bold font-[Montserrat]">
          <Table
            className="text-c1 rounded-2xl font-bold font-[Montserrat]"
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody className="bg-white text-c1 text-xl font-semibold font-[Montserrat]">
            {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page, page + rowsPerPage).map((row, index) => {
                const isItemSelected = isSelected(row.proStockBatchID);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.proStockBatchID)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.proStockBatchID}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Typography variant="body1" fontWeight="bold">
                        {row.proStockName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.proStockBatchID}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.branchName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.category}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.subCategory}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.pricePerItem}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.manuDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.expDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor:
                            new Date(row.expDate) < new Date()
                              ? "red"
                              : "green",
                          color: "white",
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          {new Date(row.expDate) < new Date()
                            ? "Expired"
                            : "Consumable"}
                        </Typography>
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.availableFrom}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.availableTill}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="regular">
                        {row.thresholdQuantity}
                      </Typography>
                    </TableCell> 
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor:
                            row.quantity > row.thresholdQuantity ? "green" : "red",
                          color: "white",
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          {row.quantity > row.thresholdQuantity ? "Available" : "Low Stock"}
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="bg-c2 text-c1 rounded-b-2xl font-bold font-[Montserrat]"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
