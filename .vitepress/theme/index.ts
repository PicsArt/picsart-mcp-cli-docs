import DefaultTheme from 'vitepress/theme'
import ModelCatalog from './components/ModelCatalog.vue'
import ProviderGrid from './components/ProviderGrid.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ModelCatalog', ModelCatalog)
    app.component('ProviderGrid', ProviderGrid)
  },
}
