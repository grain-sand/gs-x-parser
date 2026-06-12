export const cellSelector = `[data-testid="cellInnerDiv"]`

export const cellInnerSelector = `${cellSelector} [aria-labelledby^="id__"]`

export const cellPreviewSelector = `${cellSelector} [data-testid="previewInterstitial"]`

export const itemSelector = `${cellSelector} [role="listitem"]`

export const previewVideoSelector = `${cellPreviewSelector}:not([aria-label*=GIF])`

export const videoComponentSelector = `${cellSelector} [data-testid="videoComponent"]`

// primaryRegionSelector
export const primaryRegionSelector = 'main [data-testid="primaryColumn"] [role="region"]'

//  export const cellPreviewSelector = `${cellSelector}:has([data-testid="previewInterstitial"])`

export const primaryCellSelector = `${primaryRegionSelector} ${cellSelector}`

export const primaryCellInnerSelector = `${primaryRegionSelector} ${cellInnerSelector}`

export const primaryItemSelector = `${primaryRegionSelector} ${itemSelector}`

export const primaryTweetSelector = [primaryCellSelector, primaryItemSelector].join(',')

export const primaryPreviewVideoSelector = `${primaryRegionSelector} ${previewVideoSelector}`

export const primaryVideoComponentSelector = `${primaryRegionSelector} ${videoComponentSelector}`

export const primaryVideoSelector = [primaryPreviewVideoSelector, primaryVideoComponentSelector].join(',')
