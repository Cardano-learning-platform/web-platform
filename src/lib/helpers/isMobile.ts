import { browser } from '$app/environment';

export const isMobile = () => {
    if (!browser) return;
    const mobileWidthThreshold = 768;
    const isScreenWidthMobile = window.matchMedia(`(max-width: ${mobileWidthThreshold}px)`).matches;

    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;

    if (isScreenWidthMobile || hasTouchScreen) return true;

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent) || /android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return true;

    return false;
}