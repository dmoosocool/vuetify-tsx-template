import { Vue, Component } from 'vue-property-decorator'

@Component
export default class IndexPage extends Vue {
  public handleClick() {
    console.log('hahhahaha ')
  }

  protected render() {
    return (
      <v-row align="center" justify="space-around">
        <v-btn depressed onClick={this.handleClick}>
          Normal
        </v-btn>
        <v-btn depressed color="primary">
          Primary
        </v-btn>
        <v-btn depressed color="error">
          Error
        </v-btn>
        <v-btn depressed disabled>
          Disabled
        </v-btn>
      </v-row>
    )
  }
}
