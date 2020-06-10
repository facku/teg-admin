<template>
    <v-container fluid grid-list-xl>                
        <v-layout wrap v-if="edit==0">
            <v-flex xs12>
                <h1 style="color:white;text-shadow:2px 2px #000;font-size:2em">
                    ABM Usuarios
                    <v-btn outline icon color="lime accent-3" @click="newUser">
                        <v-icon>person_add</v-icon>
                    </v-btn>
                </h1> 

                <v-data-table
                hide-actions
                class="elevation-1"
                :headers="headers"
                :items="users"
                dark
                >
                    <template slot="items" slot-scope="props">
                        <tr @dblclick="editUser(props.item.id)" :class="[{'light-green--text text--accent-3':props.item.role==1},{'cyan--text text--accent-3':props.item.role==2}]">
                            <td class="text-xs-left">{{ props.item.id }}</td>
                            <td class="text-xs-left">{{ props.item.mail }}</td>
                            <td class="text-xs-left">{{ props.item.nombre }}</td>
                            <td class="text-xs-left">{{ props.item.apellido }}</td>
                            <td class="text-xs-left">{{ roles[props.item.role] }}</td>
                            <td class="text-xs-left">{{ props.item.empresa }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-flex>

        </v-layout>

        <v-layout wrap v-show="edit">

            <v-flex xs12>
                <h1 style="color:white;text-shadow:2px 2px #000;font-size:2em" v-if="edit==2">Crear Nuevo Usuario</h1>
                <h1 style="color:white;text-shadow:2px 2px #000;font-size:2em" v-if="edit==1">Guardar Usuario</h1>
            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                dark required
                label="Alias/Mail"
                v-model="user.mail"
                :disabled="user.id==1"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                dark required
                label="Clave"
                v-model="user.password"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                dark required
                label="Nombre"
                v-model="user.nombre"
                :disabled="user.id==1"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                dark required
                label="Apellido"
                v-model="user.apellido"
                :disabled="user.id==1"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                dark required
                label="Rol"
                :disabled="user.id==1"
                :items="[{'text':'','value':false},{'text':'Administrador','value':'9'},{'text':'TEG','value':'1'},{'text':'Empresa/Municipio','value':'2'}]"
                v-model="user.role"
                >
                </v-select>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                dark
                autocomplete
                label="Empresa"
                :items="empresas"
                :disabled="user.role!=2"
                v-model="user.empresa"
                >
                </v-select>
            </v-flex>

            <v-flex xs12 sm4>
                <v-btn outline block color="white" @click="reset"><v-icon>chevron_left</v-icon> Cancelar</v-btn>
            </v-flex>

            <v-flex xs12 sm4 v-if="user.id!=1 && edit==1 && (user.id!=$store.state.user.id)">
                <v-btn outline block color="red" @click="deleteUser"><v-icon>delete</v-icon> Borrar</v-btn>
            </v-flex>

            <v-flex xs12 sm4>
                <v-btn outline block color="primary"
                v-if="saveBtnDisabled" @click="saveUser"
                >
                    <v-icon>save</v-icon> Guardar
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
            edit:0,
            roles:{'9':'Administrador','1':'TEG','2':'Empresa'},
            empresas:[],
            headers:[
                {
                    text:'# ID',
                    align: 'left',
                    sortable: false,
                    value: 'id'
                },
                {
                    text:'USUARIO',
                    align: 'left',
                    sortable: false,
                    value: 'mail'
                },
                {
                    text:'NOMBRE',
                    align: 'left',
                    sortable: false,
                    value: 'nombre'
                },
                {
                    text:'APELLIDO',
                    align: 'left',
                    sortable: false,
                    value: 'apellido'
                },
                {
                    text:'ROL',
                    align: 'left',
                    sortable: false,
                    value: 'role'
                },
                {
                    text:'Empresa',
                    align: 'left',
                    sortable: false,
                    value: 'empresa'
                },
            ],
            users:[],
            user:{id:'',mail:'',nombre:'',apellido:'',role:'',password:''}
        }
    },

    methods:{
        getEmpresas(){
            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'trayectos/empresas_full',
                method:'post',
                data:{
                    token:this.$store.state.user.token
                }                
            }).then(resp=>{
                this.empresas = resp.data
            })
        },

        getUsers(){
            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'users',
                method:'post',
                data:{
                    token:this.$store.state.user.token
                }                
            }).then(resp=>{
                this.users=resp.data
            })
        },

        editUser(id){
            this.getEmpresas()

            this.edit = 1;
            this.users.map(x=>{
                if(x.id==id){
                    this.user = x
                    this.user.password=''
                }
            })
        },

        newUser(){
            this.getEmpresas()

            this.edit = 2
        },

        saveUser(){
            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'users/save',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    ...this.user
                }                
            }).then(resp=>{
                this.reset()
            })
        },

        deleteUser(){
            let r = window.confirm('Seguro desea eliminar este usuario?')
            if(r){
                axios({
                    baseURL:this.$store.state.api.baseURL,
                    url:'users/delete',
                    method:'post',
                    data:{
                        token:this.$store.state.user.token,
                        id:this.user.id
                    }                
                }).then(resp=>{
                    alert("Usuario Eliminado!")
                    this.reset()
                })
            }
        },

        reset(){
            this.edit = 0
            this.user = {id:'',mail:'',nombre:'',apellido:'',role:'',password:''}
            this.getUsers()
        }
    },

    computed:{
        saveBtnDisabled(){
            if(this.user.role==2){
                return this.user.mail && this.user.nombre && this.user.apellido && this.user.role && this.user.empresa
            }else{
                return this.user.mail && this.user.nombre && this.user.apellido && this.user.role
            }
        }
    },

    created(){
        this.getUsers();
    }
}
</script>
