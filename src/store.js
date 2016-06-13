const key = 'VUE-CHAT-v3';

if (!localStorage.getItem(key)) {
    let now = new Date();

    let data = {
        user: {
            id: 1,
            name: 'Yzz',
            img: 'dist/images/1.jpg'
        },
        userList: [
            {
                id: 2,
                name: 'EXBF',
                img: 'dist/images/2.jpg'
            },
            {
                id: 3,
                name: 'EXGF',
                img: 'dist/images/3.jpg'
            }
        ],
        sessionList: [
            {
                userId: 2,
                messages: [
                    {
                        text: 'hello',
                        date: now
                    }
                ]
            },
            {
                userId: 3,
                messages: []
            }
        ],
    };

    localStorage.setItem(key, JSON.stringify(data));
}

export default {
    fetch () {
        return JSON.parse(localStorage.getItem(key));
    },
    save (store) {
        localStorage.setItem(key, JSON.stringify(store));
    }
};
