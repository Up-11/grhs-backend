export const SITE_ENDPOINTS = {
	INDEX: '/site',
	BANNER: {
		GET_BANNERS: '/get-all',
		CREATE_BANNER: '/create',
		UPDATE_BANNER: '/update',
		DELETE_BANNER: '/delete',
		UPDATE_POSITION: '/update-position'
	},
	EVENTS: {
		INDEX: '/events',
		CREATE_EVENT: '/create-event',
		UPDATE_EVENT: '/update-event',
		DELETE_EVENT: '/delete-event'
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
