<template>
    <div class="search-container">
        <!-- 搜索框 -->
        <form action="/">
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: 'ToutiaoMIndex',

    data() {
        return {
            value: '',
        };
    },

    mounted() {
        
    },

    methods: {
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('取消');
        },
    },
};
</script>

<style lang="scss" scoped>

</style>