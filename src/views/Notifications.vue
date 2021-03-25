<template>
  <div>
    <ul style="padding-left: unset; list-style-type: none;">
      <li v-for="list in lists" :key="list">
        <label style="margin-bottom: unset;">
          {{formatDate(list.createdAt)}}</label>
        <b><span 
          v-for="status1 in splitStart(list.campaign_status)" 
          v-text="status1" 
          :key="status1"
          ></span>
          <b-link>{{list.campaign_name}}</b-link>
          <span 
          v-for="status2 in splitEnd(list.campaign_status)" 
          v-text="status2" 
          :key="status2"
          ></span>
        </b>
      </li>
    </ul>
  </div>
</template>

<script>
import {notification} from '../modules/notification.module';

export default {
  name: 'Notification',
  data() {
    return {
      lists: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    notification.getNotificationLogs(this.$store.state.auth.user).then(
      response => {
        this.lists = response.data.message;
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
    splitStart(campaignStatus){
      let status = campaignStatus.split(',');
      return status[0];
    },
    splitEnd(campaignStatus){
      let status = campaignStatus.split(',');
      return status[1];
    },
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
</style>
