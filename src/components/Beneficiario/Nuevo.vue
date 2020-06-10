<template>

    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                
                <v-card color="grey darken-3" flat>

                    <v-layout wrap align-center justify-space-between>
                        <v-flex xs12><h2>Datos de Registro</h2></v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field
                            v-model="beneficiario.mail"
                            dark
                            type="email"
                            label="Correo Electronico"
                            required
                            :disabled="loading"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field
                            v-model="beneficiario.pass"
                            dark
                            type="password"
                            label="Clave"
                            required
                            :disabled="loading"
                            ></v-text-field>
                        </v-flex>


                        <v-flex xs12><h2>Informacion Personal</h2></v-flex>

                        <v-flex xs12 sm5>
                            <v-text-field
                            dark
                            v-model="beneficiario.apellidos"
                            :counter=10
                            label="Apellidos"
                            required
                            :disabled="loading"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm5>
                            <v-text-field
                            :disabled="loading"
                            dark
                            v-model="beneficiario.nombres"
                            label="Nombres"
                            required
                            ></v-text-field>
                        </v-flex>


                        <v-flex xs12 sm2>
                            <v-text-field
                            :disabled="loading"
                            dark
                            v-model="beneficiario.nrodoc"
                            label="Numero de DNI"
                            required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-select
                            :disabled="loading"
                            dark
                            label="Genero"
                            v-model="beneficiario.sexo"
                            :items="this.sexos"
                            ></v-select>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-select
                            :disabled="loading"
                            dark
                            label="Estado Civil"
                            v-model="beneficiario.ecivil"
                            :items="estadosCiviles"
                            ></v-select>
                        </v-flex>

                        <v-flex xs12 sm4>
                            <v-text-field
                            :disabled="loading"
                            dark
                            v-model="beneficiario.nac_fecha"
                            label="Fecha de Nacimiento"
                            type="date"
                            required
                            ></v-text-field>
                        </v-flex>
                            
                        <v-flex xs12 sm4>
                            <v-text-field
                            :disabled="loading"
                            dark
                            v-model="beneficiario.nac_lug"
                            label="Lugar de Nacimiento"
                            required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm4>
                            <v-select
                            :disabled="loading"
                            dark
                            label="Nacionalidad"
                            v-model="beneficiario.ecivil"
                            :items="[{'text':'Argentina','value':'1'},{'text':'Extranjero','value':'2'}]"
                            ></v-select>
                        </v-flex>

                        <v-flex xs12><h2>Informacion de Contacto</h2></v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field :disabled="loading"
                            dark
                            v-model="beneficiario.calle"
                            label="Nombre de su Calle"
                            required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm2>
                            <v-text-field :disabled="loading"
                            dark
                            v-model="beneficiario.calle_nro"
                            label="Calle Numero (Altura)"
                            required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm2>
                            <v-text-field :disabled="loading"
                            dark
                            v-model="beneficiario.piso"
                            label="Piso"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm2>
                            <v-text-field :disabled="loading"
                            dark
                            v-model="beneficiario.dpto"
                            label="Departamento"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-select :disabled="loading"
                            dark
                            dense
                            autocomplete
                            label="Localidad"
                            v-model="beneficiario.localidad_id"
                            :items="localidades"
                            ></v-select>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field :disabled="loading"
                            dark
                            v-model="beneficiario.cp"
                            label="Codigo Postal"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field :disabled="loading"
                            dark
                            v-model="beneficiario.tel"
                            label="Telefono"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12><h2>Informacion Institucional</h2></v-flex>

                        <v-flex xs12 sm6>
                            <v-select
                            :disabled="loading"
                            autocomplete
                            dark
                            label="Establecimiento"
                            required
                            :items="establecimientos"
                            v-model="beneficiario.enombre"
                            ></v-select>
                        </v-flex>

                        <v-flex xs12 sm3>
                            <v-text-field :disabled="loading" dark label="Distancia en Cuadras" v-model="beneficiario.ecuadras"></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm3>
                            <v-text-field :disabled="loading" dark label="Distancia en Kilometros" v-model="beneficiario.ekms"></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-select :disabled="loading"
                            dark
                            label="Condicion"
                            required
                            v-model="beneficiario.cond"
                            :items="[{'text':'Alumno','value':'1'},{'text':'Docente','value':'2'},{'text':'Auxiliar de Educacion','value':'3'}]"
                            ></v-select>
                        </v-flex>

                        <v-flex xs12>
                            <v-card xs12 flat color="green darken-4" v-if="beneficiario.cond==1">
                                <v-card-title>
                                    <v-layout xs12 wrap>

                                        <v-flex xs12 sm3>
                                            <v-select :disabled="loading"
                                            v-model="beneficiario.alumno_tipo"
                                            :items="[{'text':'Primario','value':'1'},{'text':'Secundario','value':'2'},{'text':'Terciario','value':'3'},{'text':'Universitario','value':'4'}]"
                                            label="Nivel"
                                            dark
                                            ></v-select>
                                        </v-flex>

                                        <v-flex xs12 sm3>
                                            <v-text-field :disabled="loading" v-model="beneficiario.alumno_grado" label="Grado" dark></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 sm3 v-if="beneficiario.alumno_tipo>2">
                                            <v-text-field :disabled="loading" v-model="beneficiario.alumno_carrera" label="Carrera" dark></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 sm3>
                                            <v-checkbox :disabled="loading" label="Alumno Regular" v-model="beneficiario.alumno_regular" dark></v-checkbox>
                                        </v-flex>

                                    </v-layout>
                                </v-card-title>
                            </v-card>

                            <v-card xs12 flat color="blue darken-4" v-if="beneficiario.cond==2">
                                <v-card-title>
                                    <v-layout xs12 wrap>

                                        <v-flex xs12 sm4>
                                            <v-select
                                            v-model="beneficiario.docente_nivel"
                                            :items="[{'text':'Primario','value':'1'},{'text':'Secundario','value':'2'},{'text':'Terciario','value':'3'},{'text':'Universitario','value':'4'}]"
                                            label="Nivel"
                                            dark
                                            ></v-select>
                                        </v-flex>

                                        <v-flex xs12 sm4>
                                            <v-text-field v-model="beneficiario.docente_grado" label="Grado" dark></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 sm4>
                                            <v-text-field v-model="beneficiario.docente_turno" label="Turno" dark></v-text-field>
                                        </v-flex>

                                    </v-layout>
                                </v-card-title>
                            </v-card>

                                            
                            <v-card xs12 flat color="blue-grey" v-if="beneficiario.cond==3">
                                <v-card-title>
                                    <v-layout xs12 wrap>

                                        <v-flex xs12 sm4>
                                            <v-select
                                            :items="[{'text':'Portero/a','value':'1'},{'text':'Maestranza','value':'2'},{'text':'Preceptor/a','value':'3'},{'text':'Bibliotecario/a','value':'4'}]"
                                            label="Tipo"
                                            dark
                                            v-model="beneficiario.aux_tipo"
                                            ></v-select>
                                        </v-flex>

                                    </v-layout>
                                </v-card-title>
                            </v-card>
                        </v-flex>

                        <v-flex xs12 sm6 offset-sm3 class="top">
                            <v-checkbox
                            :disabled="loading"
                            label="Presento Documentacion?"
                            v-model="beneficiario.doc_p"
                            dark
                            @change="doc_pChange"
                            ></v-checkbox>
                        </v-flex>

                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            :disabled="loading"
                            type="date"
                            dark label="Fecha de Presentacion"
                            v-model="beneficiario.doc_f"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm5 offset-sm3 v-if="$store.state.user.role!=2" class="top">
                            <v-btn :loading="loading" outline block dark large :color="loading?'orange':'white'" @click="guardar">
                                <v-icon>check_circle_outline</v-icon>&nbsp;Guardar</v-btn>
                        </v-flex>

                    </v-layout>


                <v-snackbar v-model="alert.show" outline :color="alert.color" bottom left>
                    <v-icon dark>check_circle_outline</v-icon>&nbsp;&nbsp;&nbsp;
                    {{alert.text}}
                    <v-btn icon @click.native="alert.show = false"><v-icon small>close</v-icon></v-btn>
                </v-snackbar>

                </v-card>


            </v-flex>
        </v-layout>
    </v-container>

    
