import type { Placement, Options } from '@popperjs/core'
export type PopperOptions = Partial<Options>

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean
  popperOptions?: PopperOptions
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstace {
  show: () => void
  hide: () => void
}
