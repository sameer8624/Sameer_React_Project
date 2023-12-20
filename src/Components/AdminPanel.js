import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Container,
  Box,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import data from "../Data/data";

const AdminPanel = () => {
  const [transactions, setTransactions] = useState(data);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    branch: "ALL",
    type: "ALL",
    status: "ALL",
  });

  const users = [
    { code: "A123", name: "Sharad Verma" },
    { code: "A3445", name: "Pramod Mehta" },
    { code: "A9765", name: "Vika Singh" },
    { code: "A6467", name: "Sharad Shrivastava" },
    { code: "A0435", name: "Vikas Mehra" },
    { code: "A1789", name: "Sharad Kapoor" },
    { code: "A0435", name: "Pramod Mathur" },
    { code: "A3445", name: "A1789" },
  ];

  const branches = [
    "ALL",
    "Thane",
    "Navi Mumbai",
    "Mumbai",
    "Kurla",
    "Vile Parle",
    "Lower Parel",
    "Andheri",
    "Byculla",
  ];

  const types = ["ALL", "Full", "Short"];
  const statuses = ["ALL", "Pending", "Approved", "Rejected"];

  const handleSearch = () => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.id.includes(searchTerm) ||
        transaction.type.includes(searchTerm) ||
        transaction.status.includes(searchTerm)
    );
    setFilteredTransactions(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Apply filters
    Object.keys(filters).forEach((field) => {
      if (filters[field] && filters[field] !== "ALL") {
        filtered = filtered.filter(
          (transaction) => transaction[field] === filters[field]
        );
      }
    });

    // Apply date range filter
    if (filters.from && filters.to) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.date >= filters.from && transaction.date <= filters.to
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleDelete = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
    setFilteredTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };
  

  const getTotalRecords = () => {
    return filteredTransactions.length;
  };

  return (
    <Container>
      <Box mt={3} mb={3} display="flex" justifyContent="flex-st">
        <Typography variant="h5" fontWeight="bold">
          Total ({getTotalRecords()})
        </Typography>
      </Box>
      <Box mt={3} mb={3} display="flex" justifyContent="flex-end">
        <TextField
          label="Search by ID, Type, or Status"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          style={{ marginLeft: "8px" }}
        >
          Search By ID
        </Button>
      </Box>

      <Box mt={3} mb={3} display="flex" justifyContent="flex-start">
        <TextField
          label="From Date"
          type="date"
          variant="outlined"
          size="small"
          value={filters.from}
          onChange={(e) => handleFilterChange("from", e.target.value)}
          style={{ marginRight: "8px" }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            style: { textAlign: "center" },
          }}
        />
        <TextField
          label="To Date"
          type="date"
          variant="outlined"
          size="small"
          value={filters.to}
          onChange={(e) => handleFilterChange("to", e.target.value)}
          style={{ marginLeft: "8px" }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            style: { textAlign: "center" },
          }}
        />

        <FormControl
          variant="outlined"
          size="small"
          style={{ marginLeft: "8px" }}
        >
          <InputLabel>Branch</InputLabel>
          <Select
            value={filters.branch}
            onChange={(e) => handleFilterChange("branch", e.target.value)}
            label="Branch"
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          style={{ marginLeft: "8px" }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            label="Type"
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          style={{ marginLeft: "8px" }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            label="Status"
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={applyFilters}
          style={{ marginLeft: "8px" }}
        >
          Search
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount (in rupees)</TableCell>
                <TableCell>Bank</TableCell>
                <TableCell>Requested By</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold">
                      {transaction.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.branch}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.bank}</TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="body2">
                        {users.find(
                          (user) => user.code === transaction.requestedBy
                        )?.name || "Unknown User"}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {transaction.requestedBy}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <HighlightOffIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminPanel;
