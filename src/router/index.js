import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/beneficiarios',
            name: 'beneficiarios',
            meta:{public:false},
            component: () => import('@/components/Beneficiarios')
        },

        {
            path: '/beneficiario/nuevo',
            name: 'beneficiario_nuevo',
            meta:{public:false},
            component: () => import('@/components/Beneficiario/Nuevo')
        },

        {
            path: '/beneficiario/:id/',
            name: 'beneficiario',
            component: () => import('@/components/Beneficiario/Layout'),
            children: [
                {
                    path: 'datos',
                    name: 'beneficiario.datos',
                    meta:{public:false},
                    component: () => import('@/components/Beneficiario/Datos')
                },
                {
                    path: ':solicitarVoucher',
                    name: 'beneficiario.solicitarVoucher',
                    meta:{public:false},
                    component: () => import('@/components/Beneficiario/SolicitarVoucher')
                }
            ]
        },
        {
            path:'/entrar',
            name:'entrar',
            meta:{public:true},
            component: () => import('@/components/Entrar')
        },
        {
            path:'/vouchers',
            name:'vouchers',
            meta:{public:false},
            component: () => import('@/components/Vouchers')
        },
        {
            path:'/lugares',
            name:'lugares',
            meta:{public:false},
            component: () => import('@/components/Lugares')
        },
        {
            path:'/users',
            name:'users',
            meta:{public:false},
            component: () => import('@/components/Users')
        },
        {
            path:'/estadisticas',
            name:'estadisticas',
            meta:{public:false},
            component: () => import('@/components/Estadisticas')
        },
        {
            path:'*',
            redirect:'/beneficiarios'
        }
    ]
})

router.afterEach((to,from)=>{
    //Verifico si el usuario esta logueado
    if(store.state.user==false){
        //Verifico si la ruta es privada
        if(to.meta.public==false){
            router.replace('/entrar')
        }
    //El usuario esta registrado
    }else{
        //Si quiere entrar al login lo mando a Beneficiarios porque ya esta logueado
        if(to.name==='entrar'){
            router.replace('/beneficiarios')
        }

        //Si esta entrando a amb users y no es admin lo mando a Beneficiarios
        if(to.name==='users' && store.state.user.role!=9){
            router.replace('/beneficiarios')
        }

    }

})

export default router
