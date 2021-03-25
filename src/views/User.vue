<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import {normalUser} from '../modules/user.module';

export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    normalUser.getUserContent().then(//this is to get the user data from the backend
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
