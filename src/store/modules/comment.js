import axios from "axios";

const state = {
  accountId: 0,
  inbox: [],
  comments: [],
  accountName: "",
  message: "",
  createdAt: "",
  perPage: 0,
  currentPageInbox: 1,
  rows: 0,
  marks: [],
  commentId: 0,
  currentPageSupport: 0,
  perPageSupport: 0,
  nextPage: "",
  prevPage: "",
  lastPage: "",
  firstPage: "",
  path: ""
};

const getters = {
  getCommentAccId: state => state.account_id,
  getComment: state => state.comments,
  getCommentPerPage: state => state.perPage,
  getCommentCurrentPage: state => state.currentPageInbox,
  getCommentRows: state => state.rows,
  getInbox: state => state.inbox,
  getCommentAccName: state => state.accountName,
  getMarks: state => state.marks,
  getCommentID : state => state.commentId,
  getCommentPage: state => state.currentPageSupport,
  getPerPageSupp:state => state.perPageSupport,
  getNextPage:state => state.nextPage,
  getPrevPage: state => state.prevPage,
  getLastPage: state => state.lastPage,
  getFirstPage: state => state.firstPage,
  getPath:state => state.path,
  getAll: state =>state.comments
};

const mutations = {
  setCommentsArray(state, array) {
    state.comments = array;
  },
  appendCommentsArray(state,array){
    state.comments = array.concat(state.comments);
  },
  setPerPage(state, perPage) {
    state.perPage = perPage;
  },
  setInbox(state, inbox) {
    state.inbox = inbox;
  },
  setPage(state, obj) {
    state.currentPageInbox = obj.currentPageInbox;
    state.rows = obj.rows;
  },
  setAccountId(state, accountId) {
    state.accountId = accountId;
  },
  setMarks(state, marks) {
    state.marks = marks;
  },
  setCommentID(state, commentID){
    state.commentId = commentID
  },
  setCommentAccName(state, accountName){
    state.accountName = accountName
  },
  setCurrentSupport(state, currentPageSupport){
    state.currentPageSupport = currentPageSupport

  },
  setPerPageSupp(state, perPageSupport){
    state.perPageSupport = perPageSupport
  },
  setNextPage(state, nextPage){
    state.nextPage = nextPage
  },
  setPrevPage(state, prevPage){
    state.prevPage = prevPage
  },
  setLastPage(state, lastPage){
    state.lastPage = lastPage
  },
  setFirstPage(state, firstPage){
    state.firstPage = firstPage
  },
  setPath(state, path){
    state.path = path
  },
  awk(){

  }
};

const actions = {
  fileDownload({commit}, comment) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          process.env.VUE_APP_API_URL + "/comment/download",
          { commentId: comment.comment_id },
          { responseType: "blob" }
        )
        .then(response => {
          commit("awk")
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  sendFile({ commit }, data) {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + rootState.User.token;
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/comment/upload", data)
        .then(response => {
          resolve(response.data);
        commit('awk')
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  markAllAsRead({ commit }, read) {
    // axios.defaults.headers.common["Authorization"] = "Bearer " + rootState.User.token;
    return new Promise((resolve, reject)=>{
    axios
      .post(process.env.VUE_APP_API_URL + "/comment/read/batch", read)
      .then(response => {
        commit("setMarks", response.data.comment);
       // console.log(response.data);
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
       // console.log(error);
      })
    })
  },
  submitReply({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/comment/test", data)
        .then(response => {
          commit("setCommentID", response.data.commentID)
          resolve(response.data.data);
        //  console.log(response.data);
         // console.log(state);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  showPrevData({commit,state}){
    let url = state.prevPage;
    if (url == null) return;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          let dataToArray = Object.keys(response.data.data).map(key => response.data.data[key]);
          commit("appendCommentsArray", dataToArray);
          commit("setCurrentSupport", response.data.current_page)
          commit("setNextPage", response.data.next_page_url)
          commit("setPrevPage", response.data.prev_page_url)
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });

    });

  },
  showAllComments({ commit, rootState }, otherAccount) {
    let accountId = otherAccount;
    if (!accountId) {
      accountId = rootState.Account.accountId;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_URL+"/comment/account/"+accountId)
        .then(response => {
          // console.log(typeof response.data.data,"type");
          // console.log(response.data);
          
          commit("setCommentAccName", response.data.data.account_name);
          commit("setPrevPage", response.data.prev_page_url)
          if(response.data.last_page_url != response.data.first_page_url){
            axios.get(response.data.last_page_url).then(response=>
              {

                let dataToArray = Object.keys(response.data.data).map(key => response.data.data[key]);
                commit("setCommentsArray", dataToArray);
                commit("setCurrentSupport", response.data.current_page)
                commit("setNextPage", response.data.next_page_url)
                commit("setPrevPage", response.data.prev_page_url)
                commit("setLastPage", response.data.last_page_url)
      
              })
          }
          else if(response.data.last_page_url == response.data.first_page_url){

            let dataToArray = Object.keys(response.data.data).map(key => response.data.data[key]);
            commit("setCommentsArray", dataToArray);
            // commit("setCommentsArray", response.data.data);
            commit("setCurrentSupport", response.data.current_page)

          }
          resolve(response.data);
    
        })
        .catch(error => {
          reject(error)
        })
    });
  },
  supportInbox({ commit }, pageObj) {
    let url = process.env.VUE_APP_API_URL + `/comment/all`;
    if (pageObj) {
      if (pageObj.url) {
        url = url + pageObj.url;
      }
      if (pageObj.page) {
        url = url + "?page=" + pageObj.page;
      }
    }
    //  axios.defaults.headers.common["Authorization"] = "Bearer " + rootState.User.token;
    axios.get(url).then(response => {
      let obj = {
        currentPageInbox: response.data.current_page,
        rows: response.data.total
      };
      commit("setPage", obj);
      commit("setInbox", response.data.data);
    });
  },

  readComment({ commit, rootState }, data) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + rootState.User.token;
    axios
      .post(process.env.VUE_APP_API_URL + "/comment/read", data)
      .then(response => {
        commit("setInbox", response.data.is_read);
      });
  },
  recieveMessage({ commit }, mssgObj) {
    let url =
      process.env.VUE_APP_API_URL + `/comment/account/${mssgObj.accountId}`;
    if (mssgObj.page) {
      url = url + "?page=" + mssgObj.page;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)

        .then(response => {
          let obj = {
            currentPageInbox: response.data.current_page,
            rows: response.data.total
          };
          commit("setPage", obj);
          commit("setInbox", response.data.data);
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
         // console.log(error);
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
