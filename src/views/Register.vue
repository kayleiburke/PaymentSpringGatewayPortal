<template>
  <v-card-text class="text-center">
    <v-layout align-start justify-center row fill-height>
      <v-flex>
        <h1>
          Register
        </h1>
      </v-flex>
      <span text-sm-right>
          <router-link to="/login">
            <a
                    :class="{disabled: registrationInProgress}"
            >Login</a>
          </router-link>
        </span>
    </v-layout>
    <p class="text-muted">Register for an account</p>
    <flash-message variant="success"/>
    <flash-message variant="error"/>
    <flash-message variant="warning"/>
    <v-form ref="registrationForm" @submit.prevent="register()">
      <v-layout wrap>
        <v-flex xs6>
          <v-text-field
                  class="purple-input"
                  label="First Name"
                  v-model="registrationData.firstName"
                  @input="isFormValid"
                  :disabled="registrationInProgress"
                  :rules="[rules.required, rules.notEmpty]"
          />
        </v-flex>
        <v-flex xs6>
          <v-text-field
                  class="purple-input"
                  label="Last Name"
                  v-model="registrationData.lastName"
                  @input="isFormValid"
                  :disabled="registrationInProgress"
                  :rules="[rules.required, rules.notEmpty]"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
                  class="purple-input"
                  label="Email"
                  v-model="registrationData.email"
                  @input="isFormValid"
                  :disabled="registrationInProgress"
                  :rules="[rules.required, rules.notEmpty, rules.isEmail]"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
                  class="purple-input"
                  label="Password"
                  v-model="registrationData.password"
                  type="password"
                  @input="isFormValid"
                  :disabled="registrationInProgress"
                  :rules="[rules.required, rules.notEmpty, rules.minLength, rules.hasLowercaseLetter, rules.hasUppercaseLetter, rules.hasNumber]"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
                  class="purple-input"
                  label="Password Confirmation"
                  v-model="registrationData.passwordConfirmation"
                  type="password"
                  @input="isFormValid"
                  :disabled="registrationInProgress"
                  :rules="[rules.required, rules.passwordMatch]"
          />
        </v-flex>
        <v-flex
                sm12
                v-for="error in errors" :key="error">
          <material-notification
                  class="mb-3"
                  color="error"
          >
            {{error}}
          </material-notification>
        </v-flex>
        <v-flex sm12 v-if="registrationInProgress">
          <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-flex
              sm12>
        <v-btn
                color="purple"
                round
                class="font-weight-light"
                :disabled="registrationInProgress"
                type="submit"
        >Register</v-btn>
      </v-flex>
    </v-form>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex'
import { minLength, hasLowercaseLetter, hasUppercaseLetter, hasNumber } from '@/utils/passwordValidators'
import { email } from 'vuelidate/lib/validators'
import { getErrorMessages } from "@/utils/errorHandlers"

export default {
  name: 'Register',
  data () {
    return {
      registrationData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: [],
      showProgressBar: false,
      rules: {
        required: value => !!value || 'Field is required.',
        notEmpty: value => value.replace(/\s/g, "") != "" || 'Field is required.',
        minLength: value => minLength(value) || 'Password must be at least 8 characters',
        hasUppercaseLetter: value => hasUppercaseLetter(value) || 'Password must contain an uppercase letter',
        hasLowercaseLetter: value => hasLowercaseLetter(value) || 'Password must contain a lowercase letter',
        hasNumber: value => hasNumber(value) || 'Password must contain a number',
        isEmail: value => email(value) || 'Email is not valid',
        passwordMatch: value => this.registrationData.password == this.registrationData.passwordConfirmation || 'Password confirmation must match password'
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser', 'registrationInProgress'])
  },
  methods: {
    isFormValid () {
      return this.$refs['registrationForm'].validate()
    },
    
    register () {
      if (this.isFormValid()) {
        this.errors = []

        var formattedData = {
          user: {
            email: this.registrationData.email,
            first_name: this.registrationData.firstName,
            last_name: this.registrationData.lastName,
            password: this.registrationData.password,
            password_confirmation: this.registrationData.passwordConfirmation
          }
        }

        this.$store.dispatch('auth/register', formattedData)
                .then(data => {
                  this.flash({ message: data.message, variant: 'success' })
                  this.$router.replace(this.$route.query.redirect || '/')
                })
                .catch(error => this.registrationFailed(error))
      }
    },
    
    registrationFailed (error) {
      var errorMessages = getErrorMessages(error)
      this.errors = errorMessages.length > 0 ? errorMessages : ['Registration failed!']
    }
  }
}
</script>
