export function remToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// @media only screen and (max-width: 30rem)
export function mobileSize(width) {
	return width < remToPixels(37);
}
