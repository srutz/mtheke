import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { FeedItem, parseFeed } from "./RssParser"


async function getFeed({ query }: { query?: string }) {
    const params = {
        query
    }
    const baseUrl = "https://mediathekviewweb.de/feed"
    const feedUrl = `${baseUrl}?${new URLSearchParams(params as any).toString()}`
    const r = await fetch(feedUrl)
    const xml = await r.text()
    const feed = await parseFeed(xml)
    console.log("query", feedUrl, r.status, feed?.items?.length)
    return feed.items
}


export function useFeed({ query, explicitItems } : { query?: string, explicitItems?: FeedItem[] }) {
    const { data } = useQuery({
        queryKey: [ query || "-" ],
        queryFn: async () => {
            return getFeed({ query })
        },
        placeholderData: keepPreviousData,
    })
    return explicitItems !== undefined ? explicitItems : data 
}