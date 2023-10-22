import http from '@/api/http'

export async function login(login, password) {
    let { data } = await http.post('auth/login.php', { login, password }, {
        errorAlert: 'при логине на сайт'
    });

    return data
}

export async function check() {
    try {
        let { data } = await http.get('auth/check.php', {
            silence401: true,
        });
        return data
    } catch (error) {
        return {res: false}
    }
}

export async function logout() {
    try {
        let { data } = await http.get('auth/logout.php');
        return data
    } catch (error) {
        return {res: false}
    }
}
