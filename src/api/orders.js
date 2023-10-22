import http from '@/api/http'

export async function getOrders() {
    let { data } = await http.get('orders.php', {
        errorAlert: 'при получении списка заказов'
    });
    return data
}