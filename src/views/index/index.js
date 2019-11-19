import '@/utils/common';
import { commonMixin } from '@/utils/mixin';
import Vue from 'vue';

const app = new Vue({
	el: '#app',
	mixins: [commonMixin],
	data: {
			msg: 'message'
	}
});
$('#app').on('click', () => {
	app.msg = 'message1111111';
});
