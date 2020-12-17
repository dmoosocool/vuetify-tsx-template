import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  public handleClick() {
    console.log('hahhahaha ')
  }
  protected render() {
    return (
      <v-app>
        <v-navigation-drawer app></v-navigation-drawer>
        <v-app-bar app></v-app-bar>
        <v-main>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-main>

        <v-footer app></v-footer>
      </v-app>
    )
  }
}
