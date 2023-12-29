export type AlertType = 'success' | 'info' | 'warning' | 'error'
export type effectType = 'ligth' | 'dark'

export interface AlertProps {
  type?: AlertType
  content?: string
  showIcon?: boolean
  effectType?: effectType
  closable?: boolean
}
export interface AlertEmits {
  (e: 'close'): void
}
