<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg12
      >
        <material-google-chart-card
          :data="donationsChart.data"
          :options="donationsChart.options"
          :errors="donationsChart.errors"
          color="info"
          type="AreaChart"
        >
          <h3 class="title font-weight-light">Donation Summary</h3>
          <p class="category d-inline-flex font-weight-light">
            A summary of all mock donations made
          </p>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated {{ new Date() | moment("dddd, MMMM Do YYYY, h:mm a") }}</span>
          </template>
        </material-google-chart-card>
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          :value="totalDonations | currency({symbol: '$', thousandsSeparator: ',', fractionCount: 2, fractionSeparator: '.'})"
          color="green"
          icon="mdi-currency-usd"
          title="Total Donations"
          sub-icon="mdi-clock-outline"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <router-link to="/payment">
          <v-btn
            large
            class="mx-0 font-weight-light"
            color="purple"
            round
          >
            <v-icon left>mdi-home-currency-usd</v-icon>
            <span>Make a Mock Donation!</span>
          </v-btn>
        </router-link>
      </v-flex>
      <helper-donation-list></helper-donation-list>
    </v-layout>
  </v-container>
</template>

<script>
import { getErrorMessages } from "@/utils/errorHandlers"

export default {
  data () {
    return {
      totalDonations: 0,
      donationCount: 0,
      timespan: '',
      donationsChart: {
        data: [],
        options: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017'
          },
          crosshair: {
            color: 'white'
          },
          chartArea: {
            backgroundColor: {
              fill: 'info'
            }
          },
          hAxis: {
            format: 'MM/yy',
            gridlineColor: 'transparent',
            baselineColor: 'white',
            textStyle: {
              color: 'white',
              fontName: 'Roboto,sans-serif'
            }
          },
          vAxis: {
            baselineColor: 'white',
            gridlineColor: 'transparent',
            textStyle: {
              color: 'white',
              fontName: 'Roboto,sans-serif'
            },
            format: 'currency'
          },
          animation: {
            duration: 1000,
            startup: true
          },
          lineWidth: 4,
          colors: ['white', '#ff9800', '#f44336'],
          // Colors the entire chart area, simple version
          // backgroundColor: '#FF0000',
          // Colors the entire chart area, with opacity
          backgroundColor: {
            fill: 'info',
            fillOpacity: 0
          },
          legend: {
            position: 'none'
          },
          tooltip: {
            color: 'white',
            fontName: 'Roboto,sans-serif'
          },
          pointsVisible: true
        },
        errors: []
      }
    }
  },
  mounted () {
    this.getDonations()
  },
  methods: {
    getDonations () {
      this.$store.dispatch('getPaymentChartData')
        .then(function (response) {
          if (response.data) {
            if (response.data.list) {
              this.donationsChart.data = [['Date', 'Donations']].concat(response.data.list)
              this.totalDonations = response.data.total
              this.donationCount = response.data.count
              this.timespan = response.data.timespan
            }
          }
        }.bind(this)).catch(function (error) {
          this.donationsChart.errors = getErrorMessages(error)
        }.bind(this))
    }
  }
}
</script>