</template>

<script>
import Vue from 'vue' 
import axios from 'axios'

export default {

    data(){
        return {
            loading: false,
            alert:{show:false, text:'', color:''},
            establecimientos:[],
            beneficiario:{},
            sexos:[{'text':'Masculino','value':'1'},{'text':'Femenino','value':'2'}],
            estadosCiviles:[{'text':'Soltero/a','value':'1'},{'text':'Casado/a','value':'2'},{'text':'Divorciado/a','value':'3'},{'text':'Viudo/a','value':'4'}]
        }

    },

    methods:{
        guardar(){
            this.loading = true

            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'beneficiarios/nuevo/',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    ...this.beneficiario
                }
            }).then(resp=>{
                this.loading = false
                if(resp.data.resultado!='0'){
                    this.alert = {show:true,text:'BENEFICIARIO GUARDADO',color:'success'}
                    this.$router.replace('/beneficiarios')
                }else{
                    this.alert = {show:true,text:resp.data.msg, color:'error'}
                }
            })

        },

        doc_pChange(){
            if(!this.beneficiario.doc_p){
                this.beneficiario.doc_f = ''
            }
        }
    },
    
    computed:{
        localidades(){
            return this.$store.state.localidades
        }
    },

    mounted(){
        /*axios({
            baseURL:this.$store.state.api.baseURL,
            url:'beneficiarios/data/',
            method:'post',
            data:{
                id:this.$route.params.id,
                token:this.$store.state.user.token
            }
        }).then(resp=>{
            this.beneficiario = resp.data[0]
        })*/

        axios({
            baseURL:this.$store.state.api.baseURL,
            url:'establecimientos',
            method:'post',
            data:{
                token:this.$store.state.user.token
            }
        }).then(resp=>{
            this.establecimientos = resp.data
        })
    }
}
</script>

<style scoped>
h1,h2 {
    color: #fff;
    text-shadow: 1px 1px #000;
    background: #546E7A;
}
.top {
    margin-top: 20px;
}
</style>
