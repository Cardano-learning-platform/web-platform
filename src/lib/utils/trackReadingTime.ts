import { writable } from 'svelte/store';

export const trackReadingTime = () => {
	const IDLE_TIME = 180; // 3 minutes
	let timer: NodeJS.Timeout;
	const totalTimeInSeconds = writable(0);
	let idleTime = 0;
	let isIdle = false;
	let isTimerRunning = false;

	const startTimer = () => {
		if (isTimerRunning) {
			return;
		}
		isTimerRunning = true;
		timer = setInterval(() => {
			totalTimeInSeconds.update((n) => n + 1);
		}, 1000);
	};

	const stopTimer = () => {
		isTimerRunning = false;
		totalTimeInSeconds.set(0);
		clearInterval(timer);
	};
	const removeTimer = () => {
		isTimerRunning = false;
		clearInterval(timer);
		totalTimeInSeconds.set(0);
	};

	const pauseTimer = () => {
		clearInterval(timer);
		isTimerRunning = false;
	};

	const resumeTimer = () => {
		startTimer();
		startIdleTime();
	};

	const resetIdleTime = () => {
		idleTime = 0;
		if (isIdle) {
			isIdle = false;
			idleTime = 0;
			resumeTimer();
		}
	};

	const startIdleTime = () => {
		idleTime = 0;
		const idleTimer = setInterval(() => {
			idleTime++;
			if (idleTime > IDLE_TIME) {
				clearInterval(idleTimer);
				isIdle = true;
				pauseTimer();
			}
		}, 1000);
	};

	const removeIdleTime = () => {
		if (idleTime) {
			clearInterval(idleTime);
			idleTime = 0;
		}
		isIdle = false;
	};
	//
	const initiate = () => {
		startTimer();
		startIdleTime();
		window.addEventListener('blur', pauseTimer);
		window.addEventListener('focus', resumeTimer);
		window.addEventListener('mousemove', resetIdleTime);
		window.addEventListener('keypress', resetIdleTime);
		window.addEventListener('scroll', resetIdleTime);
	};

	const destroy = () => {
		removeTimer();
		removeIdleTime();
		window.removeEventListener('blur', pauseTimer);
		window.removeEventListener('focus', resumeTimer);
		window.removeEventListener('mousemove', resetIdleTime);
		window.removeEventListener('keypress', resetIdleTime);
		window.removeEventListener('scroll', resetIdleTime);
	};

	return {
		destroy,
		startTimer,
		stopTimer,
		pauseTimer,
		resumeTimer,
		initiate,
		removeTimer,
		totalTimeInSeconds
	};
};
