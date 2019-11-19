export const commonMixin = {
	mounted () {
		setTimeout(() => {
			$('#app').css({ 'opacity': '1' });
		}, 20);
	}
};
