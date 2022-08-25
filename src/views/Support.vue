<template>
  <div>
    <div>
      <label>Need support from us? <br />Contact at</label>
      <p><u>{{ email }}</u><br /><br /><u>{{ tel1 }}</u><br /><u>{{ tel2 }}</u></p>
    </div>
  </div>
</template>

<script>
import {support} from '../modules/support.module';

export default {
  name: 'Support',
  data() {
    return {
      email: '',
      tel1: '',
      tel2: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    support.getSupport().then(
      response => {
        this.email = response.data.message.email;
        this.tel1 = response.data.message.tel1;
        this.tel2 = response.data.message.tel2;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    if (!this.currentUser) {
      this.$router.push('/login');
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
