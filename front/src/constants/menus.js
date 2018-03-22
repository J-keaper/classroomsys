/**
 * 侧边菜单配置
 * key：路径
 * title：标题
 * icon：图标
 * sub：子菜单
 */
export const menus = [
    { key: '/admin/home', title: '首页', icon: 'mobile', },
    {
        key: '/admin/apply', title: '教室申请', icon: 'copy',
        sub: [],
    },
    {
        key: '/admin/user', title: '用户管理', icon: 'user',
        sub: [],
    },
    {
        key: '/admin/classroom', title: '教室管理', icon: 'database',
        sub: [],
    },
    {
        key: '/admin/help', title: '帮助', icon: 'info',
    },
];