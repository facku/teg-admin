<template>
    <v-container fluid grid-list-xl fill-height text-white>                
        <v-layout wrap>
            <v-flex xs12>
                <v-layout fluid wrap>
                    <v-flex xs12>
                        <h1 style="color:white;text-shadow:2px 2px #000;font-size:2em">Lugares</h1>
                    </v-flex>

                    <v-flex :key="index" v-for="(lugar,index) in lugares" xs8>
                        <v-card dark>
                            <v-card-actions>
                                <v-btn @click="borrar(index)" color="red accent-3" outline><v-icon>delete</v-icon> Borrar</v-btn>
                            </v-card-actions>
                            <v-card-text>
                                <v-text-field label="Localidad" dark v-model="lugares[index].localidad"></v-text-field>
                                <v-text-field label="Horario" dark v-model="lugares[index].horario"></v-text-field>
                                <textarea rows="4" style="width:100%;background:grey;padding:10px 15px;" label="Lugares" dark v-model="lugares[index].lugares"></textarea>
                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex xs8>
                        <v-btn @click="nuevo" large outline block color="lime"><v-icon>add</v-icon> Nuevo</v-btn>
                        <v-btn @click="guardar" large outline block color="success"><v-icon>save</v-icon> Guardar</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name:'lugares',
    data(){
        return {
            lugares:[]
        }
    },
    methods:{
        nuevo(){
            this.lugares.push({
                localidad:'',
                horario:'',
                lugares:''
            })
        },
        borrar(i){
            this.lugares.splice(i,1)
        },
        guardar(){
            axios({
                baseURL:this.$store.state.api.baseURL,
                url:'lugares/guardar',
                method:'post',
                data:{
                    token:this.$store.state.user.token,
                    lugares:this.lugares
                }
            }).then(resp => {})
        }
    },
    created(){
        axios({
            baseURL:this.$store.state.api.baseURL,
            url:'lugares',
            method:'post',
            data:{
                token:this.$store.state.user.token
            }
        }).then(resp => this.lugares = resp.data)
    }
}
</script>


