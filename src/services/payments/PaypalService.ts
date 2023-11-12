import { Service } from 'typedi';

@Service()
export class PaypalService {
	environment = process.env.ENVIRONMENT;
	client_id = process.env.CLIENT_ID;
	client_secret = process.env.CLIENT_SECRET;
	endpoint_url =
		this.environment === 'sandbox'
			? 'https://api-m.sandbox.paypal.com'
			: 'https://api-m.paypal.com';

	async get_access_token() {
		const auth = `${this.client_id}:${this.client_secret}`;
		const data = 'grant_type=client_credentials';
		return fetch(this.endpoint_url + '/v1/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
			},
			body: data,
		})
			.then((res) => res.json())
			.then((json: any) => {
				return json.access_token;
			});
	}

	createOrder = async (price: number) => {
		try {
			const access_token = await this.get_access_token();

			let order_data_json = {
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'USD',
							value: price.toString(),
						},
					},
				],
			};
			const data = JSON.stringify(order_data_json);

			const response = await fetch(this.endpoint_url + '/v2/checkout/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
				body: data,
			});

			const json = await response.json();
			return json;
		} catch (error: any) {
			throw new Error('Can not create order: ' + error.message);
		}
	};

	completeOrder = async (orderId: string) => {
		try {
			const access_token = await this.get_access_token();

			const response = await fetch(
				this.endpoint_url + '/v2/checkout/orders/' + orderId + '/' + 'capture',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			const json = await response.json();
			return json;
		} catch (error: any) {
			throw new Error('Can not complete order: ' + error.message);
		}
	};
	captureOrder = async (orderID: string) => {
		try {
			const accessToken = await this.get_access_token();
			const url = `${this.endpoint_url}/v2/checkout/orders/${orderID}/capture`;

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to capture order. Status: ${response.status}`);
			}

			const responseData = await response.json();
			console.log(responseData);

			return responseData;
		} catch (error) {
			console.error('Error capturing order:', error);
			throw error;
		}
	};
}
