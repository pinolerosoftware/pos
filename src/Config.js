const baseUrl = process.env.REACT_APP_PROXY;

export const Api = {
    base: baseUrl,
    login: `${baseUrl}users/signin/`,
    register: `${baseUrl}users/signup/`,
    company: `${baseUrl}companies/`
};

export const RouterPage = {
    home: '/',    
    account: {
        login: '/login/',
        register: '/register/',
        logout: '/logout/',
        profile: '/profile/'
    }
}
