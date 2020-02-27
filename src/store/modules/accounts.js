import axios from "axios";
const state = {
  accountsAll: [],
  currentPageAcounts: 1,
  pageRows: 12,
  perPage: 20
};

const getters = {
  getAccounts: state => state.accountsAll,
  getcurrentPageAccounts: state => state.currentPageAcounts,
  getRowstable: state => state.pageRows,
  getperPage: state => state.perPage
};

const mutations = {
  setAccounts: (state, obj) => {
    state.accountsAll = obj;
  },

  setAccountsPage: (state, objectUse) => {
    state.currentPageAcounts = objectUse.currentPageAcounts;
    state.pageRows = objectUse.rows;
  }
};

const actions = {
  callAccounts({ commit }, obj) {
    return new Promise((resolve, reject) => {
      let url = process.env.VUE_APP_API_URL + "/account/all";
      if (obj) {
        if (obj.url) {
          url = url + obj.url;
        }
        if (obj.page) {
          url = url + "?page=" + obj.page;
        }
      }

      axios
        .get(url)
        .then(response => {
          let setObj = {
            currentPageAcounts: response.data.current_page,
            rows: response.data.total
          };
          commit("setAccountsPage", setObj);
          commit("setAccounts", response.data.data);
          // console.log(response.data.current_page, "vuex");
          resolve(setObj);
        })
        .catch(error => {
          console.log(error);
          reject(error);

          // console.error(error.response);
        });
    });
  },

  callAddAccount({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/account", {
          accountName: data.AccountName,
          contactNo: data.ContactNumber,
          email: data.Email,
          website: data.URL,
          protectCap: data.ProtectionCapacity,
          totalCap: data.ProtectionTotal,
          password: data.password,
          updateFrequency: data.updateFrequency,
          defaultLanguage: data.defaultLanguage
        })
        .then(response => {
          resolve(commit, response.data);
          // console.log("Add Na", response.data);
        })
        .catch(error => {
          console.log(error);
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
