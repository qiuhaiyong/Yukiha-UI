import './styles/index.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
