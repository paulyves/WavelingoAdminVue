import axios from "axios";

const state = {
  devicesAll: [],
  devicesAccount: [],
  addDevice: [],
  perPage: 20,
  currentPageMain: 1,
  pageRows: 0,

  findAccntName: 0,
  findAccntId: 0,

  findAccount: [],
  accountList: [],
  delDevice: [],
  editDevice: []
};

const getters = {
  getDevices: state => state.devicesAll,
  getAccount: state => state.devicesAccount,
  getcurrentPageMain: state => state.currentPageMain,
  getPerPageMain: state => state.perPage,
  getRowsMain: state => state.pageRows,

  getFindAccountId: state => state.findAccntId,

  getfindAccount: state => state.findAccount,
  getfindAccountlist: state => state.accountList
};

const mutations = {
  setDevice: (state, devices) => {
    state.devicesAll = devices;
  },
  setDeviceAccount: (state, devicesAccount) => {
    state.devicesAccount = devicesAccount;
  },
  setPagination: (state, setObj) => {
    state.currentPageMain = setObj.currentPageMain;
    state.pageRows = setObj.pageRows;
  },

  setFindAccount: (state, findAccntId) => {
    state.findAccntId = findAccntId;
  },

  setAddDevice: (state, AddDevices) => {
    state.addDevice = AddDevices;
  },

  setFindAccountbyAcount: (state, findAccount) => {
    state.findAccount = Array.from(findAccount);
  },

  setAccount: (state, accountList) => {
    state.accountList = accountList;
  },

  setDelete: (state, deleteDevice) => {
    state.delDevice = deleteDevice;
  },

  setDevicedit: (state, editDevice) => {
    state.editDevice = editDevice;
  }
};

const actions = {
  callAllDevice({ commit }, pageObj) {
    let url = process.env.VUE_APP_API_URL + "/device";
    if (pageObj) {
      if (pageObj.url) {
        url = url + pageObj.url;
      }
      if (pageObj.search) {
        url = url + "/search/" + pageObj.search;
      }
      if (pageObj.page) {
        url = url + "?page=" + pageObj.page;
      }
    }

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          let setObj = {
            currentPageMain: response.data.current_page,
            pageRows: response.data.total
          };

          commit("setDevice", response.data.data);
          commit("setPagination", setObj);
          commit("setFindAccount", 0);

          resolve(response.data.data);
        })
        .catch(error => {
          if (error) {
            console.log(error.response.data);
            reject(error.response.data);
          }
        });
    });
  },

  callAccnt({ commit }, pageObj) {
    let url = process.env.VUE_APP_API_URL + "/device/account";
    if (pageObj) {
      if (pageObj.thisId) {
        url = url + "/" + pageObj.thisId;
      }
      if (pageObj.search) {
        url = url + "/search/" + pageObj.search;
      }
      if (pageObj.page) {
        url = url + "?page=" + pageObj.page;
      }
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          if (response.data.data.length == 0) {
            resolve(response.data);
          } else {
            let setObj = {
              currentPageMain: response.data.current_page,
              pageRows: response.data.total
            };
            commit("setDeviceAccount", response.data.data);
            commit("setPagination", setObj);
            resolve(response.data);
            resolve(setObj);
          }
        })
        .catch(error => {
          reject(error);

          console.log(error.response.data);
        });
    });
  },

  callEditdevice({ commit }, data) {
    axios
      .put(process.env.VUE_APP_API_URL + "/device", {
        id: data.id,
        macAddress: data.macAddress,
        deviceName: data.deviceName,
        customerName: data.customerName,
        telNumber: data.telNumber,
        language: data.language,
        translation: data.translation,
        remarks: data.remarks,
        host: data.host,
        port: data.port,
        sipUserName: data.username,
        password: data.password
      })
      .then(response => {
        commit("setDevicedit", response.data);
        alert("Edit Succesfull");
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  callAccountName({ commit }, oBj) {
    let url = process.env.VUE_APP_API_URL + "/account";

    if (oBj) {
      if (oBj.name) {
        url = url + "/name/" + oBj.name;
      }
      if (oBj.search) {
        url = url + "/search/" + oBj.search;
      }
      if (oBj.page) {
        url = url + "?page=" + oBj.page;
      }
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          if (response.data != 0) {
            let setObj = {
              currentPageMain: response.data.current_page,
              pageRows: response.data.total
            };
            commit("setPagination", setObj);
            commit("setFindAccountbyAcount", response.data);
            commit("setAccount", response.data.data);
            commit("setFindAccount", response.data.account_id);

            resolve(response.data);
            resolve(response.data.account_id);
            resolve("setAccount", response.data.data);
          }
        })
        .catch(error => {
          if (error.response.data.error == "Invalid") {
            // console.log(error.response.data);

            // commit('setFindAccount', this.findAccntId = 0)
            commit("setFindAccount", 0);

            reject(error);
          }
        });
    });
  },

  callAddDevice({ commit }, data) {
    return new Promise((resolve, reject) => {
    axios
      .post(process.env.VUE_APP_API_URL + "/device", {
        macAddress: data.macAddress,
        sipUserName: data.sipUserName,
        host: data.Host,
        sipPassword: data.SipPassword,
        deviceName: data.DeviceName,
        language: data.Language,
        translation: data.Translation,
        sipPort: data.SipPort,
        numOfDevice: data.NumberOfDevice,
        telNumber: data.TelNumber,
        accountId: data.AccountId,
        customerName: data.customerName
      })
      .then(response => {
        commit("setAddDevice", response.data);
        resolve(response.data)
        
      })
      .catch(error => {
        // console.log(error);
        reject(error)
        // alert("error NGa");
      });
    });
  },

  callDelDevice({ commit }, data) {
    return new Promise((resolve, reject) => {
    axios
      .post(process.env.VUE_APP_API_URL + "/device/delete", {
        deviceId: data.DevId,
        userId: data.UserId
      })
      .then(response => {
        commit("setDelete", response.data);
        resolve(response.data)
        // console.log("Vuex", response.data);
      })
      .catch(error => {
        console.log(error);
        alert("error NGa");
        reject(error);
      });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
