import { parseString } from 'xml2js';

export type FeedItem = {
    title: string;
    description: string;
    link: string;
    guid: string;
    category: string;
    creator: string;
    pubDate: string;
    enclosure: {
        url: string;
        length: string;
        type: string;
    };
    duration: string;
    websiteUrl: string;
};

export type FeedHeader = {
    title: string;
    description: string;
    link: string;
    lastBuildDate: string;
};

export type ParsedFeed = {
    header: FeedHeader;
    items: FeedItem[];
};

export async function parseFeed(xmlData: string): Promise<ParsedFeed> {
    return new Promise((resolve, reject) => {
        parseString(xmlData, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            const channel = result.rss.channel[0];
            const header: FeedHeader = {
                title: channel.title[0],
                description: channel.description[0],
                link: channel.link[0],
                lastBuildDate: channel.lastBuildDate[0],
            };
            const items: FeedItem[] = channel.item.map((item: any) => ({
                title: item.title[0],
                description: item.description[0],
                link: item.link[0],
                guid: item.guid[0]._,
                category: item.category[0],
                creator: item['dc:creator'][0],
                pubDate: item.pubDate[0],
                enclosure: {
                    url: item.enclosure[0].$.url,
                    length: item.enclosure[0].$.length,
                    type: item.enclosure[0].$.type,
                },
                duration: item.duration[0],
                websiteUrl: item.websiteUrl[0],
            }));
            resolve({ header, items });
        })
    })  
}
