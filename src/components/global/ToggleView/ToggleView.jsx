const ToggleView = ({ open, onToggle }) => (
  <span
    style={{
      opacity: open ? '0.4' : '1',
    }}
    onClick={() => onToggle(!open)}
  >
    🔒
  </span>
)

export default ToggleView
