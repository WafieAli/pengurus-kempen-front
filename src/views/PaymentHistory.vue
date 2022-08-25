<template>
  <div>
    <div class="row jumbotron">
      <div no-body class="text-left col-md-6 col-xl-8"> 
        <span>
          <b>My Balance</b>
        </span>     
      </div>
      <div class="text-right col-md-6 col-xl-4">
        <span>
          <b>{{currentUser.balance}}</b>
        </span>
      </div>
    </div>

    <ul style="padding-left: unset;">
      <li v-for="item in items" :key="item" class="row">
        <div no-body class="text-left col-md-6 col-xl-8"> 
        <span>
          <label style="margin-bottom: unset;">{{formatDate(item.createdAt)}}</label>
          <b>{{item.amount}}</b>
        </span>     
      </div>
      <div class="text-right col-md-6 col-xl-4">
        <span>
          <label style="margin-bottom: unset;"><u>Invoice</u></label>
          <b>{{item.remarks}}</b>
        </span>
      </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {payment} from '../modules/payment.module';

export default {
  name: 'PaymentHistory',
  data() {
    return {
      items: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    payment.getPayLogs(this.$store.state.auth.user).then(
      response => {
        this.items = response.data.message;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }, 
  methods: {
    formatDate(createdAt){
      let d = new Date(createdAt);
      var month = new Array();
      month[0] = "Jan";
      month[1] = "Feb";
      month[2] = "Mar";
      month[3] = "Apr";
      month[4] = "May";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Aug";
      month[8] = "Sep";
      month[9] = "Oct";
      month[10] = "Nov";
      month[11] = "Dec";

      return month[d.getMonth()] + " " + d.getDate() + ", " + 
      d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
  color:#767676;
  font-size: 14px;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

p{
  font-weight: 600;;
}

.row.jumbotron{
  padding: 1.5rem 1rem;
  margin-bottom: unset;
  font-size: 16px;
}
</style>
