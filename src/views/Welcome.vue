<template>
	<div class="welcome">
		<v-content>
			<v-layout row wrap align-center>
				<v-flex side xs12 md6 hidden-sm-and-down text-md-center>
					<div class="leftside">
						<img src="../assets/logo.png" alt="logo Untag" class="logo">
						<h2 class="display-3 white--text">
							<span class="font-weight-regular">SILAB</span>
							<span class="font-weight-thin">MIKRO</span>
						</h2>
					</div>
				</v-flex>
				<v-flex xs12 md6>
					<v-container>
						<h3 class="display-2 text-xs-center mb-3 hidden-md-and-up">
							<span class="font-weight-regular">SILAB</span>
							<span class="font-weight-thin">MIKRO</span>
						</h3>
						<v-alert
							:value="alert.alert"
							outline
							type="error"
							transition="slide-y-reverse-transition"
							class="mb-3"
							@click="alert.alert = !alert.alert"
						>
							{{alert.message}}
						</v-alert>
						<v-card>
							<v-card-title primary-title>
								<h5 class="headline dark--text">
									<span class="font-weight-regular">SIGN</span>
									<span class="font-weight-thin">IN</span>
								</h5>
							</v-card-title>
							<v-divider light></v-divider>
							<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="validate">
								<v-card-text>
									<div class="pl-2">
										<v-text-field v-model="username" :counter="20" :rules="usernameRules" label="NBI" required></v-text-field>
	
										<v-text-field v-model="password" type="password" :rules="passwordRules" label="Password" required></v-text-field>
									</div>
								</v-card-text>
								<v-card-actions>
									<div class="pl-3 pb-3">
										<v-btn :disabled="!valid" color="primary" type="submit">
											Login
										</v-btn>
									</div>
								</v-card-actions>
							</v-form>
						</v-card>
					</v-container>
				</v-flex>
			</v-layout>
		</v-content>
	</div>
</template>

<style>
	.side {
		height: 100vh;
		width: 100%;
		background-color: #B721FF;
		background-image: linear-gradient(19deg, #B721FF 0%, #21D4FD 100%);
	}
	.ratih {
		background-color: #B721FF;
		background-image: linear-gradient(19deg, #B721FF 0%, #21D4FD 100%);
	}
	.leftside {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.logo {
		filter: brightness(0) invert(1);
		width: 200px; 
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
	}
</style>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'welcome',
		data() {
			return {
				valid: true,
				alert: {
					alert: false,
					message: '',
					type: ''
				},
				username: '',
				usernameRules: [
					v => !!v || 'Username is required',
					v => (v && v.length <= 20) || 'Username must be less than 20 characters'
				],
				password: '',
				passwordRules: [
					v => !!v || 'Password is required'
				]
			}
		},
		methods: {
			validate() {
				if (this.$refs.form.validate()) {
					this.snackbar = true
					if (this.valid) {
						this.$Progress.start()
						this.$store.dispatch('getToken', {
							username: this.username,
							password: this.password
						})
						.then(responses => {
							this.$router.push('/home')
							this.$Progress.finish()
						})
						.catch(error => {
							this.alert.type = 'error'
							this.alert.message = 'User not found.'
							this.alert.alert = true
							this.$Progress.fail()
						})
					}
				}
			}
		},
		computed: {
			...mapGetters(['loggedIn'])
		}
	}
</script>
