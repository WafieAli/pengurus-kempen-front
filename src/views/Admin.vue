<template>
  
    <div class="col-md-12">

      <h3>{{content}}</h3>
      
      <br>

      <div class="card card-container">

        <form name="form" @submit.prevent="getInformarion">
          <div class="form-group">
            <label for="info"><b>Info</b></label>
            <select 
              v-model="sent_info"
              class="form-control"
              name="info"            
            >
              <option disabled value="">Please select one</option>
              <option>createdAt</option>
              <option>password</option>
            </select>
            <div
              v-if="submitted && errors.has('info')"
              class="alert-danger"
            >{{errors.first('info')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Get Info</span>
            </button>
          </div>          
        </form>  

        <label for="response"><b>Response</b></label>

        <textarea class="form-control" 
        v-model="received_info" 
        placeholder="Response will be shown here">
        </textarea>
      </div>

      <br/>

      <!-- multiselect -->
      <div>

        <label class="typo__label" for="ajax">Async multiselect</label>

        <multiselect v-model="selectedMultiSelectItems" 
                     id="ajax" 
                     label="username" 
                     track-by="username" 
                     placeholder="Type to search" 
                     open-direction="bottom" 
                     :options="multiSelectItems" 
                     :multiple="true" 
                     :searchable="true" 
                     :loading="multiSelectIsLoading" 
                     :internal-search="false" 
                     :clear-on-select="false" 
                     :preserve-search="false"
                     :show-no-results="false" 
                     :hide-selected="false" 
                     :options-limit="300" 
                     :limit="3" 
                     :limit-text="limitText" 
                     :max-height="600"                      
                     @search-change="asyncFind"
                     @close="clearAll">

        </multiselect>


        <pre class="language-json"><code>{{ selectedMultiSelectItems  }}</code></pre>

      </div>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}
      </div>

    </div>

</template>


<script>
import User from '../models/user';
import {adminUser} from '../modules/admin.module';
import Multiselect from 'vue-multiselect';

export default {
  name: 'Admin',
    components: {
    Multiselect
  },
  data() {
    return {
      user: new User('', '', '', ''),
      content: '',
      sent_info:'',
      received_info:'',
      submitted: false,
      message:'',
      loading:false,
      //multiselect
      selectedMultiSelectItems: [],
      multiSelectItems: [],
      multiSelectIsLoading: false
    };
  },
  computed: {
    
  },
  mounted() {
    adminUser.getAdminContent().then(
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
  },
  methods: {
      getInformarion() {
      this.message = '';
      this.submitted = true;
      this.loading = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          adminUser.getInfo(this.$store.state.auth.user, this.sent_info).then(
            response => {
              this.loading = false;
              this.received_info = response.data.message;
              this.successful = true;
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },

    //multiselect
    limitText (count) {
      return `and ${count} other items`
    },
    asyncFind(query) {
      if(query){
          this.multiSelectIsLoading = true;
          adminUser.getAllUsers(query).then(response => {
            this.multiSelectItems = JSON.parse(response.data.message);
            this.multiSelectIsLoading = false;
        })
      }
    },
    clearAll () {
      this.multiSelectItems = [];
    }
  }
};
</script>

<style>
  @import 'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css';
</style>
