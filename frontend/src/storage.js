export function readLocalStorage() {
    const orders = localStorage.getItem("orders");
    if(orders) {
        return JSON.parse(orders);
    } else {
        return [];
    }
}

export function writeLocalStorage(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}

export function clearLocalStorage() {
    localStorage.removeItem("orders");
}