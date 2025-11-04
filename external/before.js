export default async (args) => {
    console.log('=== BEFORE HOOK CALLED ===');
    console.log('Request URL:', args.req?.url);

    const { req } = args;

    // 手动解析 URL,因为 req.parsed 还不存在  
    if (req.url) {
        const url = new URL(req.url, 'http://localhost');
        const pathname = url.pathname;
        const searchParams = url.searchParams;

        console.log('Pathname:', pathname);
        console.log('Original params:', searchParams.toString());

        if (pathname.includes('/playwright/firefox')) {
            console.log('Cleaning parameters for /playwright/firefox');

            searchParams.delete('browser');
            searchParams.delete('launch-options');
            searchParams.delete('headless');
            searchParams.delete('chromiumSandbox');
            searchParams.delete('assistantMode');
            searchParams.set("token","123456")

            console.log('Cleaned params:', searchParams.toString());

            // 更新 req.url 为清理后的 URL  
            req.url = pathname + '?' + searchParams.toString();
            console.log('Updated URL:', req.url);
        }
    }


    return true;
};