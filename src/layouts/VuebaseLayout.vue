<template>
    <v-app>
        <v-navigation-drawer
                width="250"
                class="blue-grey darken-4"
                dark
                persistent
                :mini-variant="miniVariant"
                v-model="drawer"
                app
        >
            <v-toolbar flat class="transparent" dense>
                <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                    <v-list-tile>
                        <v-list-tile-action v-if="!miniVariant">
                            <img src="~@/assets/escudo.png" width="32px">
                        </v-list-tile-action>
                        <v-list-tile-content v-if="!miniVariant">
                            <v-list-tile-title><h3>TEG Chubut</h3></v-list-tile-title>
                            <v-list-tile-title>{{$store.state.user.mail}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.stop="setMiniVariant">
                                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant" v-show="!this.$store.state.user">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/entrar"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="ight-green accent-3">lock</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Iniciar Sesion</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>Iniciar Sesion</span>
            </v-tooltip>

            <v-tooltip right :disabled="!miniVariant" v-show="this.$store.state.user && this.$store.state.user.role!=2">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/usuarios"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="purple">account_circle</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Usuarios TEG</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>Usuarios TEG</span>
            </v-tooltip>

            <v-tooltip right :disabled="!miniVariant" v-show="this.$store.state.user">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/beneficiarios"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="green">airline_seat_recline_normal</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Beneficiarios</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>Beneficiarios</span>
            </v-tooltip>

            <v-divider v-if="this.$store.state.user.role==9"></v-divider>

            <v-tooltip right :disabled="!miniVariant" v-if="this.$store.state.user.role==9">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/users"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="cyan">people</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>ABM Users</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>ABM Users</span>
            </v-tooltip>

            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant" v-if="this.$store.state.user.role==9">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/estadisticas"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="lime">bar_chart</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Estadisticas</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>Estadisticas</span>
            </v-tooltip>

            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant" v-if="this.$store.state.user.role">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/vouchers"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="orange">list_alt</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Vouchers</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>Vouchers</span>
            </v-tooltip>

            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant" v-if="this.$store.state.user.role==9">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/lugares"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="yellow">edit_location</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Lugares</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>Lugares</span>
            </v-tooltip>

            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant" v-show="this.$store.state.user">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                @click.prevent="logOutBtn"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon color="red">power_settings_new</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Salir</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                    </v-list>
                </v-toolbar>
                <span>Salir del Sistema</span>
            </v-tooltip>

        </v-navigation-drawer>

        <v-toolbar
                app
                flat
                dense
                color="blue-grey darken-4"
                dark
        >
            <v-toolbar-side-icon
                    @click.stop="drawer = !drawer"
                    class="hidden-lg-and-up"
            />

            <v-toolbar-title style="color:#76FF03" >
                <v-icon large color="light-green accent-3">directions_bus</v-icon> TEG Chubut
            </v-toolbar-title>
            
        </v-toolbar>

        <v-content>
            <router-view />
        </v-content>

        <v-navigation-drawer
                temporary
                :right="right"
                v-model="rightDrawer"
                fixed
                app
        >
            <v-toolbar flat prominent dark class="primary">
                <v-toolbar-title>Notificaciones</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="rightDrawer = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list subheader dense>
                <v-list-tile color="red">
                    <v-list-tile-action>
                        <v-icon color="error">error</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Tu Perfil esta incompleto
                    </v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile color="info">
                    <v-list-tile-action>
                        <v-icon color="teal">mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Tienes un mensaje nuevo
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
    export default {
        name: 'VuebaseLayout',

        data () {
            return {
                drawer: true,
                fixed: false,
                right: true,
                rightDrawer: false
            }
        },

        methods: {
            
            logOutBtn(){
                if(confirm('Seguro desea salir del sistema?')){
                    this.$store.dispatch('logOut')
                    this.$router.replace('/entrar')
                }
            },

            setMiniVariant(){
                this.$store.dispatch('setMiniVariant')
            }
        },

        computed:{
            miniVariant(){
                return this.$store.state.miniVariant
            }
        }
    }
</script>

<style scoped lang="stylus">
@import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'

.bottom-menu {
    position: absolute;
    width: 100%;
    bottom: 0;
}

.list-border-bottom {
    border-bottom: 1px solid rgba(255, 255, 255, .12);
}
.container {
    background: #333;
    background-size: 400% 400%;
    -webkit-animation: Gradient 15s ease infinite;
    -moz-animation: Gradient 15s ease infinite;
    animation: Gradient 15s ease infinite;

    
}

</style>
