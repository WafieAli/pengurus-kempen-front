<template>
  <div>
    <form name="form" @submit.prevent="handleAccount">
      <div v-if="!successful">
        <div class="form-group">
          <b-form-checkbox v-model="creditcard" name="check-button">
            Credit Card
          </b-form-checkbox>
        </div>

        <div class="form-group row" style="padding-left: 1rem;">
          <b-card no-body class="text-left col-md-6 col-xl-9"> 
            {{ bank }} <br /><br />{{ card_no }}     
          </b-card>
          <div class="col-md-6 col-xl-3">
            <b-link v-b-modal.creditcard><b-icon icon="pencil"></b-icon></b-link>
            <br /><br />
            <b-icon icon="trash"></b-icon>
            </div>
        </div>

        <div class="form-group">
          <b-link vb-toggle.payment-methods><center><strong>Change payment method</strong></center></b-link>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Add New Card</button>
        </div>
      </div>
    </form>
    <div
    v-if="message"
    class="alert"
    :class="successful ? 'alert-success' : 'alert-danger'"
  >{{message}}</div>

  <!--Modal-->
  <b-modal id="creditcard" title="BootstrapVue" @ok="saveCC">
    <div>
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'">
      <button type="button" class="close" @click="message=''">
        <span>&times;</span>
      </button> {{message}}
    </div>
    <form name="form">
      <div>
        <div class="form-group">
          <label for="bank_name">Bank Name</label>
          <input
            type="text"
            class="form-control"
            name="bank_name"
            v-model="bank"
          />
        </div>
        <div 
          v-if="errors.has('bank_name')"
          class="alert alert-danger"
          role="alert">{{errors.first('bank_name')}}
        </div>

        <div class="form-group">
          <label for="cc_no">Credit Card Number</label>
          <input
            type="text"
            class="form-control"
            name="cc_no"
            v-model="card_no"
          />
        </div>
        <div 
          v-if="errors.has('cct_no')"
          class="alert alert-danger"
          role="alert">{{errors.first('cc_no')}}
        </div>
      </div>
    </form>
  </div>
  </b-modal>
  </div>
</template>

<script>
import {biodata} from '../modules/biodata.module';

export default {
  name: 'Biodata',
  data() {
    return {
      title: 'Biodata',
      submitted: false,
      successful: false,
      bank: 'HSBC',
      card_no: '**** **** 783',
      message: '',
      creditcard: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    biodata.getPayment(this.$store.state.auth.user).then(//this is to get the user data from the backend
      response => {
        this.firstname = response.data.message.firstname;
        this.lastname = response.data.message.lastname;
        this.age = response.data.message.age;
        this.address = response.data.message.address;
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
    handleBiodata() {
      this.$validator.validate().then(isValid => {
        if (isValid) {
         let data = {
           firstname: this.firstname,
           lastname: this.lastname,
           age: this.age,
           address: this.address
        } 
        biodata.updBiodata(data,this.$store.state.auth.user).then(
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
   saveCC: function(){
     alert("ModalOK");
   }
  }
};

/*function maskify(cc) {
  return cc.replace(/.(?=.{4})/g, "#");
}*/
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
