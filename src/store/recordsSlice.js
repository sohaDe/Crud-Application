import { createSlice } from "@reduxjs/toolkit";

const demoRecords = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    phone: "458-545-54-4",
    position: "Developer",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@gmail.com",
    phone: "458-545-54-4",
    position: "Developer",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@gmail.com",
    phone: "458-545-54-4",
    position: "Developer",
  },
];

//load records from local or  use demo data
const loadRecordsFromLocal = () => {
  try {
    const savedRecords = localStorage.getItem("EmployeeRecords");
    return savedRecords ? JSON.parse(savedRecords) : demoRecords;
  } catch (error) {
    console.log("error loading Records", error);
  }
};

// calculate next id based on existing records
const calculateNextId = (records) => {
  if (records.length > 0) {
    return records[records.length - 1].id + 1;
  }
  return 1;
};

const recordersSlice = createSlice({
  name: "records",
  initialState: {
    items: loadRecordsFromLocal(),
    searchTerm: "",
    nextId: calculateNextId(loadRecordsFromLocal()),
  },
  reducers: {
    // add record
    addRecord: (state, action) => {
      const newRecord = { id: state.nextId, ...action.payload };
      state.items.push(newRecord);
      localStorage.setItem("EmployeeRecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },

    // update record
    updateRecord: (state, action) => {
      const { id, data } = action.payload;
      const index = state.items.findIndex((r) => r.id === id);

      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
        localStorage.setItem("EmployeeRecords", JSON.stringify(state.items));
      }
    },

    // delete record
    deleteRecord: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
      localStorage.setItem("EmployeeRecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },

    // search record
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    resetAllRecord: (state) => {
      state.items = demoRecords;
      state.nextId = calculateNextId(demoRecords);
      localStorage.setItem("EmployeeRecords", JSON.stringify(demoRecords));
    },
  },
});

export const {
  addRecord,
  updateRecord,
  deleteRecord,
  setSearchTerm,
  resetAllRecord,
} = recordersSlice.actions;
export const selectAllRecords = (state) => state.records.items;
export const selectSearchTerm = (state) => state.records.searchTerm;

export const selectFilteredRecords = (state) => {
  const term = state.records.searchTerm.toLowerCase();
  return state.records.items.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.position.toLowerCase().includes(term)
  );
};

export default recordersSlice.reducer;
