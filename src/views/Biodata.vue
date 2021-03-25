<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ currentUser.username + "'s " +title }}</h3>
    </header>
    <div class="col-md-12">
      <div class="card card-container">
        <form name="form" @submit.prevent="handleBiodata">
          <div v-if="!successful">
            <div class="form-group">
              <label for="firstname">First Name</label>
              <input
                type="text"
                class="form-control"
                name="firstname"
                v-model="firstname"
                v-validate="'required|min:3|max:20'"
              />
            </div>
            <div 
              v-if="errors.has('firstname')"
              class="alert alert-danger"
              role="alert">{{errors.first('firstname')}}
            </div>

            <div class="form-group">
              <label for="lastname">Last Name</label>
              <input
                type="text"
                class="form-control"
                name="lastname"
                v-model="lastname"
                v-validate="'required|min:3|max:20'"
              />
            </div>
            <div 
              v-if="errors.has('lastname')"
              class="alert alert-danger"
              role="alert">{{errors.first('lastname')}}
            </div>

            <div class="form-group">
              <label for="age">Age</label>
              <input
                type="text"
                class="form-control"
                name="age"
                v-model="age"
                v-validate="'numeric'"
              />
            </div>
            <div 
              v-if="errors.has('age')"
              class="alert alert-danger"
              role="alert">{{errors.first('age')}}
            </div>

            <div class="form-group">
              <label for="address">Address</label>
              <textarea
                class="form-control"
                name="address"
                v-model="address"
                v-validate="'required|min:3|max:100'">
              </textarea>
            </div>
            <div 
              v-if="errors.has('address')"
              class="alert alert-danger"
              role="alert">{{errors.first('address')}}
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block">Save</button>
            </div>
          </div>
        </form>
        <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
      </div>
    </div>
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
      message: '',
      firstname: '',
      lastname: '',
      age: 0,
      address: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    biodata.getBiodata(this.$store.state.auth.user).then(//this is to get the user data from the backend
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
   }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
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
