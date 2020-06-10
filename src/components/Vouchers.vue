<template>
    <v-container fluid grid-list-xl>                
        <v-layout wrap>
            
            <v-flex xs6 sm3>
                <v-select
                v-model="empresa"
                :items="empresas"
                dark
                autocomplete
                label="Empresa"
                :loading="loading"
                :disabled="loading"
                id="selEmpresa"
                >
                </v-select>
            </v-flex>

            <v-flex xs6 sm6>
                <v-text-field
                v-model="q"
                label="Buscar"
                append-icon="search"
                dark
                autofocus
                color="white"
                @keyup.enter="qUpdate"
                :loading="loading"
                :disabled="loading"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm3>
                <v-select
                label="Criterio" dark
                :items="[{text:'DNI',value:'bdoc'},{text:'Número de Voucher',value:'id'}]"
                v-model="criterio"
                :loading="loading"
                ></v-select>
            </v-flex>

            <v-flex xs12>
                <v-data-table dark
                :items="vouchers"
                key="id"
                :pagination.sync="pagination"
                rows-per-page-text="Mostrar"
                :rows-per-page-items="[5,10,{'text':'Todos','value':-1}]"
                :headers="headers"
                :loading="loading"
                >
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td class="text-xs-left">{{ props.item.id }}</td>
                            <td class="text-xs-left">{{ props.item.fecha }}</td>
                            <td class="text-xs-left">
                                <span class="text-origen">{{ props.item.origen }}</span>
                                <br>
                                <span class="text-destino">{{ props.item.destino }}</span>
                                </td>
                            <td class="text-xs-left">{{ props.item.empresa }}</td>
                            <td class="text-xs-left">{{ props.item.pasajes }}</td>
                            <td class="text-xs-left">{{ props.item.bid }}</td>
                            <td class="text-xs-left">
                                <span :class="{'text-destino':props.item.cond==1,'text-origen':props.item.cond==2,'text-aux':props.item.cond==3}">
                                    {{ condiciones[props.item.cond] }}
                                </span>
                            </td>
                            <td class="text-xs-left">{{ props.item.uid }}</td>
                            <td class="text-xs-left">{{ estadosVoucher[props.item.estado] }}</td>
                            <td>
                                <v-btn flat icon @click="changeVoucherStatus(props.item)">
                                    <v-icon color="lime">swap_horizontal_circle</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>

                    <template slot="pageText" slot-scope="props">
                        Vouchers Anteriores {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
                    </template>

                </v-data-table>
            </v-flex>

            <v-dialog v-model="dialog" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">Canjear Voucher</v-card-title>
                    <v-card-text>
                        Empresa: {{d.empresa}}<br>
                        Voucher ID: {{d.siglas}}-{{d.id.toString().padStart(9,'0')}}
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-text>
                        <v-select
                        label="Estado"
                        :items="[{text:'Emitido', value:'0'},{text:'Canjeado', value:'1'},{text:'Anulado', value:'2'}]"
                        v-model="d.estado"
                        :loading="d.loading"
                        :disabled="d.loading"
                        ></v-select>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" :loading="d.loading" flat @click.native="cancelar">Cancelar</v-btn>
                        <v-btn color="blue darken-1" :loading="d.loading" flat @click.native="guardar">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name:'vouchers',
    data(){
        return {
            condiciones:{1:'Alumno',2:'Docente',3:'Auxiliar'},
            dialog:false,
            estadosVoucher:['Emitido','Canjeado', 'Anulado'],
            loading:false,
            vouchers:[],
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
                    text:'Origen / Destino',
                    align: 'left',
                    sortable: false,
                    value: 'origen'
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
                    text:'Benef.',
                    align: 'left',
                    sortable: false,
                    value: 'bid'
                },
                {
                    text:'Cond',
                    align: 'left',
                    sortable: false,
                    value: 'cond'
                },
                {
                    text:'Emisor',
                    align: 'left',
                    sortable: false,
                    value: 'uid'
                },
                {
                    text:'Estado',
                    align: 'left',
                    sortable: false,
                    value: 'estado'
                },
                {
                    text:'',
                    align: 'left',
                    sortable: false,
                }
            ],
            empresas:[],
            empresa:'',
            q:'',
            criterio:'bdoc',
            d:{id:false,siglas:false,empresa:false,estado:false,loading:false}//campos dentro del dialog
        }
    },

    methods:{
        getVouchersList(){
            this.loading = true
            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'voucher/listado_e',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    uid:this.$store.state.user.id,
                    empresa:this.empresa,
                    role:this.$store.state.user.role,
                    q:this.q,
                    criterio:this.criterio
                }
            }).then(resp=>{
               this.vouchers = resp.data
               this.loading = false
            })
        },
        
        qUpdate(){
            this.getVouchersList()
        },

        changeVoucherStatus(voucher){
            this.empresas.filter(x=>{
                if(x.text==voucher.empresa){
                    this.d.siglas = x.value
                    this.d.empresa = x.text
                    this.d.id = voucher.id
                    this.d.estado = voucher.estado
                }
            })
            this.dialog = true
        },

        cancelar(){
            this.d = {id:false,siglas:false,empresa:false,estado:false,loading:false}
            this.dialog = false
        },

        guardar(){
            this.d.loading = true

             axios({
                baseURL:this.$store.state.api.baseURL,
                url:'voucher/changestatus',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    uid:this.$store.state.user.id,
                    role:this.$store.state.user.role,
                    estado:this.d.estado,
                    vid:this.d.id,
                    empresa:this.d.siglas
                }
            })
            .then(resp=>{
               this.d = {id:false,siglas:false,empresa:false,estado:false,loading:false}
               this.getVouchersList()
               this.dialog = false
            }).catch(err=>{
                this.d = {id:false,siglas:false,empresa:false,estado:false,loading:false}
            })
        }
    },
    

    created(){
        axios({
            baseURL:this.$store.state.api.baseURL,
            url:'trayectos/empresas_full',
            method:'post',
            data:{
                token:this.$store.state.user.token
            }
        }).then(resp=>{
            if(this.$store.state.user.role==2){
                resp.data.map(x=>{
                    if (x.value==(this.$store.state.user.empresa).toString().toUpperCase()){
                        this.empresas.push(x)
                        this.empresa = x.value
                    }
                })
            }else{
                this.empresas = resp.data
                this.empresas[0].text="TODAS"
            }

            this.getVouchersList()
        })
    }
    
}
</script>
<style scoped>
.text-origen{
    color:#2196F3;
}
.text-destino{
    color:#76FF03;
}
.text-aux {
    color:orange;
}
</style>

