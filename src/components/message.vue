<script>
    export default {
        props:['session','userList','user'],
        computed:{
            sessionUser() {
                let users = this.userList.filter(item => item.id === this.session.userId)
                return users[0];
            }
        },
        filters: {
            avatar (item) {
                let user = item.self ? this.user : this.sessionUser;
                return user && user.img;
            },
            time (date) {
                if (typeof date === 'string') {
                    date = new Date(date)
                }
                return date.getHours() + ':' + date.getMinutes();
            }
        },
        directives: {
            'scroll-bottom' () {
                Vue.nextTick (() => {
                    this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
                })
            }
        }
    };
</script>

<template>
    <div class="m-message" v-scroll-bottom="session.messages">
        <ul>
            <li v-for="item in session.messages">
                <p class="time"><span>{{item.date | time}}</span></p>
                <div class="main" :class="{ self: item.self }">
                    <img class="avatar" width="30" height="30" :src="item | avatar" />
                    <div class="text">{{item.text}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="less">
    .m-message {
        padding: 10px 15px;
        overflow-y:scroll;

        li {
            margin-bottom: 15px;
        }

        .time {
            text-align:center;
            margin:8px 0;

            > span {
                background-color: #dcdcdc;
                padding: 1px 18px;
                color:#fff;
                font-size:12px;
                display:inline-block;
                border-radius:4px;
            }
        }

        .avatar {
            float:left;
            margin:0 10px 0 0;
            border-radius:4px;
        }

        .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: ~'calc(100% - 40px)';
            min-height: 30px;
            line-height: 2.5;
            font-size: 12px;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;

            &:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
        }

        .self {
            text-align: right;

            .avatar {
                float: right;
                margin: 0 0 0 10px;
            }
            .text {
                background-color: rgba(246, 74, 182, 0.66);
                color:#fff;
                &:before {
                    right: inherit;
                    left: 100%;
                    border-right-color: transparent;
                    border-left-color: rgba(246, 74, 182, 0.66);
                }
            }
        }
    }
</style>
