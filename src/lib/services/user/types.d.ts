import type { RequestEvent } from '@sveltejs/kit';

import type { Database } from '$lib/database.types';
export type Supabase = RequestEvent['locals']['supabase'];

export type User = Database['public']['Tables']['profiles']['Row'];

export type UpdateUserParams = {
	userId: string | undefined | null;
	data: Partial<User>;
};

export type DeductUserCreditsParams = {
	userId: number | undefined;
	token: number | undefined;
	transactionId: string;
};
