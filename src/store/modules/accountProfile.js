import axios from "axios";

const state = {
  accountId: 0,
  accountName: "",
  contactNo: "",
  email: "",
  website: "",
  totalCap: "",
  protectCap: "",
  avatarPath: "",
  userType: "",
  invoiceId: 0,
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
  updateFrequency:"",
  defaultLanguage:""
};

const getters = {
  getAccountId: state => state.accountId,
  getAccountName: state => state.accountName,
  getContactNo: state => state.contactNo,
  getEmailAccount: state => state.email,
  getWebsite: state => state.website,
  getTotalCap: state => state.totalCap,
  getProtectCap: state => state.protectCap,
  getAvatarPath: state => state.avatarPath,
  getInvoiceId: state => state.invoiceId,
  getFirstName: state => state.firstName,
  getLastName: state => state.lastName,
  getJobTitle: state => state.jobTitle,
  getBillingEmail: state => state.billingEmail,
  getCompanyName: state => state.companyName,
  getTaxId: state => state.taxId,
  getStreet: state => state.street,
  getCity: state => state.city,
  getCountry: state => state.country,
  getState: state => state.state,
  getZipCode: state => state.zipCode,
  getFrequency: state => state.updateFrequency,
  getDefaultLanguage: state => state.defaultLanguage
};

const mutations = {
  setAccountId: (state, id) => {
    state.accountId = id;
  },
  setAccountName: (state, name) => {
    state.accountName = name;
  },
  setContactName: (state, contact) => {
    state.contactNo = contact;
  },
  setEmailAccount: (state, email) => {
    state.email = email;
  },
  setWebsite: (state, website) => {
    state.website = website;
  },
  setTotalCap: (state, totalCap) => {
    state.totalCap = totalCap;
  },
  setProtectCap: (state, protectCap) => {
    state.protectCap = protectCap;
  },
  setAvatarPath: (state, avatar) => {
    state.avatarPath = avatar;
  },
  setUserType: (state, userType) => {
    state.userType = userType;
  },
  setFrequency:(state, frequency) =>{
    state.updateFrequency = frequency
  },
  setLanguage:(state, language) =>{
    state.defaultLanguage = language
  },
  setInvoice: (state, setDetails) => {
    state.invoiceId = setDetails.invoiceId;
    state.firstName = setDetails.firstName;
    state.lastName = setDetails.lastName;
    state.jobTitle = setDetails.jobTitle;
    state.billingEmail = setDetails.billingEmail;
    state.companyName = setDetails.companyName;
    state.taxId = setDetails.taxId;
    state.street = setDetails.street;
    state.city = setDetails.city;
    state.country = setDetails.country;
    state.state = setDetails.state;
    state.zipCode = setDetails.zipCode;
  },
  setInvoiceId: (state, invoiceId) => {
    state.invoiceId = invoiceId;
  }
};

const actions = {
  loadProfile({ rootState }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/account/profile/" +
            rootState.Account.accountId,
          { responseType: "blob" }
        )
        .then(response => {
          let reader = new window.FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = function() {
            let imageDataUrl = reader.result;
            resolve(imageDataUrl);
          };
          // imageElement.setAttribute("src", imageDataUrl);

          // console.log(response.data)
        })
        .catch(error => {
          reject(error);
        });
    });
    // .then(response =>
    //   Buffer.from(response.data, 'binary').toString('base64'))
  },
  loadClientProfile(context,id) {
    return new Promise((resolve, reject) => {
      console.log(context);
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/account/profile/" +
            id,
          { responseType: "blob" }
        )
        .then(response => {
          let reader = new window.FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = function() {
            let imageDataUrl = reader.result;
            resolve(imageDataUrl);
          };
          // imageElement.setAttribute("src", imageDataUrl);

          // console.log(response.data)
        })
        .catch(error => {
          reject(error);
        });
    });
    // .then(response =>
    //   Buffer.from(response.data, 'binary').toString('base64'))
  },
  changeProfile(context, profileObj) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/account/profile/", profileObj)
        .then(response => {
          // commit("setAvatarPath", response.data.avatarPath)
          resolve(response.data);
          context.dispatch("loadProfile");
          // console.log(response.data);
        })
        .catch(error => {
          //console.log(error);
          reject(error);
        });
    });
  },
  account({ commit, rootState }) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + rootState.User.token;
    axios
      .get(
        process.env.VUE_APP_API_URL + "/account/" + rootState.Account.accountId
      )
      .then(response => {
        commit("setAccountId", response.data.account_id);
        commit("setAccountName", response.data.account_name);
        commit("setContactName", response.data.contact_number);
        commit("setEmailAccount", response.data.email);
        commit("setWebsite", response.data.website);
        commit("setTotalCap", response.data.total_cap);
        commit("setProtectCap", response.data.protect_cap);
        commit("setFrequency", response.data.update_frequency);
        commit("setLanguage", response.data.default_language);
       // console.log(response.data.default_language)
       // console.log(response.data.update_frequency)
      })
      // .catch(error => {
      //   console.log(error);
      // });
  },
  // 'get' prefix is for getters function, use different name for actions
  allAccount({ commit }, accountId) {
    let url = process.env.VUE_APP_API_URL + `/account/${accountId}`;

    axios
      .get(url)
      .then(response => {
        commit("setAccountId", response.data.account_id);
        commit("setAccountName", response.data.account_name);
        commit("setContactName", response.data.contact_number);
        commit("setEmailAccount", response.data.email);
        commit("setWebsite", response.data.website);
        commit("setTotalCap", response.data.total_cap);
        commit("setProtectCap", response.data.protect_cap);
        commit("setFrequency", response.data.update_frequency);
        commit("setLanguage", response.data.default_language);
      })
     
       // console.error(error.response);
      
  },
  updateAccount(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(process.env.VUE_APP_API_URL + "/account/", data)
        .then(response => {
          resolve(response.data);
          context.dispatch("account");
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  updateInvoice(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(process.env.VUE_APP_API_URL + "/invoicedetail/", data)
        .then(response => {
          resolve(response.data);
          context.dispatch("invoiceDetails");
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  invoiceDetails({ commit, state }) {
    axios
      .get(process.env.VUE_APP_API_URL + "/invoicedetail/" + state.accountId)
      .then(response => {
        let setDetails = {
          invoiceId: response.data.invoice_id,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          jobTitle: response.data.job_title,
          billingEmail: response.data.billing_email,
          companyName: response.data.company_name,
          taxId: response.data.tax_id,
          street: response.data.street,
          city: response.data.city,
          country: response.data.country,
          state: response.data.state,
          zipCode: response.data.zipcode
        };

        commit("setInvoice", setDetails);
      });
  },
  userInvoiceDetails({ commit }, accountId) {
    let url = process.env.VUE_APP_API_URL + `/invoicedetail/${accountId}`;
    axios.get(url).then(response => {
      let setDetails = {
        accountId: response.data.account_id,
        invoiceId: response.data.invoice_id,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        jobTitle: response.data.job_title,
        billingEmail: response.data.billing_email,
        companyName: response.data.company_name,
        taxId: response.data.tax_id,
        street: response.data.street,
        city: response.data.city,
        country: response.data.country,
        state: response.data.state,
        zipCode: response.data.zipcode
      };

      commit("setInvoice", setDetails);
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
