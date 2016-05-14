/**
 * This module starts a timer to notify you when your coffee is done.
 */
export default startTimer;

const doneMsg = `
Your coffe is done,
go get it!
`;

let m: Modal;

function startTimer(duration: number = 8) {
	if (m) return dismiss();

	m = new Modal();
	let screen = Screen.mainScreen(); // save current screen

	let interval = setInterval(() => {
		duration--;
		showWithMessage();
	}, 1000 * 60);

	setTimeout(() => {
		clearInterval(interval);
		m.close();
		m = new Modal();
		m.message = doneMsg.trim();
		m.showCenterOn(screen);
	}, duration * 60 * 1000);

	duration--;
	showWithMessage();

	function showWithMessage() {
		let min: string;
		if (!duration) {
			min = '<1';
		} else {
			min = '~' + String(duration);
		}

		m.message = `Coffe in ${min} min`;
		let { width: mWidth } = m.frame();
		let { width, height, x, y } = screen.visibleFrameInRectangle();
		let { height: fHeight } = screen.frameInRectangle();

		x = x + width - mWidth - 2;
		// Normally it should suffice to say that y = 2, but depending on if
		// the screen is main or not, the y value seems to be offset somewhat
		// (due to dock?)
		y = 2 + (fHeight - height - y);
		m.origin = { x, y };
		m.show();
	}
}

function dismiss() {
	m.close();
	m = null;
}
