import Image from "next/image";
import classes from "./page.module.css";


export default function Home() {
  return (
    <main className={classes.main}>
      <div className={classes['profile-section']}>
        <div className={classes['profile-img-container']}>
          <Image
            src={'/profile.JPG'}
            alt="Profile Image"
            className={classes['profile-img']}
            width={144}
            height={127} // Initially set to the same as width
            quality={100}
          />
        </div>
        <div className={classes['profile-section-text']}>
          Hey I am Shikhar. And I am here to change the world.
        </div>
      </div>
      <hr/>
      
    </main>
  );
}
