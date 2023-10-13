import { ClockLoader } from '@components/global'
import styles from './Button.module.css'

const Button = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  loading = false,
  customStyles = '',
}) => {
  return (
    <button
      className={`${styles.button} ${
        type === 'primary'
          ? styles.primary
          : type === 'secondary'
          ? styles.secondary
          : styles.tertiary
      } ${loading ? styles.loading : ''} ${customStyles}`}
      disabled={disabled}
      type="button"
      onClick={() => {
        if (!loading && !disabled) {
          onClick()
        }
      }}
    >
      {loading ? <ClockLoader /> : children}
    </button>
  )
}

export default Button
