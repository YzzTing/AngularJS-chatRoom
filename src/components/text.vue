<script>
    export default {
        props:['session'],
        data () {
            return {
                text: ''
            };
        },
        methods: {
            inputing (e) {
                if (e.ctryKey && e.keyCode === 13 && this.text.length) {
                    this.session.messages.push ({
                        text:this.text,
                        data:new Date(),
                        self:true
                    });
                    this.text = '';
                }
            }
        }
    };
</script>

<template>
    <div class="m-text">
        <textarea v-model="text" @keyup="inputing"></textarea>
        <div class="action">
            <span>按 Ctrl + Enter 发送</span>
            <a href="javascript:;" class="btn" @click="inputing">发送</a>
        </div>
    </div>
</template>

<style lang="less">
    .m-text {
        height:160px;
        border-top:1px solid #ddd;

        textarea {
            padding:10px;
            height:110px;
            width:102%;
            border:none;
            outline:none;
        }

        .action {
            text-align:right;
            padding: 0 10px;
            .btn {
                color:#fff;
                background-color:rgba(246, 74, 182, 0.66);
                padding: 5px 30px;
                font-size: 14px;
                border-radius:4px;
                text-decoration: none;
                display:inline-block;
            }
        }
    }
</style>
