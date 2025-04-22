const eventBus = {
    events: {},
    on(eventName, callback) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    },
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(...args);
            });
        }
    },
    off(eventName, callbackToRemove) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(callback => callback !== callbackToRemove);
        }
    }
};

export default eventBus;

/**
 * * Usage:
    // moduleA.js
    import eventBus from './event-bus.js';

    function doSomething() {
    // ... thực hiện một hành động nào đó ...
    const data = { message: 'Hành động đã hoàn thành!' };
    eventBus.emit('actionCompleted', data);
    }

    // ...

    // moduleB.js
    import eventBus from './event-bus.js';

    function handleActionCompleted(data) {
    console.log('Module B nhận được thông báo:', data.message);
    // ... thực hiện các hành động khác dựa trên thông báo ...
    }

    eventBus.on('actionCompleted', handleActionCompleted);
 */

/**
 * * * Giải thích:
    * Trong ví dụ này, moduleA.js không cần biết về moduleB.js. Nó chỉ cần phát ra sự kiện 'actionCompleted' khi một hành động hoàn thành. moduleB.js đã đăng ký để lắng nghe sự kiện này và sẽ thực hiện hàm handleActionCompleted khi sự kiện được kích hoạt.

    Lưu ý:

    Event Bus là một pattern hữu ích cho các ứng dụng vừa và nhỏ. Đối với các ứng dụng lớn và phức tạp hơn, các giải pháp quản lý state chuyên dụng (ví dụ: Redux, Vuex, hoặc các pattern state management tùy chỉnh) có thể phù hợp hơn để quản lý luồng dữ liệu một cách rõ ràng và dễ theo dõi hơn.
    Sử dụng Event Bus quá mức có thể dẫn đến việc khó theo dõi luồng dữ liệu trong ứng dụng nếu không được quản lý cẩn thận.
    Tóm lại, file event-bus.js trong cấu trúc dự án Vanilla JS mà tôi đề xuất nhằm mục đích cung cấp một cách đơn giản và hiệu quả để các phần khác nhau của ứng dụng giao tiếp với nhau mà không cần phụ thuộc trực tiếp vào nhau, giúp tăng tính module hóa và khả năng bảo trì của code.
 */