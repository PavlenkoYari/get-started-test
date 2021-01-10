class QueryString {
    static stringify(obj, prefix) {
        const self = QueryString;
        const str = [];
        for (const p in obj) {
            if(obj.hasOwnProperty(p)) {
                const k = prefix ? `${prefix}[${p}]` : p;
                const v = obj[p];
                str.push(
                    v !== null && typeof v === 'object'
                        ? self.stringify(v, k)
                        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
                );
            }
        }
        return str.join('&');
    }
}

export default QueryString;
