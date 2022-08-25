<template>
  <div>
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'">
      <button type="button" class="close" @click="message=''">
        <span>&times;</span>
      </button> {{message}}
    </div>
    <form name="form" @submit.prevent="handleNotification">
      <div>
        <div class="form-group">
          <b-form-checkbox v-model="approve" name="check-button" switch>
            Campaign approved/rejected
          </b-form-checkbox>
          <b-form-checkbox v-model="start" name="check-button" switch>
            Campaign start/end
          </b-form-checkbox>
          <b-form-checkbox v-model="success" name="check-button" switch>
            Payment success/fail
          </b-form-checkbox>
        </div>

        <div v-if="show_email || noti_email">
          <div class="form-group">
            <label for="noti_email">Email</label>
            <input
              type="text"
              class="form-control"
              name="noti_email"
              v-model="noti_email"
              v-validate="'email'"
            />
          </div>
          <div 
            v-if="errors.has('noti_email')"
            class="alert alert-danger"
            role="alert">{{errors.first('noti_email')}}
          </div>
        </div>

        <br><br>

        <div class="form-group" v-show="!noti_email">
          <label for="addemail" class="desc">You can also add email address to receive notifications from SmartRetail</label>
          <b-link name="addemail" @click="showEmail"><center><strong>+Add email</strong></center></b-link>
        </div> 

        <div class="form-group">
          <button class="btn btn-primary btn-block">Save updates</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {notification} from '../modules/notification.module';

export default {
  name: 'NotificationSettings',
  data() {
    return {
      approve: false,
      start: false,
      success: false,
      message: '',
      noti_email: '',
      show_email: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    notification.getNotiSettings(this.$store.state.auth.user).then(//this is to get the account details from the backend
      response => {
        //console.log(response.data.message.[0]);
        this.approve = response.data.message.campaign_appr_rejc;
        this.start = response.data.message.campaign_start_end;
        this.success = response.data.message.payment_succ_fail;
        this.noti_email = response.data.message.email;
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
    handleNotification() {
      this.$validator.validate().then(isValid => {
        if (isValid) {
          let data = {
            campaign_appr_rejc: this.approve,
            campaign_start_end: this.start,
            payment_succ_fail: this.success,
            user_id: this.$store.state.auth.user.id,
            email: this.noti_email
          } 
          notification.updNotiSettings(data,this.$store.state.auth.user).then(
            response => {
              this.message = response.data.message;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
          this.submitted = true;
          this.successful = true;
        }
      });
    },
    showEmail(){
      this.show_email = true;
    }
  }
};
</script>

<style scoped>
.desc {
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
</style>
