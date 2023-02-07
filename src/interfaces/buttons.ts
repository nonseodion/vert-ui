export interface ButtonProps {
  text: string
  background?: "primary" | "transparent"
  textColor?: "white" | "dark"
  bordered?: boolean
  onClick: () => void
}
