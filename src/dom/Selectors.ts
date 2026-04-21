export const primaryRegionSelector = 'main [data-testid="primaryColumn"] [role="region"]'

export const cellSelector = `[data-testid="cellInnerDiv"]`

export const primaryCellSelector = `${primaryRegionSelector} ${cellSelector}`

export const cellInnerSelector = `${cellSelector} [aria-labelledby^="id__"]`

export const primaryCellInnerSelector = `${primaryRegionSelector} ${cellInnerSelector}`

export const itemSelector = `${cellSelector} [role="listitem"]`

export const primaryItemSelector = `${primaryRegionSelector} ${itemSelector}`

export const primaryTweetSelector = [primaryCellSelector, primaryItemSelector].join(',')
