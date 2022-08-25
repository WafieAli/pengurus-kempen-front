<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>SmartRetail</a>
      <div class="navbar-nav mr-auto">

        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>

        <li v-if="showUserBoard" class="nav-item">
          <router-link to="/user" class="nav-link">User</router-link>
        </li>        

        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/moderator" class="nav-link">Moderator Board</router-link>
        </li>        

        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>

      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">

        <div>
          <b-button variant="light" v-b-toggle.notifications><font-awesome-icon icon="bell" size="2x" /></b-button>
          <b-sidebar id="notifications" title="Notifications" right backdrop shadow>
            <div class="px-3 py-2">
              <notifications></notifications>
            </div>
          </b-sidebar>
        </div>

        <div>
          <b-dropdown id="dropdown-right" right no-caret>
            <template #button-content>
              <font-awesome-icon icon="user-circle" size="2x" />
            </template>
            <b-dropdown-item v-b-toggle.account-details><font-awesome-icon icon="user" size="lg" /> Account</b-dropdown-item>
            <b-dropdown-item v-b-toggle.payment-methods><font-awesome-icon icon="dollar-sign" size="lg" /> Payment methods</b-dropdown-item>
            <b-dropdown-item v-b-toggle.payment-history><b-icon icon="pie-chart-fill"></b-icon> Payment history</b-dropdown-item>
            <b-dropdown-item v-b-toggle.noti-settings><b-icon icon="gear"></b-icon> Notification settings</b-dropdown-item>
            <b-dropdown-item v-b-toggle.support><b-icon icon="wrench"></b-icon> Support</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item><a class="dropdown-item" href @click.prevent="logOut"><b-icon icon="power"></b-icon> LogOut</a></b-dropdown-item>
          </b-dropdown>
          <b-sidebar id="account-details" title="Account details" right backdrop shadow>
            <div class="px-3 py-2">
              <account-details></account-details>
            </div>
          </b-sidebar>
          <b-sidebar id="payment-methods" title="Payment methods" right backdrop shadow>
            <div class="px-3 py-2">
              <payment-methods></payment-methods>
            </div>
          </b-sidebar>
          <b-sidebar id="payment-history" title="Payment history" right backdrop shadow>
            <div class="px-3 py-2">
              <payment-history></payment-history>
            </div>
          </b-sidebar>
          <b-sidebar id="noti-settings" title="Notification settings" right backdrop shadow>
            <div class="px-3 py-2">
              <noti-settings></noti-settings>
            </div>
          </b-sidebar>
          <b-sidebar id="support" title="Support" right backdrop shadow>
            <div class="px-3 py-2">
              <support></support>
            </div>
          </b-sidebar>
        </div>
        <li class="nav-item">
         <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <!--li class="nav-item">
          <router-link to="/biodata" class="nav-link">
            <font-awesome-icon icon="user" />
            Biodata
          </router-link>
        </li-->
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li-->
      </div>

      <template>
  <div>
    <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
      <div class="px-3 py-2">
         <router-view />
      </div>
    </b-sidebar>
  </div>
</template>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Account from './views/Account';
import PaymentMethods from './views/PaymentMethods';
import NotiSettings from './views/NotiSettings';
import Support from './views/Support';
import Notifications from './views/Notifications';
import PaymentHistory from './views/PaymentHistory';

export default {
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    },
    showUserBoard() {
      //var currentUser = this.$store.state.auth.user;
      if (this.currentUser && (this.currentUser.role == 'user')) {
        return true;
      }
      return false;
    },
    showModeratorBoard() {
      //var currentUser = this.$store.state.auth.user;
      if (this.currentUser && (this.currentUser.role == 'moderator')) {
        return true;
      }
      return false;
    },
    showAdminBoard() {
      //var currentUser = this.$store.state.auth.user;
      if (this.currentUser && (this.currentUser.role == 'admin')) {
        return true;
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  components: {
    'account-details': Account,
    'payment-methods': PaymentMethods,
    'noti-settings': NotiSettings,
    'support': Support,
    'notifications': Notifications,
    'payment-history': PaymentHistory
  }
};
</script>