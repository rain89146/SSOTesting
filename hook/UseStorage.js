import Cookies from 'js-cookie'

/**
 * Use storage hook
 * @returns 
 */
export default function UseStorage() {

    /**
     * Create local storage
     * @param {*} name 
     * @param {*} value 
     */
    function createStorage(name, value) {
        const storageValue = JSON.stringify(value);
        localStorage.setItem(name, storageValue);
    }

    /**
     * Read storage value
     * @param {*} name 
     * @returns 
     */
    function readStorage(name) {
        const storageValue = localStorage.getItem(name);
        if(typeof storageValue == 'undefined') return null;

        return JSON.parse(storageValue);
    }

    /**
     * clear storage
     * @param {*} name 
     */
    function clearStorage(name) {
        localStorage.removeItem(name);
    }

    /**
     * Create cookie
     * @param {*} name 
     * @param {*} value 
     * @param {*} expires 
     */
    function createCookie(name, value, expires) {
        Cookies.set(name, value, {
            path: '/',
            domain: 'localhost',
            expires: expires,
            secure: false
        })
    }
    
    /**
     * Read cookie
     * @param {*} name 
     * @returns 
     */
    function readCookie(name) {
        return Cookies.get(name);
    }

    /**
     * Clear cookie
     * @param {*} name 
     */
    function clearCookie(name) {
        Cookies.remove(name, {
            path: '/',
            domain: 'localhost'
        })
    }

    return {
        createCookie,
        readCookie,
        clearCookie,
        createStorage,
        readStorage,
        clearStorage
    }
}