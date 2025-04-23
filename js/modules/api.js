const API_BASE_URL = 'https://your-backend-api.com/api'; // Thay thế bằng URL gốc API của bạn

async function fetchData(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                // Thêm các header khác nếu cần (ví dụ: Authorization token)
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error; // Rethrow lỗi để component gọi có thể xử lý
    }
}

// Các hàm cụ thể cho từng endpoint API

async function getUsers() {
    return fetchData('users');
}

async function getUser(id) {
    return fetchData(`users/${id}`);
}

async function createUser(userData) {
    return fetchData('users', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

async function updateUser(id, userData) {
    return fetchData(`users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    });
}

async function deleteUser(id) {
    return fetchData(`users/${id}`, {
        method: 'DELETE',
    });
}

// Các hàm tương tự cho các resource khác (ví dụ: posts, products, orders)

async function getPosts() {
    return fetchData('posts');
}

async function createPost(postData) {
    return fetchData('posts', {
        method: 'POST',
        body: JSON.stringify(postData),
    });
}

// ... và cứ tiếp tục cho các API khác của bạn

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getPosts,
    createPost,
    // Export tất cả các hàm API mà bạn cần sử dụng
};

/**
 * Giải thích nội dung:

    API_BASE_URL: Một hằng số chứa URL gốc của API backend của bạn. Việc này giúp bạn dễ dàng thay đổi URL khi cần (ví dụ: khi chuyển đổi giữa môi trường phát triển và sản xuất).

    fetchData(endpoint, options = {}): Một hàm chung để thực hiện các lời gọi API bằng fetch API tích hợp của trình duyệt.

    endpoint: Phần đường dẫn cụ thể của API endpoint mà bạn muốn gọi (ví dụ: /users, /posts/123).
    options: Một object tùy chọn để cấu hình request (ví dụ: method, body, headers). Giá trị mặc định là một object rỗng.
    Hàm này xử lý các tác vụ chung như:
    Xây dựng URL đầy đủ bằng cách kết hợp API_BASE_URL và endpoint.
    Thiết lập các header mặc định (ví dụ: Content-Type: application/json). Bạn có thể ghi đè hoặc thêm header khác thông qua tham số options.headers.
    Sử dụng async/await để thực hiện các lời gọi API bất đồng bộ một cách dễ đọc hơn.
    Kiểm tra xem response có thành công hay không (response.ok). Nếu không thành công, nó sẽ parse lỗi JSON (nếu có) và ném ra một Error.
    Parse response body thành JSON (response.json()) và trả về dữ liệu.
    Bắt lỗi bằng try/catch và log lỗi ra console, sau đó rethrow lỗi để component gọi có thể xử lý nó.
    Các hàm API cụ thể (ví dụ: getUsers(), createUser(), getPosts()):

    Đây là các hàm wrapper đơn giản gọi hàm fetchData với các tham số cụ thể cho từng API endpoint.
    Chúng định nghĩa HTTP method (GET, POST, PUT, DELETE) và body (nếu có) cần thiết cho từng loại yêu cầu.
    Ví dụ:
    getUsers() gọi endpoint /users bằng phương thức GET để lấy danh sách người dùng.
    createUser(userData) gọi endpoint /users bằng phương thức POST và gửi dữ liệu người dùng trong body (được chuyển đổi thành JSON bằng JSON.stringify()).
    getUser(id) gọi endpoint /users/{id} bằng phương thức GET để lấy thông tin của một người dùng cụ thể.
    export: Cuối cùng, bạn export tất cả các hàm API mà các module hoặc component khác trong ứng dụng của bạn cần sử dụng.

    Cách sử dụng trong các module/component khác:

    JavaScript

    // Ví dụ trong một component (ví dụ: js/components/user-list.js)
    import { getUsers, deleteUser } from '../modules/api.js';

    async function loadUsers() {
    try {
        const users = await getUsers();
        console.log('Danh sách người dùng:', users);
        // Cập nhật giao diện để hiển thị danh sách người dùng
    } catch (error) {
        console.error('Không thể tải người dùng:', error);
        // Hiển thị thông báo lỗi cho người dùng
    }
    }

    async function handleDeleteUser(userId) {
    try {
        await deleteUser(userId);
        console.log(`Người dùng với ID ${userId} đã bị xóa.`);
        // Cập nhật lại danh sách người dùng
        loadUsers();
    } catch (error) {
        console.error(`Không thể xóa người dùng với ID ${userId}:`, error);
        // Hiển thị thông báo lỗi
    }
    }

    // Gọi loadUsers khi component được khởi tạo hoặc khi cần thiết
    loadUsers();

    // Gắn event listener cho nút xóa (ví dụ)
    // document.addEventListener('click', function(event) {
    //   if (event.target.classList.contains('delete-user-btn')) {
    //     const userId = event.target.dataset.userId;
    //     handleDeleteUser(userId);
    //   }
    // });
    Lưu ý:

    Đảm bảo thay thế 'https://your-backend-api.com/api' bằng URL thực tế của API backend của bạn.
    Điều chỉnh các hàm API cụ thể để phù hợp với các endpoints và yêu cầu của backend của bạn.
    Bạn có thể cần thêm các header khác vào request (ví dụ: Authorization với token nếu API của bạn yêu cầu xác thực).
    Xử lý lỗi một cách thích hợp trong cả file api.js và trong các component gọi API để cung cấp phản hồi tốt cho người dùng.
    Đối với các ứng dụng phức tạp hơn, bạn có thể xem xét việc sử dụng các thư viện HTTP client mạnh mẽ hơn như Axios, nhưng fetch API tích hợp thường đủ cho các dự án vừa.
File api.js đóng vai trò là một lớp trừu tượng giữa frontend code của bạn và backend API, giúp bạn dễ dàng quản lý các lời gọi API và thay đổi implementation (ví dụ: thay đổi URL gốc) mà không cần sửa đổi code ở nhiều nơi.
 */