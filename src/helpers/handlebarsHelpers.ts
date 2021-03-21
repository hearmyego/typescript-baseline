export default {
	lowercase: function (value: string): string {
		return value.toLowerCase();
	},

	localNumber: function (num: number): string {
		return num.toLocaleString('da-DK');
	},

	localCurrency: function (num: number): string {
		let formatter = new Intl.NumberFormat('da-DK', {
			style: 'currency',
			currency: 'dkk',
		});

		return formatter.format(num);
	},
};
