import axios from "axios";

const state = {
  deviceId: 0,
  devices: [
    {
     deviceName: "",
     telNum: "",
     language: "",
     remarks: "",
     translation:""
    } 
  ],
  records: [],
  perPage: 5,
  currentPage: 1,
  rows: 0
};

const getters = {
  getDeviceId: state => state.device_id,
  getRecords: state => state.records,
  getPerPage: state => state.perPage,
  getRecordsCurrentPage: state => state.currentPage,
  getRows: state => state.rows,
  getDevice: state => state.devices
};

const mutations = {
  setDeviceId(state, deviceId) {
    state.deviceId = deviceId;
  },
  setRecords(state, records) {
    state.records = records;
  },
  setPerPage(state, perPage){
      state.perPage = perPage 
  },
  setCurrentPage(state, currntPage){
      state.currentPage = currntPage
  },
  setRows(state, rows){
      state.rows = rows
  },
  allDevices(state, devices){
    state.devices = devices
  }
};

const actions = {
  fetchPage({ commit }, recordObj) {
    let url = process.env.VUE_APP_API_URL+`/device/${recordObj.deviceId}/callrecords/`;
    if (recordObj.page) {
      url = url + "?page=" + recordObj.page;
    }
    axios.get(url)
      .then(response => {

        commit("setCurrentPage", response.data.calls.current_page)
        commit("setRows", response.data.calls.total)
        commit("setRecords", response.data.calls.data)
        commit("allDevices", response.data)
      })
      // .catch(error => {
      //   console.error(error.response);
      // });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
