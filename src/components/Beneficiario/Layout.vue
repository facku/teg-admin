<template>
    <v-container fluid grid-list-xs>
        <v-toolbar
                
                tabs
                :color="color"
                dark
        >
            <v-tooltip>
                <v-btn icon to="/beneficiarios" slot="activator">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <span>Volver</span>
            </v-tooltip>

            <v-toolbar-title class="pl-2" ><v-icon>airline_seat_recline_normal</v-icon> Editar Beneficiario</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-tabs
                v-model="tabs"
                color="transparent"
                slider-color="white"
                slot="extension"
            >
                <v-tab
                    v-for="tabsItem in tabsItems"
                    :key="tabsItem.id"
                    :to="tabsItem.link"
                >
                    <span class="pl-2 pr-2">{{ tabsItem.title }}</span>
                </v-tab>
            </v-tabs>

        </v-toolbar>

        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-slide-y-transition modebeneficiarios="out-in">
                        <router-view />
                    </v-slide-y-transition>
                </v-flex>
            </v-layout>
        </v-container>
        
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                tabs: null
            }
        },
        computed:{
            tabsItems(){ 
                if(this.$store.state.user.role==2){
                    return [
                        {id: 1, title: 'Datos Personales', link: '/beneficiario/'+this.$route.params.id+'/datos'}
                    ]
                }else{
                    return [
                        {id: 1, title: 'Datos Personales', link: '/beneficiario/'+this.$route.params.id+'/datos'},
                        {id: 2, title: 'Emitir Voucher', link: '/beneficiario/'+this.$route.params.id+'/solicitarVoucher'}
                    ]
                }
            },

            color(){
                if(typeof this.tabs==='string'){
                    if(this.tabs.split('/')[3] === 'datos') return 'blue-grey darken-3'
                    else return 'blue-grey darken-2'
                }
                
            }
        }
    }
</script>
