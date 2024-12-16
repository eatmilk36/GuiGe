export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);

    // 加 8 小時以符合台灣時間
    const utcPlus8Date = new Date(date.getTime() + 8 * 60 * 60 * 1000);

    return utcPlus8Date.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).replace(/\//g, '-').replace(',', ''); // 將 '/' 換成 '-'，去除逗號
};
