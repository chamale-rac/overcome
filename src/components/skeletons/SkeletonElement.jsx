import * as styles from './SkeletonElement.module.css';

function SkeletonElement({ type }) {

  const classes = type

  return (
    <div className={`${styles.skeleton} ${styles[classes]}`}>&nbsp;</div>
  )
}

export default SkeletonElement;