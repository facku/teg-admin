<template>
    <v-container grid-list-xl fluid fill-height>

      <v-layout wrap align-center>

        

        <v-flex xs12 md4 offset-sm1>

          <v-card dark>

            <v-toolbar dark color="blue-grey darken-4">
              <v-toolbar-title>Entrar al Sistema</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form>
                <v-text-field :loading="loading" :readonly="loading" prepend-icon="person" v-model="form.mail" label="Usuario" type="text"></v-text-field>
                <v-text-field :loading="loading" :readonly="loading" prepend-icon="lock" v-model="form.password" label="Clave" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark outline color="light-green accent-3" :loading="loading" @click="logIn">Ingresar <v-icon small>lock</v-icon></v-btn>
            </v-card-actions>

          </v-card>

        </v-flex>

      </v-layout>

       <v-snackbar
      :timeout='6000'
      :top='true'
      :multi-line='true'
      color="red darken-3"
      v-model="snackbar"
    >Usuario o Clave incorrectos!</v-snackbar>
    
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name:'entrar',
  data: () => ({
    loading:false,
    drawer: null,
    snackbar:false,
    form:{ mail:'', password:''}
  }),
  props: {
    source: String
  },
  methods:{
    logIn(){
      this.loading=true

      axios({
          baseURL:this.$store.state.api.baseURL,
          url:'auth',
          method:'post',
          data:this.form                
      })
      .then(resp=>{
          this.loading=false
          if(resp.data.status==='ok'){
              this.$store.dispatch('setUser', resp.data.user)
              this.$router.replace('/beneficiarios')
          }else{
              this.snackbar = true
          }
      })
      .catch(err=>{
        this.loading=false
      })

    }
  },

  created(){
    window.localStorage.clear()
  }
}
</script>
<style scoped>
@media (max-width: 959px){
  .container {
    background: linear-gradient(45deg, rgb(255, 156, 43), rgb(92, 131, 0) );
    background-size: 100%
  }
}
@media (min-width: 960px){
  .container {
    background:url(~@/assets/bg.jpg) fixed no-repeat;
  }
}
</style>

