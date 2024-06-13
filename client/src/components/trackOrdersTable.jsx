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
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axiosInstance from "../utils/axios";
import ConfirmationModal from "./primary/confirmationModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "@material-tailwind/react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import logo from '../../src/assets/logos/logo.png';

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
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "orderID",
    numeric: false,
    disablePadding: false,
    label: "OrderID",
  },
  {
    id: "orderType",
    numeric: false,
    disablePadding: false,
    label: "Order Type",
  },
  {
    id: "orderDate",
    numeric: false,
    disablePadding: false,
    label: "Order Date",
  },
  {
    id: "orderStatus",
    numeric: false,
    disablePadding: false,
    label: "Order Status",
  },
  {
    id: "totalAmount",
    numeric: false,
    disablePadding: false,
    label: "Payment Value",
  },
  {
    id: "paymentType",
    numeric: false,
    disablePadding: false,
    label: "Payment Type",
  },
  {
    id: "paymentStatus",
    numeric: false,
    disablePadding: false,
    label: "Payment Status",
  },
  {
    id: "deliveryType",
    numeric: false,
    disablePadding: false,
    label: "Delivery Type",
  },
  {
    id: "contact",
    numeric: false,
    disablePadding: false,
    label: "Customer Contact No.",
  },
  {
    id: "street",
    numeric: false,
    disablePadding: false,
    label: "Street Address",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "Delivery City",
  },
  {
    id: "customerAlerts",
    numeric: false,
    disablePadding: false,
    label: "Customer Alerts",
  },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
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
  const { numSelected, handleDelete, handleEdit, handleFilterClick } = props;

  return (
    <Toolbar
      className="bg-c5 text-c1 text-xl rounded-2xl font-semibold font-[Montserrat]"
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
          className="font-black text-c1 font-[Montserrat] text-xl"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          id="tableTitle"
          variant="h6"
          fontWeight="bold"
          className="font-black text-c2 font-[Montserrat] text-xl"
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
          <IconButton onClick={handleFilterClick}>
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

export default function TrackOrdersTable() {
  const [rows, setRows] = useState([]); // State to hold fetched data
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("orderID");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false); // State to manage update dialog visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order for updating
  const [orderStatus, setOrderStatus] = useState(""); // State to manage order status
  const [paymentStatus, setPaymentStatus] = useState(""); // State to manage payment status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axiosInstance
      .get("/trackOrders") // Assuming your backend endpoint is /api/stocks
      .then((response) => {
        console.log(response.data);
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
      const newSelected = rows.map((n) => n.orderID);
      setSelected(newSelected);
      setSelectedOrderDetails(rows);
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

  const handleDelete = () => {
    if (selected.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = () => {
    if (selected.length === 1) {
      const orderDetails = rows.find((row) => row.orderID === selected[0]);
      setSelectedOrderDetails(orderDetails);
      setOrderStatus(orderDetails.orderStatus);
      setPaymentStatus(orderDetails.paymentStatus);
      setIsUpdateDialogOpen(true);
    } else {
      toast.error("Please select exactly one order to edit.");
    }
  };

  const handleDeleteConfirmation = () => {
    selected.forEach((id) => {
      axiosInstance
        .delete(`/orders/${id}`)
        .then((response) => {
          setRows((prevRows) => prevRows.filter((row) => row.orderID !== id));
          setSelected([]);
          setIsModalOpen(false);
          toast.success("Order deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
          toast.error("Failed to delete order. Please try again.");
        });
    });
  };

  const handleUpdateOrder = () => {
    const updatedOrder = {
      ...selectedOrderDetails,
      orderStatus,
      paymentStatus,
    };
    axiosInstance
      .put(
        `/updateOrder&PaymentStatus/${selectedOrderDetails.orderID}`,
        updatedOrder
      )
      .then((response) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.orderID === selectedOrderDetails.orderID ? updatedOrder : row
          )
        );
        setIsUpdateDialogOpen(false);
        toast.success("Order updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        toast.error("Failed to update order. Please try again.");
      });
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails({});
  };

  const isSelected = (orderID) => selected.indexOf(orderID) !== -1;

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

  const openOrderDetailsPopup = (orderID) => {
    // Fetch order details based on orderID
    axiosInstance
      .get(`/order/getOrderDetails/${orderID}`)
      .then((response) => {
        setSelectedOrderDetails(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [headCells.map((cell) => cell.label)],
      body: rows.map((row) =>
        headCells.map((cell) => {
          if (cell.id === "actions") {
            return "";
          }
          return row[cell.id] || "";
        })
      ),
    });

    doc.save("table_data.pdf");
  };

  const handleReceiptDownload = (orderID) => {
    // Fetch the order details from the backend
    axiosInstance
      .get(`/order/getOrderDetails/${orderID}`)
      .then((response) => {
        const orderDetails = response.data;
  
        // Find the order from the local state
        const order = rows.find((row) => row.orderID === orderID);
  
        // Merge local order details with fetched order details
        const fullOrderDetails = { ...order, orderItems: orderDetails };
  
        const doc = new jsPDF();
  
        // Add title
        doc.setFontSize(18);
        doc.text("Perera Bakers", 40, 20);
  
        // Add title
        doc.setFontSize(18);
        doc.text("Receipt", 60, 30, { align: 'center' });
  
        // Add order details
        doc.setFontSize(12);
        doc.text(`Order ID: ${fullOrderDetails.orderID}`, 10, 50);
        doc.text(`Customer Name: ${fullOrderDetails.firstName}`, 10, 60);
        doc.text(`Order Date: ${fullOrderDetails.orderDate}`, 10, 70);
        doc.text(`Order Type: ${fullOrderDetails.orderType}`, 10, 80);
        doc.text(`Payment Value LKR: ${fullOrderDetails.totalAmount}`, 10, 90);
        doc.text(`Payment Type: ${fullOrderDetails.paymentType}`, 10, 100);
        doc.text(`Payment Status: ${fullOrderDetails.paymentStatus}`, 10, 110);
        doc.text(`Delivery Type: ${fullOrderDetails.deliveryType}`, 10, 120);
        doc.text(`Customer Contact No: ${fullOrderDetails.contact}`, 10, 130);
        doc.text(`Street Address: ${fullOrderDetails.street}`, 10, 140);
        doc.text(`Delivery City: ${fullOrderDetails.city}`, 10, 150);
  
        // Add order items section
        doc.setFontSize(14);
        doc.text("Order Items:", 10, 170);
  
        // Create order items table
        const orderItems = fullOrderDetails.orderItems.map((item, index) => [
          index + 1,
          item.proStockName,
          item.quantity,
        ]);
  
        doc.autoTable({
          startY: 180,
          head: [['#', 'Product', 'Quantity']],
          body: orderItems,
          theme: 'striped',
        });
  
        doc.save(`receipt_${orderID}.pdf`);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  const handleSendEmail = (orderID) => {
    axiosInstance
      .post(`/order/sendReceipt/${orderID}`)
      .then((response) => {
        toast.success("Receipt emailed successfully.");
      })
      .catch((error) => {
        console.error("Error sending receipt email:", error);
        toast.error("Failed to send receipt email. Please try again.");
      });
  };

  const handleCustomerAlertsChange = (event, orderID) => {
    const customerAlerts = event.target.value;
  
    axiosInstance.put(`/orders/${orderID}/customerAlerts`, { customerAlerts })
      .then((response) => {
        console.log('Customer alerts updated successfully:', response.data);
        // Optionally, you can perform any additional actions upon successful update
      })
      .catch((error) => {
        console.error('Error updating customer alerts:', error);
        // Optionally, you can handle errors or show notifications to the user
      });
  };

  return (
    <Box
      sx={{ width: "100%" }}
      className="bg-c3 text-c2 rounded-2xl font-bold font-[Montserrat] p-2"
    >
      <ToastContainer />
      <div
        sx={{ width: "100%", mb: 2 }}
        className="bg-c5 text-c1 rounded-2xl font-bold font-[Montserrat] pb-5 px-2"
      >
        <EnhancedTableToolbar
          className="text-c1 font-bold font-[Montserrat]"
          numSelected={selected.length}
          //   handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <TableContainer className="rounded-t-2xl bg-deep-orange-900 text-c1 font-bold font-[Montserrat]">
          <Table
            className="text-c1  bg-deep-orange-900 rounded-2xl font-bold font-[Montserrat]"
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
              rowCount={rows.length}
            />
            <TableBody className="bg-white text-c2 text-xl font-semibold font-[Montserrat]">
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.orderID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderID}
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
                          {row.firstName}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={(event) => {
                            event.stopPropagation();
                            openOrderDetailsPopup(row.orderID);
                          }}
                        >
                          {row.orderID}
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.orderType}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.orderDate}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.orderStatus}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.totalAmount}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.paymentType}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.paymentStatus}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.deliveryType}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.contact}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.street}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.city}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={row.customerAlert}
                          onChange={(e) =>
                            handleCustomerAlertsChange(e, row.orderID)
                          }
                        >
                          <MenuItem value="Order Ready">Order Ready</MenuItem>
                          <MenuItem value="Order Packing">
                            Order Packing
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEmailReceipt(row.orderID);
                          }}
                        >
                          Email Receipt
                        </Button>
                        <Button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleReceiptDownload(row.orderID);
                            // handleExportPdf(row.orderID);
                          }}
                        >
                          Download
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
          className="bg-white text-c1 rounded-b-2xl font-bold font-[Montserrat]"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
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
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Receipt</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Order ID:</strong> {selectedOrderDetails.orderID}
          </Typography>
          <Typography variant="body1">
            <strong>Customer Name:</strong> {selectedOrderDetails.firstName}
          </Typography>
          <Typography variant="body1">
            <strong>Order Date:</strong> {selectedOrderDetails.orderDate}
          </Typography>
          <Typography variant="body1">
            <strong>Order Type:</strong> {selectedOrderDetails.orderType}
          </Typography>
          <Typography variant="body1">
            <strong>Payment Value:</strong> {selectedOrderDetails.totalAmount}
          </Typography>
          <Typography variant="body1">
            <strong>Payment Type:</strong> {selectedOrderDetails.paymentType}
          </Typography>
          <Typography variant="body1">
            <strong>Payment Status:</strong>{" "}
            {selectedOrderDetails.paymentStatus}
          </Typography>
          <Typography variant="body1">
            <strong>Delivery Type:</strong> {selectedOrderDetails.deliveryType}
          </Typography>
          <Typography variant="body1">
            <strong>Customer Contact No:</strong> {selectedOrderDetails.contact}
          </Typography>
          <Typography variant="body1">
            <strong>Street Address:</strong> {selectedOrderDetails.street}
          </Typography>
          <Typography variant="body1">
            <strong>Delivery City:</strong> {selectedOrderDetails.city}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the selected order(s)?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Edit Order</DialogTitle>
        <ToastContainer />
        <DialogContent>
          <Select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            fullWidth
            variant="outlined"
            margin="dense"
            className="z-10"
            MenuProps={{
              disablePortal: true,
            }}
          >
            <MenuItem value="Not Complete">Not Complete</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <Select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            fullWidth
            variant="outlined"
            margin="dense"
            MenuProps={{
              disablePortal: true,
            }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateOrder} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        className="bg-c2 font-[Montserrat] rounded-2xl"
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <DialogTitle className="font-bold text-c1 font-[Montserrat]">
          Order Details
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead className="font-bold text-c1 font-[Montserrat]">
                <TableRow className="font-bold text-c1 font-[Montserrat]">
                  <TableCell className="font-semibold text-2xl text-c1 font-[Montserrat]">
                    Order Details ID
                  </TableCell>
                  <TableCell className="font-bold text-c1 font-[Montserrat]">
                    Product Name
                  </TableCell>
                  <TableCell className="font-bold text-c1 font-[Montserrat]">
                    Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="font-bold text-c1 font-[Montserrat]">
                {Array.isArray(selectedOrderDetails) &&
                  selectedOrderDetails.map((item, index) => (
                    <TableRow
                      className="font-bold text-c1 font-[Montserrat]"
                      key={index}
                    >
                      <TableCell className="font-bold text-c1 font-[Montserrat]">
                        {" "}
                        {item.orderDetailsID}
                      </TableCell>
                      <TableCell className="font-bold text-c1 font-[Montserrat]">
                        {item.proStockName}
                      </TableCell>
                      <TableCell className="font-bold text-c1 font-[Montserrat]">
                        {item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            className="font-bold text-c1 font-[Montserrat]"
            onClick={handleModalClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
