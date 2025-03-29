export const SITE_ENDPOINTS = {
	BANNER: {
		INDEX: '/banner',
		GET_BANNERS: '/get-all',
		CREATE_BANNER: '/create-banner',
		UPDATE_BANNER: '/update-banner',
		DELETE_BANNER: '/delete-banner/:id',
		UPDATE_POSITION: '/update-position'
	},
	EVENTS: {
		INDEX: '/events',
		GET_BY_ID: '/get-by-id/:id',
		CREATE_EVENT: '/create-event',
		UPDATE_EVENT: '/update-event/:id',
		DELETE_EVENT: '/delete-event/:id'
	},
	PRODUCTS: {
		INDEX: '/products',
		CREATE_PRODUCT: '/create-product',
		UPDATE_PRODUCT: '/update-product/:id',
		DELETE_PRODUCT: '/delete-product/:id'
	},
	CATEGORIES: {
		INDEX: '/categories',
		CREATE_CATEGORY: '/create-category',
		UPDATE_CATEGORY: '/update-category/:id',
		DELETE_CATEGORY: '/delete-category/:id'
	}
}
