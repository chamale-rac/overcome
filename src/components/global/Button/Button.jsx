import { ClockLoader } from '@components/global'
import styles from './Button.module.css'

const Button = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  loading = false,
}) => (
  <button
    className={`${styles.button} ${
      type === 'primary' ? styles.primary : styles.secondary
    } ${loading ? styles.loading : ''}`}
    type="button"
    onClick={() => {
      if (!loading && !disabled) {
        onClick()
      }
    }}
    disabled={disabled}
  >
    {loading ? <ClockLoader /> : children}
  </button>
)

export default Button
