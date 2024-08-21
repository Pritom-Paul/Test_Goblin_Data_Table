<script>
	let username;
	let password;
	let envAPI = import.meta.env.VITE_API_GOBLIN_PRODUCTION_API;
	async function handleSubmit(event) {
		event.preventDefault();
		console.log(username, password);
		try {
			const response = await fetch(`${envAPI}/user/token/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: username,
					password: password
				})
			});
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			const responseData = await response.json();
			console.log(responseData);
			window.localStorage.setItem('access_token', responseData.access);
			console.log(window.localStorage.getItem('access_token'));
			// Redirect to /services-homepage
			window.location.href = '/services-homepage';
		} catch (error) {
			console.error('There has been a problem with your fetch operation:', error);
			alert('Login failed: Incorrect username or password.');
		}
	}
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
		<div
			class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
		>
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
				>
					Sign in to your account
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit={handleSubmit}>
					<div>
						<label
							for="username"
							class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Username</label
						>
						<input
							type="text"
							bind:value={username}
							id="username"
							class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							placeholder="username"
							required=""
						/>
					</div>
					<div>
						<label
							for="password"
							class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Password</label
						>
						<input
							type="password"
							bind:value={password}
							id="password"
							placeholder="••••••••"
							class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							required=""
						/>
					</div>
					<button
						type="submit"
						class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
						>Sign in</button
					>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	/* Add any additional styles specific to this page here */
</style>
