const Eye = ({ open, onToggle}) => (
    <span
      style={{
        color: open ? '#111' : '#DDD'
      }}
      onClick={() => onToggle(!open)}
    >👁</span>
  )

export default Eye
