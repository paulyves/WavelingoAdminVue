import axios from "axios";

const state = {
  userId: 0,
  accountId: 0,
  firstTime: true,
  email: "",
  fullName: "",
  pass: "",
  token: localStorage.getItem("token") || null,
  userType: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  billingEmail: "",
  companyName: "",
  taxId: "",
  street: "",
  city: "",
  country: "",
  state: "",
  zipCode: "",
  usersTbl: [],
  usersTblOnwerAdmin: [],
  currentPageMain: 1,
  rows: 5,
  perPageUser: 20
};
const getters = {
  getAccountNo: state => state.accountId,
  getUserId: state => state.userId,
  getEmail: state => state.email,
  getFullName: state => state.fullName,
  getPass: state => state.pass,
  getToken: state => state.token,
  isLoggedIn: state => state.token !== null,
  getUserType: state => state.userType,
  getUsers: state => state.usersTbl,
  getAccountFname: state => state.firstName,
  getAccountLname: state => state.lastName,
  getAccountJob: state => state.jobTitle,
  getAccountEmail: state => state.billingEmail,
  getAccountCompany: state => state.companyName,
  getAccountTax: state => state.taxId,
  getAccountStreet: state => state.street,
  getAccountCity: state => state.city,
  getAccountCountry: state => state.country,
  getAccountState: state => state.state,
  getAccountZip: state => state.zipCode,
  getFirstTime: state => state.firstTime,

  getcurrentPage: state => state.currentPageMain,
  getROws: state => state.rows,
  getPerpagee: state => state.perPageUser,
  getAllUserOwnbyadmin: state => state.usersTblOnwerAdmin
};
const mutations = {
  logout(state) {
    state.token = "";
  },
  setEmail(state, string) {
    state.email = string;
  },
  setToken: (state, token) => {
    state.token = token;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = null;
  },
  setUserType: (state, string) => {
    state.userType = string;
  },
  setUserId: (state, id) => {
    state.userId = id;
  },
  setFullName: (state, fname) => {
    state.fullName = fname;
  },
  setAccountNo: (state, accountId) => {
    state.accountId = accountId;
  },
  setUsers: (state, usersTbl) => {
    state.usersTbl = usersTbl;
  },

  setAddInvoice: (state, invoice) => {
    (state.firstName = invoice.firstName),
      (state.lastName = invoice.lastName),
      (state.billingEmail = invoice.billingEmail),
      (state.companyName = invoice.companyName),
      (state.country = invoice.country),
      (state.city = invoice.city),
      (state.state = invoice.state),
      (state.zipCode = invoice.zipCode),
      (state.street = invoice.street),
      (state.job = invoice.job),
      (state.taxId = invoice.taxId);
  },
  setFirstTime: (state, firstTime) => {
    state.firstTime = firstTime;
  },

  setUsersOwner: (state, adminOwner) => {
    state.usersTblOnwerAdmin = adminOwner;
  }
};

const actions = {
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
  addInvoiceDetail({ commit }, data) {
    return new Promise(function(resolve) {
      axios
        .post(process.env.VUE_APP_API_URL + "/otherdetails", data)
        .then(response => {
          commit("setAddInvoice", response.data);
          resolve(response.data);
          // console.log(response.data)
        });
    });
  },
  refreshToken({ commit, state }) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
    return new Promise(function(resolve, reject) {
      axios
        .post(process.env.VUE_APP_API_URL + "/refresh")
        .then(response => {
          commit("setUserType", response.data.userType);
          commit("setUserId", response.data.userId);
          commit("setToken", response.data.newToken);
          resolve(response.data.new_token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  auth({ commit }, data) {
    let loginObj = {
      email: data.email,
      password: data.password
    };
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/auth", loginObj)
        .then(response => {
          commit("setUserType", response.data.login.userType);
          commit("setUserId", response.data.login.userId);
          commit("setFirstTime", response.data.login.first_time);
          commit("setToken", response.data.login.token);
          resolve(response.data.login);
          // console.log(response.data.login, response.data.login.userId)
        })
        .catch(error => {
          commit("logout");
          localStorage.removeItem("item");
          reject(error.response.data);
          // console.log(error.response.data)
        });
    });
  },

  nav({ commit, rootState }) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
    let url = process.env.VUE_APP_API_URL + `/user/account/${state.userId}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          rootState.Account.accountId = response.data.account_id;
          rootState.Account.accountName = response.data.account_name;
          rootState.Account.avatarPath = response.data.avatar_path;
          commit("setFullName", response.data.user_full_name);
          resolve(response.data, rootState.User.userId, state.userId);

          // console.log(response.data, state.userId)
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  callUsers({ commit }, dataa) {
    return new Promise((resolve, reject) => {
      let url = process.env.VUE_APP_API_URL + `/account/${dataa.userId}/users`;
      if (dataa) {
        if (dataa.url) {
          url = url + dataa.url;
        }
        if (dataa.page) {
          url = url + "?page=" + dataa.page;
        }
      }
      axios
        .get(url)
        .then(response => {
          let setObj = {
            currentPageMain: response.data.current_page,
            rows: response.data.total
          };
          commit("setUsers", response.data.data);
          commit("setRecords", setObj);

          resolve(setObj);
        })
        .catch(error => {
          // console.error(error.response);
          reject(error.response.data);
        });
    });
  },

  adminOwnerAllUsers({ commit }, dataa) {
    return new Promise((resolve, reject) => {
      let url = process.env.VUE_APP_API_URL + `/account/${dataa.usersAdmin}/users`;
      if (dataa) {
        if (dataa.url) {
          url = url + dataa.url;
        }
        if (dataa.page) {
          url = url + "?page=" + dataa.page;
        }
      }
      axios
        .get(url)
        .then(response => {
          let setObj = {
            currentPageMain: response.data.current_page,
            rows: response.data.total
          };
          commit("setUsersOwner", response.data.data);
          commit("setRecords", setObj);

          resolve(setObj);
        })
        .catch(error => {
          reject(error.response.data);
        });
    });
  },

  CallAdduser({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/user", {
          accountId: data.aCcountId,
          fullName: data.fullName,
          userType: data.userType,
          email: data.eMail,
          password: data.pasSword
        })
        .then(response => {
          resolve(commit, response.data);
        })
        .catch(function(error) {
          //  console.log(error);
          reject(error);
        });
    });
  },

  callUserdel({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/user/delete", {
          deleteUserId: data.deleteUserId,
          userId: data.userId
        })
        .then(response => {
          resolve(commit, response.data);
        })
        .catch(error => {
          //  console.log(error);
          reject(error);
          alert("Delete Failed");
        });
    });
  },

  changePassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(process.env.VUE_APP_API_URL + "/user/password/change", {
          newPassword: data.newPassword,
          oldPassword: data.oldPassword,
          cpUserId: data.cpUserId
        })
        .then(response => {
          resolve(commit, response.data);
          // console.log(response.data);
        })
        .catch(error => {
          //  console.log(error);
          // alert("EROR vuex");
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
