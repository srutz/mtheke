// Define interfaces for our RSS feed structure
interface RssItem {
    title: string
    description: string
    link: string
    guid: string
    category?: string
    creator?: string
    pubDate: string
    enclosure?: {
        url: string
        length: number
        type: string
    }
    duration?: number
    websiteUrl?: string
}

interface RssFeed {
    title: string
    description: string
    link: string
    generator?: string
    lastBuildDate: string
    selfLink?: string
    ttl?: number
    items: RssItem[]
}

/**
 * Parses RSS XML string to a structured JSON object
 * @param xmlString The RSS XML as a string
 * @returns Parsed RSS feed as a structured object
 */
function parseRssToJson(xmlString: string): RssFeed {
    // Parse the XML string
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlString, "application/xml")

    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror")
    if (parserError) {
        throw new Error("XML parsing error: " + parserError.textContent)
    }

    // Get the channel element
    const channelElement = xmlDoc.querySelector("channel")
    if (!channelElement) {
        throw new Error("Invalid RSS feed: no channel element found")
    }

    // Helper function to safely get text content
    const getTextContent = (element: Element | null): string => {
        if (!element) return ""

        // Handle CDATA sections or regular text
        return element.textContent?.trim() || ""
    }

    // Parse channel metadata
    const feed: RssFeed = {
        title: getTextContent(channelElement.querySelector("title")),
        description: getTextContent(channelElement.querySelector("description")),
        link: getTextContent(channelElement.querySelector("link")),
        generator: getTextContent(channelElement.querySelector("generator")),
        lastBuildDate: getTextContent(channelElement.querySelector("lastBuildDate")),
        ttl: parseInt(getTextContent(channelElement.querySelector("ttl"))) || undefined,
        items: []
    }

    // Get the atom:link element for self reference
    const atomLink = channelElement.querySelector("atom\\:link[rel='self'], link[rel='self']")
    if (atomLink) {
        feed.selfLink = atomLink.getAttribute("href") || undefined
    }

    // Get all items
    const itemElements = channelElement.querySelectorAll("item")

    // Parse each item
    itemElements.forEach(itemElement => {
        const item: RssItem = {
            title: getTextContent(itemElement.querySelector("title")),
            description: getTextContent(itemElement.querySelector("description")),
            link: getTextContent(itemElement.querySelector("link")),
            guid: getTextContent(itemElement.querySelector("guid")),
            pubDate: getTextContent(itemElement.querySelector("pubDate")),
            category: getTextContent(itemElement.querySelector("category")),
            creator: getTextContent(itemElement.querySelector("dc\\:creator"))
        }

        // Parse duration if present
        const durationElement = itemElement.querySelector("duration")
        if (durationElement && durationElement.textContent) {
            item.duration = parseInt(durationElement.textContent)
        }

        // Parse websiteUrl if present
        const websiteUrlElement = itemElement.querySelector("websiteUrl")
        if (websiteUrlElement) {
            item.websiteUrl = getTextContent(websiteUrlElement)
        }

        // Parse enclosure if present
        const enclosureElement = itemElement.querySelector("enclosure")
        if (enclosureElement) {
            item.enclosure = {
                url: enclosureElement.getAttribute("url") || "",
                length: parseInt(enclosureElement.getAttribute("length") || "0"),
                type: enclosureElement.getAttribute("type") || ""
            }
        }

        feed.items.push(item)
    })

    return feed
}


// Example implementation with stream handling
interface StreamInfo {
    title: string
    description: string
    streamUrl: string
    thumbnailUrl?: string
    duration: number
    publishDate: Date
    source: string
    websiteUrl?: string
}

function extractStreamsFromRss(rssFeed: RssFeed): StreamInfo[] {
    return rssFeed.items.map(item => {
        const streamInfo: StreamInfo = {
            title: item.title,
            description: item.description,
            // Prefer enclosure URL if available, fallback to link
            streamUrl: (item.enclosure?.url || item.link),
            duration: item.duration || 0,
            publishDate: new Date(item.pubDate),
            source: item.creator || "Unknown",
            websiteUrl: item.websiteUrl
        }

        return streamInfo
    })
}

