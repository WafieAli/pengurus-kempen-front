<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import {publicUser} from '../modules/public.module';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    publicUser.getPublicContent().then( //this is to get the public content from the backend
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
