/**
 * 侧边菜单配置
 * key：路径
 * title：标题
 * icon：图标
 * sub：子菜单
 */
export const menus = [
    { key: '', title: '首页', icon: 'mobile', },
    {
        key: '', title: '教室申请', icon: 'copy',
        sub: [
            { key: '', title: '待审批', icon: '', },
            { key: '', title: '全部申请', icon: '', },
        ],
    },
    {
        key: '', title: '用户', icon: 'user',
        sub: [
            { key: '', title: '全部用户', icon: '', },
            { key: '', title: '导入', icon: '', },
        ],
    },
    {
        key: '', title: '教室', icon: 'database',
        sub: [
            { key: '', title: '教室状态', icon: '', },
            { key: '', title: '教室信息', icon: '', },
        ],
    },
    {
        key: '', title: '帮助', icon: 'info',
    },
];