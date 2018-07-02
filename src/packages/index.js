import TabContainer from './components/tab-container'
import TabContainerItem from './components/tab-container-item'
//import SyDialog from './components/sy-dialog'
import PopUp from './components/popup'
const iview = {
  PopUp,
  TabContainerItem,
  TabContainer,
 // SyDialog
}
const install = function (Vue, opts = {}) {
  if (install.installed) return

  Object.keys(iview).forEach((key) => {
    Vue.component(iview[key].name, iview[key])
  })
  install.installed = true
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  console.log(window.Vue)
  install(window.Vue)
}
export default Object.assign(iview, {install}) // eslint-disable-line no-undef

