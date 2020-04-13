const baseUrl = process.env.REACT_APP_PROXY;

export const Api = {
    base: baseUrl,
    login: `${baseUrl}users/signin/`,
    register: `${baseUrl}users/signup/`,
    company: `${baseUrl}companies/`,
    location: `${baseUrl}locations/`,
    product: `${baseUrl}products/`
};

export const RouterPage = {
    home: '/',
    account: {
        login: '/login/',
        register: '/register/',
        logout: '/logout/',
        profile: '/profile/'
    },
    products: {
        index: '/product/',
        new: '/product/new/',
        edit: '/product/edit/'
    },
    locations: {
        index: '/location/',
        new: '/location/new/',
        edit: '/location/edit/'
    },
    category: {
        index: '/category/',
        new: '/category/new/',
        edit: '/category/edit/'        
    }    
}
