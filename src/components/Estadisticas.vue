<template>
    <v-container fluid grid-list-xl fill-height>                
        <v-layout wrap>
            <v-flex xs6>
                <v-select
                    :items="meses"
                    dark
                    dense
                    v-model="mes"
                ></v-select>
            </v-flex>

            <v-flex xs6>
                <v-btn
                color="primary"
                :loading="loading"
                @click="getListado"
                v-if="!file"
                >
                <v-icon>star</v-icon>&nbsp;
                Generar Listado
                </v-btn>

                <v-btn
                dark
                color="green"
                v-if="file"
                @click="download"                >
                <v-icon>save_alt</v-icon>&nbsp;
                Descargar ({{total}})
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios'

export default {
    name:'Users',
    data(){
        return {
           loading:false,
           file:false,
           total:0,
           meses: [
               {text:'Enero', value:'1'},
               {text:'Febrero', value:'2'},
               {text:'Marzo', value:'3'},
               {text:'Abril', value:'4'},
               {text:'Mayo', value:'5'},
               {text:'Junio', value:'6'},
               {text:'Julio', value:'7'},
               {text:'Agosto', value:'8'},
               {text:'Septiembre', value:'9'},
               {text:'Octubre', value:'10'},
               {text:'Noviembre', value:'11'},
               {text:'Diciembre', value:'12'}
           ],
           mes:'1'
        }
    },

    methods:{
        getListado(){
            this.loading = true
            this.file = false
            this.total = 0

            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'voucher/listado_full',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    mes:this.mes
                }                
            }).then(resp=>{
                this.loading = false
                this.file = true
                this.total = resp.data.total
            })
        },

        download(){
            var link = document.createElement('a')
            link.href = this.$store.state.api.baseURL+'stats/Listado-Vouchers.xls'
            link.click()
            this.file = false
        }
    }
}
</script>
