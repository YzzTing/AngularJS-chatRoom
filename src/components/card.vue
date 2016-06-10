<script>
    export default {
        props: ['user','search']
    };
</script>

<template lang="jade">
div.m-card
    header
        img.avatar(width="40" height="40" alt="userImg")
        p.name {{user.name}}
    footer
        input.search(type="text" placeholder="search ..." v-model="search")
</template>

<style style="less">
    .m-card {
        padding: 12px;
        border-bottom: solid 1px rgba(246, 74, 182, 0.66);

        footer {
            margin-top: 10px;
        }

        .avatar, .name {
            vertical-align: middle;
        }

        .avatar {
            border-radius: 5px;
        }

        .name {
            display: inline-block;
            margin: 0 0 0 15px;
            font-size: 16px;
        }

        .search {
            padding: 0 10px;
            width: 100%;
            font-size: 12px;
            color:rgba(246, 74, 182, 0.66);
            height: 30px;
            line-height: 30px;
            border: solid 1px rgba(246, 74, 182, 0.66);
            border-radius: 5px;
            outline: none;
            background-color: #fff;
        }
    }
</style>
