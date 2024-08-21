import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    console.log('event:', event)
    if (event.url.pathname.startsWith('/custom')) {
        throw redirect(302, '/login');
    }

    const response = await resolve(event);
    console.log('response: ', response)

    return response;
}