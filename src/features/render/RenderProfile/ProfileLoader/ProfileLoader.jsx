import * as styles from './ProfileLoader.module.css'
import SkeletonElement from '@components/skeletons/SkeletonElement'
import Shimmer from '@components/skeletons/Shimmer'
import SkeletonEventPreview from '../../RenderGlobalEvents/SkeletonEventPreview/SkeletonEventPreview'

function ProfileLoader() {
  return (
    <div className={`${styles.loading_profile} font-bebas-neue`}>
      <header>
        <aside className={styles.profile_info_container}>
          <SkeletonElement type="profile" rules={{margin: "auto 0"}}/>
          <div className={styles.profile_name_container}>
            <SkeletonElement type="title" rules={{marginLeft: "0.5rem"}}/>
            <SkeletonElement type="text" rules={{marginLeft: "0.5rem"}}/>
          </div>
        </aside>
        <aside >
          <SkeletonElement type="text" rules={{width: "60%"}}/>
          <SkeletonElement type="text" rules={{width: "60%"}}/>
        </aside>
      </header>
      <div className="mt-6 h-0.5 w-full bg-black" style={{margin: "1rem 0"}} />
      <body>
          <SkeletonElement type="title" rules={{width: "25%"}}/>
          <div className="grid grid-cols-1 gap-3 md:gap-6 divide-y divide-zinc-200 md:grid-cols-4">
            <SkeletonElement type="event_preview" />
            <SkeletonElement type="event_preview" />
            <SkeletonElement type="event_preview" />
          </div>
          <SkeletonElement type="title" rules={{width: "25%"}}/>
          <div className="grid grid-cols-1 gap-3 md:gap-6 divide-y divide-zinc-200 md:grid-cols-4">
            <SkeletonElement type="event_preview" />
            <SkeletonElement type="event_preview" />
            <SkeletonElement type="event_preview" />
          </div>
      </body>
      <Shimmer/>
    </div>
  )
}

export default ProfileLoader;