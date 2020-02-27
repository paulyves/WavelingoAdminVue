import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Account from './modules/accountProfile'
import Records from './modules/records'
import Mainscreen from './modules/mainscreen'
import Auditlog from './modules/auditLog'
import Comment from './modules/comment'
import AllAccounts from './modules/accounts'

Vue.use(Vuex);
export default new Vuex.Store({
    modules :{
     User,
     Account,
     Records,
     Mainscreen,
     Auditlog,
     Comment,
     AllAccounts
    }
});