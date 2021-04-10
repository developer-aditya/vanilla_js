class Storage {

    getItemFromLS(key) {
        return localStorage.getItem(key);
    }

    setItemToLS(key, value) {
        localStorage.setItem(key, value);
    }
}