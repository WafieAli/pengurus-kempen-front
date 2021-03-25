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
    <form name="form" @submit.prevent="handleAccount">
      <div>
        <div class="form-group">
          <label for="business_name">Business Name</label>
          <input
            type="text"
            class="form-control"
            name="business_name"
            v-model="business_name"
          />
        </div>
        <div 
          v-if="errors.has('business_name')"
          class="alert alert-danger"
          role="alert">{{errors.first('business_name')}}
        </div>

        <div class="form-group">
          <label for="cm_client_no">CM Portal Client Number</label>
          <input
            type="text"
            class="form-control"
            name="cm_client_no"
            v-model="cm_client_no"
          />
        </div>
        <div 
          v-if="errors.has('cm_client_no')"
          class="alert alert-danger"
          role="alert">{{errors.first('cm_client_no')}}
        </div>

        <div class="form-group">
          <label for="business_email">Business Email</label>
          <input
            class="form-control"
            name="business_email"
            v-model="business_email" 
          />
        </div>
        <div 
          v-if="errors.has('business_email')"
          class="alert alert-danger"
          role="alert">{{errors.first('business_email')}}
        </div>

        <div class="form-group">
          <label for="business_contact_no">Business Contact Number</label>
          <input
            class="form-control"
            name="business_contact_no"
            v-model="business_contact_no"
          />
        </div>
        <div 
          v-if="errors.has('business_contact_no')"
          class="alert alert-danger"
          role="alert">{{errors.first('business_contact_no')}}
        </div>

        <div class="form-group">
          <label for="business_poc">Business POC</label>
          <input
            class="form-control"
            name="business_poc"
            v-model="business_poc"
          />
        </div>
        <div 
          v-if="errors.has('business_poc')"
          class="alert alert-danger"
          role="alert">{{errors.first('business_poc')}}
        </div>

        <br />
        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            class="form-control"
            name="phone"
            v-model="phone"
          />
        </div>
        <div 
          v-if="errors.has('phone')"
          class="alert alert-danger"
          role="alert">{{errors.first('phone')}}
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            class="form-control"
            name="email"
            v-model="email"
          />
        </div>
        <div 
          v-if="errors.has('email')"
          class="alert alert-danger"
          role="alert">{{errors.first('email')}}
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Save Updates</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {account} from '../modules/account.module';

export default {
  name: 'Account',
  data() {
    return {
      submitted: false,
      successful: false,
      message: '',
      business_name: '',
      business_email: '',
      business_contact_no: '',
      business_poc: '',
      cm_client_no: '',
      email: '',
      phone: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    account.getAccount(this.$store.state.auth.user).then(//this is to get the account details from the backend
      response => {
        this.business_name = response.data.message.business_name;
        this.business_email = response.data.message.business_email;
        this.business_contact_no = response.data.message.business_contact_no;
        this.business_poc = response.data.message.business_poc;
        this.cm_client_no = response.data.message.cm_client_no;
        this.email = response.data.message.email;
        this.phone = response.data.message.phone;
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
    handleAccount() {
      this.$validator.validate().then(isValid => {
        if (isValid) {
         let data = {
           business_name: this.business_name,
           business_email: this.business_email,
           business_contact_no: this.business_contact_no,
           business_poc: this.business_poc,
           cm_client_no: this.cm_client_no,
           email: this.email,
           phone: this.phone
        } 
        account.updAccount(data,this.$store.state.auth.user).then(
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
   }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
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
