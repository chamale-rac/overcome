import SkeletonElement from '@components/skeletons/SkeletonElement'
import Shimmer from '@components/skeletons/Shimmer'
import * as styles from './SkeletonEventPreview.module.css'

function SkeletonEventPreview() {
  return (
    <article className={styles.skeleton_event_preview_container}>
      <SkeletonElement type="title"/>
      <br/>
      <br/>
      <SkeletonElement type="text"/>
      <SkeletonElement type="text"/>
      <Shimmer/>
    </article>
  )
}

export default SkeletonEventPreview;