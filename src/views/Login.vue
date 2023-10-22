<template>
	<form>
		<div>
			<div>
				<input type="text" v-model="authData.login" placeholder="Login">
			</div>
			<div>
				<input type="password" v-model="authData.password" placeholder="Password">
			</div>
			<div>
				<button type="button" class="btn btn-primary" @click="tryLogin">Login</button>
			</div>
			<div v-if="authData.errorText != ''">
				<p class="mt-2 mb-0 text-danger">{{ authData.errorText }}</p>
			</div>
		</div>
	</form>
</template>

<script setup>
	// import { mapGetters, mapActions } from 'vuex';
	import { useUserStore } from '@/stores/user'
	import { useRouter } from 'vue-router'
	import { reactive } from 'vue';

	const userStore = useUserStore();
	const router = useRouter();

	const authData = reactive({
		login: '',
		password: '',
		errorText: ''
	})

	async function tryLogin() {
		let login = await userStore.login(authData.login, authData.password);
		
		if(login.res){
			authData.login = '';
			authData.password = '';
			authData.errorText = '';
			router.push({ name: 'office' });
		}
		else{
			authData.errorText = login.errors.join(',');
		}
	}

	// export default {
	// 	components: {},
	// 	data(){
	// 		return {
	// 			authData: {
	// 				login: '',
	// 				password: '',
	// 				errorText: ''
	// 			}
	// 		}
	// 	},
	// 	computed: {
			
	// 	},
	// 	methods: {
	// 		...mapActions('user', ['login']),
	// 		async tryLogin(){
	// 			let login = await this.login({
	// 				login: this.authData.login, 
	// 				password: this.authData.password
	// 			});
				
	// 			if(login.res){
	// 				this.authData.login = '';
	// 				this.authData.password = '';
	// 				this.authData.errorText = '';
	// 				this.$router.push({ name: 'office' });
	// 			}
	// 			else{
	// 				this.authData.errorText = login.errors.join(',');
	// 			}
	// 		}
	// 	}
	// }
</script>