import type { Database } from '$lib/database.types';
export type History = Database['public']['Tables']['history']['Row'];
export type Courses = Database['public']['Tables']['courses']['Row'];
export type Chapters = Database['public']['Tables']['chapters']['Row'];
export type Contents = Database['public']['Tables']['contents']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];

type HttpError_1 = object;
export type Activity =
	| HttpError_1
	| (History & {
			contents: Contents & {
				chapters: Chapters & {
					courses: Courses;
				};
			};
	  })[];
// {
// 	user: [ { profile_id: 126 } ],
// 	lesson: [
// 	  {
// 		lessons: {
// 		  lesson_title: '4.3 Parts of the Cell and Their Functions',
// 		  slug: '4-3-parts-of-the-cell-and-their-functions',
// 		  course: [ { courses: { course_name: 'Biology for grade 11' } } ]
// 		}
// 	  }
// 	]
//   },
export type LessonWithCourse =
	| HttpError_1
	| {
			user: { profile_id: number }[];
			lesson: Lesson &
				{
					course: Courses[];
				}[];
	  }[];
