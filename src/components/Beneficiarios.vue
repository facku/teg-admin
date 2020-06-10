<template>
    <v-container fluid grid-list-xs>                
        <v-layout wrap>
            <v-flex xs12>
                <v-layout fluid wrap>
                    <v-flex xs12 sm6 md3>
                        <h1 style="color:white;text-shadow:2px 2px #000;font-size:2em">Beneficiarios</h1>
                    </v-flex>
                    
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="q"
                        placeholder="Buscar"
                        append-icon="search"
                        dark
                        autofocus
                        color="white"
                        @keyup.enter="qUpdate"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md3>
                        <v-btn
                            v-show="this.$store.state.user.role==9"
                            absolute
                            middle
                            right
                            dark
                            outline
                            color="lime"
                            to="beneficiario/nuevo"
                        >
                           <v-icon>person_add</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
               
                 <v-data-table
                    :headers="headers"
                    :items="beneficiarios"
                    :rows-per-page-items="[5,10,25,50]"
                    rows-per-page-text="Mostrar por pagina:"
                    :total-items="$store.state.total"
                    item-key="id"
                    class="elevation-1"
                    :loading="!beneficiarios.length"
                    :pagination.sync="pagination"
                    dark
                    >

                    <template slot="items" slot-scope="props">
                        <tr @dblclick="editBenef(props.item.id)">
                            <td class="text-xs-left hidden-sm-and-up">{{ props.item.apellidos }}, {{ props.item.nombres }}</td>
                            <td class="text-xs-left hidden-xs-only">{{ props.item.id }}</td>
                            <td class="text-xs-left hidden-xs-only">{{ props.item.apellidos }}</td>
                            <td class="text-xs-left hidden-xs-only">{{ props.item.nombres }}</td>
                            <td class="text-xs-left hidden-xs-only">{{ props.item.nrodoc }}</td>
                        </tr>
                    </template>

                    <template slot="pageText" slot-scope="props" v-if="beneficiarios">
                        Beneficiarios {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
                    </template>

                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                q:'',
                pagination: {
                    page: 1,
                    rowsPerPage: 10,
                    totalItems: 0
                },

                headers: [
                    {
                        text:'Beneficiario',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                        class:'hidden-sm-and-up'
                    },
                    {
                        text:'# ID',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                        class:'hidden-xs-only'
                    },
                    {
                        text:'APELLIDOS',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                        class:'hidden-xs-only'
                    },
                    {
                        text:'NOMBRES',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                        class:'hidden-xs-only'
                    },
                    {
                        text:'DNI',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                        class:'hidden-xs-only',
                    }
                ]
                
            }
        },
        computed:{
            beneficiarios(){
                return this.$store.state.beneficiarios||[]
            }
        },
        methods:{
            editBenef(_id){
                this.$router.push("beneficiario/"+_id+"/datos")
            },

            cargarBeneficiarios(){
                this.$store.dispatch('loadBenef', {
                    page:this.pagination.page,
                    rows: this.pagination.rowsPerPage,
                    q:this.q,
                    token: this.$store.state.user.token
                })
            },

            qUpdate(){
                this.pagination.page = 1
                this.cargarBeneficiarios()
            }
        },
        watch:{
            'pagination':function(pagination){
                this.cargarBeneficiarios()
            }
        },
        mounted(){
            if(screen.width<800){
                this.pagination.rowsPerPage = 5
            }

            this.cargarBeneficiarios()
            
        }
    }
</script>

<style scoped>
#banner {
    width:90%;

}
</style>
