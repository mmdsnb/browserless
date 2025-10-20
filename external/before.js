export default async (args) => {
    const { req } = args;

    // 确保 req.parsed 存在(在 handleWebSocket 中会被设置)  
    if (req.parsed) {
        const { searchParams } = req.parsed;

        // 移除 browser 参数  
        searchParams.delete('browser');

        // 将 launch-options 重命名为 launch  
        const launchOptions = searchParams.get('launch-options');
        if (launchOptions) {
            searchParams.delete('launch-options');
            searchParams.set('launch', launchOptions);
        }
    }
};
