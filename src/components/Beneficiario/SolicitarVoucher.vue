<template>
    <v-card color="transparent" flat>

        <v-layout wrap align-center>
            <v-flex xs12>
                <h2 style="color:white">Vouchers Anteriores</h2>
                <v-data-table dark
                :items="listado"
                key="id"
                :pagination.sync="pagination"
                rows-per-page-text="Mostrar"
                :rows-per-page-items="[5,10,{'text':'Todos','value':-1}]"
                :headers="headers"
                >
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td class="text-xs-left">{{ props.item.id }}</td>
                            <td class="text-xs-left">{{ props.item.fecha }}</td>
                            <td class="text-xs-left">{{ props.item.origen }}</td>
                            <td class="text-xs-left">{{ props.item.destino }}</td>
                            <td class="text-xs-left">{{ props.item.empresa }}</td>
                            <td class="text-xs-left">{{ props.item.pasajes }}</td>
                            <td class="text-xs-left">{{ estadosVoucher[props.item.estado] }}</td>
                        </tr>
                    </template>

                    <template slot="pageText" slot-scope="props">
                        Vouchers Anteriores {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
                    </template>

                </v-data-table>
            </v-flex>
        </v-layout>

        <v-layout wrap justify-center align-center>
            <v-flex xs12 sm4>
                <v-select
                v-if="ciudades"
                v-model="trayecto.origen"
                label="Origen"
                :items="ciudades"
                dense
                autocomplete
                dark
                @change="cargarDestinos"
                :disabled="loading"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm4>
                <v-select
                v-model="trayecto.destino"
                v-if="!!trayecto.origen"
                label="Destino"
                :items="destinos"
                dense
                autocomplete
                dark
                @change="cargarEmpresas"
                :disabled="loading"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm4>
                <v-select
                v-model="trayecto.empresa"
                v-if="!!trayecto.destino && !!trayecto.destino"
                label="Empresa"
                :items="empresas"
                dense
                autocomplete
                dark
                :disabled="loading"
                id="empresa"
                ></v-select>
            </v-flex>

            <v-flex xs12>
                <v-text-field
                type="number"
                v-if="trayecto.empresa"
                :label="'Pasajes '+pasajes"
                thumb-label
                color="light-green accent-4"
                thumb-color="black"
                track-color="light-green darken-4"
                min="10"
                max="100"
                v-model="pasajes"
                dark
                :disabled="loading"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout wrap justify-center align-center>

            <v-flex xs6 sm3>
                <v-btn
                :loading="loading"
                outline
                color="white"
                @click="resetForm">
                    <v-icon>settings_backup_restore</v-icon> <small>Reiniciar</small>
                </v-btn>
            </v-flex>

            <v-flex xs6 sm3 offset-sm6>
                <v-btn
                :loading="loading"
                large
                block
                outline
                color="lime accent-3"
                v-if="trayecto.empresa"
                @click="solicitarVoucher">
                    <v-icon>check_circle_outline</v-icon> <small>Solicitar Voucher</small>
                </v-btn>
            </v-flex>

        </v-layout>

        <v-layout wrap row justify-center align-center v-if="!ciudades">

            <v-progress-circular indeterminate color="white"></v-progress-circular>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <h2>Cargado...</h2>

        </v-layout>

        <v-dialog v-model="dialog" persistent>
           <v-card dark>
                <v-card-title class="headline teal lighten-2" primary-title>Voucher Generado</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div>Se ha emitido el Voucher N° <span class="label-num">{{voucher.numero}}</span> de la empresa <span class="label-emp">{{voucher.empresa}}</span></div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        outline
                        :to="`/beneficiario/${this.$router.currentRoute.params.id}/datos`"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
           </v-card>
        </v-dialog>

    </v-card>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            estadosVoucher:['Emitido','Canjeado', 'Anulado'],
            ciudades:false,
            destinos:[],
            empresas:[],
            loading:false,
            dialog:false,
            voucher:[],
            trayecto:{origen:false,destino:false, empresa:false},
            pasajes:40,
            listado : [],
            pagination:{'sortBy':'fecha','descending':true},
            headers:[
                {
                    text:'Numero',
                    align: 'left',
                    sortable: false,
                    value: 'id'
                },
                {
                    text:'Fecha',
                    align: 'left',
                    sortable: false,
                    value: 'fecha'
                },
                {
                    text:'Origen',
                    align: 'left',
                    sortable: false,
                    value: 'origen'
                },
                {
                    text:'Destino',
                    align: 'left',
                    sortable: false,
                    value: 'destino'
                },
                {
                    text:'Empresa',
                    align: 'left',
                    sortable: false,
                    value: 'empresa',
                },
                {
                    text:'Pasajes',
                    align: 'left',
                    sortable: false,
                    value: 'pasajes'
                },
                {
                    text:'Estado',
                    align: 'left',
                    sortable: false,
                    value: 'estado'
                }
            ]
        }
    },

    methods:{
        resetForm(){
            this.trayecto = {origen:false,destino:false, empresa:false}
            this.voucher = []
            this.loading=false,
            this.dialog=false
        },

        getVouchersList(){
             axios({
                baseURL:this.$store.state.api.baseURL,
                url:'voucher/listado',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    id:this.$router.currentRoute.params.id,
                }
            }).then(resp=>{
                this.listado = resp.data
            })
        },

        cargarOrigenes(){
            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'trayectos/ciudades',
                method:'post',
                data:{
                    token:this.$store.state.user.token
                }
            }).then(resp=>{
                this.ciudades = resp.data
            })
        },

        cargarDestinos(origen){
            if(typeof origen==='string'){
                this.destinos = []
                this.trayecto.destino = false
                this.trayecto.empresa = false
                axios({
                    baseURL:this.$store.state.api.baseURL,
                    url:'trayectos/destinos',
                    method:'post',
                    data:{
                        token:this.$store.state.user.token,
                        origen
                    }
                }).then(resp=>{
                    this.destinos = resp.data
                })
            }
        },

        cargarEmpresas(destino){
            if(typeof destino!='string')
                return false
            this.empresas = []
            this.trayecto.empresa = false
            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'trayectos/empresas',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    origen:this.trayecto.origen,
                    destino
                }
            }).then(resp=>{
                this.empresas = resp.data
            })
        },

        solicitarVoucher(){
            this.loading = true

            axios({
                baseURL:this.$store.state.api.baseURL,
                method:'post',
                url:'voucher',
                data:{
                    token:this.$store.state.user.token,
                    bid:this.$router.currentRoute.params.id,
                    ...this.trayecto,
                    pasajes:this.pasajes,
                    uid:this.$store.state.user.id
                }
            }).then(resp=>{
                if(resp.data.status){
                    this.dialog = true
                    this.voucher = resp.data.voucher
                }
                this.loading=false
            })
        }
    },

    mounted(){
         this.getVouchersList()
        this.cargarOrigenes()
    }
}
</script>

<style>
.label-num {
    font-weight: bolder;
    color: 
#FF3D00;
    font-size: 1.3em;
}
.label-emp {
    font-weight: bolder;
    color:#C6FF00;
    font-size: 1.3em;
}
</style>
