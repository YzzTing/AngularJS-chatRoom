<script>
import store from '../store';
import card from './card';
import list from './list';
import text from './text';
import message from './message';

export default {
    el: '#app',
    data () {
        let serverData = store.fetch();

        return {
            // 登录用户
            user: serverData.user,
            // 用户列表
            userList: serverData.userList,
            // 会话列表
            sessionList: serverData.sessionList,
            // 搜索key
            search: '',
            // 选中的会话Index
            sessionIndex: 0
        };
    },
    computed: {
        session () {
            return this.sessionList[this.sessionIndex];
        }
    },
    watch: {
        // 每当sessionList改变时，保存到localStorage中
        sessionList: {
            deep: true,
            handler () {
                store.save({
                    user: this.user,
                    userList: this.userList,
                    sessionList: this.sessionList
                });
            }
        }
    },
    components: {
        card, list
    }
};


</script>

<template>
    <div>
        <div class="sidebar">
            <card :user="user" :search.sync="search"></card>
            <list :user-list="userList" :session="session" :session-index.sync="sessionIndex" :search="search"></list>
        </div>
        <div class="main">
            <message :session="session" :user="user" :user-list="userList"></message>
            <text :session="session"></text>
        </div>
    </div>
</template>

<style lang="less">
    #app{
        border-radius:5px;
        .sidebar,.main {
            height:100%;
        }
        .sidebar {
            float:left;
            width:200px;
            color:rgba(246, 74, 182, 0.66);
            background-color:#fff;
        }
        .main {
            position: relative;
            background-color: #fff;
            overflow: hidden;
        }
        .m-text {
            position:absolute;
            width:100%;
            bottom:0;
            left:0;
        }
        .m-message {
            height:~'calc(100% - 160px)';
        }
    }
</style>
