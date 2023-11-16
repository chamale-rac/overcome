import * as styles from './SkeletonElement.module.css';

function SkeletonElement({ type, rules }) {

  const classes = type
  const style = rules

  console.log("rules", style)

  return (
    <div
      className={`${styles.skeleton} ${styles[classes]}`}
      style={rules}
    >&nbsp;</div>
  )
}

export default SkeletonElement;