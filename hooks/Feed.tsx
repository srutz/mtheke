import { useQuery } from "@tanstack/react-query"
import { parseFeed } from "./RssParser"


async function getFeed({ query }: { query?: string }) {
    const params = {
        query
    }
    const baseUrl = "https://mediathekviewweb.de/feed"
    const feedUrl = `${baseUrl}?${new URLSearchParams(params as any).toString()}`
    const r = await fetch(feedUrl)
    console.log("response", r.status)
    const xml = await r.text()
    const feed = await parseFeed(xml)
    return feed
}


export function useFeed({ query } : { query?: string}) {
    const { data } = useQuery({
        queryKey: [ query || "-" ],
        queryFn: async () => {
            return getFeed({ query })
        }
    })
    return data
}