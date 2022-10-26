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

    return {
        createStorage,
        readStorage,
        clearStorage
    }
}