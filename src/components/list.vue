<script>
    export default {

    }
</script>

<template>
    <div class="m-list">
        <ul>
            <li v-for="item in userList | search" :class="{ active: session.userId === item.id }" @click="select(item)">
                <img class="avatar"  width="30" height="30" :alt="item.name" :src="item.img">
                <p class="name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<style>
</style>
