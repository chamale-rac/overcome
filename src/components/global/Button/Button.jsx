import styles from './Button.module.css'

const Button = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  loading = false,
}) => (
    <button
      className={`${styles.button} ${type === 'primary' ? styles.primary : styles.secondary}`}
      type="button"
      onClick={() => {
        if (!loading && !disabled) {
          onClick()
        }
      }}
      disabled={disabled}
    >
      <span>{loading ? '...' : children}</span>
    </button>
  )

export default Button
