import styles from '../styles/greeting.module.scss';

export default function Greeting({ locationList, setLocationList }) {
  let greeting;
  const today = new Date();
  let currentHour = today.getHours();

  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <>
      <h6 className={styles.greeting__text}>{greeting}</h6>
      {locationList.length === 0 ? (
        <h5 className={styles.start__text}>Start by adding a location below</h5>
      ) : (
        ''
      )}
    </>
  );
}
