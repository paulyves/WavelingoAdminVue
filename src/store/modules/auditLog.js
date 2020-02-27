import Axios from "axios";
// axios not Axios
const state = {
  // camel case
  AuditLogs: [],
  perPage: 20,
  currentPageAudit: 1,
  rows: 12,
  search: ""
};

const getters = {
  getAuditLogs: state => state.AuditLogs,
  getCurrentPageAudit: state => state.currentPageAudit,
  getPerPageAudit: state => state.perPage,
  getRowsAudit: state => state.rows,
  getSearchAudit: state => state.search
};

const mutations = {
  setAuditlog: (state, auditlogs) => {
    state.AuditLogs = auditlogs;
  },

  setPagination: (state, setObj) => {
    state.currentPageAudit = setObj.currentPageAudit;
    state.rows = setObj.rows;
    state.search = setObj.search;
  }
};

const actions = {
  CallAllLogs({ commit }, pageObj) {
    let url = process.env.VUE_APP_API_URL + "/audit";
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
      Axios.get(url)
        .then(response => {
          if (response.data.data.length == 0) {
            commit("setAuditlog", response.data.data);
            resolve(response.data.data);
          } else {
            let setObj = {
              currentPageAudit: response.data.current_page,
              rows: response.data.total
            };

            commit("setAuditlog", response.data.data);
            commit("setPagination", setObj);

            resolve(response.data.data);
          }
        })
        .catch(error => {
          console.log(error);
          reject(error.response.data.error);

          // console.error(error.response);
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
