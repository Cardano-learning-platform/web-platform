// import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from '$lib/database.types';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User | null
			userInformation: Database['public']['Tables']['profiles']['Row'] | null;
		}
		interface PageData {
			session: Session | null;
		}
	}
}

export { };
