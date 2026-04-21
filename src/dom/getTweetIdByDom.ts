const DomIdReg = /status\/(\d+)/

export function getTweetIdByDom(el: Element) {
	const href: string = (el?.querySelector('a[href*="/status/"]') as any)?.href
	return DomIdReg.exec(href || '')?.[1]
}
