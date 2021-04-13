//DAL уровень на основе localStorage

export const localStorageAPI = {
    sortByItemId(items) {
        items.sort((a, b) => a.itemId > b.itemId ? 1 : -1);
    },

    setItem(item) {
        const itemId = item.itemId;
        localStorage.setItem(itemId, JSON.stringify(item));
    },

    getItem(itemId) {
        return JSON.parse(localStorage.getItem(itemId));
    },

    deleteItem(itemId) {
        localStorage.removeItem(itemId);
    },

    getAllItems() {
        let items = [];
        for (let i = 0; i < localStorage.length; i++) {
            items.push(this.getItem(localStorage.key(i)));
        }
        this.sortByItemId(items);
        items.reverse();
        return items;
    },

    completeItem(itemId) {
        const item = this.getItem(itemId);
        item.completed = !item.completed;
        this.setItem(item);
    },

    updateItem(itemId, name) {
        const item = this.getItem(itemId);
        item.name = name;
        this.setItem(item);
    }
};